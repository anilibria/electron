<template lang="pug">
    div#index( class='scroll-content' )
        NavBar

        AnimeList(
            browser='top-browser'
            :list='ongoings' )
</template>

<script src='script/index'></script>

<style lang="stylus">
@import '~style/palette'

#index
    overflow auto
    position absolute
    top 0
    bottom 0
    left 0
    right 290px
</style>