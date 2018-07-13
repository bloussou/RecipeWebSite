import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';

// Imports
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('SearchService', () => {
  const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService,
        {
          provide: HttpClient,
          useValue: httpSpy
        }]
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
