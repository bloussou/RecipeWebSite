import { Injectable } from '@angular/core';
import { Recette } from '../models/recette';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';



@Injectable()
export class RecipeService {

  recipe: Recette;
  recipes: Recette[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.authservice.getToken()
    })
  };

  constructor(
    private http: HttpClient,
    private authservice: AuthService
  ) { }

  getRecipes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(environment.SERVER_ADRESS + '/recipes/api/allrecipes'); //192.168.99.100:8080
  }

  getRecipe(_id: string): Observable<Recette> {
    // TODO: send the message _after_ fetching the hero
    this.log(`fetched recipe id=${_id}`);
    return this.http.get<Recette>(environment.SERVER_ADRESS + '/recipes/api/recipe/' + _id);
  }



  updateRecipe(recipe: Recette): Observable<Recette> {
    return this.http.put<Recette>(environment.SERVER_ADRESS + '/recipes/api/updaterecipe/' + recipe._id, recipe, this.httpOptions)
      .pipe(
        catchError(this.handleError<Recette>('updateRecipe'))
      );
  }

  delRecipe(recipe: Recette): Observable<Recette> {
    this.log('Deleting recipe ' + recipe.name + 'from database');
    return this.http.delete<Recette>(environment.SERVER_ADRESS + '/recipes/api/delrecipe/' + recipe._id, this.httpOptions)
      .pipe(
        catchError(this.handleError<Recette>('delRecipe'))
      );
  }

  addRecipe(recipe: Recette): Observable<Recette> {
    this.log('Adding new data entry to database');
    return this.http.post<Recette>(environment.SERVER_ADRESS + '/recipes/api/postrecipe', recipe, this.httpOptions)
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
