import { Injectable } from '@angular/core';
import { Recette } from './recette';
import { RECIPES } from './mock-recipes';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Search } from './search';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SearchService {

  isSearch: boolean;
  search: Search;
  recipes = RECIPES;
  searchResults: Recette[];
  searchResult: Recette;

  constructor(
    private http: HttpClient
  ) { }

  sendSearch(search: Search) {
    this.isSearch = true;
    this.search = search;
    console.log('Search sent !');
  }

  getSearchResults(): Observable<Recette[]> {
    this.log('Adding new data entry to database');
    return this.http.post<Recette[]>('http://192.168.99.100:8080/search/api/searchrecipe', this.search, httpOptions)
      .pipe(
      catchError(this.handleError<Recette[]>('searchRecipe'))
      );
  }

  private log(message: string) {
    console.log('SearchService: ' + message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }
}
