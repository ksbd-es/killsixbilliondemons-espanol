import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BookDataService} from '../../../services/book-data.service';
import {Book, Position} from '../../../models/models';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chapter-nav',
  imports: [
    FormsModule
  ],
  templateUrl: './chapter-nav.component.html',
  styleUrl: './chapter-nav.component.css'
})
export class ChapterNavComponent implements OnInit , OnChanges{
  bookService : BookDataService;
  books : Book[];
  @Input()
  position : Position;
  pages : any[] = [];
  @Input()
  path : string = "";
  @Output()
  chapterSelected : EventEmitter<string> = new EventEmitter();

  constructor() {
    this.bookService = inject(BookDataService);
    this.books = this.bookService.getData();
    this.position = this.bookService.getInitialPosition();
    this.pages = this.bookService.getPages(this.position);

  }

  ngOnChanges(changes: SimpleChanges): void {
        console.log(this.path);
        console.log(changes);
        this.chapterSelected.emit(this.path);
        this.pages = this.bookService.getPages(this.position);
    }

  ngOnInit(): void {
        console.log(this.books);
    }

  onPathChange($event: any) {
    console.log($event);
    this.chapterSelected.emit(this.path);

  }
}
