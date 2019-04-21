<template lang="pug">
    div#player( :class='{"show-list": showPlaylist, "hide-controls": hideControls}' )
        div( class='video-container' )
            video( class='video'
                :src='playlist[series].srcHd || playlist[series].srcSd'
                @click='togglePlay' )

            div( :class='{"preloader-container": true, show: showPrelaoder}' @click='togglePlay' )
                img( class='preloader' src='~img/ring-preloader.svg' )

            div( class='controls top' )
                span( class='watching' ) Вы смотрите:
                p( class='name' ) {{ anime.names[0] }}
                p( class='series' ) {{ playlist[series].title }}

                i( class='list fa fa-list-ul' @click='showPlaylist = true' )


            div( class='controls bottom' )
                i( :class='["play", "fa", playIcon]' @click='togglePlay' )
                span( class='time' ) {{ currentTime }} / {{ totalTime }}

                i( class='volume-icon fa fa-volume-down' )

                label( class='volume-container' )
                    div( class='fill' :style='{width: volumeInput + "%"}' )
                    input( class='volume' type='range'
                        min='0' max='100' step='1'
                        v-model='volumeInput'
                        @mousedown='startVolume'
                        @mouseup='stopVolume'
                        @click='setVolume' )

                i( :class='["size", "fa", sizeIcon]' @click='toggleScreen' )

                div( class='timerange' )
                    div( class='buffered' v-for='buff in buffered'
                    :style=`{
                        left: buff.left + '%',
                        width: buff.width + '%'
                    }` )
                    div( class='played' :style='{width: played}' )
                    div( class='setter'
                        @mouseup='setTime'
                        @mousemove='setHover'
                        @mouseleave='showHovered = false' )

            div( class='timeinfo'
                :class='{show: showHovered}'
                :style='{left: hoverLeft}' ) {{ hoverTime }}

        div( :class='["playlist", playlistClass]' )
            i( class='hide fa fa-arrow-right' @click='showPlaylist = false' )

            div( class='list' )
                span( class='series' :class='{active: series === i}'
                    v-for='(episode, i) in playlist'
                    @click='setSeries(i)') {{ episode.title }}
</template>

<script>
export default {
    computed: {
        anime, series, playlist, playlistClass, playIcon, currentTime, totalTime, sizeIcon,
        played, buffered, hoverTime, showPrelaoder },
    methods: { togglePlay, toggleScreen, setTime, setHover, setSeries, startVolume, stopVolume, setVolume },
    mounted: init,
    data: function () {
        return {
            fullscreen: false,
            ready: false,
            video: false,
            paused: true,
            showPlaylist: false,
            showHovered: false,
            hoverLeft: 0,
            isLoading: true,
            hideControls: false,
            hiderTimer: null,
            inactive: 0,
            changeVolume: false,
            volumeInput: 100,
            times: {
                current: 0,
                total: 0,
                hover: 0
            },
            range: {
                played: 0,
                buffered: 0
            }
        };
    }
}

function anime () {
    return this.$store.state.anime;
}

function playlist () {
    return this.$store.state.anime.playlist;
}

function playlistClass () {
    return this.showPlaylist === true
        ? 'show-list' : '';
}

function series () {
    return this.$store.state.series;
}

function playIcon () {
    return this.video && !this.paused
        ? 'fa-pause' : 'fa-play';
    
}

function currentTime () {
    return toTime( this.times.current );
}

function totalTime () {
    return toTime( this.times.total );
}

function hoverTime () {
    return toTime( this.times.hover );
}

function sizeIcon () {
    return this.fullscreen === false
        ? 'fa-expand' : 'fa-compress';
}

function toTime (seconds) {
    var mins = parseInt( seconds/60 );
    var secs = parseInt( seconds%60 );

    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
}

function played () {
    return this.range.played;
}

function buffered () {
    return this.range.buffered;
}

function showPrelaoder () {
    return this.isLoading;
}

