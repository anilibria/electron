import NavBar from 'component/NavBar.vue'

import AnimeList from 'component/AnimeList.vue'
import AnimeBrowser from 'component/AnimeBrowser.vue'

import api from 'script/lib/api'

export default {
    methods: { select },
    components: { NavBar, AnimeList, AnimeBrowser },
    created: init,
    data: function () {
        return {
            selected: false,
            ongoings: Array(10)
        }
    }
}

async function init () {
    var list = await api.anime.list('ongoings');

    if(list !== false) {
        this.ongoings = list;
        this.$forceUpdate();
    }
}

function select (anime) {
    this.selected = anime;
    this.$forceUpdate();
}