<template lang="pug">

div#sidebar
    div( class='account' )
        button( class='sign-in' ) Войти
        span( class='sign-up' ) Зарегистрироваться

    div( class='explorer' )
        h3( class='title' ) Навигация

        span( class='page-link red' )
            i( class='fa fa-pager' )
            span Обзор

        span( class='page-link yellow active' )
            i( class='fa fa-globe-americas' )
            span Каталог

        span( class='page-link green' )
            i( class='fa fa-download' )
            span Загрузки

        span( class='page-link purple' )
            i( class='fa fa-bell' )
            span Уведомления

        span( class='page-link blue' )
            i( class='fa fa-cog' )
            span Настройки

    div( class='explorer' )
        h3( class='title' ) Поиск по фильтру

</template>

<style lang="stylus">
@import '~style/palette'

#sidebar
    background darken($midnightblue, 10)
    box-shadow -5px 0 25px RGBA(0, 0, 0, .5)
    position absolute
    top 0
    bottom 0
    right 0
    width 280px

    .account
        align-items center
        display flex
        flex-direction column
        justify-content center
        height 140px

        .sign-in
            background $pomegranate
            border none
            border-radius 5px
            color $cloud
            cursor pointer
            font-size 18px
            font-weight 400
            outline none
            padding 8px
            width 200px
            &:hover
                background $alizarin

        .sign-up
            color $alizarin
            cursor pointer
            display block
            font-size 18px
            margin 8px 0
            text-align center
            &:hover
                text-decoration underline

    .explorer
        margin-bottom 16px

        .title
            color $silver
            font-size 14px
            font-weight 600
            padding 12px 18px

        .page-link
            color $cloud
            cursor pointer
            display block
            font-weight 600
            padding 8px 20px
            &.active
                background RGBA(0, 0, 0, .25)
                border-right 6px solid
                padding 12px 16px
            &.red
                border-color $alizarin
                color $alizarin
            &.green
                border-color $turquoise
                color $turquoise
            &.yellow
                border-color $sunflower
                color $sunflower
            &.blue
                border-color $peterriver
                color $peterriver
            &.purple
                border-color $amethyst
                color $amethyst

            .fa
                display inline-block
                margin-right 8px

</style>
