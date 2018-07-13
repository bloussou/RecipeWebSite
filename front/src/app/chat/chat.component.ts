import { Component, OnInit, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

// Imports services
import { AuthService } from '../Services/auth.service';
import { ChatService } from '../Services/chat.service';

// Imports models
import { Data } from '../models/Data';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  // Input 
  @Input() recette: any;
  @Input() message: any;

  // Variables
  private isTyping = false;
  private email: String;
  date = Date.now();
  data = new Data; // messages and username 
  datas: Data[] = [];
  private displayChat = false;
  messageArray: Array<{ user: String, message: String }> = [];

  // Socket
  private socket;

  // Environment
  private url = environment.SERVER_ADRESS;

  /**In the constructor we subscribe to chatService.getMessages and ChatService.receivedTyping */
  constructor(private chatService: ChatService, private authService: AuthService) {
    // Socket initialisation
    this.socket = io(this.url);

    /**
     * Subscribe to this.chatService.getMessages()
     * add new data to datas
     * give the value false to the boolean isTyping
     */
    this.chatService
      .getMessages()
      .subscribe((data: Data) => {
        this.datas.push(data);
        this.isTyping = false;
      });

    /**
     * put the value of is typing to true when sb type in the input field
     */
    this.chatService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit() {
  }

  /**
   * Fill the data model
   * Send the message
   * Reinitialize the data to an empty one
   */
  sendMessage() {
    this.data.room = this.recette;
    this.data.message = this.message;
    this.data.name = this.email;
    //
    this.chatService.sendMessage(this.data);
    //
    this.data = new Data;
    this.message = '';
  }

  /**
   * The method to open and close the chat
   * initialize the room
   * if display chat is false :
   * **set display chat to true
   * **join the room corresponding to the recipe
   * **set the email of the user
   * else :
   * **set display chat to false in order to close the chat box
   */
  Clicked() {
    this.data.room = this.recette;
    if (this.displayChat === false) {
      this.displayChat = true;
      this.chatService.joinroom(this.data);
      this.email = this.authService.getUserDetails().email;
    } else {
      this.displayChat = false;
    }
  }

  /**
   * Inform that sb is typing by sending data with the method chatService.typing
   */
  typing() {
    this.data.room = this.recette;
    this.data.message = this.message;
    this.data.name = this.email;
    this.chatService.typing(this.data);
  }

}
