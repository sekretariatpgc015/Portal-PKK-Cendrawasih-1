import React, { useState } from 'react';
import { Calendar, ArrowRight, Heart, Sparkles, AlertCircle, MapPin, Clock, User, MessageCircle } from 'lucide-react';
import { Berita, Agenda } from '../types';

interface BerandaProps {
  onNavigate: (tab: string) => void;
  news: Berita[];
  agendas: Agenda[];
  onSelectNews: (news: Berita) => void;
}

export default function Beranda({ onNavigate, news, agendas, onSelectNews }: BerandaProps) {
  const [selectedKategoriAgenda, setSelectedKategoriAgenda] = useState<string>('Semua');

  const filteredAgendas = selectedKategoriAgenda === 'Semua' 
    ? agendas 
    : agendas.filter(a => a.kategori === selectedKategoriAgenda);

  // Take the latest 3 news items
  const latestNews = news.slice(0, 3);

  return (
    <div id="beranda-container" className="space-y-16 pb-12 animate-in fade-in duration-500">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50/30 to-slate-50 rounded-3xl p-6 sm:p-12 border border-rose-100/50 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Tagline & Call-to-action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              PKK RW 015 Pesona Gading
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 font-display leading-[1.1] tracking-tight">
              Bersama Membangun <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700">
                Keluarga Sehat, Mandiri, & Sejahtera
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Selamat datang di portal informasi resmi PKK RW 015 Pesona Gading Cibitung. Kami berkomitmen menyelenggarakan pos layanan terpadu yang tanggap, inklusif, dan mengedukasi warga.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                id="btn-nav-posyandu"
                onClick={() => onNavigate('posyandu')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl shadow-md shadow-rose-200 transition-all text-sm group cursor-pointer"
              >
                Layanan Posyandu
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                id="btn-nav-posbindu"
                onClick={() => onNavigate('posbindu')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-all text-sm cursor-pointer"
              >
                Layanan Posbindu PTM
              </button>
            </div>
          </div>

          {/* Banner Illustration generated dynamically */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[16/9] lg:aspect-square overflow-hidden rounded-2xl shadow-xl border-4 border-white/80 bg-rose-100">
              <img 
                src="/src/assets/images/hero_pkk_community_1780942108605.png" 
                alt="RW 015 PKK Community Team" 
                className="w-full h-full object-cover transform hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-rose-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
                  <Heart className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-950 font-display">Gotong Royong Guyub</p>
                  <p className="text-[10px] text-slate-500">Mewujudkan Desa Wanajaya Bebas Stunting</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROGRAM UTAMA CARD GRID */}
      <section id="program-utama" className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Bidang Pelayanan Utama Kami
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Inisiatif berkelanjutan dari kader RW 015 untuk memantau kesehatan jasmani dan kesejahteraan sosial rohani keluarga Anda secara rutin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Posyandu */}
          <div className="bg-white rounded-2xl border border-rose-100 p-6 flex flex-col justify-between hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform p-1 border border-pink-100/60">
                <img 
                  src="https://drive.google.com/thumbnail?id=1CDc8NgkvTXXDVm0GNC16U8P1sh1atMNg" 
                  alt="Logo Posyandu" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">Posyandu Balita</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pemeriksaan rutin berkala bagi bayi dan balita (0-5 tahun). Layanan mencakup pengukuran tumbuh kembang, imunisasi dasar, penyuluhan pencegahan stunting, serta asupan nutrisi protein tinggi (PMT).
              </p>
            </div>
            <button
              id="goto-posyandu"
              onClick={() => onNavigate('posyandu')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 group-hover:underline cursor-pointer"
            >
              Pelajari 5 Alur Meja
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Posbindu */}
          <div className="bg-white rounded-2xl border border-sky-100 p-6 flex flex-col justify-between hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-sky-50 flex items-center justify-center group-hover:scale-110 transition-transform p-1 border border-sky-100/60 animate-in fade-in duration-350">
                <img 
                  src="https://drive.google.com/thumbnail?id=1YibmCQLufPZ9t5gDx7I7JTLY4m1oymrM" 
                  alt="Logo Posbindu" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">Posbindu PTM & Lansia</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pencegahan penyakit tidak menular bagi usia produktif hingga lanjut usia. Dilengkapi layanan ukur kadar asam urat, kolesterol, tensi, serta konseling pola hidup sehat aktif pasca pensiun.
              </p>
            </div>
            <button
              id="goto-posbindu"
              onClick={() => onNavigate('posbindu')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 group-hover:underline cursor-pointer"
            >
              Lihat Demografi Sensus
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Kegiatan PKK, Seni & Religi */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6 flex flex-col justify-between hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold text-lg group-hover:scale-110 transition-transform">
                🕌
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">Majelis Taklim & KJS</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Harmonisasi spiritual dan kesegaran raga. Mengagendakan kajian fiqih rutin, arisan pleno bulanan kader PKK, serta gerakan aktif Senam Jantung Sehat sehat bugar di hari libur.
              </p>
            </div>
            <button
              id="goto-profil"
              onClick={() => onNavigate('profil')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 group-hover:underline cursor-pointer"
            >
              Lihat Susunan Pengurus
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. BERITA TERBARU CARD GRID / PREVIEW */}
      <section id="berita-terbaru" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-900">Kabar Warga & Berita Terbaru</h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">Ikuti artikel informatif, kegiatan gizi, dan sosialisasi program RW 015.</p>
          </div>
          <button
            id="view-all-news-btn"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Simulate navigation to active gallery or keep browsing
            }}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 border-b border-rose-200 pb-0.5 cursor-pointer"
          >
            Sensus Berita Lengkap
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map(item => (
            <article 
              id={`berita-card-${item.id}`}
              key={item.id} 
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img 
                    src={item.gambar} 
                    alt={item.judul} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-rose-600 border border-rose-100">
                    {item.kategori}
                  </span>
                </div>
                <div className="p-5 space-y-2.5">
                  <p className="text-[10px] font-mono text-slate-400">
                    {new Date(item.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-rose-500 transition-colors line-clamp-2 font-display">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  id={`read-news-${item.id}`}
                  onClick={() => onSelectNews(item)}
                  className="w-full py-2 text-center text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-rose-50 hover:text-rose-600 border border-slate-100 transition-all cursor-pointer"
                >
                  Baca Selengkapnya
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. CALENDAR INTERAKTIF KEGIATAN */}
      <section id="agenda-kegiatan" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Header & filters */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-full text-[10px] uppercase font-semibold">
                <Calendar className="w-3 h-3" />
                Kalender Agenda
              </div>
              <h2 className="text-2xl font-bold font-display text-white">Agenda Kegiatan Terdekat</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Jangan lewatkan jadwal pemeriksaan kesehatan anak dan pembagian vitamin gratis terdekat serta kerja bakti PKK.
              </p>
            </div>

            {/* Quick Filter buttons */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Kategori Rapat / Layanan</p>
              <div className="flex flex-wrap gap-2">
                {['Semua', 'Posyandu', 'Posbindu', 'Majelis Taklim'].map(cat => (
                  <button
                    id={`filter-agenda-${cat.toLowerCase().replace(' ', '-')}`}
                    key={cat}
                    onClick={() => setSelectedKategoriAgenda(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedKategoriAgenda === cat
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map of agendas with interactive list */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {filteredAgendas.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-500" />
                <p className="text-slate-400 text-sm">Tidak ada agenda untuk kategori {selectedKategoriAgenda}.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAgendas.map(agenda => (
                  <div 
                    id={`agenda-panel-${agenda.id}`}
                    key={agenda.id} 
                    className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/50 hover:border-rose-500/30 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                          agenda.kategori === 'Posyandu' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' :
                          agenda.kategori === 'Posbindu' ? 'bg-sky-500/10 text-sky-450 border border-sky-500/20' :
                          'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20'
                        }`}>
                          {agenda.kategori}
                        </span>
                        
                        {/* Interactive dynamic Badge if today or soon */}
                        <span className="text-[9px] font-semibold text-rose-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                          Mendatang
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-white text-sm font-display line-clamp-1">{agenda.judul}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{agenda.deskripsi}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-700/40 space-y-2 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>
                          {new Date(agenda.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{agenda.waktu}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="truncate">{agenda.lokasi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
