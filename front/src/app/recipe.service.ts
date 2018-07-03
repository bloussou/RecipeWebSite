import { Injectable } from '@angular/core';
import { Recette } from './recette';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable()
export class RecipeService {

  recipe: Recette;
  recipes: Recette[];

  constructor(
    private http: HttpClient
  ) { }

  getRecipes(): Observable<Recette[]> {
    return this.http.get<Recette[]>('http://192.168.99.100:8080/recipes/api/allrecipes');
  }

  getRecipe(_id: string): Observable<Recette> {
    // TODO: send the message _after_ fetching the hero
    this.log(`fetched recipe id=${_id}`);
    return this.http.get<Recette>('http://192.168.99.100:8080/recipes/api/recipe/' + _id);
  }



  updateRecipe(recipe: Recette): Observable<Recette> {
    return this.http.put<Recette>('http://192.168.99.100:8080/recipes/api/updaterecipe/' + recipe._id, recipe, httpOptions)
      .pipe(
      catchError(this.handleError<Recette>('updateRecipe'))
      );
  }

  delRecipe(recipe: Recette): Observable<Recette> {
    this.log('Deleting recipe ' + recipe.name + 'from database');
    return this.http.delete<Recette>('http://192.168.99.100:8080/recipes/api/delrecipe/' + recipe._id, httpOptions)
      .pipe(
      catchError(this.handleError<Recette>('delRecipe'))
      );
  }

  addRecipe(recipe: Recette): Observable<Recette> {
    this.log('Adding new data entry to database');
    return this.http.post<Recette>('http://192.168.99.100:8080/recipes/api/postrecipe', recipe, httpOptions)
      .pipe(
      catchError(this.handleError<Recette>('postrecipe', recipe))
      );
  }

  private log(message: string) {
    console.log('RecipeService: ' + message);
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
