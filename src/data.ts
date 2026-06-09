import { Berita, Agenda, GaleriItem, Pengurus, DemografiData, KunjunganBulanan } from './types';

export const SEJARAH_PKK = `PKK RW 015 Pesona Gading Cibitung didirikan di tengah permukiman asri Blok C2 Pesona Gading Cibitung, Desa Wanajaya, Kecamatan Cibitung, Bekasi. Didorong oleh kesadaran luhur warga untuk menciptakan lingkungan ramah anak, sehat, dan berdaya gotong royong, kelompok PKK RW 015 resmi terbentuk untuk mengoordinasikan berbagai urusan sosial kemaslahatan warga.

Sejak berdirinya, PKK RW 015 telah bersinergi aktif dengan puskesmas setempat, RT-RT di bawah naungan RW 015, dan tokoh masyarakat untuk mengoperasikan berbagai program krusial dari 10 Program Pokok PKK. Terutama bidang kesehatan ibu-anak (Posyandu), pemeriksaan penyakit tidak menular (Posbindu), pembinaan rohani (Majelis Taklim), serta kebugaran raga (Klub Jantung Sehat - KJS). Menjadikan RW 015 sebagai contoh lingkungan warga rukun, sehat, mandiri, dan berbudaya luhur.`;

export const MISI_LIST = [
  'Mewujudkan keluarga sehat bebas stunting melalui penyuluhan gizi seimbang dan optimalisasi pelayanan Posyandu Balita.',
  'Mendeteksi dan mengontrol penyakit tidak menular (PTM) pada orang dewasa serta lansia di lingkungan RW 015 secara berkala melalui Posbindu.',
  'Membina keimanan, ketakwaan, serta kerukunan antarwarga melalui program kajian rohani berkala Majelis Taklim.',
  'Mempromosikan gaya hidup aktif dan bugar sejak dini hingga lansia melalui program rutin latihan senam kebugaran Klub Jantung Sehat.',
  'Mengembangkan potensi kewirausahaan kader perempuan dalam menopang ekonomi keluarga sejahtera.'
];

