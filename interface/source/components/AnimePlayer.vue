<template lang="pug">
    div#player
        video( class='video' :src='getSrc()' )

        div( :class='["preloader-container", preloaderStatus()]' )
            img( class='preloader' src='~img/ring-preloader.svg' )

        div( class='top controls' :class='{hide: hideControls}' )
            p( class='watching' ) Вы смотрите:
            h3( class='name' ) {{ anime.names[0] }}
            span( class='series' ) {{ anime.playlist[ series ].title }}

            i( class='list fa fa-list-ul' @click='showList = true; $forceUpdate()' )

        div( :class='{playlist: true, show: showList}' )
            span(
                :class='{series: true, active: i === series}'
                @click='series !== i && (series = i) && $forceUpdate()'
                v-for='(ser, i) in anime.playlist' ) {{ ser.title }}
                
        i( class='close-list fa fa-times' :class='{show: showList}' @click='showList = false; $forceUpdate()' )

        div( class='bottom controls' :class='{hide: hideControls}' )
            i( :class='["toggle play", getTogglePlayIcon()]' @click='togglePlay()' )
            span( class='time' ) {{ getCurrentTime() }} / {{ getTotalTime() }}
            i( :class='["toggle screen", getToggleScreenIcon()]' @click='toggleScreen()' )
            i( class='toggle settings fa fa-cog' )

            div( class='timerange' @click='setTime($event)' )
                div( class='buffered' v-for='buff in getBuffered()'
                :style=`{
                    left: buff.left + '%',
                    width: buff.width + '%'
                }` )
                div( class='played' :style='{width: getPlayed()}' )
</template>

<script>
export default {
    name: 'player',
    props: ['anime'],
    methods: {
        setDefaults, allSeries, togglePlay, toggleScreen, setTime,
        getBuffered, getPlayed,
        getSrc, getCurrentTime, getTotalTime, preloaderStatus, getTogglePlayIcon, getToggleScreenIcon
    },
    mounted: init,
    data: function () {
        const defaults = {
                id: this.anime.id,
                state: 'normal',
                video: false,
                time: false,
                quality: 'srcHd',
                series: 0,
                inactive: 0,
                showList: false,
                hideControls: false
            };

        return Object.assign({}, defaults, {defaults})
    }
}

function init () {
    var self = this;
    var video = this.$el.querySelector('.video');

    this.$el.addEventListener('mousemove', function () {
        self.inactive = 0;
        self.hideControls = false;
        self.$forceUpdate();
    });

    video.addEventListener('loadedmetadata', function (event) {
        self.video = video;
        var interval = {
            active: false,
            check: false,
            duration: 300,
            start () {
                if (this.active === false) {
                    this.active = true;
                    self.$forceUpdate();
                    this.container = setInterval(function () {
                        self.$forceUpdate();
                    }, this.duration);
                }
            },

            stop () {
                if (this.active === true) {
                    this.active = false;
                    clearInterval(this.container);
                }
            }
        };

        video.addEventListener('play', function (event) {
            interval.start();
        });

        video.addEventListener('pause', function (event) {

            if ( interval.active === true )
                interval.stop()

            return self.$forceUpdate();
        });

        video.addEventListener('waiting', function (event) {
            interval.stop();

            self.state = 'loading';
            return self.$forceUpdate();
        });

        video.addEventListener('canplay', function (event) {
            if ( video.paused === false )
                interval.start();

            self.state = 'normal';
            return self.$forceUpdate();
        });

        return self.$forceUpdate();
    });
}

function setDefaults () {
    var defs = JSON.parse( JSON.stringify(this.defaults) );

    for( let d in defs) {
        if( defs.hasOwnProperty(d) )
            this[d] = defs[d];
    }

    this.id = this.anime.id;
}

function allSeries () {
    return [...this.anime.playlist].sort(function (a, b) {
        return (a.id - b.id);
    });
}

function togglePlay () {
    if ( this.video.paused )
        this.video.play()
    else this.video.pause();

    return this.$forceUpdate();
}

function toggleScreen () {
    var self = this;

    this.inactive = 0;
    this.hideControls = false;

    if (document.fullscreen === true) {
        document.exitFullscreen();
        clearInterval(this.checker);
    }

    else {
        this.$el.requestFullscreen();

        this.checker = setInterval(function () {
            if ( self.hideControls === true && self.inactive > 3 )
                return;

            else if (self.inactive > 3) {
                self.hideControls = true;
                self.$forceUpdate();
            }

            else self.inactive += 0.5;
        }, 500);
    }
}

function setTime (event) {
    if (this.video && event.which === 1) {
        var timerange = this.$el.querySelector('.timerange');
        var offsetX = event.clientX - this.$el.offsetLeft;
        var range = 100 / timerange.offsetWidth * offsetX;

        this.video.currentTime = this.video.duration / 100 * range;
        this.$forceUpdate();
    }
}

