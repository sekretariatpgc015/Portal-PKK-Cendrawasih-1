import React from 'react';
import { Activity, Beaker, Shield, Clock, Heart, Users } from 'lucide-react';
import DemografiChart from './DemografiChart';

const SERVICES_BINDU = [
  {
    icon: <Activity className="w-5 h-5 text-sky-500" />,
    title: 'Pemeriksaan Tensi Berkala',
    desc: 'Pengukuran tekanan darah rutin secara digital maupun manual untuk mengontrol risiko penyakit hipertensi kronis warga.'
  },
  {
    icon: <Beaker className="w-5 h-5 text-sky-500" />,
    title: 'Cek Gula Darah, Asam Urat, & Kolesterol',
    desc: 'Layanan laboratorium portable cepat murah bersubsidi guna mengawal indikasi penyakit kardiovaskular sejak dini.'
  },
  {
    icon: <Heart className="w-5 h-5 text-sky-400" />,
    title: 'Konseling Nutrisi & Gizi Lansia',
    desc: 'Pemberian arahan diet rendah kolesterol, menu rendah purin, dan bimbingan olahraga ramah tulang sendi bagi usia lanjut.'
  },
  {
    icon: <Users className="w-5 h-5 text-sky-500" />,
    title: 'Sensus & Rujukan Berkas Medis',
    desc: 'Pendataan rekam medis sederhana di kartu kontrol Posbindu, serta koordinasi rujukan langsung ke puskesmas pembantu.'
  }
];

export default function Posbindu() {
  return (
    <div id="posbindu-container" className="space-y-16 pb-12 animate-in fade-in duration-500">
      
      {/* HEADER SECTION WITH BANNER & OVERVIEW */}
      <section id="posbindu-overview" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Banner image generated */}
        <div className="lg:col-span-5 order-last lg:order-first flex justify-center">
          <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl shadow-lg border-2 border-sky-100 bg-sky-50/20 overflow-hidden">
            <img 
              src="/src/assets/images/posbindu_illustration_1780942140804.png" 
              alt="Posbindu Lansia & Dewasa Berkala" 
              className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Soft floating dynamic label */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-sky-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
              <p className="text-[10px] sm:text-xs font-bold text-slate-800 font-display">Tensi & Cek Darah Bersubsidi</p>
            </div>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-semibold tracking-wide uppercase">
            <span className="w-5 h-5 rounded-full overflow-hidden bg-white border border-sky-200/60 p-0.5 inline-flex items-center justify-center">
              <img 
                src="https://drive.google.com/thumbnail?id=1YibmCQLufPZ9t5gDx7I7JTLY4m1oymrM" 
                alt="Logo Posbindu" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </span>
            Pos Monitoring Penyakit Tidak Menular
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display leading-tight">
            PTM Cendrawasih 1 <br />
            <span className="text-sky-650">Kebugaran Lansia RW 015</span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Menyediakan deteksi dini faktor risiko Penyakit Tidak Menular (PTM) secara mandiri bagi seluruh warga RW 015 yang berusia 15 tahun ke atas, terutama kelompok lansia. Bersinergi aktif dengan instruktur Klub Jantung Sehat (KJS) pasca senam pagi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50/30 rounded-2xl border border-sky-100/50 flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800 font-display">Waktu Pelaksanaan:</p>
                <p className="text-[11px] text-slate-600">Minggu Ke-2 setiap bulan, jam 08.00 - 10.30 WIB.</p>
              </div>
            </div>
            <div className="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50 flex items-start gap-2.5">
              <Activity className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800 font-display">Kombinasi Agenda:</p>
                <p className="text-[11px] text-slate-600">Diawali Senam Bugar Jantung KJS lalu dilanjutkan tensi berkala.</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* CHARTS GRAPHIC SECTION */}
      <section id="chart-metrics-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left side checklist */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display text-slate-900">Perincian Layanan Deteksi</h3>
            <p className="text-xs text-slate-500">Mencegah penyakit degeneratif seperti asam urat, gula darah berlebih, hipertensi, dan kolesterol berlebih.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {SERVICES_BINDU.map((svc, i) => (
              <div 
                id={`bindu-svc-${i}`}
                key={i} 
                className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all flex gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                  {svc.icon}
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="font-bold text-slate-800 text-xs font-display">{svc.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side charts */}
        <div className="lg:col-span-7">
          <DemografiChart />
        </div>

      </section>

    </div>
  );
}
