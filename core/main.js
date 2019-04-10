const window = require('./window');

module.exports = { run };

function run () {
    const index = new window('index', {
        height: 700,
        width: 1310,

        minHeight: 700,
        minWidth: 1310,
    });

    index.path = '/index';
}