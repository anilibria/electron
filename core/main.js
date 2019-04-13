const window = require('./window');

module.exports = { run };

function run () {
    const index = new window('index', {
        frame: true,
        hasShadow: true,
        transparent: false,
        resizable: true,
        height: 700,
        width: 1320,

        minHeight: 700,
        minWidth: 1320
    });

    index.path = '/index';
}