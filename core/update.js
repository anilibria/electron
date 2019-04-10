const { app } = require('electron');
const { autoUpdater } = require('electron-updater');

const Window = require('./window');

var window;
var queue = [];

module.exports = { run, checked };

function run () {
    if ( !app.isPackaged )
        return setTimeout(start, 10);

    window = new Window('update', {
        hasShadow: true,
        height: 150,
        width: 350
    });

    window.path = '/';
    window.on('show', function () {        
        autoUpdater.checkForUpdates();
    });
}

function checked (callback) {
    queue.push(callback);
}

function start () {
    window.close();
    queue.forEach(function (callback) {
        callback();
    });
}

autoUpdater.on('update-available', function () {
    window.webContents.send('status', 1);
});

autoUpdater.on('update-not-available', start);

autoUpdater.on('update-downloaded', function () {
    autoUpdater.quitAndInstall();
});