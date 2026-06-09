import React, { useState, useEffect } from 'react';
import { GALERI_DEFAULT } from '../data';
import { Search, ChevronLeft, ChevronRight, X, Sparkles, Calendar, Layers, Eye } from 'lucide-react';
import { GaleriItem } from '../types';

export default function Galeri() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>({});

  const categories = ['Semua', 'PKK', 'Posyandu', 'Posbindu', 'Lainnya'];

  // Filter items based on category and search query
  const filteredItems = GALERI_DEFAULT.filter(item => {
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group filtered items by date (tanggal)
  const groupedByDate: Record<string, GaleriItem[]> = {};
  filteredItems.forEach(item => {
    if (!groupedByDate[item.tanggal]) {
      groupedByDate[item.tanggal] = [];
    }
    groupedByDate[item.tanggal].push(item);
  });

  // Sort dates descending so latest is shown first
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

  const setSlide = (date: string, index: number, max: number) => {
    const safeIndex = (index + max) % max;
    setSlideIndices(prev => ({ ...prev, [date]: safeIndex }));
  };

  const formatFullDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const openLightbox = (item: GaleriItem) => {
    const globalIdx = GALERI_DEFAULT.findIndex(g => g.id === item.id);
    if (globalIdx !== -1) {
      setLightboxIndex(globalIdx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === 0 ? GALERI_DEFAULT.length - 1 : prev - 1;
      });
    }
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => {
        if (prev === null) return null;
        return prev === GALERI_DEFAULT.length - 1 ? 0 : prev + 1;
      });
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div id="galeri-container" className="space-y-8 pb-12 animate-in fade-in duration-500">
      
      {/* HEADER SECTION & FILTER BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5 text-left md:max-w-md">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Dokumentasi Kegiatan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Galeri Foto Kegiatan</h2>
          <p className="text-xs sm:text-sm text-slate-500">Momen-momen dedikasi para kader dan antusiasme warga RW 015 Pesona Gading.</p>
        </div>

        {/* Search bar inside Gallery */}
        <div className="relative max-w-sm w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            id="gallery-search"
            type="text"
            placeholder="Cari foto kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-rose-500 focus:border-rose-500 shadow-sm"
          />
        </div>
      </div>

      {/* Categories Selector Carousel tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map(cat => (
          <button
            id={`gallery-category-${cat.toLowerCase().replace(' ', '-')}`}
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                : 'bg-white hover:bg-slate-50 border border-slate-100 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PHOTO GROUPS BY DATE WITH INTERACTIVE SLIDE STYLE */}
      {sortedDates.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-100/50 flex flex-col items-center justify-center space-y-4 max-w-md mx-auto animate-in fade-in">
          <span className="text-4xl">📸</span>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 text-sm font-display">Tidak Ada Foto Ditemukan</h4>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian Anda atau kembalikan filter kategori.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {sortedDates.map(date => {
            const dateItems = groupedByDate[date];
            const activeIdx = slideIndices[date] || 0;
            const currentIdx = activeIdx >= dateItems.length ? 0 : activeIdx;
            const activeItem = dateItems[currentIdx];
            const hasMultiple = dateItems.length > 1;

            return (
              <div 
                id={`galeri-group-${date}`}
                key={date} 
                className="bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-sm transition-all overflow-hidden p-5 sm:p-6 space-y-6"
              >
                {/* Album Header bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-50/60 text-rose-500 rounded-2xl">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-850 text-sm sm:text-base font-display">
                        {formatFullDate(date)}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-sans tracking-wide uppercase font-bold">
                        Dokumentasi Kegiatan RW 015
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-150 px-3 py-1 rounded-xl text-xs font-semibold text-slate-600 self-start sm:self-center">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dateItems.length} Foto</span>
                  </div>
                </div>

                {/* Split Responsive Slider Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left big image slide frame (lg:col-span-8) */}
                  <div className="lg:col-span-8 relative aspect-video sm:aspect-16/10 lg:aspect-auto lg:h-[400px] rounded-2xl overflow-hidden bg-slate-950 group/slide border border-slate-100/85 shadow-2xs flex items-center justify-center">
                    <img 
                      src={activeItem.gambar} 
                      alt={activeItem.judul} 
                      className="w-full h-full object-cover transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Interactive overlay click to display full lightbox */}
                    <div 
                      id={`open-zoom-${activeItem.id}`}
                      onClick={() => openLightbox(activeItem)}
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover/slide:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in"
                    >
                      <div className="px-4 py-2 bg-white/95 backdrop-blur-md text-slate-800 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transform uppercase tracking-wider scale-95 group-hover/slide:scale-100 transition-all duration-300 select-none">
                        <Eye className="w-4 h-4 text-rose-500" />
                        Perbesar Foto
                      </div>
                    </div>

                    {/* Left/Right Overlaid navigation buttons if multiple */}
                    {hasMultiple && (
                      <>
                        <button
                          id={`prev-slide-${date}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlide(date, currentIdx - 1, dateItems.length);
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/95 hover:bg-white text-slate-800 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all opacity-0 sm:group-hover/slide:opacity-100 cursor-pointer"
                          title="Foto Sebelum"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </button>
                        <button
                          id={`next-slide-${date}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlide(date, currentIdx + 1, dateItems.length);
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/95 hover:bg-white text-slate-800 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all opacity-0 sm:group-hover/slide:opacity-100 cursor-pointer"
                          title="Foto Berikut"
                        >
                          <ChevronRight className="w-5 h-5 text-slate-700" />
                        </button>
                      </>
                    )}

                    {/* Bottom Floating Dots overlay */}
                    {hasMultiple && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/55 backdrop-blur-md px-3 py-1 rounded-full flex gap-1.5 z-10">
                        {dateItems.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setSlide(date, dotIdx, dateItems.length)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              dotIdx === currentIdx ? 'bg-rose-500 w-3.5' : 'bg-white/45 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Active category Badge floating */}
                    <span className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase shadow-xs">
                      {activeItem.kategori}
                    </span>
                  </div>

                  {/* Right side active description and mini thumbnails selector (lg:col-span-4) */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-5 text-left bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest font-sans">
                          Detail Foto ({currentIdx + 1} dari {dateItems.length})
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base font-display leading-snug mt-0.5">
                          {activeItem.judul}
                        </h4>
                      </div>
                      
                      <p className="text-xs text-slate-600 leading-relaxed font-normal min-h-[90px]">
                        {activeItem.deskripsi}
                      </p>
                    </div>

                    {/* Interactive thumb navigators below */}
                    {hasMultiple && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider block font-sans">
                          Navigasi Album :
                        </span>
                        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                          {dateItems.map((item, thumbIdx) => (
                            <button
                              key={item.id}
                              onClick={() => setSlide(date, thumbIdx, dateItems.length)}
                              className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 transition-all ${
                                thumbIdx === currentIdx
                                  ? 'ring-2 ring-rose-500 scale-95 opacity-100'
                                  : 'opacity-40 hover:opacity-80'
                              }`}
                            >
                              <img 
                                src={item.gambar} 
                                alt="" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIGHTBOX VIEWER OVERLAY */}
      {lightboxIndex !== null && (
        <div 
          id="lightbox-overlay"
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-300"
        >
          {/* Top Actions Pane */}
          <div className="flex justify-between items-center text-white/80 max-w-7xl w-full mx-auto">
            <span className="text-[10px] sm:text-xs font-mono">
              Foto {lightboxIndex + 1} dari {GALERI_DEFAULT.length} • {GALERI_DEFAULT[lightboxIndex].kategori}
            </span>
            <button 
              id="lightbox-close"
              onClick={closeLightbox}
              className="p-2 hover:bg-white/10 rounded-full text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Main Slide Carousel Pane */}
          <div className="flex items-center justify-between max-w-7xl w-full mx-auto shrink-0 my-auto">
            {/* Left Prev */}
            <button 
              id="lightbox-prev"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/90 disabled:opacity-30 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Centered Image frame */}
            <div className="relative max-w-4xl max-h-[60vh] sm:max-h-[70vh] flex justify-center items-center overflow-hidden rounded-xl border border-white/10">
              <img 
                src={GALERI_DEFAULT[lightboxIndex].gambar} 
                alt={GALERI_DEFAULT[lightboxIndex].judul} 
                className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Next */}
            <button 
              id="lightbox-next"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/90 disabled:opacity-30 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Card text info */}
          <div className="max-w-2xl w-full mx-auto bg-slate-900/40 p-4 sm:p-6 rounded-2xl border border-white/5 text-center space-y-2 mb-2">
            <h3 className="font-bold text-white text-base sm:text-lg font-display">
              {GALERI_DEFAULT[lightboxIndex].judul}
            </h3>
            <p className="text-[10px] text-white/40 font-mono">
              Ambil Tanggal: {new Date(GALERI_DEFAULT[lightboxIndex].tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-white/70 text-xs leading-relaxed max-w-xl mx-auto">
              {GALERI_DEFAULT[lightboxIndex].deskripsi}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
