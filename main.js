require('./config');

const main = require('./core/main');
const server = require('./core/server');
const update = require('./core/update');

var app;

server.run().then(function () {
    var electron = require('electron');
    app = electron.app;

    app.on('ready', run);

    app.on('window-all-closed', function () {
        app.quit();
    });
});

function run () {
    update.run();
    
    update.checked(function () {
        main.run();
    });
}