<template lang="pug">
    div#browser
        NavBar

        div#player( class='adaptive' )
            video( class='video' :src='anime.playlist[0].srcHd' controls )

        div#info( class='adaptive' )
            div( class='poster' )
                img( class='image' :src='`https://www.anilibria.tv${anime.poster}`' )

                button( class='button favorite' )
                    i( class='far fa-heart' )
                    span Добавить в избранные

                button( class='button download' )
                    i( class='fa fa-download' )
                    span Загрузить

            div( class='texts' )
                h1( class='title' ) {{ anime.names[0] }}

                div( class='meta' )
                    span( class='key' ) Тип
                    span( class='value' ) {{ anime.type }}

                div( class='meta' )
                    span( class='key' ) Год выхода
                    span( class='value link' ) {{ anime.year }}

                div( class='meta' )
                    span( class='key' ) Жанр
                    span( class='value' )
                        span( class='link' v-for='genre in anime.genres' ) \#{{ genre }}

                div( class='meta' )
                    span( class='key' ) Войсеры
                    span( class='value' )
                        span( class='link' v-for='voicer in anime.voices' ) @{{ voicer }}

                p( class='description' ) {{ animeDescription(anime) }}


</template>

<script src='script/browser'></script>

<style lang="stylus" scoped>
@import '~style/palette'

#browser
    overflow auto
    position absolute
    top 0
    bottom 0
    left 0
    right 290px

#player
    background $black

    .video
        width 100%

#info
    align-items start
    display grid
    grid-template-columns 280px calc(100% - 300px)
    justify-content space-between
    margin 24px auto

    .poster

        .button
            border none
            border-radius 4px
            color $cloud
            cursor pointer
            font-size 16px
            margin 8px 0
            outline none
            padding 8px 0
            width 100%
            &.favorite
                background $pomegranate
                &:hover
                    background $alizarin
            &.download
                background $greensea
                &:hover
                    background $turquoise


            .fa, .far
                display inline-block
                margin 0 8px


        .image
            box-shadow 0 0 10px RGBA(0, 0, 0, .5)
            width 100%

    .texts
        background $black
        box-shadow 0 0 5px RGBA(0, 0, 0, .5)
        padding 4px 24px 12px 18px

        .title
            color $cloud
            font-size 24px
            font-weight 600
            margin 16px 0

        .meta
            align-items start
            color $cloud
            display flex
            margin 4px 0

            .key
                display inline-block
                font-size 16px
                font-weight 600
                width 110px
            
            .value
                display inline-block
                width calc(100% - 120px)

            .link
                display inline-block
                color $alizarin
                cursor pointer
                margin 0 4px
                &:hover
                    text-decoration underline

        .description
            color $cloud
            font-size 16px
            font-weight 400
            margin 16px 0
</style>
