global.Config = {
    gui: {
        type: 'server',
        port: 8080,
        host: 'localhost',
        path: `${__dirname}/interface/dist`
    },

    data: {
        file: 'database'
    },

    api: {
        host: '',
        port: '',
        secure: true
    }
}