export const PENGURUS_LIST: Pengurus[] = [
  // PKK
  { id: '1', nama: 'Ibu Alinda', jabatan: 'Ketua PKK RW 015', peran: 'PKK', foto: 'https://drive.google.com/thumbnail?id=1NJ42kWTNOAl8CVjtLTSMHaBGLiuEURsI' },
  { id: '2', nama: 'Ibu Rohita', jabatan: 'Sekretaris PKK RW 015', peran: 'PKK', foto: 'https://drive.google.com/thumbnail?id=1ypD-Fdk55E5ndyPuKZqzlP5KN0wxvt5z' },
  { id: '3', nama: 'Ibu Suhaidah', jabatan: 'Bendahara I PKK RW 015', peran: 'PKK', foto: 'https://drive.google.com/thumbnail?id=12N_5_42jHzCKvQk_-1R9Pr6DrKAGr4xL' },
  { id: '4', nama: 'Ibu Sugiarti', jabatan: 'Bendahara II PKK RW 015', peran: 'PKK', foto: 'https://drive.google.com/thumbnail?id=1mk6AN5BNXrdGuy8vXbFiVcKWB9qIrxp3' },
  
  // Posyandu
  { id: '5', nama: 'Ibu Haniatul Masruroh', jabatan: 'Ketua Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=182zgQGiUTkGmh4Xq3wEX9cHn8vTUMNND' },
  { id: '6', nama: 'Ibu Eva Wahyuningsih', jabatan: 'Sekretaris Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=1iwTiraNyJQ-E2FpnrxprZXb02_oKL1jm' },
  { id: '7', nama: 'Ibu Sri Sukatni', jabatan: 'Bendahara Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=1D39xFCxB4Xfwrl_Bywl-AOAUzk0IEFLt' },
  { id: '5a', nama: 'Ibu Atik Wahyuni', jabatan: 'Kader Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=1JdCYXo7eaa2E4mf15hMdGL3KIz12g-kJ' },
  { id: '5b', nama: 'Ibu Desmawati', jabatan: 'Kader Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=1BsswWgBCWjBaCS-RHky5vCM8Z4ZSStlt' },
  { id: '5c', nama: 'Ibu Novri Suryanti', jabatan: 'Kader Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=1ZfonC64aN0rdn1ayVe98WarWY1UdGDu0' },
  { id: '5d', nama: 'Ibu Nur Azizah', jabatan: 'Kader Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=1xvQeJ7MTs8n3iNUAVqibyUUtl0xGBZ9r' },
  { id: '5e', nama: 'Ibu Rani Soraya', jabatan: 'Kader Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=1NU8oXoklSImthYq4YLBtInEYLFplS1ka' },
  { id: '5f', nama: 'Ibu Sumarni', jabatan: 'Kader Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=1OIIxf4qHOe1YcsuCRNq-8MWTo3lwrtyn' },
  { id: '5g', nama: 'Ibu Yuli Herniawati', jabatan: 'Kader Posyandu', peran: 'Posyandu', foto: 'https://drive.google.com/thumbnail?id=12JupNcIF5LxahuZ3fmq_Ez0pTHkl2IA-' },
  
  // Posbindu
  { id: '8', nama: 'Ibu Dewi Tri P.', jabatan: 'Ketua Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1fCpYQeYeotor5ES2F4MIuKlLS9i-tJjl' },
  { id: '9', nama: 'Ibu Eny Suciati', jabatan: 'Sekretaris Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1uPf_oC31s-b3_gIIs2R6IWVhY0mbJ6JP' },
  { id: '10', nama: 'Ibu Sumarni', jabatan: 'Bendahara I Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1ac8aqWGzgG0aZUd5I-OnKKK1rK8c3_g3' },
  { id: '10a', nama: 'Ibu Uun Yuningsih', jabatan: 'Bendahara II Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1sGlLXZ_Ua4S37Cz4gW1W398s_UrbK_3C' },
  { id: '10b', nama: 'Ibu Ernawati', jabatan: 'Kader Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1SjHe3io-odF2UswZU4PbZlV50M_TLHnX' },
  { id: '10c', nama: 'Ibu Erni Suprapti', jabatan: 'Kader Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1MhOPzYC4tlmMKnxKmJr2H1S29mBgufD1' },
  { id: '10d', nama: 'Ibu Puspa Ningsih', jabatan: 'Kader Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1d6ActG-hKcaiGXl4-_NzRXNkK1XoseZO' },
  { id: '10e', nama: 'Ibu Sanni Noviati', jabatan: 'Kader Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1ZL-751cgNN5Hxe4K7k6QZiVPeMXEG1Tz' },
  { id: '10f', nama: 'Ibu Sri Astuti', jabatan: 'Kader Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=1GP6PBpAW3sCgs0ioy_Ouiz8OINpxJMV6' },
  { id: '10g', nama: 'Ibu Sri Nunung', jabatan: 'Kader Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=11VDogVPDNQ2jwuTAtqRgQvEfafeiLdO7' },
  { id: '10h', nama: 'Ibu Uum Sari', jabatan: 'Kader Posbindu', peran: 'Posbindu', foto: 'https://drive.google.com/thumbnail?id=15q8zdimFVRPZZdEly93vqk06tsX_HT14' },
  
  // Majelis Taklim
  { id: '11', nama: 'Ibu Siti Nurrohmah', jabatan: 'Ketua Majelis Taklim', peran: 'Majelis Taklim', foto: 'https://drive.google.com/thumbnail?id=1mCGlrJC0Ok7V1jpWQtw7-wlbtecIzyI8' },
  { id: '11a', nama: 'Ibu Pipit Riyahapita', jabatan: 'Sekretaris Majelis Taklim', peran: 'Majelis Taklim', foto: 'https://drive.google.com/thumbnail?id=1zN2giObeET5EfzIWs53RswV9fhyviCr-' },
  { id: '11b', nama: 'Ibu Rosmaria', jabatan: 'Bendahara Majelis Taklim', peran: 'Majelis Taklim', foto: 'https://drive.google.com/thumbnail?id=1tmPEwxOrkpN2hD1NUhfL14PVQMXDLL0N' },
  
  // KJS
  { id: '12', nama: 'Ibu Uum Sari', jabatan: 'Ketua KJS', peran: 'KJS', foto: 'https://drive.google.com/thumbnail?id=1G5ytxnM56NUZoDPmGlfcF9pTFs16xG4h' },
  { id: '12a', nama: 'Ibu Erry Yuliana', jabatan: 'Sekretaris KJS', peran: 'KJS', foto: 'https://drive.google.com/thumbnail?id=1MisIRXirwcTS4VLAPg7G67Pwh2cyTNyL' }
];

