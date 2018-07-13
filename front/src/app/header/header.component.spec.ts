import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../Services/auth.service';
import { Component } from '@angular/core';


@Component({ selector: 'app-search-field', template: '' })
class AppSearchFieldStubComponent { }


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authServiceSpy = jasmine.createSpyObj('Authervice', ['isLoggedIn']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, AppSearchFieldStubComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
