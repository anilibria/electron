import querystring from 'querystring'

export default {
    install: function (Vue) {
        Vue.prototype.anime = { list, ongoings };
    }
}

function method (path, data = {}) {
    return fetch(`https://www.anilibria.tv${path}`, {
        method: 'POST',
        body: querystring.stringify(data),
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
}

function list (filter = {query: 'list'}) {
    return new Promise(function (resolve) {
        method('/public/api/index.php', filter).then(function (response) {
            response.json().then(function (json) {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    data: json.data
                });
            });
        });
    });
}

function ongoings () {
    return new Promise(async function (resolve) {
        var request = await list({query: 'schedule'});
        var parse = [];

        request.data.forEach(data => parse.push(...data.items));
        request.data = parse;

        resolve(request);
    });
}