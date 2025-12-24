export interface Chapter {
  number: number;
  pages: string[];
}

export interface Book {
  title: string;
  chapters: Chapter[];
}

export interface ComicData {
  books: Book[];
}

export interface ComicPosition {
  bookIndex: number;
  chapterIndex: number;
  pageIndex: number;
}

export interface ChapterInfo {
  bookIndex: number;
  bookTitle: string;
  chapterNumber: number;
  chapterIndex: number;
}
