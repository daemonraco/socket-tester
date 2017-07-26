import { Component } from '@angular/core';

declare var electron: any;
const shell = electron.shell;

export class MenuTemplate {
    public static generate(app): any[] {
        return [
            {
                label: 'File',
                submenu: [
                    { role: 'togglefullscreen', accelerator: 'Alt+Shift+F' },
                    { type: 'separator' },
                    { label: 'Save', click: app.save, accelerator: 'CmdOrCtrl+S' },
                    { label: 'Save As', click: app.saveAs, accelerator: 'CmdOrCtrl+Shift+S' },
                    { type: 'separator' },
                    { label: 'Export', click: app.export },
                    { label: 'Import', click: app.import },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            },
            {
                label: 'Tools',
                submenu: [
                    { role: 'reload', accelerator: 'CmdOrCtrl+R' },
                    { role: 'forcereload', accelerator: 'CmdOrCtrl+Shift+R' },
                    { type: 'separator' },
                    { role: 'toggledevtools' }
                ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Repository',
                        click: () => shell.openExternal('https://github.com/daemonraco/socket-tester')
                    }, {
                        label: 'Author',
                        click: () => shell.openExternal('http://daemonraco.com')
                    },
                    { type: 'separator' },
                    { role: 'about' }
                ]
            }
        ];
    }
}