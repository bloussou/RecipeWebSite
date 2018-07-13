import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { environment } from '../../environments/environment';
import { Data } from '../models/Data';



@Injectable()
export class ChatService {
  private socket;
  private url = environment.SERVER_ADRESS;

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
  typing(data) {
    console.log('on tape');
    this.socket.emit('typing', data);
  }
  receivedTyping() {
    console.log('on reçoit les notif du back');
    const observable = new Observable<{ isTyping: boolean }>(observer => {
      this.socket.on('typing', (data) => {
        console.log('on reçoit les notif du back');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
