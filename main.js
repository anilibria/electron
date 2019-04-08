require('./config');

const main = require('./core/main');
const server = require('./core/server');

server.run()
    .then(function () {
        const { app } = require('electron');

        app.on('ready', function () {
            main.run();
        });

        app.on('window-all-closed', function () {
            app.quit();
        });
    });