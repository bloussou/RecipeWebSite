import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';

// Imports
import { ChatService } from './../chat.service';
import { FormsModule } from '@angular/forms';

import { Data } from '../Data';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      providers: [
        {
          provide: ChatService,
          useValue: chatServiceSpy
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