function init () {
    var self = this;
    var video = this.$el.querySelector('.video');

    this.video = video;

    function sign (event, callback) {
        return video.addEventListener(event, function (...data) {
            callback.call(self, ...data);
        });
    }

    sign('play', changed);
    sign('pause', changed);

    sign('progress', progress);

    sign('timeupdate', update);
    sign('durationchange', update);

    sign('canplay', load);
    sign('waiting', load);

    sign('loadedmetadata', function (event) {
        self.ready = true;
        self.$forceUpdate();
    });

    document.addEventListener('fullscreenchange', function () {
        self.hideControls = false;
        self.inactive = 0;
        self.fullscreen = document.fullscreen
    });

    window.addEventListener('mousemove', function () {
        self.hideControls = false;
        self.inactive = 0;

        if ( self.changeVolume === true && self.volumeInput !== undefined ) {
            video.volume = self.volumeInput / 100;
        }
    });

    window.addEventListener('keydown', function (event) {
        if ( event.keyCode === 32 ) {
            if ( event.ctrlKey === true )
                addTime.call(self, 85);
            else togglePlay.call(self);

            event.preventDefault();
        }
        
        if ( event.keyCode === 13 )
            toggleScreen.call(self);

        if ( event.keyCode === 39 )
            addTime.call(self, 10);

        if ( event.keyCode === 37 )
            addTime.call(self, -10);
    });
}

function changed (event) {
    this.paused = this.video.paused;

    if ( event.type === 'play' ) {
        var self = this;
        this.hiderTimer = setInterval(function () {
            self.inactive += 500;

            if( self.inactive >= 2000 && self.fullscreen === true ) 
                self.hideControls = true;
        }, 500);
    }

    else if ( this.hiderTimer !== null ) {
        clearInterval( this.hiderTimer );
        this.hiderTimer = null;
    }
        
}

function progress () {
    if( this.ready === false )
        return;

    var video = this.video;
    var newRange = [];

    for(let i = 0; i != video.buffered.length; ++i) {
        let start = video.buffered.start(i);
        let end = video.buffered.end(i);

        newRange.push({
            left: 100 / video.duration * start,
            width: 100 / video.duration * (end - start)
        });
    }

    return this.range.buffered = newRange;
}

function update (event) {
    var video = this.video;
    
    if ( isNaN(video.duration) === false )
        this.times.total = video.duration;
    else this.times.total = 0;

    this.times.current = video.currentTime;
    this.range.played = ((100 / video.duration) * video.currentTime) + '%';
}

function load (event) {
    if (event.type === 'canplay')
        this.isLoading = false;
    else if (event.type === 'waiting')
        this.isLoading = true;
}

function togglePlay () {
    if( this.ready === false )
        return;

    return this.video.paused
        ? this.video.play() : this.video.pause();
}

function toggleScreen () {
    return document.fullscreen === false
        ? this.$el.requestFullscreen() : document.exitFullscreen();
}

function setTime (event) {
    if ( this.ready === false )
        return;

    var percent = 100 / event.target.offsetWidth * event.offsetX;
    var video = this.video;

    return video.currentTime = video.duration / 100 * percent;
}

function setHover (event) {
    var video = this.video;

    if ( this.video === false || isNaN(video.duration) )
        return this.times.hover = 0;

    var percent = 100 / event.target.offsetWidth * event.offsetX;

    this.times.hover = video.duration / 100 * percent;

    if ( event.offsetX < 40 )
        this.hoverLeft = '5px';
    else if ( event.target.offsetWidth - event.offsetX <  40 )
        this.hoverLeft = 'calc(100% - 75px)'
    else this.hoverLeft = `calc(${ percent }% - 35px)`;

    return this.showHovered = true;
}

function setSeries (index) {
    this.showPlaylist = false;
    this.paused = true;

    return this.$store.commit('setSeries', index);
}

function startVolume () {
    this.changeVolume = true;
}

function stopVolume () {
    this.changeVolume = false;
}

function setVolume (event) {
    if (this.video === false)
        return;

    this.video.volume = event.target.value / 100;
}

function addTime (secs) {
    return this.video.currentTime += secs;
}
</script>

<style lang="stylus">
@import '~style/palette'

