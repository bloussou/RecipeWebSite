import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifRecipeComponent } from './modif-recipe.component';

describe('ModifRecipeComponent', () => {
  let component: ModifRecipeComponent;
  let fixture: ComponentFixture<ModifRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
