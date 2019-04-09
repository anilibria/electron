// module.exports = Window;

const { BrowserWindow } = require('electron');
const config = Config;
const defaults = {
    show: false,
    frame: false,
    transparent: true,
    maximizable: false,
    height: 600,
    with: 800,
    webPreferences: {
        experimentalFeatures: true,
    }
};

var story = {};

/**
 * Class creating new window
 * @extends BrowserWindow
 */
class Window extends BrowserWindow {
    /**
     * Creates window instance
     * @param {String} name - window name
     * @param {Electron.BrowserWindowConstructorOptions} options
     */
    constructor (name, options = {}) {
        var window = super( Object.assign({}, defaults, options) );
        story[name] = window;
        this.name = name;

        window.webContents.openDevTools();
        window.on('ready-to-show', window.show);
        window.on('closed', function () {
            delete story[name];
        });
    }

    /**
     * Set window url to the Vue router page
     * @param {String} path - Vue page name
     */
    set path (path) {
        var gui = config.gui;
        this.loadURL(`file:///${gui.path}/${this.name}.html#${path}`);
    }

    /**
     * Set window url to the given
     * @param {String} url - Url for set
     */
    set url (url) {
        this.loadURL(utl);
    }

    /**
     * Returns BrowserWindow instance if exists or false
     * @param {String} name - Window name
     * @returns {BrowserWindow|false}
     */
    static get (name) {
        return story[name]
            ? story[name] : false;
    }
}

module.exports = Window;