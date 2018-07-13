import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components imports
import { NewRecipeComponent } from './recipeComponents/new-recipe/new-recipe.component';
import { DisplayComponent } from './recipeComponents/display/display.component';
import { RecipeDisplayComponent } from './recipeComponents/recipe-display/recipe-display.component';
import { SearchComponent } from './SearchComponents/search/search.component';
import { SearchDisplayComponent } from './SearchComponents/search-display/search-display.component';
import { ModifRecipeComponent } from './recipeComponents/modif-recipe/modif-recipe.component';
import { ChatComponent } from './chat/chat.component';
import { AuthComponent } from './authentification/auth/auth.component';

// Services imports 
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'newrecipe', component: NewRecipeComponent, canActivate: [AuthGuard] },
  { path: 'allrecipe', component: DisplayComponent },
  { path: 'recipe/:id', component: RecipeDisplayComponent },
  { path: 'search', component: SearchComponent },
  { path: 'searchResults', component: SearchDisplayComponent },
  { path: 'changerecipe/:id', component: ModifRecipeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
})
export class AppRoutingModule { }


