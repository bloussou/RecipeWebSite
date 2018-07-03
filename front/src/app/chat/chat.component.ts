import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from './../chat.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import * as io from 'socket.io-client';
import { RecipeDisplayComponent } from '../recipe-display/recipe-display.component';
import { Recette } from '../recette';
import { Data } from '../Data';

import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {


  @Input() recette: any;
  data = new Data;
  datas: Data[] = [];
  private subscription: ISubscription;
  @Input() message: any;
  private displayChat = false;
  messageArray: Array<{ user: String, message: String }> = [];
  // SOCKET !
  private socket;
  private url = 'http://192.168.99.100:8080';


  constructor(private chatService: ChatService, private recipeDisplay: RecipeDisplayComponent) {
    this.socket = io(this.url);
    this.chatService
      .getMessages()
      .subscribe((data: Data) => {
        this.datas.push(data);
      });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    console.log('dans le onDestroy');
    this.subscription.unsubscribe();
  }

  sendMessage() {
    this.data.room = this.recette;
    this.data.message = this.message;
    this.chatService.sendMessage(this.data);
    this.data = new Data;
    this.message = '';
  }

  Clicked() {
    this.data.room = this.recette;
    this.displayChat = true;
    this.chatService.joinroom(this.data);
  }







}
