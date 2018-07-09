import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDisplayComponent } from './recipe-display.component';

// Imports
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub'
import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({ selector: 'app-chat', template: '' })
class AppChatStubComponent { }

describe('RecipeDisplayComponent', () => {
  let component: RecipeDisplayComponent;
  let fixture: ComponentFixture<RecipeDisplayComponent>;

  const recipeServiceSpy = jasmine.createSpyObj('RecipeService', ['getRecipes']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['userLogin']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppChatStubComponent, RecipeDisplayComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: RecipeService,
          useValue: recipeServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        }],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDisplayComponent);
    component = fixture.componentInstance;
    /// fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