export const BERITA_DEFAULT: Berita[] = [
  {
    id: 'b1',
    judul: 'Pelaksanaan Posyandu Balita Bulan Juni 2026 Berjalan Sukses',
    ringkasan: 'Sebanyak 92 Balita RW 015 tercatat menghadiri Posyandu rutin untuk penimbangan berat badan, imunisasi wajib, serta pembagian makanan tambahan (PMT) bergizi tinggi.',
    konten: `Kegiatan rutin Posyandu Cendrawasih 1 yang diadakan pada hari Senin tanggal 8 Juni 2026 bertempat di Sekretariat RW 015 Blok C2 sukses terlaksana dengan sangat tertib. Tercatat kehadiran balita mencapai rekor tertinggi sebanyak 92 balita dari total 102 target balita di wilayah RW 015.\n\nKetua Posyandu, Ibu Dr. Endah Lestari, menjelaskan bahwa fokus bulan ini adalah pemberian vitamin A serta imbauan khusus imunisasi polio tambahan. Para bayi dan balita didata perkembangannya (berat badan, tinggi badan, lingkar kepala), dilanjutkan dengan pengisian Buku KIA, penyuluhan gizi bagi ibu menyusui, serta pembagian menu PMT berupa bubur kacang hijau premium lengkap dengan telur puyuh rebus kuah santan higienis.\n\nKader PKK juga aktif memberikan wejangan interaktif kepada para ibu baru terkait teknik MPASI (Makanan Pendamping ASI) kaya protein hewani guna mencegah terjadinya stunting anak usia dini.`,
    tanggal: '2026-06-08',
    kategori: 'Posyandu',
    gambar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    judul: 'PMT Sehat Berbasis Lokal, Ibu Kreatif Balita Lahap',
    ringkasan: 'Ibu-ibu kader PKK RW 015 menggelar demo masak resep Makanan Pendamping ASI (MPASI) sehat berbasis bahan lokal dengan harga terjangkau.',
    konten: `Sebagai wujud kepedulian terhadap kecukupan nutrisi anak, Pengurus PKK RW 015 menyelenggarakan sosialisasi kreasi Menu Makanan Tambahan (PMT) Sehat Mandiri. Dilaksanakan di pelataran Balai RW pada sore hari, acara demo masak ini mempraktikkan pengolahan puding pepaya susu, sup jagung telur puyuh, dan sate bola tahu tempe goreng mentega yang padat kalori serta kaya lisin.\n\nIbu Siti Hajar selaku Ketua PKK RW 015 menekankan, "Kami tidak perlu mengeluarkan uang mahal untuk membelikan suplemen anak. Melalui bimbingan resep kader, bahan tradisional serba murah seperti ubi jalar merah dan ikan teri bisa disulap menjadi makanan super penunjang pertumbuhan otak balita." Warga yang hadir tampak sangat antusias, mencatat resep, dan mencicipi hidangan kreasi kader bersama-sama anak-anak mereka.`,
    tanggal: '2026-06-05',
    kategori: 'Kegiatan PKK',
    gambar: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    judul: 'Deteksi Dini Penyakit Tidak Menular melayani 64 Warga Lansia',
    ringkasan: 'Layanan Posbindu PTM RW 015 kembali sukses menyasar para bapak dan ibu lansia untuk mengukur tekanan darah, gula darah, serta konseling gizi pencegahan diabetes.',
    konten: `Layanan Posbindu Penyakit Tidak Menular (PTM) RW 015 kembali digelar bertepatan dengan pelaksanaan Senam Jantung Sehat. Sebanyak 64 warga mendaftarkan diri secara proaktif.\n\nPemeriksaan meliputi penimbangan berat badan, lingkar perut (deteksi obesitas sentral), pengecekan tensi darah, hingga uji lab sederhana kadar gula darah sewaktu, asam urat, dan kolesterol total.\n\n"Dari hasil lab hari ini, tensi rata-rata lansia kita cenderung stabil baik, namun ada sekitar 15% warga yang memiliki kadar asam urat di atas ambang normal. Kami langsung arahkan mereka ke pos konseling gizi dan mendesak pengurangan asupan jeroan emping serta santan berlebih," ungkap Ketua Posbindu Ibu Hartati. Warga merasa senang dengan layanan jemput bola yang murah meriah ini.`,
    tanggal: '2026-05-30',
    kategori: 'Posbindu',
    gambar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
  }
];

