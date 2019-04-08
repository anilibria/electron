const config = Config;

module.exports = { run };

async function run () {
    if (config.gui.type === 'server')
        return await server();
}

function server () {
    return new Promise(function (resolve) {
        resolve();
    });
}