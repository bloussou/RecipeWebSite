import { async, ComponentFixture, TestBed } from '@angular/core/testing';


// import
import { SigninComponent } from './signin.component';
import { AuthService, SignInResponse } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  // déclaration des services mocké
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn']);
  const routerSpy = jasmine.createSpyObj('Router', ['ras']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
