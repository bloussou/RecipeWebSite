import { Component, OnInit } from '@angular/core';
import { Recette } from '../recette';
import { NouisliderModule } from 'ng2-nouislider';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  submitted = false;
  validIngredient = false;
  modelIngredient: string[];

  model = new Recette();

  difficulties = ['★', '★★', '★★★', '★★★★', '★★★★★'];
  dishtypes = ['Entrée', 'Plat', 'Dessert', 'Apéro', 'Snack', 'Boisson'];
  countries = ['Allemagne', 'France', 'Italie', 'Israel', 'Chine', 'Japon',
    'Mexique', 'Chili', 'Brésil', 'Espagne', 'Portugal', 'Grece', 'Roumanie'];

  newRecipe() {
    this.recipeService.addRecipe(this.model).subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);
        if (val.name === this.model.name) {
          console.log('Recette ' + this.model.name + ' ajoutée !');
          this.router.navigate(['/allrecipe/']);
        }
      },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      }
    );
  }

  isValidIngredient() {
    if (this.modelIngredient[0] !== '' && this.modelIngredient[1] !== '') {
      this.validIngredient = true;
    } else {
      this.validIngredient = false;
    }
    return this.validIngredient;
  }

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.model = new Recette();
    this.model.ingredients = new Array();
    this.model.duration = 60;
    this.modelIngredient = ['', ''];
  }

  delIngredient(name: string, quantity: string) {
    this.model.ingredients.splice(this.model.ingredients.indexOf({name, quantity}), 1);
  }

}
