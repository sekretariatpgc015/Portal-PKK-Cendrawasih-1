import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ChevronRight, Clock, MapPin, Calendar, Heart } from 'lucide-react';

interface MejaPosyandu {
  id: number;
  nama: string;
  tugas: string;
  keterangan: string;
  kader: string;
}

const FIVE_MEJA: MejaPosyandu[] = [
  {
    id: 1,
    nama: 'Meja 1: Pendaftaran',
    tugas: 'Pencatatan administrasi balita & ibu hamil',
    keterangan: 'Pendaftaran dilakukan langsung saat warga tiba di lokasi. Bayi, balita, atau ibu hamil didaftarkan namanya ke dalam data antrean, serta dicocokkan dengan kartu identitas warga RW 015.',
    kader: 'Ibu Nurul Hidayah & Kader RT'
  },
  {
    id: 2,
    nama: 'Meja 2: Pengukuran & Penimbangan',
    tugas: 'Pemeriksaan dimensi tumbuh-kembang fisik',
    keterangan: 'Dilakukan penimbangan berat badan (bayi menggunakan dacin/timbangan digital bayi, balita menggunakan timbangan injak), pengukuran tinggi badan/panjang badan, dan lingkar kepala bayi.',
    kader: 'Ibu Sri Wahyuni & Pendamping Teknis'
  },
  {
    id: 3,
    nama: 'Meja 3: Pencatatan Buku KIA / KMS',
    tugas: 'Penyimpanan komparatif riwayat pertumbuhan',
    keterangan: 'Hasil penimbangan dan pengukuran langsung dicatat secara cermat di dalam buku Kartu Menuju Sehat (KMS) atau Buku KIA (Kesehatan Ibu dan Anak). Hal ini bertujuan mendeteksi grafik tumbuh kembang secara dini.',
    kader: 'Kader PKK Bidang Kesehatan'
  },
  {
    id: 4,
    nama: 'Meja 4: Penyuluhan & PMT',
    tugas: 'Konsultasi gizi & suplemen tambahan',
    keterangan: 'Pemberian saran gizi seimbang oleh kader terlatih terkait status anak. Di meja ini juga dibagikan Makanan Tambahan (PMT) sehat, bernutrisi protein hewani tinggi yang dirancang oleh kader gizi PKK RW 015.',
    kader: 'Ibu Siti Hajar & Kader Gizi'
  },
  {
    id: 5,
    nama: 'Meja 5: Pelayanan Medis Kesehatan',
    tugas: 'Imunisasi, vitamin A, & pemeriksaan bidan',
    keterangan: 'Meja pelayanan kesehatan profesional dikoordinir langsung oleh Bidan Puskesmas pembantu Wanajaya. Pelayanan mencakup pemberian imunisasi dasar wajib, tetes Vitamin A gratis, pil KB/suntik, serta rujukan resmi jika balita sakit.',
    kader: 'Bidan Puskesmas Desa Wanajaya'
  }
];

export default function Posyandu() {
  const [activeMeja, setActiveMeja] = useState<number>(1);

  return (
    <div id="posyandu-container" className="space-y-16 pb-12 animate-in fade-in duration-500">
      
      {/* OVERVIEW & BANNER SECTION */}
      <section id="posyandu-overview" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Texts */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-semibold tracking-wide uppercase">
            <span className="w-5 h-5 rounded-full overflow-hidden bg-white border border-pink-200/60 p-0.5 inline-flex items-center justify-center">
              <img 
                src="https://drive.google.com/thumbnail?id=1CDc8NgkvTXXDVm0GNC16U8P1sh1atMNg" 
                alt="Logo Posyandu" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </span>
            Program Posyandu Balita
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display leading-tight">
            Layanan Terpadu KIA <br />
            <span className="text-pink-600">Posyandu Cendrawasih 1</span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Menyelenggarakan pelayanan kesehatan yang ramah, bersih, dan berkelanjutan secara mandiri bagi pertumbuhan buah hati Anda secara prima. Komitmen kami adalah mendampingi masa emas tumbuh kembang bebas stunting.
          </p>
          
          {/* Quick Schedule Notice */}
          <div className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100 flex items-start gap-3">
            <Clock className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-800 font-display">Jadwal Buka Layanan:</p>
              <p className="text-xs text-slate-600 mt-1">
                Setiap <strong>Minggu ke-2</strong> setiap bulan (Hari Jumat/Sabtu fleksibel sesuai agenda dikoordinasi RT), Pukul <strong>08:30 - 11:30 WIB</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Image Generated */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl shadow-lg border-2 border-pink-100 bg-pink-50/30 overflow-hidden">
            <img 
              src="/src/assets/images/posyandu_illustration_1780942125073.png" 
              alt="Posyandu Balita RW 015" 
              className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Soft decorative float */}
            <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-full shadow-sm text-[10px] font-bold text-pink-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" />
              Buku KIA Wajib Dibawa
            </div>
          </div>
        </div>

      </section>

      {/* INTERACTIVE 5 MEJA SHOWCASE */}
      <section id="alur-5-meja" className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Alur Kerja 5 Meja Kesehatan</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Sistem birokrasi pelayanan Posyandu Nasional yang diterapkan secara runut guna memastikan kenyamanan pendataan balita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel Selection list */}
          <div className="lg:col-span-4 space-y-2">
            {FIVE_MEJA.map(meja => {
              const isActive = activeMeja === meja.id;
              return (
                <button
                  id={`meja-toggle-${meja.id}`}
                  key={meja.id}
                  onClick={() => setActiveMeja(meja.id)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    isActive 
                      ? 'bg-gradient-to-r from-pink-50 to-pink-100/50 border-pink-300 shadow-sm text-pink-900 font-medium' 
                      : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className={`text-xs font-bold font-display ${isActive ? 'text-pink-600' : 'text-slate-800'}`}>
                      {meja.nama}
                    </p>
                    <p className="text-[10px] text-slate-500 font-normal line-clamp-1">{meja.tugas}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-pink-500' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right panel Detailed Content card */}
          {(() => {
            const currentMeja = FIVE_MEJA.find(m => m.id === activeMeja) || FIVE_MEJA[0];
            return (
              <div id="meja-detail-panel" className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-pink-100/50 shadow-sm space-y-6 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-pink-50">
                  <div className="space-y-1">
                    <span className="px-2.5 py-1 bg-pink-100 text-pink-700 rounded-lg text-[10px] font-bold uppercase font-mono">
                      Tahapan Ke-{currentMeja.id}
                    </span>
                    <h3 className="text-xl font-bold font-display text-slate-900 mt-1">{currentMeja.nama}</h3>
                  </div>
                  
                  {/* Kader badge */}
                  <div className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] sm:text-xs">
                    <span className="text-slate-400 font-sans">Kader Tugas:</span>{' '}
                    <strong className="text-slate-700 font-semibold">{currentMeja.kader}</strong>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Tanggung Jawab Desk:</h4>
                    <p className="text-slate-700 text-sm font-semibold">{currentMeja.tugas}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Rincian Operasional & Alur:</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{currentMeja.keterangan}</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs text-slate-500 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Kader kami mematuhi protokol kesehatan dan kebersihan bersertifikat Puskesmas.</span>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

    </div>
  );
}
