import React, { useState } from 'react';
import { PENGURUS_LIST, SEJARAH_PKK, MISI_LIST } from '../data';
import { Award, BookOpen, Users, Plus, Edit3, Trash2, X } from 'lucide-react';

interface ProfilProps {
  isLoggedIn?: boolean;
}

export default function Profil({ isLoggedIn = false }: ProfilProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');

  const [pengurusList, setPengurusList] = useState<any[]>(() => {
    const saved = localStorage.getItem('pkk_pengurus_list_v7');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PENGURUS_LIST;
      }
    }
    return PENGURUS_LIST;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    jabatan: '',
    peran: 'PKK' as 'PKK' | 'Posyandu' | 'Posbindu' | 'Majelis Taklim' | 'KJS',
    foto: ''
  });

  const savePengurus = (newList: any[]) => {
    setPengurusList(newList);
    localStorage.setItem('pkk_pengurus_list_v7', JSON.stringify(newList));
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ nama: '', jabatan: '', peran: 'PKK', foto: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(p.id);
    setFormData({ nama: p.nama, jabatan: p.jabatan, peran: p.peran, foto: p.foto || '' });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Apakah Anda yakin ingin menghapus pengurus ini dari struktur?')) {
      const updated = pengurusList.filter(p => p.id !== id);
      savePengurus(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.jabatan.trim()) return;

    if (editingId) {
      const updated = pengurusList.map(p => 
        p.id === editingId 
          ? { ...p, nama: formData.nama.trim(), jabatan: formData.jabatan.trim(), peran: formData.peran, foto: formData.foto.trim() }
          : p
      );
      savePengurus(updated);
    } else {
      const newPengurus = {
        id: Date.now().toString(),
        nama: formData.nama.trim(),
        jabatan: formData.jabatan.trim(),
        peran: formData.peran,
        foto: formData.foto.trim()
      };
      savePengurus([...pengurusList, newPengurus]);
    }
    setIsModalOpen(false);
  };

  const roles = ['Semua', 'PKK', 'Posyandu', 'Posbindu', 'Majelis Taklim', 'KJS'];

  const filteredPengurus = selectedFilter === 'Semua' 
    ? pengurusList 
    : pengurusList.filter(p => p.peran === selectedFilter);

  return (
    <div id="profil-container" className="space-y-16 pb-12 animate-in fade-in duration-500">
      
      {/* SEJARAH & VISI MISI HEADER */}
      <section id="profil-sejarah" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left side: History details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider font-display">
            <BookOpen className="w-4.5 h-4.5" />
            Lintas Sejarah & Pendirian
          </div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">Selayang Pandang PKK RW 015</h2>
          
          <div className="text-slate-600 space-y-4 text-sm leading-relaxed whitespace-pre-line font-normal font-sans">
            {SEJARAH_PKK}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
              <p className="text-2xl font-bold text-rose-500 font-display">550+</p>
              <p className="text-xs text-slate-500 font-sans">Warga Binaan Sehat</p>
            </div>
            <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100">
              <p className="text-2xl font-bold text-sky-600 font-display">{pengurusList.length}</p>
              <p className="text-xs text-slate-500 font-sans">Kader Terdaftar</p>
            </div>
          </div>
        </div>

        {/* Right side: Mission Cards */}
        <div id="profil-misi-card" className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-pink-100/80 shadow-md shadow-pink-50/50 space-y-6">
          <div className="flex items-center gap-2 text-rose-600">
            <Award className="w-5 h-5 shrink-0" />
            <h3 className="font-extrabold text-slate-900 text-lg font-display">Misi & Target PKK</h3>
          </div>
          
          <ul className="space-y-4">
            {MISI_LIST.map((misi, i) => (
              <li id={`misi-item-${i}`} key={i} className="flex gap-3 text-xs text-slate-600 leading-relaxed font-sans">
                <span className="w-5.5 h-5.5 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors text-rose-600 text-center shrink-0 flex items-center justify-center font-bold font-mono text-[10px]">
                  {i + 1}
                </span>
                <span className="pt-0.5">{misi}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STRUKTUR PENGURUS REGISTRY */}
      <section id="struktur-pengurus" className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1.5 lg:max-w-xl text-left">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider font-display">
              <Users className="w-4.5 h-4.5" />
              Sinergi Kolektif
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Struktur Organisasi & Kader Pengurus
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
              Kader sosial kemaslahatan RW 015 Pesona Gading yang menggerakkan pelayanan, administrasi, dan koordinasi kesehatan terpadu.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Tab switches */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {roles.map(r => (
                <button
                  id={`filter-pengurus-${r.toLowerCase().replace(' ', '-')}`}
                  key={r}
                  onClick={() => setSelectedFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === r
                      ? 'bg-white text-rose-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Admin Add Button */}
            {isLoggedIn && (
              <button
                id="btn-tambah-pengurus"
                onClick={handleOpenAdd}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-650 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-100 flex items-center gap-1.5 cursor-pointer ml-auto lg:ml-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Pengurus</span>
              </button>
            )}
          </div>
        </div>

        {/* Board of Members Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPengurus.map(p => (
            <div 
              id={`pengurus-card-${p.id}`}
              key={p.id} 
              className="bg-white rounded-2xl border border-slate-100 p-5 text-center flex flex-col items-center justify-between space-y-4 hover:shadow-md transition-all group relative"
            >
              {/* Admin Actions Overlay on Card corner */}
              {isLoggedIn && (
                <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <button
                    onClick={(e) => handleOpenEdit(p, e)}
                    className="p-1 px-1.5 bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg text-[10px] hover:bg-slate-100 transition-all shadow-sm cursor-pointer"
                    title="Edit Profil"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(p.id, e)}
                    className="p-1 px-1.5 bg-red-50 text-red-600 hover:text-red-800 border border-red-100 rounded-lg text-[10px] hover:bg-red-100 transition-all shadow-sm cursor-pointer"
                    title="Hapus Pengurus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="space-y-3 flex flex-col items-center w-full">
                {/* Generates specialized initials or generic avatars with matching roles colors */}
                <div className={`w-14 h-14 rounded-full overflow-hidden flex items-center justify-center font-bold text-lg select-none transition-transform group-hover:scale-105 duration-300 ${
                  p.peran === 'PKK' ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-200' :
                  p.peran === 'Posyandu' ? 'bg-pink-50 text-pink-600 ring-2 ring-pink-200' :
                  p.peran === 'Posbindu' ? 'bg-sky-50 text-sky-600 ring-2 ring-sky-200' :
                  p.peran === 'Majelis Taklim' ? 'bg-emerald-50 text-emerald-600 ring-2 ring-emerald-200' :
                  'bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200'
                }`}>
                  {p.foto ? (
                    <img 
                      src={p.foto} 
                      alt={p.nama} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{p.nama.charAt(0) + (p.nama.split(' ')[1] ? p.nama.split(' ')[1].charAt(0) : '')}</span>
                  )}
                </div>
                
                <div className="w-full text-center">
                  <h4 className="font-bold text-slate-900 text-sm font-display line-clamp-1">{p.nama}</h4>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5 line-clamp-1">{p.jabatan}</p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                p.peran === 'PKK' ? 'bg-rose-100/50 text-rose-600' :
                p.peran === 'Posyandu' ? 'bg-pink-100/50 text-pink-600' :
                p.peran === 'Posbindu' ? 'bg-sky-100/50 text-sky-600' :
                p.peran === 'Majelis Taklim' ? 'bg-emerald-100/50 text-emerald-600' :
                'bg-indigo-100/50 text-indigo-600'
              }`}>
                {p.peran}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* MANAGE PENGURUS MODAL */}
      {isModalOpen && (
        <div id="pengurus-form-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div id="pengurus-form-card" className="bg-white rounded-3xl border border-rose-100 shadow-2xl max-w-sm w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200 relative text-left">
            <button
              id="close-pengurus-modal"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-650 rounded-full transition-all cursor-pointer animate-in duration-250"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold font-display text-slate-900">
                {editingId ? 'Edit Anggota Pengurus' : 'Tambah Anggota Pengurus'}
              </h3>
              <p className="text-xs text-slate-500 font-sans">Sempurnakan susunan kepengurusan kader PKK RW 015</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Ranti Lestari"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-rose-500 bg-slate-50/50 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Jabatan Organisasi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sekretaris III / Bendahara Posyandu"
                  value={formData.jabatan}
                  onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-rose-500 bg-slate-50/50 outline-none"
                  id="form-pengurus-jabatan"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Instansi / Peran Pokok</label>
                <select
                  value={formData.peran}
                  onChange={(e) => setFormData({ ...formData, peran: e.target.value as any })}
                  className="w-full px-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-700 outline-none"
                >
                  <option value="PKK">PKK RW 015 (Umum)</option>
                  <option value="Posyandu">Posyandu Balita</option>
                  <option value="Posbindu">Posbindu PTM</option>
                  <option value="Majelis Taklim">Majelis Taklim</option>
                  <option value="KJS">Klub Jantung Sehat (KJS)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">URL Foto Profil (Opsional)</label>
                <input
                  type="url"
                  placeholder="Contoh: https://link-gambar.com/foto.jpg"
                  value={formData.foto}
                  onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs text-slate-800 border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-rose-500 bg-slate-50/50 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                {editingId ? 'Simpan Perubahan' : 'Masukkan ke Struktur'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
