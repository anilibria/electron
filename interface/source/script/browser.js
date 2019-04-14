import NavBar from 'component/NavBar.vue'

export default {
    components: { NavBar },
    methods: { animeDescription },
    updated: function () {
        this.anime = this.$root.anime;
    },

    data: function () {
        return {
            anime: this.$root.anime
        }
    }
}

function animeDescription (anime) {
    return anime && anime.description
        ? anime.description.replace(/\<(.*)/g, '')
        : 'Нет описания';
}