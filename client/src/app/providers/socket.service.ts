import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = '';
  private socket: any = false;

  constructor() {
  }

  connected(): boolean {
    return this.socket !== false;
  }
  connect(url: string) {
    this.disconnect();

    this.url = url;
    this.socket = io(this.url);
  }
  disconnect() {
    if (this.connected()) {
      this.socket.disconnect();
      this.socket = false;
    }
  }
  getMessages(code: string) {
    if (this.connected()) {
      let observable = new Observable(observer => {
        this.socket.on(code, data => {
          observer.next({ code, data });
        });
        return () => {
          this.socket.disconnect();
        }
      });
      return observable;
    }
  }
  sendMessage(code: string, message: any) {
    if (this.connected()) {
      this.socket.emit(code, message);
    }
  }
}
