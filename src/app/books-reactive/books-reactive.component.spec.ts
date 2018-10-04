import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { BookService } from '../shared/book.service';
import { BookReactiveComponent } from './book-reactive.component';
import { Book } from '../shared/book';
import { By } from 'selenium-webdriver';

describe('BookReactiveComponent', () => {
  let component: BookReactiveComponent;
  let fixture: ComponentFixture<BookReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookReactiveComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('HeroesComponent', () => {

  let comp: BookReactiveComponent;
  let fixture: ComponentFixture<BookReactiveComponent>;
  let heroService: BookService;
  let spy: any;

  const mockHeroes: Book[] =  [
    {id: 1, author: 'Alice', title: "Some Book", year:2018, publisher: "HarperCollins" },
    {id: 2, author: 'Ernest Hemingway', title: "The Old Man and the Sea", year: 1952, publisher: "Scribner"}
  ];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [BookReactiveComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
       BookService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpModule
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReactiveComponent);
    comp = fixture.componentInstance;

    heroService = fixture.debugElement.injector.get(BookService);
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  it('should check validity', fakeAsync(() => {
    spy = spyOn(heroService, 'isPublisherTaken').and.returnValue(Promise.resolve(mockHeroes));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const liElements = fixture.debugElement.queryAll(By.caller('ul.books li'));
    const badgeElements = fixture.debugElement.queryAll(By.caller('ul.books li span.badge'));

    expect(liElements.length).toBe(12);
    expect(badgeElements.length).toBe(12);
    expect(liElements[0].nativeElement.textContent.trim()).toContain('Alice');
    expect(liElements[6].nativeElement.textContent.trim()).toContain('Earnest');

  }));

});