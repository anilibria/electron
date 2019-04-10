# Anilibria All OS

[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/)
[![node](https://img.shields.io/node/v/electron.svg)](https://nodejs.org/)  
*Version 0.1.5 Raphtalia*

The application consists of two parts: `core` and `interface`.  
In simple words `core` it's "backend" of application and `interface` - "frontend"  
Interface of application made on Vuejs. Componered files stores in `interface/dist`

__Important!__ To use this application in development mode, you must have installed `npm` and `nodejs`.  

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

### Interface builder

If you need componere `frontend` withoud launching application:
```shell
npm run vue-builder
```
This command will watch for files and update componered files, when source code changing

If you need componere interface source just once:
```shell
npm run vue-builder-once
```

### Application builder
The application can be builder for: Linux, MacOS (OSX), Windows
You can run these commands for each OS
```shell
npm run linux-builder
npm run macos-builder
npm run windows-builder
```
__IMPORTANT__ Application for MacOS can be builder only on MacOS!  
__IMPORTANT__ Build for mac os is not tested so not supports at the moment.
Support will be added in one of the following minor versions.  
To build application for Windows on Linux you must have installed `wine` of 2.0 version or later

by [Turar](https://vk.com/turarabu)