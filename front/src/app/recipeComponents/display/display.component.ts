import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../Services/recipe.service';
import { Recette } from '../../models/recette';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  recipes: Recette[];

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipes = new Array<Recette>();
    this.getRecipes();
  }

  getRecipes(): void {
    console.log('inside getRecipes');
    this.recipeService.getRecipes()
      .subscribe(result => {
        this.recipes = result;
      });
  }

}
