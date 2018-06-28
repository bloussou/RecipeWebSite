import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import { Recette } from '../recette';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent implements OnInit {

  recipe = new Recette();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe(): void {
    const _id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(_id)
      .subscribe(recipe => this.recipe = recipe);
  }

  delRecipe(): void {
    if (confirm('Êtes-vous sur de vouloir supprimer cette recette ?')) {
      this.recipeService.delRecipe(this.recipe).subscribe(
        (val) => {
          console.log('DEL call successful value returned in body', val);
          if (val.name === this.recipe.name && val._id === this.recipe._id) {
            this.router.navigate(['/allrecipe/']);
          }
        },
        response => {
            console.log('DEL call in error', response);
        },
        () => {
            console.log('The DEL observable is now completed.');
        }
      );
    }
  }

}
