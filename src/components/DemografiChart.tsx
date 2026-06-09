import React, { useState, useEffect } from 'react';
import { DEMOGRAFI_DATA, KUNJUNGAN_BULANAN, SENSUS_CSV_URL, VISIT_CSV_URL } from '../data';
import { Heart, Activity, Users } from 'lucide-react';

// Helper to parse CSV row handling potential quotes (e.g. titles with commas)
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
};

// Helper to generate SVG Arc / Donut slice path
const getDonutPath = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number
) => {
  let angleDiff = endAngle - startAngle;
  if (angleDiff >= 360) {
    angleDiff = 359.99;
  }
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = ((startAngle + angleDiff) * Math.PI) / 180;

  const x1 = cx + rx * Math.cos(startRad);
  const y1 = cy + ry * Math.sin(startRad);
  const x2 = cx + rx * Math.cos(endRad);
  const y2 = cy + ry * Math.sin(endRad);

  const x3 = cx + innerRadius * Math.cos(endRad);
  const y3 = cy + innerRadius * Math.sin(endRad);
  const x4 = cx + innerRadius * Math.cos(startRad);
  const y4 = cy + innerRadius * Math.sin(startRad);

  const largeArcFlag = angleDiff > 180 ? 1 : 0;

  return `
    M ${x1} ${y1}
    A ${rx} ${ry} 0 ${largeArcFlag} 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
    Z
  `.trim();
};

