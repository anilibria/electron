<template lang="pug">
    div#index
        div( class='content' )
            div( class='adaptive' )
                h3( class='sub-title' ) Онгоинги на Анилибрии
                div( class='slider' v-if='ongoings' :style='{ width: (ongoings.data.length * 240) + "px" }' )
                    div(
                        v-for='anime in ongoings.data'
                        :class='{slide: true, active: current && current.id === anime.id}'
                        @click='view(anime)'
                    )
                        img( class='poster' :src='"https://anilibria.tv" + anime.poster' )

        div( class='preview' v-if='current' )
            i( class='fa fa-times' @click='view(false)' )
            div( class='adaptive' )
                div( class='info' )
                    h2( class='anime-title' ) {{ current.names[0] }}
                    p( class='anime-description' ) {{ current.description }}

            div( class='menu' )
                span( class='menu-link active' ) Обзор
                span( class='menu-link' ) Серии
                span( class='menu-link' ) Трейлер
                span( class='menu-link' ) Похожие

            video( class='video' controls :src='current.playlist[0].srcHd' )
</template>

<script>
export default {
    methods: { view },
    data: async function () {
        var self = this;
        this.anime.ongoings().then(function (list) {
            console.log(list)
            self.ongoings = list;
            self.$forceUpdate();
        });
        
        return { 
            current: false,
            ongoings: false
        };
    }
}

function view (anime) {
    this.current = anime;
    this.$forceUpdate();
}
</script>


<style lang="stylus" scoped>
@import '~@style/palette'

#index
    position absolute
    overflow hidden
    top 70px
    left 0
    right 0
    bottom 0

    .content
        position absolute
        overflow hidden
        overflow-y auto
        top 0
        left 0
        right 0
        bottom 0

    .adaptive
        overflow visible

    .sub-title
        color $cloud
        font-size 16px
        font-weight 600

    .slider
        align-items center
        display flex
        overflow visible
        position relative

        .slide
            align-items center
            border 0px solid $black
            cursor pointer
            display inline-flex
            margin 0 2px
            overflow hidden
            padding 6px 2px
            width 200px
            &.active
                border 2px solid $concrete
                padding 4px 2px

            .poster
                width 100%

    .preview
        background $black
        box-shadow 0 -2px 25px $black
        color $cloud
        overflow hidden
        position absolute
        height 450px
        bottom 0
        left 0
        right 0

        .fa
            color $silver
            cursor pointer
            font-size 16px
            position absolute
            top 28px
            right 32px
            z-index 6
            &:hover
                color $cloud

        .adaptive
            height 100%

        .info
            background linear-gradient(to right, $black calc(100% - 75px), transparent)
            height 100%
            padding 32px 0
            position relative
            width calc(30% + 50px)
            z-index 5

            .anime-title
                color $silver
                font-size 20px
                font-weight 600
                margin 0
                width calc(100% - 50px)

            .anime-description
                color $concrete
                margin 16px 0
                width calc(100% - 50px)

        .video
            background $white
            opacity .75
            position absolute
            top 0
            right 0
            bottom 0
            width 70%

        .menu
            display flex
            justify-content center
            padding-bottom 32px
            text-align center
            position absolute
            bottom 0
            left 0
            right 0

            .menu-link
                background RGBA(0, 0, 0, .25)
                border 1px solid $silver
                color $cloud
                cursor pointer
                display inline-block
                font-size 16px
                font-weight 600
                letter-spacing 2px
                margin 0
                padding 6px 0
                position relative
                text-align center
                width 115px
                z-index 6
                &.active
                    background $cloud
                    color #000
</style>