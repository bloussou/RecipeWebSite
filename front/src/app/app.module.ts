import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { DisplayComponent } from './display/display.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';
import { RecipeService } from './recipe.service';
import { SearchComponent } from './search/search.component';
import { NouisliderModule } from 'ng2-nouislider';
import { SearchDisplayComponent } from './search-display/search-display.component';
import { SearchService } from './search.service';
import { ModifRecipeComponent } from './modif-recipe/modif-recipe.component';
import { ChatComponent } from './chat/chat.component';



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
    ChatComponent
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
    SearchService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
