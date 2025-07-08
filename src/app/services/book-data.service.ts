import { Injectable } from '@angular/core';
import { Book } from '../models/models';

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
}
