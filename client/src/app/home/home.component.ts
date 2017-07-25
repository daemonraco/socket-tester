import { Component, OnInit, OnDestroy } from '@angular/core';

import { SocketService } from '../providers/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SocketService]
})
export class HomeComponent implements OnInit, OnDestroy {
  public static readonly LS_CURRENT_CONF_KEY = "CurrentConf";

  protected listeners: any[] = [];

  public formSocket: any = {
    url: ''
  };
  public formSend: any = {
    code: '',
    message: ''
  };
  public formListen: any = {
    code: ''
  }
  public listeningCodes: any[] = [];
  public messages: any[] = [];

  constructor(private socket: SocketService) {
  }

  public connect(): void {
    this.socket.connect(this.formSocket.url);
    this.setListeners();
    this.saveCurrentConf();
  }
  public listenFor(): void {
    if (this.formListen.code) {
      this.listeningCodes.push({
        code: this.formListen.code
      });
      this.formListen.code = '';
    }
    this.saveCurrentConf();
    this.setListeners();
  }
  public send(): void {
    if (this.socket.connected()) {
      this.socket.sendMessage(this.formSend.code, this.formSend.message);
      this.messageSent({
        code: this.formSend.code,
        message: this.formSend.message
      });
    }
    this.saveCurrentConf();
  }
  public stopListeningFor(item): void {
    this.listeningCodes.splice(this.listeningCodes.indexOf(item), 1);
    this.setListeners();
  }

  ngOnInit() {
    this.loadCurrentConf();
    //DEBUG
    /*
    this.formSocket.url = 'http://localhost:5000';
    this.connect();
    this.formSend.code = 'add-message';
    this.formSend.message = 'hello world!';
    this.formListen.code = 'message';
    this.listenFor();
    this.send();
    */
    //DEBUG
  }
  ngOnDestroy() {
    this.closeListeners();
  }

  protected closeListeners(): void {
    for (let k in this.listeners) {
      this.listeners[k].unsubscribe();
      delete this.listeners[k];
    }
  }
  protected loadCurrentConf() {
    let conf = JSON.parse(localStorage.getItem(HomeComponent.LS_CURRENT_CONF_KEY));

    if (conf) {
      if (typeof conf.socketUrl !== 'undefined' && conf.socketUrl) {
        this.formSocket.url = conf.socketUrl;
        this.connect();
      }
      if (typeof conf.listeningCodes !== 'undefined' && conf.listeningCodes) {
        this.listeningCodes = conf.listeningCodes;
        this.setListeners();
      }
      if (typeof conf.lastMessageForm !== 'undefined' && conf.lastMessageForm) {
        this.formSend = conf.lastMessageForm;
        this.setListeners();
      }
    }
  }
  protected messageSent(data): void {
    this.messages.unshift({
      code: data.code,
      class: 'bg-primary col-xs-11',
      message: data.message
    });
  }
  protected messageReceived(data): void {
    this.messages.unshift({
      code: data.type.code,
      class: 'bg-success col-xs-offset-1 col-xs-11',
      message: data.message
    });
  }
  protected saveCurrentConf() {
    let conf = {
      socketUrl: this.formSocket.url,
      listeningCodes: this.listeningCodes,
      lastMessageForm: this.formSend
    }
    localStorage.setItem(HomeComponent.LS_CURRENT_CONF_KEY, JSON.stringify(conf));
  }
  protected setListeners(): void {
    this.closeListeners();
    for (let k in this.listeningCodes) {
      const code = this.listeningCodes[k].code;
      if (typeof this.listeners[code] === 'undefined') {
        this.listeners[code] = this.socket.getMessages(code).subscribe((message: any) => {
          this.messageReceived({
            type: this.listeningCodes[k],
            message: JSON.stringify(message.data, null, 2)
          });
        });
      } else {
        console.error(`Already listening for '${code}.'`);
      }
    }
  }
}
