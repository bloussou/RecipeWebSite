import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDisplayComponent } from './search-display.component';

// imports;
import { SearchService } from '../../Services/search.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';

describe('SearchDisplayComponent', () => {
  let component: SearchDisplayComponent;
  let fixture: ComponentFixture<SearchDisplayComponent>;


  const searchServiceSpy = jasmine.createSpyObj('SearchService', ['getSearchResults']);
  const router = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchDisplayComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: SearchService,
          useValue: searchServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: router
        }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDisplayComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
