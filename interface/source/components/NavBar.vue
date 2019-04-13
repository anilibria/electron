<template lang="pug">
    div#nav
        div( class='adaptive' )
            span( class='logo' ) AniLibria TV
            nav( class='nav' )
                span( class='link active' ) Онгоинги
                span( class='link' ) Популярные
                span( class='link' ) Избранные
                span( class='link' ) Новости

            label( class='label' )
                i( class='fa fa-search' )
                input( class='input' placeholder='Поиск' )

</template>

<style lang="stylus" scoped>
@import '~style/palette'

#nav

    .adaptive
        align-items center
        display flex
        justify-content space-between
        padding 24px 4px

    .logo
        color $alizarin
        font-size 28px
        font-weight 600

    .link
        color $cloud
        cursor pointer
        display inline-block
        font-size 16px
        font-weight 600
        margin 0 4px
        &.active
            color $alizarin
            font-size 18px
            font-weight 400

    .label
        position relative
        width 250px

        .fa
            color $cloud
            font-size 14px
            position absolute
            top 14px
            left 6px

        .input
            background none
            border none
            border-bottom 2px solid transparent
            color $cloud
            font-size 18px
            outline none
            padding 8px 2px 8px 28px
            width 90px
            &::placeholder
                color $cloud
                font-weight 400
            &:focus, &:not(:empty)
                border-bottom 2px solid $alizarin
                width 100%


</style>
