const express = require('express');
const config = Config;
var app;

module.exports = { run };

async function run () {
    if (config.gui.type === 'server')
        return await server();
}

function server () {
    app = express();
    app.use( express.static('interface/dist') );
    
    return new Promise(function (resolve) {
        app.listen(config.gui.port, function () {
            aliases();
            resolve();
        });
    });
}

function aliases () {
    const gui = config.gui;
    const index = ['/index', '/browser'];

    app.get(index, function (req, res) {
        res.sendFile(gui.path + '/index.html');
    });
}