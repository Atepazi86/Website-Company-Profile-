import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Check, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { ServiceItem } from '../types/company';

interface CostEstimatorProps {
  services: ServiceItem[];
  companyName: string;
  whatsappNumber: string;
  primaryColor: string;
  accentColor: string;
}

type ComplexityTier = 'standar' | 'profesional' | 'enterprise';

const TIER_MULTIPLIERS: Record<
  ComplexityTier,
  { label: string; multiplier: number; weeksBonus: number; desc: string }
> = {
  standar: {
    label: 'Standar',
    multiplier: 1,
    weeksBonus: 0,
    desc: 'Fitur inti & implementasi cepat',
  },
  profesional: {
    label: 'Profesional',
    multiplier: 1.45,
    weeksBonus: 2,
    desc: 'Integrasi kustom & pendampingan tim',
  },
  enterprise: {
    label: 'Enterprise',
    multiplier: 2.1,
    weeksBonus: 4,
    desc: 'Skala multi-cabang & SLA prioritas',
  },
};

function formatRupiahMillions(millions: number): string {
  if (millions >= 1000) {
    const billions = (millions / 1000).toFixed(2).replace(/\.00$/, '').replace('.', ',');
    return `Rp ${billions} Miliar`;
  }
  return `Rp ${Math.round(millions).toLocaleString('id-ID')} Juta`;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  services,
  companyName,
  whatsappNumber,
  primaryColor,
  accentColor,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services[0]?.id ?? ''
  );
  const [scale, setScale] = useState<number>(3);
  const [tier, setTier] = useState<ComplexityTier>('profesional');
  const [expressDelivery, setExpressDelivery] = useState<boolean>(false);
  const [maintenanceSupport, setMaintenanceSupport] = useState<boolean>(true);

  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) ?? services[0],
    [services, selectedServiceId]
  );

  const calculation = useMemo(() => {
    if (!selectedService) {
      return { minCost: 0, maxCost: 0, weeks: 4, breakdown: { base: 0, scale: 0, addon: 0 } };
    }
    const base = selectedService.basePriceMillions;
    const scaleFactor = 1 + (scale - 1) * 0.28;
    const tierInfo = TIER_MULTIPLIERS[tier];
    const subtotal = base * scaleFactor * tierInfo.multiplier;
    const expressCost = expressDelivery ? subtotal * 0.18 : 0;
    const supportCost = maintenanceSupport ? 4.5 : 0;
    const total = subtotal + expressCost + supportCost;

    const minCost = total * 0.92;
    const maxCost = total * 1.12;
    const baseWeeks = Math.max(2, Math.round(scale * 1.4) + tierInfo.weeksBonus);
    const weeks = expressDelivery ? Math.max(2, Math.round(baseWeeks * 0.75)) : baseWeeks;

    return {
      minCost,
      maxCost,
      weeks,
      breakdown: {
        base: Math.round(base * tierInfo.multiplier),
        scale: Math.round(subtotal - base * tierInfo.multiplier),
        addon: Math.round(expressCost + supportCost),
      },
    };
  }, [selectedService, scale, tier, expressDelivery, maintenanceSupport]);

  const whatsappEstimateUrl = useMemo(() => {
    if (!selectedService) return '#';
    const cleanPhone = whatsappNumber.replace(/\D/g, '');
    const addons = [
      expressDelivery ? 'Prioritas Ekspres' : null,
      maintenanceSupport ? 'Pemeliharaan 6 Bulan' : null,
    ]
      .filter(Boolean)
      .join(', ');

    const text = `Halo tim ${companyName}, saya telah melakukan simulasi estimasi biaya di website:\n\n• Layanan: ${selectedService.title}\n• Skala Proyek: ${scale} ${selectedService.scaleUnit}\n• Tingkat Paket: ${TIER_MULTIPLIERS[tier].label}\n• Tambahan: ${addons || 'Tidak ada'}\n• Estimasi Biaya: ${formatRupiahMillions(calculation.minCost)} – ${formatRupiahMillions(calculation.maxCost)}\n• Perkiraan Durasi: ${calculation.weeks} Minggu\n\nMohon informasi jadwal konsultasi lebih lanjut.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }, [
    selectedService,
    companyName,
    whatsappNumber,
    scale,
    tier,
    expressDelivery,
    maintenanceSupport,
    calculation,
  ]);

  if (!selectedService) return null;

  const totalParts =
    calculation.breakdown.base + calculation.breakdown.scale + calculation.breakdown.addon || 1;
  const basePct = Math.round((calculation.breakdown.base / totalParts) * 100);
  const scalePct = Math.round((calculation.breakdown.scale / totalParts) * 100);
  const addonPct = Math.max(0, 100 - basePct - scalePct);

  return (
    <section id="estimasi" className="py-20 lg:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <p
            className="text-xs font-semibold tracking-wider uppercase mb-3"
            style={{ color: accentColor }}
          >
            Simulasi Estimasi Biaya
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Hitung Perkiraan Investasi Proyek Secara Real-Time
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Sesuaikan jenis layanan, cakupan skala, dan tingkat dukungan untuk mendapatkan gambaran
            anggaran awal sebelum sesi konsultasi teknis bersama tim kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-7"
          >
            {/* Service Selector */}
            <div>
              <label
                htmlFor="service-select"
                className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3"
              >
                <SlidersHorizontal className="w-4 h-4" style={{ color: accentColor }} />
                <span>1. Pilih Jenis Layanan</span>
              </label>
              <select
                id="service-select"
                value={selectedService.id}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 transition-shadow"
                style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
              >
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.code}. {srv.title} ({srv.unitLabel})
                  </option>
                ))}
              </select>
            </div>

            {/* Project Scale Slider */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <label htmlFor="scale-range" className="text-sm font-semibold text-slate-900">
                  2. Skala & Cakupan Proyek
                </label>
                <span
                  className="font-mono-num text-sm font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-900 whitespace-nowrap"
                >
                  {scale} {selectedService.scaleUnit}
                </span>
              </div>
              <input
                id="scale-range"
                type="range"
                min={selectedService.minScale}
                max={selectedService.maxScale}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full brand-slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono-num">
                <span>
                  {selectedService.minScale} {selectedService.scaleUnit}
                </span>
                <span>Skala Menengah</span>
                <span>
                  {selectedService.maxScale} {selectedService.scaleUnit}
                </span>
              </div>
            </div>

            {/* Complexity Tier */}
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-3">
                3. Tingkat Kompleksitas & SLA
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(TIER_MULTIPLIERS) as ComplexityTier[]).map((key) => {
                  const info = TIER_MULTIPLIERS[key];
                  const isActive = tier === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTier(key)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-white shadow-sm'
                          : 'bg-white/60 border-slate-200 hover:border-slate-300'
                      }`}
                      style={
                        isActive
                          ? { borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }
                          : undefined
                      }
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                          {info.label}
                        </span>
                        {isActive && (
                          <Check className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">{info.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Add-ons */}
            <div className="pt-2 border-t border-slate-200/80">
              <p className="text-sm font-semibold text-slate-900 mb-3">
                4. Opsi Pendukung Tambahan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={expressDelivery}
                    onChange={(e) => setExpressDelivery(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300"
                    style={{ accentColor }}
                  />
                  <div>
                    <span className="block text-sm font-medium text-slate-900">
                      Prioritas Ekspres (-25% Waktu)
                    </span>
                    <span className="block text-xs text-slate-500">
                      Penambahan tim paralel untuk tenggat mendesak
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={maintenanceSupport}
                    onChange={(e) => setMaintenanceSupport(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300"
                    style={{ accentColor }}
                  />
                  <div>
                    <span className="block text-sm font-medium text-slate-900">
                      Garansi & Pemeliharaan 6 Bulan
                    </span>
                    <span className="block text-xs text-slate-500">
                      Pemantauan rutin & dukungan teknis pasca-serah terima
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Right Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between"
            style={{ backgroundColor: primaryColor }}
          >
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <Calculator className="w-5 h-5 text-white/80" />
                  <span className="text-sm font-medium text-white/90">Ringkasan Estimasi</span>
                </div>
                <span className="text-xs font-mono-num text-white/75">
                  Durasi ± {calculation.weeks} Minggu
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-white/70 font-medium">
                  Kisaran Investasi Proyek
                </p>
                <div className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight font-mono-num text-white">
                  {formatRupiahMillions(calculation.minCost)} –{' '}
                  {formatRupiahMillions(calculation.maxCost)}
                </div>
                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  Angka di atas merupakan estimasi indikatif. Penawaran resmi (RAB) disusun setelah
                  survei kebutuhan dan kesepakatan ruang lingkup.
                </p>
              </div>

              {/* Allocation Bar */}
              <div className="mt-7">
                <p className="text-xs text-white/75 mb-2 font-medium">
                  Komposisi Alokasi Anggaran
                </p>
                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden flex">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${basePct}%`, backgroundColor: accentColor }}
                    title="Fondasi & Paket"
                  />
                  <div
                    className="h-full bg-sky-400 transition-all duration-300"
                    style={{ width: `${scalePct}%` }}
                    title="Penyesuaian Skala"
                  />
                  <div
                    className="h-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${addonPct}%` }}
                    title="Opsi Pendukung"
                  />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-white/80 font-mono-num">
                  <div>
                    <span className="block text-white/60 text-[11px]">Paket Inti</span>
                    <span>{basePct}%</span>
                  </div>
                  <div>
                    <span className="block text-white/60 text-[11px]">Skala Kerja</span>
                    <span>{scalePct}%</span>
                  </div>
                  <div>
                    <span className="block text-white/60 text-[11px]">Pendukung</span>
                    <span>{addonPct}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 space-y-2 text-xs text-white/80">
                <div className="flex justify-between gap-2">
                  <span className="text-white/60">Layanan Terpilih</span>
                  <span className="font-medium text-right truncate max-w-[200px]">
                    {selectedService.title}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-white/60">Cakupan</span>
                  <span className="font-mono-num">
                    {scale} {selectedService.scaleUnit} · {TIER_MULTIPLIERS[tier].label}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={whatsappEstimateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.99] shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Kirim Hasil Estimasi ke WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
