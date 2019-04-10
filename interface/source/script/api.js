export default {
    install: function (Vue) {
        Vue.prototype.anime = { list, ongoings };
    }
}

function method (path, data = {}) {
    var form = new FormData();

    for (let key in data) {
        if ( data.hasOwnProperty(key) )
            form.append(key, data[key]);
    }

    return fetch(`https://anilibria.tv${path}`, {
        method: 'POST',
        body: form,
        redirect: 'follow'
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