#player
    background $black
    overflow hidden
    position relative

    .video-container
        overflow hidden
        position relative
        transform perspective(0) rotateY(0) translateZ(0)
        left 0

    .preloader-container
        border-radius 50%
        opacity 0
        overflow hidden
        position absolute
        top calc(50% - 75px)
        left calc(50% - 50px)
        width 100px
        &.show
            opacity 1
            
    .preloader
        background RGBA(0, 0, 0, .25)
        width 100%

    .video
        width 100%

    .playlist
        backdrop-filter blur(10px)
        background rgba(100, 100, 100, 0.5)
        overflow hidden
        position absolute
        top 0
        right -15vw
        bottom 0
        width 14vw

        .hide
            color $cloud
            cursor pointer
            font-size 3vh
            position absolute 
            top 2vh
            right 2vw

        .list
            overflow auto
            padding-right 5px
            position absolute
            top calc(5% + 24px)
            right 5px
            bottom 5%
            width 100%

        .series
            color $cloud
            cursor pointer
            display block
            font-size 1.25vw
            padding 8px 2.5vw
            &:hover
                background RGBA(25, 25, 25, .25)
            &.active
                background RGBA(50, 50, 50, .5)
                font-size 1.5vw


    .controls
        align-items center
        color $cloud
        position absolute
        &.top
            background linear-gradient(to bottom, RGBA(0,0,0,.85) 30%, rgba(0,0,0,.5) 65%, transparent)
            padding calc(10vh + 16px) 20px 8vh 20px
            transform rotateZ(-2.5deg)
            top -10vh
            left -10px
            right -10px

            *
                display block
                transform rotateZ(2.5deg)

            .watching
                font-size 14px
                font-style italic

            .name
                font-size 18px
                font-weight 600

            .list
                cursor pointer
                font-size 32px
                position absolute
                top 16vh
                right 2vw
                
        &.bottom
            backdrop-filter blur(5px)
            background RGBA(35, 35, 35, .35)
            bottom 0
            display flex
            padding 42px 20px 32px 20px
            left 0
            right 0

        .play
            cursor pointer
            display inline-block
            font-size 24px
            margin 0 16px 0 8px

        .size
            cursor pointer
            display inline-block
            font-size 32px
            position absolute
            top 32px
            right 36px

        .timerange
            background $concrete
            border-top 1px solid $concrete
            position absolute
            top 0
            left 0
            right 0
            height 8px

        .played
            background $pomegranate
            position absolute
            top 0
            bottom 0
            left 0

        .buffered
            background $silver
            position absolute
            top 0
            bottom 0

        .setter
            cursor pointer
            position absolute
            top 0
            bottom 0
            left 0
            right 0

    .timeinfo
        background RGBA(0, 0, 0, .3)
        color $cloud
        display inline-block
        font-size 14px
        opacity 0
        padding 6px 0
        text-align center
        transition .15s opacity
        position absolute
        bottom 100px
        width 70px
        &.show
            backdrop-filter blur(5px)
            opacity 1

    .volume-icon
        display inline-block
        font-size 20px
        margin 0 8px 0 24px

    .volume-container
        background $concrete
        height 5px
        overflow hidden
        position relative

        .fill
            background $pomegranate
            position absolute
            top 0
            bottom 0
            left 0

    .volume
        appearance none
        cursor pointer
        display inline-block
        opacity 0
        outline none
        width 100px

    .volume::slider-runnable-track 
        width 1px
        height 5px
    
    .volume::slider-thumb
        border none
        height 8px
        width 1px

#player.show-list
    .video-container
        transform perspective(150vh) rotateY(6deg) translateZ(-4vw)
        left .75vw !important

    .playlist
        right 0

#player.hide-controls
    cursor none

    .controls
        backdrop-filter blur(0px)
        opacity 0

#player:fullscreen
    position absolute !important
    top 0 !important
    bottom 0 !important
    left 0 !important
    right 0 !important

    & .video-container, & .video
        position absolute
        top 0
        bottom 0
        left 0
        right 0
</style>
