require('./config');

const { app } = require('electron');

const main = require('./core/main');
const server = require('./core/server');
const update = require('./core/update');

server.run().then(function () {
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