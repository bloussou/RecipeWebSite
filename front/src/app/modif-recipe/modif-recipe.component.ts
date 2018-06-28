import { Component, OnInit } from '@angular/core';
import { Recette } from '../recette';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modif-recipe',
  templateUrl: './modif-recipe.component.html',
  styleUrls: ['./modif-recipe.component.css']
})
export class ModifRecipeComponent implements OnInit {

  submitted = false;
  validIngredient = false;
  modelIngredient: string[];

  model: Recette;

  difficulties = ['★', '★★', '★★★', '★★★★', '★★★★★'];
  dishtypes = ['Entrée', 'Plat', 'Dessert', 'Apéro', 'Snack', 'Boisson'];
  countries = ['Allemagne', 'France', 'Italie', 'Israel', 'Chine', 'Japon',
    'Mexique', 'Chili', 'Brésil', 'Espagne', 'Portugal', 'Grece', 'Roumanie'];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRecipe();
    this.model = new Recette();
    this.model.duration = 0;
    this.modelIngredient = ['', ''];
  }

  getRecipe(): void {
    const _id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(_id)
      .subscribe(recipe => this.model = recipe);
  }

  isValidIngredient() {
    if (this.modelIngredient[0] !== '' && this.modelIngredient[1] !== '') {
      this.validIngredient = true;
    } else {
      this.validIngredient = false;
    }
    return this.validIngredient;
  }

  changeRecipe() {
    this.recipeService.updateRecipe(this.model).subscribe(
      (val) => {
        console.log('PUT call successful value returned in body', val);
        if (val.name === this.model.name && val._id === this.model._id) {
          this.router.navigate(['/recipe/' + val._id]);
        }
      },
      response => {
          console.log('PUT call in error', response);
      },
      () => {
          console.log('The PUT observable is now completed.');
      }
    );
  }

  delIngredient(name: string, quantity: string) {
    this.model.ingredients.splice(this.model.ingredients.indexOf({name, quantity}), 1);
  }
}
