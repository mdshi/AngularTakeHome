import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookReactiveComponent } from './books-reactive/book-reactive.component';
import { IdentityRevealedValidatorDirective } from './shared/identity-revealed.directive';
import { UniqueTitleValidatorDirective } from './shared/title.directive';
import { ForbiddenValidatorDirective } from './shared/forbidden-book.directive';
@NgModule({
  declarations: [
    AppComponent,
    BookReactiveComponent,
    IdentityRevealedValidatorDirective,
    UniqueTitleValidatorDirective, 
    ForbiddenValidatorDirective
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
