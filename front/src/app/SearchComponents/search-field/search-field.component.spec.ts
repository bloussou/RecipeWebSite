import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFieldComponent } from './search-field.component';

// Imports
import { Router } from '@angular/router';
import { SearchService } from '../../Services/search.service';
import { FormsModule } from '@angular/forms';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const searchServiceSpy = jasmine.createSpyObj('SearchService', ['sendSearch']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFieldComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: SearchService,
          useValue: searchServiceSpy
        }],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
