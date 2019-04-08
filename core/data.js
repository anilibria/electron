const { app } = require('electron');
const Datastore = require('nedb');

const database = new Datastore({
    filename: `${ app.getPath('userData') }/database`
});

module.exports = database;
database.loadDatabase();