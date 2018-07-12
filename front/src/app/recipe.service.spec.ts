import { TestBed, inject } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { AuthService } from './auth.service';
// imports
import { HttpClient, HttpHeaders } from '@angular/common/http';


describe('RecipeService', () => {
  const authserviceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
  const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService,
        {
          provide: HttpClient,
          useValue: httpSpy
        },
        {
          provide: AuthService,
          useValue: authserviceSpy
        }]
    });
  });

  it('should be created', inject([RecipeService], (service: RecipeService) => {
    expect(service).toBeTruthy();
  }));
});
