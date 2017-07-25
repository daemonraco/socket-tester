import { Component } from '@angular/core';
import { MenuTemplate } from './includes/menutemplate';

declare var electron: any;
const remote = electron.remote;
const ipcRenderer = electron.ipcRenderer;
let { dialog } = remote;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {
    remote.Menu.setApplicationMenu(remote.Menu.buildFromTemplate(MenuTemplate));
  }
}
