const interface = `${__dirname}/interface`;
const source = `${interface}/source`;

var pages = {};
var externals = [];

addPage('index');
addPage('update');

ignore('electron');

module.exports = {
    filenameHashing: false,
    outputDir: `${interface}/dist`,
    publicPath: `./`,
    pages: pages,
    configureWebpack: {
        externals: externals,
        resolve: {
            alias: {
                'app': `${source}`,
                'assets': `${interface}/assets`,
                'img': `${interface}/assets/img`,

                'component': `${source}/components`,
                'script': `${source}/script`,
                'style': `${source}/style`,
                'view': `${source}/views`
            }
        }
    }
}

function addPage(name, template = false, filename = false) {
    var format = `${name}.html`;

    pages[name] = {
        entry: `${source}/${name}.js`,
        template: `${source}/view/${template || format}`,
        filename: `${filename || format}`
      };
}

function ignore (moduleName) {
    const list = [moduleName];

    externals.push(function (context, request, callback) {
        return list.indexOf(request) >= 0
            ? callback(null, `require('${request}')`)
            : callback();
    });
}