import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifRecipeComponent } from './modif-recipe.component';

// Imports
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub'
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';


describe('ModifRecipeComponent', () => {
  let component: ModifRecipeComponent;
  let fixture: ComponentFixture<ModifRecipeComponent>;

  const recipeServiceSpy = jasmine.createSpyObj('RecipeService', ['getRecipe']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifRecipeComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: RecipeService,
          useValue: recipeServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: ActivatedRoute,
          useValue: routeSpy
        }
      ],
      imports: [FormsModule, NouisliderModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifRecipeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
