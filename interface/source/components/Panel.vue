<template lang="pug">
    div#panel
        img( class='icon' src='@img/logo.png' )
        h3( class='title' ) {{ $root.title }}

        button( class='panel-button hide' @click='hide' )
            i( class='fa fa-minus' )

        button( class='panel-button screen' @click='screen' )
            i( class='fa fa-expand' )

        button( class='panel-button close' @click='close' )
            i( class='fa fa-times' )
</template>

<script>
import { remote } from 'electron'

export default {
    methods: { hide, screen, close },
    mounted: function () {
        var mouse = remote.screen.getCursorScreenPoint;
        var panel = this.$el;

        this.$root.checkMouse = setInterval(function () {
            var current = mouse();

            if ( mouse().y <= 5 && !panel.classList.contains('hover') )
                panel.classList.add('hover');

            else if ( current.y > 5 && panel.classList.contains('hover') )
                panel.classList.remove('hover');
        }, 150);
    }
}

function hide () {
    return remote.getCurrentWindow().minimize();
}

function screen () {
    var window = remote.getCurrentWindow();

    if ( this.$root.kiosk ) {
        this.$root.kiosk = false;
        this.$forceUpdate();

        window.setMovable(true);
        window.setResizable(true);
        window.setKiosk(false);
    }
    
    else {
        this.$root.kiosk = true;
        this.$forceUpdate();
        
        window.setMovable(false);
        window.setResizable(false);
        window.setKiosk(true);
    }
}

function close () {
    var window = remote.getCurrentWindow();
    var exit = confirm('Вы действительно хотите закрыть приложение?')

    if ( exit )
        remote.app.quit();

}
</script>

<style lang="stylus">
#panel
    align-items center
    background-color RGBA(180, 185, 180, .6)
    backdrop-filter blur(5px) opacity(80%)
    box-sizing border-box
    display flex
    overflow hidden
    padding 0 8px
    position absolute
    top 0
    height 35px
    left 0
    width 100%
    z-index 15
    -webkit-app-region drag
    &:hover, &.hover
        top 0 !important

    .icon
        display inline-block
        margin 0 4px
        position relative
        top -2px
        height 20px
        width 20px

    .title
        color #333
        display inline-block
        font-family sans-serif
        font-size 18px
        font-weight 400
        margin 0 4px
        position relative
        top 0
        text-shadow 0 0 15px RGBA(200, 200, 200, .4)

    .panel-button
        background RGBA(0, 0, 0, 0)
        border none
        color #EEE
        font-size 16px
        outline none
        cursor pointer
        position absolute
        top 0
        bottom 0
        width 40px
        -webkit-app-region no-drag
        &:hover
            color #EEE

    .close
        right 0
        &:hover
            background #e74c3c

    .screen
        right 45px
        &:hover
            background #34495e

    .hide
        right 90px
        &:hover
            background #34495e
</style>
