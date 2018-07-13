import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';

// Imports
import { ChatService } from '../Services/chat.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Data } from '../models/Data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;


  let chatServiceSpy = jasmine.createSpyObj('ChatService', ['getMessages']);
  chatServiceSpy = {
    ...chatServiceSpy,
    getMessages: Observable.of(...Array<Data>()),
  } as jasmine.SpyObj<Data>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrent']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      providers: [
        {
          provide: ChatService,
          useValue: chatServiceSpy
        },
        {
          provide: AuthService,
          useValue: authServiceSpy
        }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
