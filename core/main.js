const window = require('./window');

module.exports = { run };

function run () {
    const index = new window('index', {
        minHeight: 600,
        minWidth: 800
    });

    index.path = '/index';
}