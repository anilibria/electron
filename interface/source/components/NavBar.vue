<template lang="pug">
    div#nav
        div( class='adaptive' )
            div
                span( class='logo' ) AnilibriaTV
                label( class='label' )
                    i( class='fa fa-search' )
                    input( class='input' placeholder='Найти аниме' )

            div
                span( class='sign-up' ) Регистрация
                span( class='sign-in' ) Вход

</template>

<style lang="stylus" scoped>
@import '~@style/palette'

#nav
    background RGBA(0, 0, 0, .75)
    position sticky
    top 0
    left 0
    right 0

    .adaptive
        align-items center
        display flex
        justify-content space-between
        padding 16px 0

    .logo
        color $alizarin
        font-family 'Babes Neue', sans-serif
        font-size 20px
        font-weight 700

    .label
        align-items center
        display inline-flex
        margin 0 4px
        position relative
        top -2px

        .fa
            color $concrete
            display inline-block
            position relative
            top -2px
            left 24px

        .input
            background transparent
            border none
            border-bottom 1px solid #000
            color $cloud
            display inline-block
            font-size 16px
            font-weight 300
            outline none
            padding 4px 2px 6px 32px
            transition .3s all
            width 50px
            &::placeholder
                color transparent
                font-weight 300
            &:focus
                border-bottom 1px solid $concrete
                width 250px
                &::placeholder
                    color $asbestos

    .link
        color $alizarin
        cursor pointer
        font-family 'Babes Neue', sans-serif
        font-size 18px
        font-weight 400
        display inline-block
        margin 0 32px

    .sign-up
        color $alizarin
        cursor pointer
        display inline-block
        margin 0 12px

    .sign-in
        background $pomegranate
        color $cloud
        cursor pointer
        display inline-block
        padding 6px 12px
        &:hover
            background $alizarin
</style>
