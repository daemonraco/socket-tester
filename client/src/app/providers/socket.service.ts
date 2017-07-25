import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:5000';
  private socket: any = false;

  constructor() {
  }

  connected(): boolean {
    return this.socket !== false;
  }
  connect(url: string) {
    if (this.socket !== false) {
      this.socket.disconnect();
      this.socket = false;
    }

    this.url = url;
    this.socket = io(this.url);
  }
  getMessages(code: string) {
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
  sendMessage(code: string, message: any) {
    this.socket.emit(code, message);
  }
}
