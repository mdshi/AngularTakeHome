import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { BookService } from './book.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueTitleValidator implements AsyncValidator {
  constructor(private booksService: BookService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.booksService.isPublisherTaken(ctrl.value).pipe(
      map(isTaken => (isTaken ? { uniqueTitle: true } : null)),
      catchError(() => null)
    );
  }
}

@Directive({
  selector: '[appUniqueAlterEgo]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueTitleValidator),
      multi: true
    }
  ]
})
export class UniqueTitleValidatorDirective {
  constructor(private validator: UniqueTitleValidator) {}
  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}