export const AGENDA_DEFAULT: Agenda[] = [
  {
    id: 'a1',
    judul: 'Rutin Bulanan Posyandu Cendrawasih 1',
    tanggal: '2026-06-12',
    waktu: '08:00 - 11:30 WIB',
    lokasi: 'Sekretariat RW 015, Jl. Cempaka Blok C2',
    deskripsi: 'Penimbangan, imunisasi BCG, Polio, Campak, Vitamin A, pembagian PMT Sehat bagi balita usia 0-5 tahun.',
    kategori: 'Posyandu',
    penanggungJawab: 'Ibu Dr. Endah Lestari'
  },
  {
    id: 'a2',
    judul: 'Senam Jantung Sehat & Cek Kesehatan Posbindu',
    tanggal: '2026-06-14',
    waktu: '08:00 - 10:30 WIB',
    lokasi: 'Lapangan Serbaguna Pesona Gading',
    deskripsi: 'Senam jasmani bersama dipandu instruktur, disusul pemeriksaan gratis (tensi, lingkar perut, berat badan) dan cek gula darah berbayar subsidi.',
    kategori: 'Posbindu',
    penanggungJawab: 'Ibu Hartati Wardani'
  },
  {
    id: 'a3',
    judul: 'Kajian Rohani Muslimah & Arisan PKK RW 015',
    tanggal: '2026-06-20',
    waktu: '15:30 - 17:30 WIB',
    lokasi: 'Masjid Al-Muhajirin Blok C2',
    deskripsi: 'Kajian fiqih ibadah wanita dan rapat pleno persiapan HUT Kemerdekaan RI di lingkungan RW 015.',
    kategori: 'Majelis Taklim',
    penanggungJawab: 'Ibu Hajah Romlah'
  },
  {
    id: 'a4',
    judul: 'Posyandu Tambahan Imunisasi Polio Nasional',
    tanggal: '2026-07-03',
    waktu: '08:30 - 12:00 WIB',
    lokasi: 'Samping Pos Satpam Blok C',
    deskripsi: 'Pelaksanaan imunisasi polio khusus gelombang sekunder demi membebaskan RW 015 dari kelumpuhan polio anak.',
    kategori: 'Posyandu',
    penanggungJawab: 'Ibu Nurul Hidayah'
  }
];

export const SENSUS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYG3FkCHn7OXTyiLCtqdLwFkFexQQVXVlPtwpxIOlzWt3mpcCZbMyYDp2p4PabbbQnB1GciwkokN20/pub?gid=1055267267&single=true&output=csv';
export const VISIT_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYG3FkCHn7OXTyiLCtqdLwFkFexQQVXVlPtwpxIOlzWt3mpcCZbMyYDp2p4PabbbQnB1GciwkokN20/pub?gid=0&single=true&output=csv';

export const DEMOGRAFI_DATA: DemografiData[] = [
  { kategori: 'Balita (0-5 Thn)', jumlah: 126, persen: 5.1 },
  { kategori: 'Anak-Remaja (6-19 Thn)', jumlah: 812, persen: 32.9 },
  { kategori: 'Dewasa Produktif (20-59 Thn)', jumlah: 1451, persen: 58.9 },
  { kategori: 'Lansia (>=60 Thn)', jumlah: 76, persen: 3.1 }
];

export const KUNJUNGAN_BULANAN: KunjunganBulanan[] = [
  { bulan: 'Nov 25', balita: 41, lansia: 7, total: 48 },
  { bulan: 'Des 25', balita: 31, lansia: 5, total: 36 },
  { bulan: 'Jan 26', balita: 25, lansia: 6, total: 31 },
  { bulan: 'Feb 26', balita: 33, lansia: 7, total: 40 },
  { bulan: 'Apr 26', balita: 34, lansia: 3, total: 37 },
  { bulan: 'Mei 26', balita: 112, lansia: 12, total: 124 }
];

