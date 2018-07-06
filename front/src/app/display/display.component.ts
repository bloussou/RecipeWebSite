import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recette } from '../recette';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  recipes: Recette[];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.recipes = new Array<Recette>();
    this.getRecipes();
    console.log('is logged in:');
    console.log(this.authService.isLoggedIn());
  }

  getRecipes(): void {
    console.log('inside getRecipes');
    this.recipeService.getRecipes()
      .subscribe(result => {
        this.recipes = result;
      });
  }

}
