import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { AuthErrorHandler } from './auth-error-handler';
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
import { ChatService } from './chat.service';
import { BetweenComponentComponent } from './between-component/between-component.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { AuthRequestOptions } from './auth-request';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
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
    BetweenComponentComponent,
    AuthComponent,
    SigninComponent,
    LoginComponent
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
    AuthGuard,
    {
      provide: RequestOptions,
      useClass: AuthRequestOptions
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
