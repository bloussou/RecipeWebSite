import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from './../chat.service';
import { Component, OnInit, Input } from '@angular/core';

import * as io from 'socket.io-client';
import { Recette } from '../recette';
import { Data } from '../Data';

import { ISubscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private email: String;
  date = Date.now();
  @Input() recette: any;
  data = new Data;
  datas: Data[] = [];
  private subscription: ISubscription;
  @Input() message: any;
  private displayChat = false;
  messageArray: Array<{ user: String, message: String }> = [];
  // SOCKET !
  private socket;
  private url = environment.SERVER_ADRESS;


  constructor(private chatService: ChatService, private authService: AuthService) {
    this.socket = io(this.url);
    this.chatService
      .getMessages()
      .subscribe((data: Data) => {
        this.datas.push(data);
        console.log(this.datas);
      });
  }

  ngOnInit() {
  }


  sendMessage() {
    this.data.room = this.recette;
    this.data.message = this.message;
    this.data.name = this.email;
    console.log(this.data.name);
    this.chatService.sendMessage(this.data);
    this.data = new Data;
    this.message = '';
  }

  Clicked() {
    this.data.room = this.recette;
    this.displayChat = true;
    this.chatService.joinroom(this.data);
    this.email = this.authService.getUserDetails().email;
  }







}
