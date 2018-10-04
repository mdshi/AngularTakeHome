import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, publish } from 'rxjs/operators';

const PUBLISHER = ['HarperCollins'];

@Injectable({ providedIn: 'root' })
export class BookService {
  isPublisherTaken(publisher: string): Observable<boolean> {
    const isTaken = PUBLISHER.includes(publisher);
    return of(isTaken).pipe(delay(400));
  }
}