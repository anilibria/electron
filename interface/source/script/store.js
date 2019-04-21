import Vuex from 'vuex';

export default {
    use: Vuex,
    data: data
};

function data () {
    return new Vuex.Store({
        strict: true,
        state: states(),
        mutations: { setAnime, setSeries }
    });
}

function states () {
    return {
        title: 'Anilibria TV',
        anime: false,
        series: 0
    };
}

function setAnime (state, anime) {
    state.series = 0;
    state.anime = anime;
}

function setSeries (state, series) {
    state.series = series;
}