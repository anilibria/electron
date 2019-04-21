global.Config = {
    gui: {
        type: 'local',
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