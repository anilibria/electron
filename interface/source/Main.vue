<template lang="pug">
    div#main
        SideBar
        router-view
</template>

<script>
import SideBar from 'component/SideBar.vue'

export default {
    components: { SideBar },
    data: function () {        
        return {
            
        };
    }
}
</script>


<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&subset=cyrillic-ext')
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&subset=cyrillic-ext');
@import url('https://use.fontawesome.com/releases/v5.8.1/css/all.css');

@import '~style/fonts'
@import '~style/base'
@import '~style/palette'

body
    background url('~img/noise.jpg')

#main
    background linear-gradient(to bottom, RGBA(0, 0, 0, .85), RGBA(0, 0, 0, .825))
    overflow hidden
    position absolute
    top 0
    bottom 0
    left 0
    right 0
</style>
