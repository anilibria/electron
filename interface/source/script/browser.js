import NavBar from 'component/NavBar.vue'
import AnimePlayer from 'component/AnimePlayer.vue'

export default {
    components: { NavBar, AnimePlayer },
    methods: { animeDescription },
    data: function () {
        var self = this;

        // this.$router.beforeEach(function (from, to, next) {
        //     if ( from.name === 'browser' ) {
        //         self.anime = self.$root.anime;

        //         if ( self.$root.scrolls.browser )
        //             self.$root.scrolls.browser = 0;
        //     }

        //     return next();
        // });

        return {};
    },

    computed: {
        anime () {
            return this.$store.state.anime;
        }
    }
}

function animeDescription (anime) {
    return anime && anime.description
        ? anime.description.replace(/\<(.*)/g, '')
        : 'Нет описания';
}