import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayComponent } from './display.component';
// Imports

import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';



describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  const recipeServiceSpy = jasmine.createSpyObj('RecipeService', ['getRecipes']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: RecipeService,
          useValue: recipeServiceSpy
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