export const GALERI_DEFAULT: GaleriItem[] = [
  {
    id: 'g-ptm-1',
    judul: 'Validasi Input Data PTM - Pencatatan Kader',
    deskripsi: 'Proses pencatatan hasil pemeriksaan faktor risiko PTM (Penyakit Tidak Menular) oleh kader Posbindu ke dalam sistem digital.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1piVBVNeiswWhJheZCeE8wtyKUwHlfbqd',
    tanggal: '2026-04-18'
  },
  {
    id: 'g-ptm-2',
    judul: 'Validasi Input Data PTM - Verifikasi Data Kesehatan',
    deskripsi: 'Pemeriksaan kemiripan data fisik dengan input digital guna memastikan validitas data sebelum diunggah.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1W7usTQQ6bcdH5Rets5AMuds7h3f2J49c',
    tanggal: '2026-04-18'
  },
  {
    id: 'g-ptm-3',
    judul: 'Validasi Input Data PTM - Rekonsiliasi Hasil Pemeriksaan',
    deskripsi: 'Pencocokan data hasil cek gula darah, tensi, dan kolesterol warga binaan RW 015.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1E8kBKSF6yAv11uxHIQs7PPZcC8wRb6ZG',
    tanggal: '2026-04-18'
  },
  {
    id: 'g-ptm-4',
    judul: 'Validasi Input Data PTM - Evaluasi Sistem Posbindu',
    deskripsi: 'Evaluasi akurasi data PTM guna memastikan pelaporan berkala Pos Gading berjalan akurat dan transparan.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1igBnH065Y2QheNMULRWlWsxtofGv0xF3',
    tanggal: '2026-04-18'
  },
  {
    id: 'g-pb-1',
    judul: 'Giat Posbindu - Pengukuran Tinggi & Berat Badan',
    deskripsi: 'Pengukuran tinggi badan dan berat badan mandiri oleh warga binaan didampingi kader Posbindu.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1Lt_8phAAI8KLPHSXuUc45ImetD6ooi_1',
    tanggal: '2026-04-11'
  },
  {
    id: 'g-pb-2',
    judul: 'Giat Posbindu - Pemeriksaan Tensi Darah',
    deskripsi: 'Pemeriksaan tekanan darah warga dewasa dan lansia guna mendeteksi secara dini risiko hipertensi.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1cFrm_GYeTTPVEgbV5rfU4ckIpZ2KG777',
    tanggal: '2026-04-11'
  },
  {
    id: 'g-pb-3',
    judul: 'Giat Posbindu - Cek Gula Darah & Kolesterol',
    deskripsi: 'Uji klinis kadar gula darah sewaktu dan asam urat bapak lansia oleh asisten tenaga kesehatan.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1PVZlrUfHGp00yHuX2mrGUKBWqqbDh4NF',
    tanggal: '2026-04-11'
  },
  {
    id: 'g-pb-4',
    judul: 'Giat Posbindu - Konsultasi & Edukasi Medis',
    deskripsi: 'Konseling pola makan sehat dan anjuran olahraga bagi warga pasca pengecekan parameter kesehatan.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1lvESZB0MzXYWlBEZuprKD_nXi3tHUX2a',
    tanggal: '2026-04-11'
  },
  {
    id: 'g-pb-5',
    judul: 'Giat Posbindu - Layanan Registrasi Warga',
    deskripsi: 'Pendaftaran dan pengisian booklet catatan kesehatan PTM warga oleh jajaran pengurus Posbindu.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1bKrcw_87FzSwWw8UK8O6WAJ_knmC3vRX',
    tanggal: '2026-04-11'
  },
  {
    id: 'g-pb-6',
    judul: 'Giat Posbindu - Foto Bersama Tim Kader',
    deskripsi: 'Sennyum hangat dan kekompakan jajaran kader pengurus Posbindu RW 015 Pesona Gading selesai giat.',
    kategori: 'Posbindu',
    gambar: 'https://lh3.googleusercontent.com/u/0/d/1s1wagoyy8wiDDe4rVNbSt5pkpCPBJI5B',
    tanggal: '2026-04-11'
  }
];
