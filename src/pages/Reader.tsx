import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import comicData from '../data/comic.json';
import type { ComicData, ComicPosition } from '../types/comic';
import {
  getCurrentPage,
  getImageUrl,
  getNextPosition,
  getPreviousPosition,
  getNextChapterPosition,
  getPreviousChapterPosition,
  canNavigateNext,
  canNavigatePrevious,
  getPageCount,
  getAllChapters,
  findGlobalChapterIndex,
  getPositionFromGlobalChapterIndex
} from '../utils/comicUtils';
import { ChevronLeft, ChevronRight, DoubleChevronLeft, DoubleChevronRight, MenuIcon, CloseIcon } from '../components/Icons';
import { ThemeSelector } from '../components/ThemeSelector';

const data = comicData as ComicData;

function Reader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [position, setPosition] = useState<ComicPosition>(() => {
    const book = parseInt(searchParams.get('book') || '0');
    const chapter = parseInt(searchParams.get('chapter') || '0');
    const page = parseInt(searchParams.get('page') || '0');
    return { bookIndex: book, chapterIndex: chapter, pageIndex: page };
  });
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const allChapters = getAllChapters(data);
  const currentPage = getCurrentPage(data, position);
  const currentBook = data.books[position.bookIndex];
  const currentChapter = currentBook?.chapters[position.chapterIndex];
  const pageCount = getPageCount(data, position);
  const globalChapterIndex = findGlobalChapterIndex(data, position);

  // Update URL when position changes
  useEffect(() => {
    setSearchParams({
      book: position.bookIndex.toString(),
      chapter: position.chapterIndex.toString(),
      page: position.pageIndex.toString()
    });
  }, [position, setSearchParams]);

  // Handle image loading
  useEffect(() => {
    setIsLoading(true);
    setImageLoaded(false);

    const img = new Image();
    img.src = getImageUrl(currentPage || '');
    img.onload = () => {
      setIsLoading(false);
      setTimeout(() => setImageLoaded(true), 50);
    };
    img.onerror = () => {
      setIsLoading(false);
    };
  }, [currentPage]);

  // Scroll to image when page changes
  useEffect(() => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [position]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigatePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position]);

  const navigateNext = () => {
    if (canNavigateNext(data, position)) {
      setPosition(getNextPosition(data, position));
    }
  };

  const navigatePrevious = () => {
    if (canNavigatePrevious(position)) {
      setPosition(getPreviousPosition(data, position));
    }
  };

  const navigateNextChapter = () => {
    const nextPos = getNextChapterPosition(data, position);
    if (nextPos !== position) {
      setPosition(nextPos);
    }
  };

  const navigatePreviousChapter = () => {
    const prevPos = getPreviousChapterPosition(data, position);
    if (prevPos !== position) {
      setPosition(prevPos);
    }
  };

  const handleChapterChange = (globalIndex: number) => {
    const newPos = getPositionFromGlobalChapterIndex(data, globalIndex);
    setPosition(newPos);
  };

  const handlePageChange = (pageIndex: number) => {
    setPosition({ ...position, pageIndex });
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;

    if (clickPercentage < 0.33) {
      navigatePrevious();
    } else if (clickPercentage > 0.66) {
      navigateNext();
    }
  };

  if (!currentPage) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-ui-text)' }}>
        <div className="text-center">
          <h1 className="text-2xl mb-4">Página no encontrada</h1>
          <Link to="/" className="underline" style={{ color: 'var(--color-text)' }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header with navigation controls */}
      <header className="sticky top-0 z-50 border-b shadow-lg" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
        <div className="container mx-auto px-4 py-3">
          {/* Desktop Navigation - Single Row */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            <Link to="/" className="transition-colors font-semibold flex items-center gap-1 flex-shrink-0" style={{ color: 'var(--color-text)' }}>
              <ChevronLeft className="w-4 h-4" />
              Inicio
            </Link>

            <div className="flex items-center gap-2 flex-1 justify-center">
              {/* Chapter navigation */}
              <div className="flex items-center gap-1">
                <button
                  onClick={navigatePreviousChapter}
                  disabled={position.bookIndex === 0 && position.chapterIndex === 0}
                  className="px-3 py-2 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)'
                  }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--color-ui-bg-hover)')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg)'}
                  title="Capítulo anterior"
                >
                  <DoubleChevronLeft className="w-5 h-5" />
                </button>
                <select
                  value={globalChapterIndex}
                  onChange={(e) => handleChapterChange(parseInt(e.target.value))}
                  className="px-3 py-2 rounded transition-colors cursor-pointer min-w-[200px] outline-none border"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)',
                    borderColor: 'var(--color-border)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg)'}
                >
                  {allChapters.map((chapter, index) => (
                    <option key={index} value={index} style={{ backgroundColor: 'var(--color-ui-bg)', color: 'var(--color-ui-text)' }}>
                      {chapter.bookTitle} - Cap. {chapter.chapterNumber}
                    </option>
                  ))}
                </select>
                <button
                  onClick={navigateNextChapter}
                  disabled={!canNavigateNext(data, { ...position, pageIndex: pageCount - 1 })}
                  className="px-3 py-2 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)'
                  }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--color-ui-bg-hover)')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg)'}
                  title="Siguiente capítulo"
                >
                  <DoubleChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-1">
                <button
                  onClick={navigatePrevious}
                  disabled={!canNavigatePrevious(position)}
                  className="px-3 py-2 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)'
                  }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--color-ui-bg-hover)')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg)'}
                  title="Página anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <select
                  value={position.pageIndex}
                  onChange={(e) => handlePageChange(parseInt(e.target.value))}
                  className="px-3 py-2 rounded transition-colors cursor-pointer outline-none border"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)',
                    borderColor: 'var(--color-border)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg)'}
                >
                  {currentChapter?.pages.map((_, index) => (
                    <option key={index} value={index} style={{ backgroundColor: 'var(--color-ui-bg)', color: 'var(--color-ui-text)' }}>
                      Página {index + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={navigateNext}
                  disabled={!canNavigateNext(data, position)}
                  className="px-3 py-2 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)'
                  }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'var(--color-ui-bg-hover)')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg)'}
                  title="Siguiente página"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-sm whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
                Libro {position.bookIndex + 1} • Cap. {currentChapter?.number} • Pág. {position.pageIndex + 1}/{pageCount}
              </div>
              <ThemeSelector />
            </div>
          </div>

          {/* Mobile Navigation - Hamburger Menu */}
          <div className="lg:hidden flex items-center justify-between">
            <Link to="/" className="transition-colors font-semibold flex items-center gap-1" style={{ color: 'var(--color-text)' }}>
              <ChevronLeft className="w-4 h-4" />
              Inicio
            </Link>

            <div className="flex items-center gap-3">
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                L{position.bookIndex + 1} • C{currentChapter?.number} • P{position.pageIndex + 1}
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="px-2 py-2 rounded transition-colors"
                style={{
                  backgroundColor: 'var(--color-ui-bg)',
                  color: 'var(--color-ui-text)'
                }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div
            className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-full z-50 shadow-2xl overflow-y-auto"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-ui-text)' }}>Navegación</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)'
                  }}
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-ui-text)' }}>Tema</label>
                <ThemeSelector />
              </div>

              {/* Chapter Navigation */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-ui-text)' }}>Capítulo</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => { navigatePreviousChapter(); setMobileMenuOpen(false); }}
                    disabled={position.bookIndex === 0 && position.chapterIndex === 0}
                    className="px-3 py-2 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-1"
                    style={{
                      backgroundColor: 'var(--color-ui-bg)',
                      color: 'var(--color-ui-text)'
                    }}
                  >
                    <DoubleChevronLeft className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => { navigateNextChapter(); setMobileMenuOpen(false); }}
                    disabled={!canNavigateNext(data, { ...position, pageIndex: pageCount - 1 })}
                    className="px-3 py-2 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-1"
                    style={{
                      backgroundColor: 'var(--color-ui-bg)',
                      color: 'var(--color-ui-text)'
                    }}
                  >
                    <DoubleChevronRight className="w-5 h-5 mx-auto" />
                  </button>
                </div>
                <select
                  value={globalChapterIndex}
                  onChange={(e) => { handleChapterChange(parseInt(e.target.value)); setMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 rounded transition-colors cursor-pointer outline-none border"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)',
                    borderColor: 'var(--color-border)'
                  }}
                >
                  {allChapters.map((chapter, index) => (
                    <option key={index} value={index} style={{ backgroundColor: 'var(--color-ui-bg)', color: 'var(--color-ui-text)' }}>
                      {chapter.bookTitle} - Cap. {chapter.chapterNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Page Navigation */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-ui-text)' }}>Página</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => { navigatePrevious(); setMobileMenuOpen(false); }}
                    disabled={!canNavigatePrevious(position)}
                    className="px-3 py-2 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-1"
                    style={{
                      backgroundColor: 'var(--color-ui-bg)',
                      color: 'var(--color-ui-text)'
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => { navigateNext(); setMobileMenuOpen(false); }}
                    disabled={!canNavigateNext(data, position)}
                    className="px-3 py-2 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-1"
                    style={{
                      backgroundColor: 'var(--color-ui-bg)',
                      color: 'var(--color-ui-text)'
                    }}
                  >
                    <ChevronRight className="w-5 h-5 mx-auto" />
                  </button>
                </div>
                <select
                  value={position.pageIndex}
                  onChange={(e) => { handlePageChange(parseInt(e.target.value)); setMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 rounded transition-colors cursor-pointer outline-none border"
                  style={{
                    backgroundColor: 'var(--color-ui-bg)',
                    color: 'var(--color-ui-text)',
                    borderColor: 'var(--color-border)'
                  }}
                >
                  {currentChapter?.pages.map((_, index) => (
                    <option key={index} value={index} style={{ backgroundColor: 'var(--color-ui-bg)', color: 'var(--color-ui-text)' }}>
                      Página {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Position Info */}
              <div className="pt-4 border-t text-sm text-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                Libro {position.bookIndex + 1} • Capítulo {currentChapter?.number} • Página {position.pageIndex + 1} de {pageCount}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Comic page display */}
      <main className="container mx-auto px-4 py-8" ref={imageContainerRef}>
        <div
          className="relative max-w-4xl mx-auto cursor-pointer"
          onClick={handleImageClick}
        >
          {/* Loading spinner */}
          {isLoading && (
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="spinner"></div>
            </div>
          )}

          {/* Comic image */}
          {currentPage && (
            <img
              ref={imageRef}
              src={getImageUrl(currentPage)}
              alt={`Libro ${position.bookIndex + 1}, Capítulo ${currentChapter?.number}, Página ${position.pageIndex + 1}`}
              className={`w-full h-auto shadow-2xl transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100 fade-in' : 'opacity-0'
              }`}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )}
        </div>

        {/* Navigation hint */}
        <div className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
          Haz clic en los bordes de la imagen o usa las flechas del teclado para navegar
        </div>
      </main>
    </div>
  );
}

export default Reader;
