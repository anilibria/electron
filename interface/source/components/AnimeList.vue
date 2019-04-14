<template lang="pug">
    div#list
        div( class='list-container adaptive' )
            div( class='list' )
                div( class='anime' v-for='item in list' )
                    div( class='poster-container' )
                        img( class='poster' :src='animePoster(item)' )
                        div( class='extra' )
                            button( class='favorite' )
                                i( class='far fa-heart' )

                            span( class='go' @click='openAnime(item)' ) Перейти к просмотру

                            span( class='rating' )
                                i( class='fa fa-star' )
                                span {{ animeRating(item) }}


                    h3( class='name' @click='openAnime(item)' ) {{ animeName(item) }}
                    p( class='year' ) {{ animeYear(item) }}
</template>

<script>
export default {
    methods: { openAnime, animePoster, animeRating, animeYear, animeName },
    props: ['title', 'browser', 'list'],
    mounted: function () {
        
    }
}

function openAnime (anime) {
    this.$root.anime = anime;
    this.$router.push('/browser')
    this.$forceUpdate();
}

function animePoster (anime) {
    return anime && anime.poster
        ? `https://www.anilibria.tv${ anime.poster }`
        : '';
}

function animeRating (anime) {
    return anime && anime.favorite
        ? anime.favorite.rating
        : '';
}

function animeYear (anime) {
    return anime && anime.year
        ? anime.year
        : '';
}

function animeName (anime) {
    return anime && anime.names
        ? anime.names[0]
        : '';
}
</script>

<style lang="stylus">
@import '~style/palette'

#list

    .list
        align-items start
        align-content start
        display grid
        grid-template-columns 220px 220px 220px 220px
        grid-row-gap 8px
        justify-content space-between
        width 100%

    @media (min-width: 1500px)
        .list
            grid-template-columns 220px 220px 220px 220px 220px

    @media (min-width: 1780px)
        .list
            grid-template-columns 220px 220px 220px 220px 220px 220px

    .anmime
        cursor pointer

    .extra
        align-items center
        background RGBA(0, 0, 0, .6)
        display flex
        opacity 0
        position absolute
        top 0
        bottom 0
        left 0
        right 0

        .favorite
            background RGBA(0, 0, 0, .15)
            border none
            border-radius 5px
            color $alizarin
            cursor pointer
            font-size 24px
            outline none
            text-shadow 0 0 3px $black
            position absolute
            top 5px
            left 5px
            height 50px
            width 50px
            &:hover
                background RGBA(0, 0, 0, .3)

        .go
            color $cloud
            cursor pointer
            display block
            font-size 16px
            font-weight 600
            margin 0 auto
            text-align center
            width 150px

        .rating
            background linear-gradient(to top, RGBA(0,0,0,.75), RGBA(0,0,0,0))
            color $cloud
            text-align center
            padding 16px 0
            position absolute
            bottom 0
            left 0
            right 0

            .fa
                display inline-block
                color $sunflower
                margin-right 8px

    .poster-container
        position relative
        &:hover .extra
            opacity 1

    .poster
        width 100%

    .year
        color $asbestos
        cursor default
        text-align center

    .name
        color $cloud
        cursor pointer
        font-size 16px
        font-weight 400
        margin-top 4px
        text-align center
        &:hover
            color $alizarin

</style>