<template lang="pug">
    div#page( :class='{ kiosk: $root.kiosk }' )
        Panel
        div#view
            NavBar
            router-view
</template>

<script>
import { remote } from 'electron'

import Panel from '@component/Panel.vue'
import NavBar from '@component/NavBar.vue'

export default {
    components: { Panel, NavBar },
    data: function () {        
        return {
            fullScreen: remote.getCurrentWindow().isFullScreen()
        };
    }
}
</script>


<style lang="stylus">
@import url('https://use.fontawesome.com/releases/v5.8.1/css/all.css');

*
    box-sizing border-box
    font-family 'Roboto', sans-serif
    transition .15s all
    user-select none

#page
    background url('~@img/pattern.jpg')
    background-position -15px -15px
    box-shadow 0 0 5px RGBA(25, 25, 25, .75)
    cursor default
    overflow hidden
    position absolute
    top 5px
    left 5px
    right 5px
    bottom 5px
    &.kiosk
        box-shadow 0 0 0 #000
        top 0
        bottom 0
        left 0
        right 0

        #panel
            top -30px
            -webkit-app-region no-drag

        #view
            top 0

#view
    background #FFF
    position absolute
    top 35px
    bottom 0
    left 0
    width 100%
    
</style>
