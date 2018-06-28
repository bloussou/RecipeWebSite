import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { DisplayComponent } from './display/display.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';
import { SearchComponent } from './search/search.component';
import { SearchDisplayComponent } from './search-display/search-display.component';
import { ModifRecipeComponent } from './modif-recipe/modif-recipe.component';

const routes: Routes = [
  {path: 'newrecipe', component: NewRecipeComponent},
  {path: 'allrecipe', component: DisplayComponent},
  {path: 'recipe/:id', component: RecipeDisplayComponent },
  {path: 'search', component: SearchComponent },
  {path: 'searchResults', component: SearchDisplayComponent},
  {path: 'changerecipe/:id', component: ModifRecipeComponent},
  {path: '', redirectTo: 'allrecipe', pathMatch: 'full'}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})]
})
export class AppRoutingModule { }