function getBuffered () {
    if ( this.video ) {
        var video = this.video;
        var buffs = [];

        for(let i = 0; i != video.buffered.length; ++i) {
            let start = video.buffered.start(i);
            let end = video.buffered.end(i);

            buffs.push({
                left: 100 / video.duration * start,
                width: 100 / video.duration * (end - start)
            });
        }

        return buffs;
    }

    else return [];
}

function getPlayed () {
    var video = this.video;

    return video
        ? (100 / video.duration * video.currentTime) + '%'
        : '0%';
}

function getSrc() {
    if ( this.id !== this.anime.id ) {
        this.id = parseInt(this.anime.id);
        this.setDefaults();
        return this.$forceUpdate();
    }

    var play = this.anime.playlist[ this.series ];
    return play.srcHd
        ? play.srcHd
        : play.srcSd;
}

function getCurrentTime () {
    return this.video && this.video.currentTime
        ? toTime( this.video.currentTime )
        : '00:00';
}

function getTotalTime() {
    return this.video && this.video.duration
        ? toTime( this.video.duration )
        : '00:00';
}

function preloaderStatus () {
    if( this.video && this.state !== 'loading' )
        return 'hide';
}

function getTogglePlayIcon () {
    var play = 'fa fa-play';
    var pause = 'fa fa-pause';

    if ( this.video === false || this.video.paused === true )
        return play;

    else return pause;
}

function getToggleScreenIcon () {
    return 'fa fa-expand';
}

// HELPER FUNCTIONS
function toTime (seconds) {
    var min = parseInt(seconds / 60);
    var sec = parseInt(seconds % 60);

    return `${ time2text(min) }:${ time2text(sec) }`;
}

function time2text (time) {
    return time < 10
        ? '0' + time : time;
}
</script>

<style lang="stylus">
@import '~style/palette'

#player
    overflow hidden
    position relative

    .video
        width 100%

    .preloader-container
        border-radius 50%
        opacity 1
        overflow hidden
        position absolute
        top calc(50% - 50px)
        left calc(50% - 50px)
        width 100px
        &.hide
            opacity 0

    .preloader
        background radial-gradient(circle, RGBA(0, 0, 0, .6) 30%, transparent 60%)
        width 100%

    .controls
        color $cloud
        opacity 1
        position absolute
        left -15px
        right -15px
        &.hide
            opacity 0

    .top
        backdrop-filter blur(1px)
        background linear-gradient(to bottom, RGBA(0,0,0,.75) 10px, RGBA(0,0,0,.5) 65px, transparent)
        top 0
        padding 16px 34px 52px 34px
        z-index 5

        .watching
            align-items center
            display flex
            font-size 14px
            font-style italic
            margin-bottom 6px

        .series
            display block
            font-size 16px

        .name
            font-size 20px
            font-weight 500
            max-width calc(100% - 280px)

        .list
            cursor pointer
            display inline-block
            font-size 32px
            position absolute
            top 24px
            right 42px

    .bottom
        align-items center
        backdrop-filter blur(5px)
        background linear-gradient(to bottom, RGBA(0, 0, 0, .15), RGBA(0, 0, 0, .5))
        bottom 0
        display flex
        padding 32px 34px 24px 34px
        z-index 7

        .toggle
            cursor pointer
            display inline-block
            margin 0 8px

        .play
            font-size 24px
            margin-right 24px
        
        .screen
            font-size 28px
            position absolute
            bottom 24px
            right 38px

        .settings
            font-size 20px
            position absolute
            bottom 28px
            right 90px
        
        .timerange
            background RGBA(25, 25, 25, .75)
            cursor pointer
            position absolute
            top 0
            left 15px
            right 15px
            height 8px

        .buffered
            background RGBA(255, 255, 255, .25)
            position absolute
            top 0
            bottom 0

        .played
            background $alizarin
            position absolute
            top 0
            left 0
            bottom 0

    .playlist
        backdrop-filter blur(10px)
        background RGBA(50, 50, 50, .5)
        overflow-y auto
        overflow-x hidden
        opacity 0
        padding 75px 0 100px 0
        transition .3s opacity
        position absolute
        top 0
        bottom 0
        right 0
        width 0
        z-index 6
        &.show
            width 220px
            opacity 1

        .series
            color $cloud
            cursor pointer
            display block
            font-size 18px
            padding 8px 8px 8px 36px
            width 210px
            &:hover
                background RGBA(0, 0, 0, .1)
            &.active
                background RGBA(0, 0, 0, .25)
                cursor default
                font-size 20px
                font-weight 700

    .close-list
        color $cloud
        cursor pointer
        display none
        font-size 36px
        position absolute
        text-align 0 0 3px #000
        top 20px
        right 32px
        z-index 7
        &.show
            display block
</style>
