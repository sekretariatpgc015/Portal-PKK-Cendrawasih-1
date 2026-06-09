export interface Berita {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  tanggal: string;
  kategori: 'Berita Umum' | 'Posyandu' | 'Posbindu' | 'Kegiatan PKK';
  gambar: string;
  baca?: number;
}

export interface Agenda {
  id: string;
  judul: string;
  tanggal: string; // YYYY-MM-DD
  waktu: string;
  lokasi: string;
  deskripsi: string;
  kategori: 'PKK' | 'Posyandu' | 'Posbindu' | 'Majelis Taklim';
  penanggungJawab: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: 'PKK' | 'Posyandu' | 'Posbindu' | 'Lainnya';
  gambar: string;
  tanggal: string;
}

export interface Pengurus {
  id: string;
  nama: string;
  jabatan: string;
  peran: 'PKK' | 'Posyandu' | 'Posbindu' | 'Majelis Taklim' | 'KJS';
  foto?: string;
}

export interface KontakPesan {
  id: string;
  nama: string;
  email: string;
  pesan: string;
  tanggal: string;
}

export interface DemografiData {
  kategori: string; // Balita, Remaja, Dewasa, Lansia
  jumlah: number;
  persen: number;
}

export interface KunjunganBulanan {
  bulan: string;
  balita: number;
  lansia: number;
  total: number;
}
