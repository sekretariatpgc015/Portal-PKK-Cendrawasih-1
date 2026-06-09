import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Mail, MapPin, Calendar, Clock, ArrowLeft, Shield, Lock, User } from 'lucide-react';
import { BERITA_DEFAULT, AGENDA_DEFAULT } from './data';
import { Berita } from './types';

// Components
import Beranda from './components/Beranda';
import Profil from './components/Profil';
import Posyandu from './components/Posyandu';
import Posbindu from './components/Posbindu';
import Galeri from './components/Galeri';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<Berita | null>(null);

  // Admin Login States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [loginSuccessToast, setLoginSuccessToast] = useState<boolean>(false);

  // Auto-scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [activeTab]);

  // Load persistence session
  useEffect(() => {
    const adminSession = localStorage.getItem('pkk_admin_session');
    if (adminSession === 'active') {
      setIsLoggedIn(true);
    }
  }, []);

  // Dismiss success toast
  useEffect(() => {
    if (loginSuccessToast) {
      const timer = setTimeout(() => {
        setLoginSuccessToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccessToast]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().toLowerCase() === 'admin' && passwordInput === 'admin15') {
      setIsLoggedIn(true);
      localStorage.setItem('pkk_admin_session', 'active');
      setLoginModalOpen(false);
      setUsernameInput('');
      setPasswordInput('');
      setLoginError('');
      setLoginSuccessToast(true);
    } else {
      setLoginError('ID Pengguna atau Kata Sandi salah. (Petunjuk: admin / admin15)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('pkk_admin_session');
  };

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'posyandu', label: 'Posyandu' },
    { id: 'posbindu', label: 'Posbindu' },
    { id: 'galeri', label: 'Galeri' }
  ];

  return (
    <div id="pkk-portal-root" className="min-h-screen flex flex-col justify-between bg-slate-50/50">
      
      {/* HEADER & STICKY NAVBAR */}
      <header id="app-sticky-header" className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Logo & title brand */}
          <div 
            onClick={() => { setActiveTab('beranda'); setSelectedNews(null); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-md shadow-rose-100 transition-transform group-hover:scale-105 select-none border border-rose-100 p-1">
              <img 
                src="https://drive.google.com/thumbnail?id=1TkEz2ltu-1HUX-ZpNfKcL-xLWxP_vffC" 
                alt="Logo PKK" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="text-left">
              <p className="font-display font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-none">
                PKK RW 015
              </p>
              <p className="text-[10px] sm:text-xs text-rose-500 uppercase tracking-widest font-semibold mt-1">
                Pesona Gading Cibitung
              </p>
            </div>
          </div>

          {/* Desktop Web Navigation Links & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <nav id="desktop-navbar" className="flex items-center gap-1.5">
              {navItems.map(item => (
                <button
                  id={`navbar-item-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedNews(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-150' 
                      : 'text-slate-650 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <span className="h-6 w-px bg-rose-100/60" />

            {isLoggedIn ? (
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-100/50 px-3 py-1.5 rounded-xl font-semibold text-rose-700 text-xs shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Admin PKK</span>
                </div>
                <button
                  id="navbar-btn-logout"
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-350 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                id="navbar-btn-login"
                onClick={() => setLoginModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-98 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-100 hover:shadow-lg transition-all cursor-pointer"
              >
                Masuk Admin
              </button>
            )}
          </div>

          {/* Mobile menu toggle indicator */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-navbar-drawer" className="md:hidden bg-white border-t border-rose-50 px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-3 duration-200">
            <div className="space-y-1.5">
              {navItems.map(item => (
                <button
                  id={`mobile-navbar-item-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedNews(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-rose-500 text-white' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-rose-100/60">
              {isLoggedIn ? (
                <div className="flex items-center justify-between p-3.5 bg-rose-50 rounded-xl border border-rose-100/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-rose-700">Admin PKK RW 015</span>
                  </div>
                  <button
                    id="mobile-btn-logout"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-extrabold text-rose-600 hover:underline cursor-pointer"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <button
                  id="mobile-btn-login"
                  onClick={() => {
                    setLoginModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-100 cursor-pointer"
                >
                  Masuk Admin
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* CORE WRANGLER CONTAINER */}
      <main id="app-main-content" className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {selectedNews ? (
          /* DETAILED NEWS READER OVERLAY SCREEN */
          <div id="detailed-news-reader" className="max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-350">
            <button
              id="back-to-news-list"
              onClick={() => setSelectedNews(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-rose-500 hover:text-rose-650 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali Ke Berita Beranda
            </button>

            <article className="bg-white rounded-3xl border border-pink-100/50 p-6 sm:p-10 space-y-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2.5 items-center">
                  <span className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-lg text-[10px] font-bold uppercase font-mono">
                    {selectedNews.kategori}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Tanggal Rilis: {new Date(selectedNews.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
                  {selectedNews.judul}
                </h1>
              </div>

              {/* Banner image wrapper */}
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <img 
                  src={selectedNews.gambar} 
                  alt={selectedNews.judul} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Context text blocks */}
              <div className="text-slate-650 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
                {selectedNews.konten}
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Penanggung Jawab: Sekretaris PKK RW 015</span>
                <span>Desa Wanajaya</span>
              </div>
            </article>
          </div>
        ) : (
          /* SECTION ROUTING ACTIONS */
          <div id="portal-views-wrapper">
            {activeTab === 'beranda' && (
              <Beranda 
                onNavigate={setActiveTab} 
                news={BERITA_DEFAULT} 
                agendas={AGENDA_DEFAULT}
                onSelectNews={setSelectedNews}
              />
            )}
            {activeTab === 'profil' && <Profil isLoggedIn={isLoggedIn} />}
            {activeTab === 'posyandu' && <Posyandu />}
            {activeTab === 'posbindu' && <Posbindu />}
            {activeTab === 'galeri' && <Galeri />}
          </div>
        )}
      </main>

      {/* FOOTER CONTAINER */}
      <footer id="app-sticky-footer" className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border border-slate-700 p-1 shrink-0">
                  <img 
                    src="https://drive.google.com/thumbnail?id=1TkEz2ltu-1HUX-ZpNfKcL-xLWxP_vffC" 
                    alt="Logo PKK" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base font-display text-white mt-1">PKK RW 015</h4>
                  <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest font-mono">Pesona Gading Cibitung</p>
                </div>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed font-sans font-normal max-w-sm">
                Bersama membangun keluarga binaan sehat, tanggap, berdikari ekonomi, berintegritas budi luhur, dan bebas stunting di Desa Wanajaya, Bekasi.
              </p>
            </div>

            {/* Navigation links column */}
            <div className="md:col-span-3 text-left space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-display">Peta Navigasi</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {navItems.map(item => (
                  <button
                    id={`footer-nav-item-${item.id}`}
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSelectedNews(null);
                    }}
                    className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sekretariat Details Column */}
            <div className="md:col-span-4 text-left space-y-3 text-xs text-slate-400">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-display">Sekretariat</h5>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">Jl. Cempaka Blok C2 Perumahan Pesona Gading Cibitung, Desa Wanajaya, Cibitung, Bekasi.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-mono text-slate-350">sekretariat.pgc015@gmail.com</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-10 sm:mt-14 pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-500">
            <p className="font-sans font-normal">
              &copy; {new Date().getFullYear()} PKK RW 015 Pesona Gading Cibitung. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Sertifikasi Pengurus Komunitas Desa Wanajaya</span>
            </div>
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL FORM OVERLAY */}
      {loginModalOpen && (
        <div id="login-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div id="login-modal-card" className="bg-white rounded-3xl border border-pink-100 shadow-2xl max-w-sm w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 relative text-left">
            <button
              id="close-login-modal"
              onClick={() => {
                setLoginModalOpen(false);
                setLoginError('');
                setUsernameInput('');
                setPasswordInput('');
              }}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-650 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">Masuk Portal Admin</h3>
              <p className="text-xs text-slate-500 font-sans">Akses autentikasi khusus pengurus dan kader PKK RW 015</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-450 uppercase tracking-widest block font-bold">ID Pengguna (Username)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <User className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    id="login-username"
                    type="text"
                    required
                    placeholder="Contoh: admin"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-rose-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-450 uppercase tracking-widest block font-bold">Kata Sandi (Password)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    id="login-password"
                    type="password"
                    required
                    placeholder="Contoh: admin15"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-rose-500 bg-slate-50/50"
                  />
                </div>
              </div>

              {loginError && (
                <div id="login-error-message" className="p-3 bg-red-50 border border-red-100 text-red-650 text-[11px] rounded-xl font-medium leading-relaxed">
                  {loginError}
                </div>
              )}

              <button
                id="login-submit"
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Autentikasi Sekarang
              </button>
            </form>


          </div>
        </div>
      )}

      {/* SUCCESS TOAST NOTIFICATION */}
      {loginSuccessToast && (
        <div id="login-success-toast" className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-emerald-500 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            <span className="font-bold text-sm">✓</span>
          </div>
          <div>
            <p className="font-bold text-xs">Login Berhasil!</p>
            <p className="text-[10px] text-emerald-100">Selamat datang kembali, Admin PKK RW 015.</p>
          </div>
        </div>
      )}

    </div>
  );
}
