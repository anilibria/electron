import Vuex from 'vuex';

export default {
    use: Vuex,
    data: data
};

function data () {
    return new Vuex.Store({
        strict: true,
        state: states(),
        mutations: { setAnime}
    });
}

function states () {
    return {
        title: 'Anilibria TV',
        anime: false
    };
}

function setAnime (state, anime) {
    console.log(anime);
    state.anime = anime;
}