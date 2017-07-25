'use strict'

var { app, BrowserWindow, Menu } = require('electron');
var path = require('path');
var url = require('url');
var chalk = require('chalk');

const envName = process.argv.length > 2 ? process.argv[2] : false;

let win;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1000,
        height: 700
    });

    if (envName === 'dev') {
        win.loadURL('http://localhost:4200/');
        console.log(chalk.cyan(`Development mode`));
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'client/dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate([]));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
});

app.on('window-all-closed', () => {
    app.quit();
});
