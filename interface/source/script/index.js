import NavBar from 'component/NavBar.vue'

import AnimeList from 'component/AnimeList.vue'

import api from 'script/lib/api'

export default {
    components: { NavBar, AnimeList },
    created: init,
    data: function () {
        return {
            selected: false,
            ongoings: this.$root.ongoings || Array(10)
        }
    }
}

async function init () {
    if ( this.$root.ongoings )
        return;
    else {
        var list = await api.anime.list('ongoings');

        if(list !== false) {
            this.$root.ongoings = list;
            this.ongoings = list;
            this.$forceUpdate();
        }
    }
}