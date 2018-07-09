import { TestBed, inject } from '@angular/core/testing';

import { RecipeService } from './recipe.service';

// imports
import { HttpClient, HttpHeaders } from '@angular/common/http';


describe('RecipeService', () => {

  const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService,
        {
          provide: HttpClient,
          useValue: httpSpy
        }]
    });
  });

  it('should be created', inject([RecipeService], (service: RecipeService) => {
    expect(service).toBeTruthy();
  }));
});