export default function DemografiChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredPusIndex, setHoveredPusIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'demografi' | 'tren' | 'wus' | 'pus'>('demografi');
  const [demografiData, setDemografiData] = useState<any[]>(DEMOGRAFI_DATA);
  const [wusAgeData, setWusAgeData] = useState<any[]>([
    { kategori: '15-24 Thn', jumlah: 283, persen: 31.5 },
    { kategori: '25-34 Thn', jumlah: 135, persen: 15.1 },
    { kategori: '35-44 Thn', jumlah: 236, persen: 26.3 },
    { kategori: '45-59 Thn', jumlah: 243, persen: 27.1 }
  ]);
  const [wusRtData, setWusRtData] = useState<any[]>([
    { rt: '001', jumlah: 144 },
    { rt: '002', jumlah: 112 },
    { rt: '003', jumlah: 130 },
    { rt: '004', jumlah: 78 },
    { rt: '005', jumlah: 101 },
    { rt: '006', jumlah: 116 },
    { rt: '007', jumlah: 56 },
    { rt: '008', jumlah: 79 },
    { rt: '009', jumlah: 81 }
  ]);
  const [wusKawinData, setWusKawinData] = useState<any[]>([
    { status: 'KAWIN', jumlah: 541, persen: 60.3 },
    { status: 'BELUM KAWIN', jumlah: 308, persen: 34.3 },
    { status: 'CERAI MATI', jumlah: 18, persen: 2.0 },
    { status: 'CERAI HIDUP', jumlah: 7, persen: 0.8 },
    { status: 'LAINNYA', jumlah: 23, persen: 2.6 }
  ]);
  const [pusAgeData, setPusAgeData] = useState<any[]>([
    { kategori: '15-24 Thn', jumlah: 8, persen: 1.7 },
    { kategori: '25-34 Thn', jumlah: 98, persen: 21.0 },
    { kategori: '35-44 Thn', jumlah: 220, persen: 47.1 },
    { kategori: '45-49 Thn', jumlah: 141, persen: 30.2 }
  ]);
  const [pusRtData, setPusRtData] = useState<any[]>([
    { rt: '001', jumlah: 60 },
    { rt: '002', jumlah: 50 },
    { rt: '003', jumlah: 67 },
    { rt: '004', jumlah: 36 },
    { rt: '005', jumlah: 55 },
    { rt: '006', jumlah: 60 },
    { rt: '007', jumlah: 31 },
    { rt: '008', jumlah: 40 },
    { rt: '009', jumlah: 68 }
  ]);
  const [completeVisitData, setCompleteVisitData] = useState<any[]>(() => {
    return KUNJUNGAN_BULANAN.map(item => {
      const parts = item.bulan.split(' ');
      let tahun = 2026;
      if (parts.length === 2) {
        const yr = parseInt(parts[1], 10);
        if (!isNaN(yr)) {
          tahun = yr < 100 ? 2000 + yr : yr;
        }
      }
      return { ...item, tahun };
    });
  });
  const [selectedYear, setSelectedYear] = useState<string>('Semua');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveVisit, setIsLiveVisit] = useState<boolean>(false);
  const [isLoadingVisit, setIsLoadingVisit] = useState<boolean>(false);

  const availableYears = React.useMemo(() => {
    const years = new Set<number>();
    completeVisitData.forEach(item => {
      if (item.tahun) years.add(item.tahun);
    });
    return Array.from(years).sort((a, b) => a - b);
  }, [completeVisitData]);

  const kunjunganData = React.useMemo(() => {
    if (selectedYear === 'Semua') {
      return completeVisitData.slice(-8);
    } else {
      const yearInt = parseInt(selectedYear, 10);
      return completeVisitData.filter(item => item.tahun === yearInt);
    }
  }, [completeVisitData, selectedYear]);

  useEffect(() => {
    setIsLoading(true);
    fetch(SENSUS_CSV_URL)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) return;

        const headers = parseCSVLine(lines[0]);
        const ageIdx = headers.findIndex(h => h.trim().toUpperCase() === 'USIA');
        if (ageIdx === -1) return;

        const jkIdx = headers.findIndex(h => h.trim().toUpperCase() === 'JENIS KELAMIN');
        const rtIdx = headers.findIndex(h => h.trim().toUpperCase() === 'RT');
        const kawinIdx = headers.findIndex(h => h.trim().toUpperCase() === 'STATUS KAWIN');

        let balita = 0;
        let anakRemaja = 0;
        let dewasa = 0;
        let lansia = 0;
        let total = 0;

        let wus15_24 = 0;
        let wus25_34 = 0;
        let wus35_44 = 0;
        let wus45_59 = 0;
        let wusTotal = 0;

        const wusRtLocal: Record<string, number> = {};
        const wusKawinLocal: Record<string, number> = {};

        let pus15_24 = 0;
        let pus25_34 = 0;
        let pus35_44 = 0;
        let pus45_49 = 0;
        let pusTotal = 0;
        const pusRtLocal: Record<string, number> = {};

        for (let i = 1; i < lines.length; i++) {
          const cols = parseCSVLine(lines[i]);
          if (cols.length <= ageIdx) continue;
          const ageStr = cols[ageIdx];
          const age = parseInt(ageStr, 10);
          if (isNaN(age)) continue;

          total++;
          if (age >= 0 && age <= 5) {
            balita++;
          } else if (age >= 6 && age <= 19) {
            anakRemaja++;
          } else if (age >= 20 && age <= 59) {
            dewasa++;
          } else if (age >= 60) {
            lansia++;
          }

          // WUS parsing (Perempuan, 15-59 Tahun) dan PUS (Wanita Kawin, 15-49 Tahun)
          if (jkIdx !== -1 && cols.length > jkIdx) {
            const jk = cols[jkIdx].trim().toUpperCase();
            if (jk === 'PEREMPUAN' && age >= 15 && age <= 59) {
              wusTotal++;
              if (age >= 15 && age <= 24) wus15_24++;
              else if (age >= 25 && age <= 34) wus25_34++;
              else if (age >= 35 && age <= 44) wus35_44++;
              else if (age >= 45 && age <= 59) wus45_59++;

              if (rtIdx !== -1 && cols.length > rtIdx) {
                const rt = cols[rtIdx].trim();
                if (rt) {
                  wusRtLocal[rt] = (wusRtLocal[rt] || 0) + 1;
                }
              }

              if (kawinIdx !== -1 && cols.length > kawinIdx) {
                const kawin = cols[kawinIdx].trim().toUpperCase();
                wusKawinLocal[kawin] = (wusKawinLocal[kawin] || 0) + 1;
              }

              // PUS (Pasangan Usia Subur) -> Wanita Kawin, 15-49 tahun
              const kawin = kawinIdx !== -1 && cols.length > kawinIdx ? cols[kawinIdx].trim().toUpperCase() : '';
              if (kawin === 'KAWIN' && age >= 15 && age <= 49) {
                pusTotal++;
                if (age >= 15 && age <= 24) pus15_24++;
                else if (age >= 25 && age <= 34) pus25_34++;
                else if (age >= 35 && age <= 44) pus35_44++;
                else if (age >= 45 && age <= 49) pus45_49++;

                if (rtIdx !== -1 && cols.length > rtIdx) {
                  const rt = cols[rtIdx].trim();
                  if (rt) {
                    pusRtLocal[rt] = (pusRtLocal[rt] || 0) + 1;
                  }
                }
              }
            }
          }
        }

        if (total > 0) {
          const percent = (v: number) => parseFloat(((v / total) * 100).toFixed(1));
          setDemografiData([
            { kategori: 'Balita (0-5 Thn)', jumlah: balita, persen: percent(balita) },
            { kategori: 'Anak-Remaja (6-19 Thn)', jumlah: anakRemaja, persen: percent(anakRemaja) },
            { kategori: 'Dewasa Produktif (20-59 Thn)', jumlah: dewasa, persen: percent(dewasa) },
            { kategori: 'Lansia (>=60 Thn)', jumlah: lansia, persen: percent(lansia) }
          ]);

          if (wusTotal > 0) {
            const wusPercent = (v: number) => parseFloat(((v / wusTotal) * 100).toFixed(1));
            setWusAgeData([
              { kategori: '15-24 Thn', jumlah: wus15_24, persen: wusPercent(wus15_24) },
              { kategori: '25-34 Thn', jumlah: wus25_34, persen: wusPercent(wus25_34) },
              { kategori: '35-44 Thn', jumlah: wus35_44, persen: wusPercent(wus35_44) },
              { kategori: '45-59 Thn', jumlah: wus45_59, persen: wusPercent(wus45_59) }
            ]);

            const rtList = Object.keys(wusRtLocal).sort().map(rt => {
              const formattedRt = rt.padStart(3, '0');
              return {
                rt: formattedRt,
                jumlah: wusRtLocal[rt]
              };
            });
            if (rtList.length > 0) {
              setWusRtData(rtList);
            }

            const processedKawin = [] as any[];
            let accounted = 0;
            const knownStatus = ['KAWIN', 'BELUM KAWIN', 'CERAI MATI', 'CERAI HIDUP'];
            knownStatus.forEach(st => {
              const val = wusKawinLocal[st] || 0;
              accounted += val;
              processedKawin.push({
                status: st,
                jumlah: val,
                persen: wusPercent(val)
              });
            });
            const remaining = wusTotal - accounted;
            if (remaining > 0) {
              processedKawin.push({
                status: 'LAINNYA',
                jumlah: remaining,
                persen: wusPercent(remaining)
              });
            }
            setWusKawinData(processedKawin);
          }

          if (pusTotal > 0) {
            const pusPercent = (v: number) => parseFloat(((v / pusTotal) * 100).toFixed(1));
            setPusAgeData([
              { kategori: '15-24 Thn', jumlah: pus15_24, persen: pusPercent(pus15_24) },
              { kategori: '25-34 Thn', jumlah: pus25_34, persen: pusPercent(pus25_34) },
              { kategori: '35-44 Thn', jumlah: pus35_44, persen: pusPercent(pus35_44) },
              { kategori: '45-49 Thn', jumlah: pus45_49, persen: pusPercent(pus45_49) }
            ]);

            const rtListPus = Object.keys(pusRtLocal).sort().map(rt => {
              const formattedRt = rt.padStart(3, '0');
              return {
                rt: formattedRt,
                jumlah: pusRtLocal[rt]
              };
            });
            if (rtListPus.length > 0) {
               setPusRtData(rtListPus);
            }
          }
          setIsLive(true);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch live census data:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoadingVisit(true);
    fetch(VISIT_CSV_URL)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) return;

        const headers = parseCSVLine(lines[0]);
        const dateIdx = headers.findIndex(h => h.trim().toUpperCase() === 'TANGGAL');
        const ageIdx = headers.findIndex(h => h.trim().toUpperCase() === 'USIA');
        if (dateIdx === -1 || ageIdx === -1) return;

        const monthlyMap = {} as Record<string, { dewasa: number; lansia: number; total: number }>;

        for (let i = 1; i < lines.length; i++) {
          const cols = parseCSVLine(lines[i]);
          if (cols.length <= Math.max(dateIdx, ageIdx)) continue;
          
          const dateStr = cols[dateIdx];
          const ageStr = cols[ageIdx];
          if (!dateStr) continue;

          const dateParts = dateStr.split('/');
          if (dateParts.length !== 3) continue;

          const monthNum = parseInt(dateParts[1], 10);
          const yearNum = parseInt(dateParts[2], 10);
          const age = parseInt(ageStr, 10);
          if (isNaN(monthNum) || isNaN(yearNum) || isNaN(age)) continue;

          // Key as YYYY-MM
          const key = `${yearNum}-${monthNum.toString().padStart(2, '0')}`;
          if (!monthlyMap[key]) {
            monthlyMap[key] = { dewasa: 0, lansia: 0, total: 0 };
          }

          monthlyMap[key].total++;
          if (age >= 60) {
            monthlyMap[key].lansia++;
          } else {
            monthlyMap[key].dewasa++;
          }
        }

        const sortedKeys = Object.keys(monthlyMap).sort();

        const indMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

        const parsedVisits = sortedKeys.map(key => {
          const [year, month] = key.split('-');
          const monthIdx = parseInt(month, 10) - 1;
          const label = `${indMonthNames[monthIdx]} ${year.substring(2)}`;
          const data = monthlyMap[key];
          return {
            bulan: label,
            balita: data.dewasa,
            lansia: data.lansia,
            total: data.total,
            tahun: parseInt(year, 10)
          };
        });

        if (parsedVisits.length > 0) {
          setCompleteVisitData(parsedVisits);
          setIsLiveVisit(true);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch live visit trends data:', err);
      })
      .finally(() => {
        setIsLoadingVisit(false);
      });
  }, []);

  const totalJiwa = demografiData.reduce((acc, curr) => acc + curr.jumlah, 0);

  // Demography dimensions
  const maxDemografi = Math.max(...demografiData.map(d => d.jumlah));

  // Visit trends dimensions & scale
  const months = kunjunganData.map(d => d.bulan);
  const maxVisit = Math.max(...kunjunganData.map(d => d.total), 1);
  const chartHeight = 220;
  const chartWidth = 500;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };

  return (
    <div id="demografi-chart-container" className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="font-sans font-semibold text-lg text-slate-800">
            {activeTab === 'demografi' 
              ? 'Demografi Kependudukan RW 015' 
              : activeTab === 'tren' 
                ? 'Tren Kunjungan Layanan Bulanan' 
                : activeTab === 'wus'
                  ? 'Analisis Wanita Usia Subur (WUS)'
                  : 'Analisis Pasangan Usia Subur (PUS)'}
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5 flex flex-wrap items-center gap-1.5">
            <span>
              {activeTab === 'demografi' 
                ? `Distribusi kelompok usia warga binaan Pos Gading RW 015 (Total: ${totalJiwa} Jiwa)` 
                : activeTab === 'tren'
                  ? 'Jumlah kunjungan pemeriksaan kesehatan warga (Dewasa & Lansia) semester terakhir'
                  : activeTab === 'wus'
                    ? `Kondisi kependudukan wanita usia 15-59 tahun di RW 015 (Total: ${wusAgeData.reduce((a, b) => a + b.jumlah, 0)} Jiwa)`
                    : `Jumlah pasangan suami istri dengan istri usia reproduktif (15-49 Thn) di RW 015 (Total: ${pusAgeData.reduce((a, b) => a + b.jumlah, 0)} PUS)`
              }
            </span>
            {activeTab === 'demografi' || activeTab === 'wus' || activeTab === 'pus' ? (
              isLive ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span className="w-1 px-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                  Live Sheets
                </span>
              ) : isLoading ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                  Memuat data...
                </span>
              ) : null
            ) : (
              isLiveVisit ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span className="w-1 px-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                  Live Sheets
                </span>
              ) : isLoadingVisit ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                  Memuat data...
                </span>
              ) : null
            )}
          </p>
        </div>
        
        {/* Toggle tabs and year filter */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          {activeTab === 'tren' && (
            <div id="year-filter-wrapper" className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 p-0.5 pl-2 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans font-semibold tracking-wide uppercase">Tahun:</span>
              <select
                id="select-year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white border border-slate-150 text-xs font-semibold text-rose-600 rounded-md px-1.5 py-1 cursor-pointer focus:outline-none focus:border-rose-350 focus:ring-1 focus:ring-rose-200 transition-all font-sans"
              >
                <option value="Semua">Semua</option>
                {availableYears.map(yr => (
                  <option key={yr} value={yr.toString()}>{yr}</option>
                ))}
              </select>
            </div>
          )}
 
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              id="tab-chart-demografi"
              onClick={() => setActiveTab('demografi')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'demografi'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Sensus Usia
            </button>
            <button
              id="tab-chart-wus"
              onClick={() => setActiveTab('wus')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'wus'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              WUS 15-59 Thn
            </button>
            <button
              id="tab-chart-pus"
              onClick={() => setActiveTab('pus')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'pus'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              PUS 15-49 Thn
            </button>
            <button
              id="tab-chart-tren"
              onClick={() => setActiveTab('tren')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'tren'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Tren Kunjungan
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'demografi' ? (
        /* SENSUS USIA CHART - Elegant custom interactive distribution bar-list */
        <div className="space-y-4">
          {demografiData.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const percentWidth = (item.jumlah / maxDemografi) * 100;
            return (
              <div 
                id={`demografi-row-${idx}`}
                key={item.kategori}
                className={`p-3 rounded-xl transition-all ${
                  isHovered ? 'bg-rose-50/55 scale-[1.01]' : 'hover:bg-slate-50'
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                  <span className="text-slate-700 font-sans flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      idx === 0 ? 'bg-pink-400' :
                      idx === 1 ? 'bg-sky-400' :
                      idx === 2 ? 'bg-indigo-400' :
                      'bg-emerald-400'
                    }`} />
                    {item.kategori}
                  </span>
                  <span className="text-slate-900 font-mono">
                    {item.jumlah} Jiwa <span className="text-slate-400 font-sans ml-1">({item.persen}%)</span>
                  </span>
                </div>
                
                {/* Custom Bar Container */}
                <div className="w-full bg-slate-150 h-3 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      idx === 0 ? 'bg-gradient-to-r from-pink-400 to-rose-500' :
                      idx === 1 ? 'bg-gradient-to-r from-sky-400 to-cyan-500' :
                      idx === 2 ? 'bg-gradient-to-r from-indigo-400 to-indigo-600' :
                      'bg-gradient-to-r from-emerald-400 to-teal-600'
                    }`}
                    style={{ width: `${percentWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
          
          <div className="pt-2 text-center text-[11px] text-slate-400">
            * Data disinkronkan secara langsung dari draf Sensus digital RW 015
          </div>
        </div>
      ) : activeTab === 'wus' ? (
        /* WANITA USIA SUBUR (WUS) DASHBOARD - Multi-faceted interactive metrics & charts */
        <div className="space-y-6">
          {/* Top banner summary */}
          <div className="bg-gradient-to-br from-pink-500/5 to-rose-500/10 p-5 rounded-2xl border border-pink-100 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest font-sans">Kelompok Sasaran Prioritas</span>
              <h4 className="text-2xl font-black text-slate-800 font-display tracking-tight">
                {wusAgeData.reduce((a, b) => a + b.jumlah, 0)} <span className="text-sm font-medium text-slate-500 font-sans">Wanita Usia Subur (15-59 Thn)</span>
              </h4>
              <p className="text-xs text-slate-600 max-w-xl">
                Wanita Usia Subur (WUS) merupakan pilar utama kesehatan keluarga guna menjaga kualitas reproduksi, pencegahan stunting masa depan, dan promosi kebugaran jasmani di tingkat RW.
              </p>
            </div>
            <div className="p-4 bg-pink-100 rounded-2xl text-pink-600 shrink-0">
              <Heart className="w-7 h-7 fill-pink-500/10 animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Rentang Usia Bar-List */}
            <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wider font-sans">
                <span className="w-1.5 h-3.5 bg-pink-500 rounded-full" />
                Sebaran Kelompok Usia WUS
              </h4>
              <div className="space-y-4">
                {wusAgeData.map((item, idx) => {
                  const maxVal = Math.max(...wusAgeData.map(d => d.jumlah), 1);
                  const percentWidth = (item.jumlah / maxVal) * 100;
                  return (
                    <div key={item.kategori} className="group">
                      <div className="flex justify-between items-center text-xs mb-1.5 font-sans">
                        <span className="text-slate-600 group-hover:text-slate-900 font-semibold transition-all">
                          Usia {item.kategori}
                        </span>
                        <span className="font-mono font-bold text-slate-800">
                          {item.jumlah} Jiwa <span className="text-slate-400 font-normal ml-1">({item.persen}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-150 h-3 rounded-full overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-500" 
                          style={{ width: `${percentWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: RT Density Grid */}
            <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wider font-sans">
                  <span className="w-1.5 h-3.5 bg-pink-500 rounded-full" />
                  Kerapatan WUS per RT
                </h4>
                <div className="grid grid-cols-3 gap-2.5">
                  {wusRtData.map((item) => (
                    <div 
                      key={item.rt} 
                      className="bg-white p-3 rounded-xl border border-slate-150/60 hover:border-pink-300 hover:shadow-xs transition-all flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase font-sans">RT {item.rt}</span>
                      <span className="text-lg font-black text-slate-800 font-mono mt-0.5">{item.jumlah}</span>
                      <span className="text-[9px] text-pink-500 font-medium font-sans">Jiwa</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-4 text-center font-sans">
                * Distribusi merata di 9 RT wilayah binaan Pos Gading RW 015
              </div>
            </div>
          </div>

          {/* Bottom Card: Status Pernikahan */}
          <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 font-sans">
            <h4 className="text-xs font-bold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wider font-sans">
              <span className="w-1.5 h-3.5 bg-pink-500 rounded-full" />
              Sensus Status Pernikahan WUS
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {wusKawinData.map((item, idx) => (
                <div key={item.status} className="bg-white p-3.5 rounded-xl border border-slate-100 flex flex-col justify-between shadow-xs hover:scale-[1.02] transition-transform">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase block mb-1 font-sans truncate">
                      {item.status}
                    </span>
                    <span className="text-lg font-black text-slate-800 font-mono">
                      {item.jumlah} <span className="text-[10px] font-normal text-slate-400 font-sans">Jiwa</span>
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          idx === 0 ? 'bg-emerald-400' :
                          idx === 1 ? 'bg-sky-400' :
                          idx === 2 ? 'bg-amber-400' :
                          idx === 3 ? 'bg-indigo-400' :
                          'bg-slate-400'
                        }`} 
                        style={{ width: `${item.persen}%` }} 
                      />
                    </div>
                    <span className="text-[9px] font-bold font-mono text-slate-500 mt-1 block">
                      {item.persen}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-400 font-sans">
            * Data diperbarui otomatis dari draf Sensus digital RW 015
          </div>
        </div>
      ) : activeTab === 'pus' ? (() => {
          const totalPusCount = pusAgeData.reduce((acc: number, curr: any) => acc + curr.jumlah, 0);
          let pusAccumulatedAngle = -90;
          const pusSlices = pusAgeData.map((item: any, idx: number) => {
            const percentage = totalPusCount > 0 ? (item.jumlah / totalPusCount) * 100 : 0;
            const angle = totalPusCount > 0 ? (item.jumlah / totalPusCount) * 360 : 0;
            const startAngle = pusAccumulatedAngle;
            const endAngle = pusAccumulatedAngle + angle;
            pusAccumulatedAngle = endAngle;

            const colors = ['#818cf8', '#a78bfa', '#f472b6', '#fb7185'];
            const hoverColors = ['#4f46e5', '#7c3aed', '#db2777', '#e11d48'];
            const dotClasses = ['bg-indigo-400', 'bg-violet-400', 'bg-pink-400', 'bg-rose-400'];
            const textColors = ['text-indigo-500', 'text-violet-500', 'text-pink-500', 'text-rose-500'];

            return {
              ...item,
              startAngle,
              endAngle,
              percentage,
              color: colors[idx],
              hoverColor: hoverColors[idx],
              dotClass: dotClasses[idx],
              textColor: textColors[idx]
            };
          });

          return (
            /* PASANGAN USIA SUBUR (PUS) DASHBOARD - Multi-faceted interactive metrics & charts */
            <div className="space-y-6">
              {/* Top banner summary */}
              <div className="bg-gradient-to-br from-violet-500/5 to-indigo-500/10 p-5 rounded-2xl border border-violet-100 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest font-sans">Pasangan Usia Subur (PUS)</span>
                  <h4 className="text-2xl font-black text-slate-800 font-display tracking-tight">
                    {totalPusCount} <span className="text-sm font-medium text-slate-500 font-sans">Pasang (Istri 15-49 Thn)</span>
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xl">
                    Pasangan suami istri yang istrinya berumur antara 15-49 tahun. Merupakan fokus prioritas pelayanan Keluarga Berencana (KB), edukasi kesehatan reproduksi, serta pencegahan risiko tinggi kehamilan (4 Terlalu & stunting).
                  </p>
                </div>
                <div className="p-4 bg-violet-100 rounded-2xl text-violet-600 shrink-0">
                  <Users className="w-7 h-7" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Rentang Usia Istri - Circular Pie Chart (Donut) with Interactive Legend */}
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wider font-sans">
                    <span className="w-1.5 h-3.5 bg-violet-500 rounded-full" />
                    Rasio Kelompok Usia Istri pada PUS (Grafik Lingkaran)
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    {/* Circle/Donut Chart */}
                    <div className="relative w-[180px] h-[180px] shrink-0 flex items-center justify-center">
                      <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-sm select-none">
                        {pusSlices.map((slice: any, idx: number) => {
                          const isHovered = hoveredPusIndex === idx;
                          // Draw beautiful arcs
                          const path = getDonutPath(90, 90, isHovered ? 82 : 78, isHovered ? 82 : 78, slice.startAngle, slice.endAngle, 50);
                          return (
                            <path
                              key={slice.kategori}
                              d={path}
                              fill={isHovered ? slice.hoverColor : slice.color}
                              className="transition-all duration-300 cursor-pointer"
                              onMouseEnter={() => setHoveredPusIndex(idx)}
                              onMouseLeave={() => setHoveredPusIndex(null)}
                            />
                          );
                        })}
                      </svg>
                      {/* Floating Text at center of Pie/Donut */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center select-none">
                        {hoveredPusIndex !== null ? (
                          <>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Istri Usia</span>
                            <span className={`text-sm font-black ${pusSlices[hoveredPusIndex].textColor} font-display mt-0.5`}>
                              {pusSlices[hoveredPusIndex].kategori}
                            </span>
                            <span className="text-sm font-black text-slate-850 font-mono mt-0.5">
                              {pusSlices[hoveredPusIndex].jumlah} <span className="text-[10px] font-normal text-slate-500 font-sans">Pasang</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Total PUS</span>
                            <span className="text-xl font-black text-slate-800 font-display mt-0.5">
                              {totalPusCount}
                            </span>
                            <span className="text-[9px] text-slate-500 font-medium font-sans">Pasangan</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Interactive Legend details */}
                    <div className="flex-1 space-y-2.5 w-full">
                      {pusSlices.map((slice: any, idx: number) => {
                        const isHovered = hoveredPusIndex === idx;
                        return (
                          <div 
                            key={slice.kategori}
                            className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                              isHovered 
                                ? 'bg-violet-50/65 border-violet-200 shadow-2xs scale-[1.01]' 
                                : 'bg-white border-slate-100/80 hover:border-slate-200'
                            }`}
                            onMouseEnter={() => setHoveredPusIndex(idx)}
                            onMouseLeave={() => setHoveredPusIndex(null)}
                          >
                            <div className="flex items-center gap-2.5">
                              <span 
                                className="w-3.5 h-3.5 rounded-full shrink-0 transition-transform duration-350" 
                                style={{ 
                                  backgroundColor: isHovered ? slice.hoverColor : slice.color,
                                  transform: isHovered ? 'scale(1.15)' : 'scale(1)'
                                }}
                              />
                              <div className="text-xs font-sans">
                                <span className="text-slate-500">Istri Usia </span>
                                <span className="text-slate-800 font-bold">{slice.kategori}</span>
                              </div>
                            </div>
                            <div className="text-right font-mono text-xs">
                              <span className="font-bold text-slate-850">{slice.jumlah} Pasang</span>
                              <span className="text-slate-400 ml-1.5 font-medium">({slice.percentage.toFixed(1)}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: RT Density Grid for PUS */}
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wider font-sans">
                      <span className="w-1.5 h-3.5 bg-violet-500 rounded-full" />
                      Kerapatan PUS per RT
                    </h4>
                    <div className="grid grid-cols-3 gap-2.5">
                      {pusRtData.map((item) => (
                        <div 
                          key={item.rt} 
                          className="bg-white p-3 rounded-xl border border-slate-150/60 hover:border-violet-300 hover:shadow-xs transition-all flex flex-col items-center justify-center"
                        >
                          <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase font-sans">RT {item.rt}</span>
                          <span className="text-lg font-black text-slate-800 font-mono mt-0.5">{item.jumlah}</span>
                          <span className="text-[9px] text-violet-500 font-medium font-sans font-semibold">Pasang</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-4 text-center font-sans">
                    * Distribusi Pasangan Usia Subur di 9 rukun tetangga wilayah RW 015
                  </div>
                </div>
              </div>

              {/* Bottom Card: Informational notes / KB Service link */}
              <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-5 border border-indigo-100/60">
                <h4 className="text-xs font-bold text-indigo-800 mb-2 uppercase tracking-wider font-sans flex items-center gap-1.5">
                  💡 Rekomendasi Pelayanan Kesehatan Primer
                </h4>
                <p className="text-xs text-indigo-950 leading-relaxed">
                  Posyandu Balita Pos Gading RW 015 menyediakan layanan pemantauan PUS secara berkelanjutan melalui penyuluhan metode kontrasepsi jangka panjang (MKJP), pendampingan calon pengantin (Catin), pendistribusian tablet tambah darah (TTD) bagi PUS remaja/dewasa muda, serta konseling gizi terpadu guna mendukung terciptanya keluarga sehat berkualitas dan bebas stunting di RW 015.
                </p>
              </div>

              <div className="pt-2 text-center text-[11px] text-slate-400 font-sans">
                * Data diperbarui otomatis dari draf Sensus digital RW 015
              </div>
            </div>
          );
        })()
      : (
        /* TREND VISIT CHART - Interactive Custom SVG Grouped Column Chart */
        <div className="relative">
          <div className="w-full overflow-x-auto select-none">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full min-w-[420px] h-auto drop-shadow-sm"
              height={chartHeight}
            >
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = padding.top + (chartHeight - padding.top - padding.bottom) * (1 - ratio);
                const value = Math.round(maxVisit * ratio);
                return (
                  <g key={i}>
                    <line 
                      x1={padding.left} 
                      y1={y} 
                      x2={chartWidth - padding.right} 
                      y2={y} 
                      stroke="#f1f5f9" 
                      strokeWidth="1"
                    />
                    <text 
                      x={padding.left - 8} 
                      y={y + 4} 
                      fill="#94a3b8" 
                      fontSize="9" 
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {value}
                    </text>
                  </g>
                );
              })}

              {/* Bar and Line groups */}
              {kunjunganData.map((item, idx) => {
                const step = (chartWidth - padding.left - padding.right) / kunjunganData.length;
                const xCenter = padding.left + step * idx + step / 2;
                
                // Balita bar (used for Dewasa)
                const bHeight = ((item.balita) / maxVisit) * (chartHeight - padding.top - padding.bottom);
                const bY = chartHeight - padding.bottom - bHeight;
                
                // Lansia bar
                const lHeight = ((item.lansia) / maxVisit) * (chartHeight - padding.top - padding.bottom);
                const lY = chartHeight - padding.bottom - lHeight;
                
                const groupWidth = step * 0.7;
                const barWidth = groupWidth / 2 - 3;
                
                const xBalita = xCenter - barWidth - 1.5;
                const xLansia = xCenter + 1.5;
                
                const isHoveredGroup = hoveredIndex === idx;

                return (
                  <g 
                    key={idx}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    {/* Hover background */}
                    {isHoveredGroup && (
                      <rect 
                        x={xCenter - groupWidth/2 - 4} 
                        y={padding.top} 
                        width={groupWidth + 8} 
                        height={chartHeight - padding.top - padding.bottom} 
                        fill="#fff1f2" 
                        rx="4"
                        opacity="0.6"
                      />
                    )}

                    {/* Balita Bar */}
                    <rect 
                      x={xBalita} 
                      y={bY} 
                      width={barWidth} 
                      height={bHeight} 
                      fill="url(#balitaGradient)" 
                      rx="2"
                      className="transition-all duration-300"
                    />

                    {/* Lansia Bar */}
                    <rect 
                      x={xLansia} 
                      y={lY} 
                      width={barWidth} 
                      height={lHeight} 
                      fill="url(#lansiaGradient)" 
                      rx="2"
                      className="transition-all duration-300"
                    />

                    {/* Total Text on top if hovered */}
                    {isHoveredGroup && (
                      <g>
                        {/* Balita tooltip marker */}
                        <rect x={xBalita - 8} y={bY - 18} width={24} height={14} fill="#f43f5e" rx="3"/>
                        <text x={xBalita + 4} y={bY - 8} fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">{item.balita}</text>
                        
                        {/* Lansia tooltip marker */}
                        <rect x={xLansia - 8} y={lY - 18} width={24} height={14} fill="#38bdf8" rx="3"/>
                        <text x={xLansia + 4} y={lY - 8} fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">{item.lansia}</text>
                      </g>
                    )}

                    {/* X axis labels */}
                    <text 
                      x={xCenter} 
                      y={chartHeight - padding.bottom + 16} 
                      fill="#64748b" 
                      fontSize="8" 
                      fontWeight={isHoveredGroup ? "bold" : "normal"}
                      textAnchor="middle"
                    >
                      {item.bulan}
                    </text>
                  </g>
                );
              })}

              {/* Gradients definitions */}
              <defs>
                <linearGradient id="balitaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#fda4af" />
                </linearGradient>
                <linearGradient id="lansiaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Legends */}
          <div className="flex items-center justify-center gap-6 mt-3 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-gradient-to-br from-rose-500 to-pink-300 rounded-sm" />
              <span className="text-slate-600 font-sans">Kunjungan Dewasa (&lt;60 Thn)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-gradient-to-br from-sky-500 to-sky-350 rounded-sm" />
              <span className="text-slate-600 font-sans">Kunjungan Lansia (&gt;=60 Thn)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
