# Anilibria All OS

[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/)
[![node](https://img.shields.io/node/v/electron.svg)](https://nodejs.org/)

The application consists of two parts: `core` and `interface`.  
In simple words `core` it's "backend" of application and `interface` - "frontend"  
__Important!__ To use this application in development mode, you must have installed `npm` and `nodejs`.  
Interface of application made on Vuejs. Componered files storing in `interface/dist`  

After cloning you need install dependencies:
```shell
npm install
```

After installing you can run application:
```shell
npm start
```
This command will componere `frontend` and launch the application.


If you already have componered `frontend` you can just run the application:
```shell
npm run now
```

If you need componere `frontend` withoud launching application:
```shell
npm run builder
```
This command will watch for files and update componered files, when source code changing

If you need componere interface source just once:
```shell
npm run builder-once
```

by [Turar](https://vk.com/turarabu)