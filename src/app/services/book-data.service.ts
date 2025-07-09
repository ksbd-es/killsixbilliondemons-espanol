import { Injectable } from '@angular/core';
import {Book, Position} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
  data : Book[] =[
    {
      id: 1,
      title: 'Mata 6 billones de demonios',
      chapters: [
        {
          id: 1,
          title: 'Capitulo 1',
          pageCount: 17
        },
        {
          id: 2,
          title: 'Capitulo 2',
          pageCount: 19
        },
        {
          id: 3,
          title: 'Capitulo 3',
          pageCount: 20
        },
        {
          id: 4,
          title: 'Capitulo 4',
          pageCount: 22
        },
        {
          id: 5,
          title: 'Capitulo 5',
          pageCount: 9
        }
      ]
    },
    {
      id: 2,
      title: 'Portador de nombres',
      chapters: [
        {
          id: 1,
          title: 'Capitulo 1',
          pageCount: 19,
        },
        {
          id: 2,
          title: 'Capitulo 2',
          pageCount: 20,
        },
        {
          id: 3,
          title: 'Capitulo 3',
          pageCount: 20,
        },
        {
          id: 4,
          title: 'Capitulo 4',
          pageCount: 21,
        },
        {
          id: 5,
          title: 'Capitulo 5',
          pageCount: 22,
        },
        {
          id: 6,
          title: 'Capitulo 6',
          pageCount: 20,
        }
      ]
    },
  ];



  constructor() { }

  getData() {
    return this.data;
  }
  getPages(position : Position) {
    return new Array(this.data[position.book-1].chapters[position.chapter-1].pageCount);
  }

  getInitialPosition() {
    return {
      book: 1,
      chapter: 1,
      page: 1
    }
  }
  getNextPosition(currentPosition : Position){
    let book = this.data[currentPosition.book-1];
    let chapter = book.chapters[currentPosition.chapter-1];
    let page = currentPosition.page;

    let isLastBook = currentPosition.book === this.data.length;
    let isLastChapter = chapter.id === book.chapters.length;
    let isLastPage = chapter.pageCount === page;

    let nextPosition : Position = {
      book: 0,
      chapter: 0,
      page: 0,
    };
    if(isLastPage){
      if(isLastChapter){
        if(isLastBook){
          nextPosition.book = currentPosition.book;
          nextPosition.chapter = currentPosition.chapter;
          nextPosition.page = currentPosition.page;
        }
        else{
          nextPosition.book = currentPosition.book + 1;
          nextPosition.chapter = 1;
          nextPosition.page = 1;
        }
      }
      else{
        nextPosition.book = currentPosition.book;
        nextPosition.chapter = currentPosition.chapter + 1;
        nextPosition.page = 1;
      }
    }
    else {
      nextPosition.book = currentPosition.book;
      nextPosition.chapter = currentPosition.chapter;
      nextPosition.page = page + 1;
    }
  }
  getPreviousPosition(currentPosition : Position){
    let book = this.data[currentPosition.book-1];
    let chapter = book.chapters[currentPosition.chapter-1];
    let page = currentPosition.page;

    let isFirstBook = currentPosition.book === this.data.length;
    let isFirstChapter = chapter.id === book.chapters.length;
    let isFirstPage = chapter.pageCount === page;

    let nextPosition : Position = {
      book: 0,
      chapter: 0,
      page: 0,
    };
    if(isFirstPage){
      if(isFirstChapter){
        if(isFirstBook){
          nextPosition.book = currentPosition.book;
          nextPosition.chapter = currentPosition.chapter;
          nextPosition.page = currentPosition.page;
        }
        else{
          nextPosition.book = currentPosition.book - 1;
          nextPosition.chapter =  this.data[book.id-2].chapters.length;
          nextPosition.page =  this.data[nextPosition.book-1].chapters[nextPosition.chapter-1].pageCount;
        }
      }
      else{
        nextPosition.book = currentPosition.book;
        nextPosition.chapter = currentPosition.chapter - 1;
        nextPosition.page = this.data[book.id-1].chapters[chapter.id-2].pageCount;
      }
    }
    else {
      nextPosition.book = currentPosition.book;
      nextPosition.chapter = currentPosition.chapter;
      nextPosition.page = page - 1;
    }
  }

}
