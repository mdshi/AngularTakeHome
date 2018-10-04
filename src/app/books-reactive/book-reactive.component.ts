/* tslint:disable: member-ordering forin */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-book.directive';
import { UniqueTitleValidator } from '../shared/title.directive';


@Component({
    selector: 'app-books',
    templateUrl: './books-reactive.component.html',
    styleUrls: ['./books-reactive.component.scss']
  })

export class BookReactiveComponent implements OnInit {

  publishers = ['Penguin Random House', 'HarperCollins', 'Simon & Schuster', 'Hachette', 'Macmillan'];

  book = { author: "Alice", title: 'some book', year:2018, publisher: this.publishers[0] };

  bookForm: FormGroup;

  ngOnInit(): void {
    this.bookForm = new FormGroup({
     'author': new FormControl(this.book.author, [
         Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/xbooks/i)
     ]),
  
      'year': new FormControl(this.book.year, [
        Validators.minLength(4)
      ]),
      'title': new FormControl(this.book.title, {
        asyncValidators: [this.titleValidator.validate.bind(this.titleValidator)],
        updateOn: 'blur'
      }),         
       
      'publisher': new FormControl(this.book.publisher, Validators.required)
    });
  }

  get author() { return this.bookForm.get('author'); }

  get title() { return this.bookForm.get('title'); }

  get year() { return this.bookForm.get('year'); }


  constructor(private titleValidator: UniqueTitleValidator) {}
}

