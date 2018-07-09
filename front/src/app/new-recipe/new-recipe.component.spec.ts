import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipeComponent } from './new-recipe.component';

// import nécessaires pour l'instanciation du composant
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';


describe('NewRecipeComponent', () => {
  let component: NewRecipeComponent;
  let fixture: ComponentFixture<NewRecipeComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['ras']);
  const recipeServiceSpy = jasmine.createSpyObj('RecipeService', ['getRecipes']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewRecipeComponent],
      providers: [
        {
          provide: RecipeService,
          useValue: routerSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ],
      imports: [FormsModule, NouisliderModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
