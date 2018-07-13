// Packages imports
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';

// Modules Imports
import { AppRoutingModule } from './app-routing.module';

// Components imports
import { HeaderComponent } from './header/header.component';
import { SearchFieldComponent } from './SearchComponents/search-field/search-field.component';
import { NewRecipeComponent } from './recipeComponents/new-recipe/new-recipe.component';
import { AppComponent } from './app.component';
import { DisplayComponent } from './recipeComponents/display/display.component';
import { RecipeDisplayComponent } from './recipeComponents/recipe-display/recipe-display.component';
import { SearchComponent } from './SearchComponents/search/search.component';
import { SearchDisplayComponent } from './SearchComponents/search-display/search-display.component';
import { ModifRecipeComponent } from './recipeComponents/modif-recipe/modif-recipe.component';
import { AuthComponent } from './authentification/auth/auth.component';
import { ChatComponent } from './chat/chat.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { LoginComponent } from './authentification/login/login.component';

// Services imports
import { RecipeService } from './Services/recipe.service';
import { SearchService } from './Services/search.service';
import { ChatService } from './Services/chat.service';
import { AuthService } from './Services/auth.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchFieldComponent,
    NewRecipeComponent,
    DisplayComponent,
    RecipeDisplayComponent,
    SearchComponent,
    SearchDisplayComponent,
    ModifRecipeComponent,
    ChatComponent,
    AuthComponent,
    SigninComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NouisliderModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    SearchService,
    ChatService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
