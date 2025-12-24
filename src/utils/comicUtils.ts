import type { ComicData, ComicPosition, ChapterInfo } from '../types/comic';

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dxqfotao4/image/upload/';

export function getImageUrl(filename: string): string {
  return `${CLOUDINARY_BASE_URL}${filename}`;
}

export function getAllChapters(comicData: ComicData): ChapterInfo[] {
  const chapters: ChapterInfo[] = [];

  comicData.books.forEach((book, bookIndex) => {
    book.chapters.forEach((chapter, chapterIndex) => {
      chapters.push({
        bookIndex,
        bookTitle: book.title,
        chapterNumber: chapter.number,
        chapterIndex
      });
    });
  });

  return chapters;
}

export function getPageCount(comicData: ComicData, position: ComicPosition): number {
  const chapter = comicData.books[position.bookIndex]?.chapters[position.chapterIndex];
  return chapter?.pages.length || 0;
}

export function getCurrentPage(comicData: ComicData, position: ComicPosition): string | null {
  const page = comicData.books[position.bookIndex]?.chapters[position.chapterIndex]?.pages[position.pageIndex];
  return page || null;
}

export function canNavigateNext(comicData: ComicData, position: ComicPosition): boolean {
  const currentChapter = comicData.books[position.bookIndex]?.chapters[position.chapterIndex];
  if (!currentChapter) return false;

  // Can go to next page in current chapter
  if (position.pageIndex < currentChapter.pages.length - 1) return true;

  // Can go to next chapter in current book
  if (position.chapterIndex < comicData.books[position.bookIndex].chapters.length - 1) return true;

  // Can go to next book
  if (position.bookIndex < comicData.books.length - 1) return true;

  return false;
}

export function canNavigatePrevious(position: ComicPosition): boolean {
  return position.bookIndex > 0 || position.chapterIndex > 0 || position.pageIndex > 0;
}

export function getNextPosition(comicData: ComicData, position: ComicPosition): ComicPosition {
  const currentChapter = comicData.books[position.bookIndex]?.chapters[position.chapterIndex];
  if (!currentChapter) return position;

  // Try next page in current chapter
  if (position.pageIndex < currentChapter.pages.length - 1) {
    return { ...position, pageIndex: position.pageIndex + 1 };
  }

  // Try next chapter in current book
  if (position.chapterIndex < comicData.books[position.bookIndex].chapters.length - 1) {
    return {
      ...position,
      chapterIndex: position.chapterIndex + 1,
      pageIndex: 0
    };
  }

  // Try next book
  if (position.bookIndex < comicData.books.length - 1) {
    return {
      bookIndex: position.bookIndex + 1,
      chapterIndex: 0,
      pageIndex: 0
    };
  }

  return position;
}

export function getPreviousPosition(comicData: ComicData, position: ComicPosition): ComicPosition {
  // Try previous page in current chapter
  if (position.pageIndex > 0) {
    return { ...position, pageIndex: position.pageIndex - 1 };
  }

  // Try previous chapter in current book
  if (position.chapterIndex > 0) {
    const prevChapterIndex = position.chapterIndex - 1;
    const prevChapter = comicData.books[position.bookIndex].chapters[prevChapterIndex];
    return {
      ...position,
      chapterIndex: prevChapterIndex,
      pageIndex: prevChapter.pages.length - 1
    };
  }

  // Try previous book
  if (position.bookIndex > 0) {
    const prevBookIndex = position.bookIndex - 1;
    const prevBook = comicData.books[prevBookIndex];
    const lastChapterIndex = prevBook.chapters.length - 1;
    const lastChapter = prevBook.chapters[lastChapterIndex];
    return {
      bookIndex: prevBookIndex,
      chapterIndex: lastChapterIndex,
      pageIndex: lastChapter.pages.length - 1
    };
  }

  return position;
}

export function getNextChapterPosition(comicData: ComicData, position: ComicPosition): ComicPosition {
  // Try next chapter in current book
  if (position.chapterIndex < comicData.books[position.bookIndex].chapters.length - 1) {
    return {
      ...position,
      chapterIndex: position.chapterIndex + 1,
      pageIndex: 0
    };
  }

  // Try first chapter of next book
  if (position.bookIndex < comicData.books.length - 1) {
    return {
      bookIndex: position.bookIndex + 1,
      chapterIndex: 0,
      pageIndex: 0
    };
  }

  return position;
}

export function getPreviousChapterPosition(comicData: ComicData, position: ComicPosition): ComicPosition {
  // Try previous chapter in current book
  if (position.chapterIndex > 0) {
    return {
      ...position,
      chapterIndex: position.chapterIndex - 1,
      pageIndex: 0
    };
  }

  // Try last chapter of previous book
  if (position.bookIndex > 0) {
    const prevBookIndex = position.bookIndex - 1;
    const prevBook = comicData.books[prevBookIndex];
    return {
      bookIndex: prevBookIndex,
      chapterIndex: prevBook.chapters.length - 1,
      pageIndex: 0
    };
  }

  return position;
}

export function findGlobalChapterIndex(comicData: ComicData, position: ComicPosition): number {
  let index = 0;

  for (let b = 0; b < comicData.books.length; b++) {
    for (let c = 0; c < comicData.books[b].chapters.length; c++) {
      if (b === position.bookIndex && c === position.chapterIndex) {
        return index;
      }
      index++;
    }
  }

  return 0;
}

export function getPositionFromGlobalChapterIndex(comicData: ComicData, globalIndex: number): ComicPosition {
  let currentIndex = 0;

  for (let b = 0; b < comicData.books.length; b++) {
    for (let c = 0; c < comicData.books[b].chapters.length; c++) {
      if (currentIndex === globalIndex) {
        return { bookIndex: b, chapterIndex: c, pageIndex: 0 };
      }
      currentIndex++;
    }
  }

  return { bookIndex: 0, chapterIndex: 0, pageIndex: 0 };
}
