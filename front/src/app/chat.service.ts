import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { Data } from './Data';


@Injectable()
export class ChatService {
  private socket;
  private url = 'http://localhost:8080'; //192.168.99.100:8080

  constructor() {
    this.socket = io(this.url);
  }

  joinroom(data) {
    this.socket.emit('subscribe', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }


  getMessages(): Observable<Data> {
    const observable = new Observable<Data>((observer) => {
      this.socket.on('new message', (message) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
