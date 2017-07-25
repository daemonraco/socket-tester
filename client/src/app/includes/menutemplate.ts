declare var electron: any;
const shell = electron.shell;

export const MenuTemplate = [
    {
        label: 'View',
        submenu: [
            { role: 'reload', accelerator: 'CmdOrCtrl+Y' },
            { type: 'separator' },
            { role: 'togglefullscreen', accelerator: 'CmdOrCtrl+Y' },
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Learn More',
                click() {
                    shell.openExternal('https://electron.atom.io')
                }
            }
        ]
    }
];
