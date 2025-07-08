import {Component, inject, OnInit} from '@angular/core';
import {ChapterNavComponent} from './chapter-nav/chapter-nav.component';
import {PageComponent} from './page/page.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reader',
  imports: [
    ChapterNavComponent,
    PageComponent
  ],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css'
})
export class ReaderComponent implements OnInit {
  route : ActivatedRoute;
  path : string = '1-1-1';

  constructor() {
    this.route = inject(ActivatedRoute);
  }

  ngOnInit(): void {
    let book = this.route.snapshot.params['book'];
    let chapter = this.route.snapshot.params['chapter'];
    let page = this.route.snapshot.params['page'];
        this.path = `${book}-${chapter}-${page}`;
    }
}
