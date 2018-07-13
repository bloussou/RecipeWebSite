import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

// Imports
import { SearchService } from '../../Services/search.service';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;


  const searchServiceSpy = jasmine.createSpyObj('SearchService', ['sendReccipes']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {
          provide: SearchService,
          useValue: searchServiceSpy
        }
      ],
      imports: [FormsModule, NouisliderModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
