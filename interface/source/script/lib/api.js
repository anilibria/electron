/**
 * * API module
 * @module script/api
 */ 

/**
 * @typedef {('all'|'ongoing')} AnimeType
 * 
 * @typedef Anime
 * @type {Object}
 * @property {String} announce - Days of the series
 * @property {String} code - Encoded name of anime like `'boruto-naruto-next-generations'`
 * @property {Number} day - Days of week when the series comes out
 * @property {String} description - Anime description
 * @property {String} favorite - TODO
 * @property {String[]} genres - Array of anime genres
 * @property {Number} id - Anime ID
 * @property {[String, String]} names - Array of anime names on Russian and English
 * @property {Array} playlist - Days of the series
 * @property {String} poster - Relative link to the poster like `'/upload/release/350x500/3996.jpg?1547540609'`
 * @property {String} series - Total voiced series range like `'1-101'`
 * @property {String} status - Status of anime on Russian like `'В работе'`
 * @property {Number} statusCode - Status code of anime
 * @property {Array} torrents - Torrents
 * @property {String} type - Showing anime type. Can be ANY string, like `'В (∞ эп.), 25 мин.'`
 * @property {String[]} voices - Arraay of voicers
 * @property {String} year - Year of anime comes out
 **/

import querystring from 'querystring'
var handler = { all, ongoings };

export default {
    anime: { list }
}

function request (path, data = {}) {
    return fetch(`https://www.anilibria.tv${path}`, {
        method: 'POST',
        body: querystring.stringify(data),
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
}

/**
 * type `all` - any anime  
 * type `ongoings` - anime that comes out on current season
 *  
 * @param {AnimeType} type - `type of anime`
 * @return {Promise<Anime[]>|false}
 * @see {@link Anime}
 * `Promise` of `Anime[]` list by type
 * or `false` if type does not exists
 * 
 * @example
 * import api from `script/api`
 * var list = await api.anime.list(`ongoings`)
 */
async function list(type = 'all') {
    return handler[type]
        ? await handler[type]()
        : false;
}

function all () {

}

function ongoings () {
    return new Promise(async function (resolve) {
        var response = await request('/public/api/index.php', {query: 'schedule'});
        var data = await response.json();
        var result = [];

        data.data.forEach(anime => result.push(...anime.items));
        resolve(result);
    });
}