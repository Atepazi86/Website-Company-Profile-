import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  Code2,
  Copy,
  Download,
  Palette,
  RotateCcw,
  Sliders,
  Upload,
  X,
} from 'lucide-react';
import {
  CompanyConfig,
  LogoEmblemId,
  LogoFrameShape,
} from '../types/company';
import {
  COLOR_PALETTES,
  DEFAULT_COMPANY_CONFIG,
  INDUSTRY_PRESETS,
} from '../data/defaultCompanyData';
import { LogoMark } from './LogoMark';
import { generateSingleFileHtml } from '../utils/exportSingleHtml';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onChange: (next: CompanyConfig) => void;
}

type DrawerTab = 'identitas' | 'desain' | 'ekspor';

const EMBLEM_OPTIONS: { id: LogoEmblemId; label: string }[] = [
  { id: 'prism', label: 'Prisma' },
  { id: 'pillar', label: 'Pilar' },
  { id: 'orbit', label: 'Orbit' },
  { id: 'nexus', label: 'Nexus' },
  { id: 'crest', label: 'Perisai' },
  { id: 'monogram', label: 'Inisial' },
];

const FRAME_OPTIONS: { id: LogoFrameShape; label: string }[] = [
  { id: 'squircle', label: 'Kotak Halus' },
  { id: 'circle', label: 'Lingkaran' },
  { id: 'outline', label: 'Garis Tepi' },
  { id: 'minimal', label: 'Minimalis' },
];

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<DrawerTab>('identitas');
  const [copied, setCopied] = useState(false);
  const [showCodePreview, setShowCodePreview] = useState(false);

  const generatedHtml = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return generateSingleFileHtml(config, origin);
  }, [config]);

  const handleFieldChange = <K extends keyof CompanyConfig>(
    key: K,
    value: CompanyConfig[K]
  ) => {
    onChange({ ...config, [key]: value });
  };

  const handlePaletteColorChange = (
    colorKey: 'primary' | 'secondary' | 'accent',
    hex: string
  ) => {
    onChange({
      ...config,
      palette: {
        ...config.palette,
        id: 'custom',
        name: 'Kustom',
        [colorKey]: hex,
      },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleFieldChange('customLogoUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const slug = config.companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    a.href = url;
    a.download = `${slug || 'company-profile'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-md bg-white border-r border-slate-200 shadow-2xl flex flex-col"
            aria-label="Panel Kustomisasi Perusahaan"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Kustomisasi Brand & Ekspor
                </h2>
                <p className="text-xs text-slate-500">
                  Ubah logo, warna, identitas, lalu unduh 1 file HTML lengkap
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup panel kustomisasi"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-3 border-b border-slate-200 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('identitas')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'identitas'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Identitas</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('desain')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'desain'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Logo & Warna</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ekspor')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'ekspor'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Ekspor HTML</span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'identitas' && (
                <>
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      Preset Bidang Usaha Cepat
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {INDUSTRY_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() =>
                            onChange({ ...config, ...preset.configPatch })
                          }
                          className="text-left px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Nama Perusahaan
                      </label>
                      <input
                        type="text"
                        value={config.companyName}
                        onChange={(e) =>
                          handleFieldChange('companyName', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Bidang Usaha
                      </label>
                      <input
                        type="text"
                        value={config.industry}
                        onChange={(e) =>
                          handleFieldChange('industry', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Tagline Utama
                      </label>
                      <input
                        type="text"
                        value={config.tagline}
                        onChange={(e) =>
                          handleFieldChange('tagline', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Headline Hero
                      </label>
                      <textarea
                        rows={2}
                        value={config.heroHeadline}
                        onChange={(e) =>
                          handleFieldChange('heroHeadline', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          WhatsApp (628xxx)
                        </label>
                        <input
                          type="text"
                          value={config.whatsappNumber}
                          onChange={(e) =>
                            handleFieldChange('whatsappNumber', e.target.value)
                          }
                          className="w-full px-3.5 py-2.5 text-sm font-mono-num rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Email Resmi
                        </label>
                        <input
                          type="email"
                          value={config.email}
                          onChange={(e) =>
                            handleFieldChange('email', e.target.value)
                          }
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Alamat Kantor
                      </label>
                      <textarea
                        rows={2}
                        value={config.address}
                        onChange={(e) =>
                          handleFieldChange('address', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Jam Operasional
                      </label>
                      <input
                        type="text"
                        value={config.operationalHours}
                        onChange={(e) =>
                          handleFieldChange('operationalHours', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'desain' && (
                <>
                  {/* Live Logo Preview */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <LogoMark
                        emblem={config.logoEmblem}
                        frame={config.logoFrame}
                        companyName={config.companyName}
                        primaryColor={config.palette.primary}
                        accentColor={config.palette.accent}
                        customLogoUrl={config.customLogoUrl}
                        size="lg"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {config.companyName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          Pratinjau Logo Header & Footer
                        </p>
                      </div>
                    </div>
                    {config.customLogoUrl && (
                      <button
                        type="button"
                        onClick={() => handleFieldChange('customLogoUrl', null)}
                        className="text-xs font-semibold text-red-600 hover:underline shrink-0 cursor-pointer"
                      >
                        Hapus Upload
                      </button>
                    )}
                  </div>

                  {/* Upload Custom Logo */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Unggah Logo Sendiri (PNG / SVG)
                    </label>
                    <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 text-xs font-medium text-slate-600 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Pilih File Logo dari Perangkat</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Emblem Selector */}
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      Atau Pilih Ikon Logo Korporat
                    </p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {EMBLEM_OPTIONS.map((opt) => {
                        const isSelected =
                          !config.customLogoUrl && config.logoEmblem === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              onChange({
                                ...config,
                                customLogoUrl: null,
                                logoEmblem: opt.id,
                              })
                            }
                            className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <LogoMark
                              emblem={opt.id}
                              frame={config.logoFrame}
                              companyName={config.companyName}
                              primaryColor={config.palette.primary}
                              accentColor={config.palette.accent}
                              size="sm"
                            />
                            <span className="text-[11px] font-semibold text-slate-700">
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Logo Frame Shape */}
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      Bentuk Bingkai Logo
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {FRAME_OPTIONS.map((fr) => (
                        <button
                          key={fr.id}
                          type="button"
                          onClick={() => handleFieldChange('logoFrame', fr.id)}
                          className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                            config.logoFrame === fr.id
                              ? 'border-blue-600 bg-blue-50/60 text-blue-700'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {fr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette Presets */}
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      Palet Warna Korporat
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {COLOR_PALETTES.map((pal) => {
                        const isActive = config.palette.id === pal.id;
                        return (
                          <button
                            key={pal.id}
                            type="button"
                            onClick={() => handleFieldChange('palette', pal)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isActive
                                ? 'border-blue-600 bg-blue-50/40'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-2">
                              <span
                                className="w-5 h-5 rounded-full border border-white shadow-sm"
                                style={{ backgroundColor: pal.primary }}
                              />
                              <span
                                className="w-5 h-5 rounded-full border border-white shadow-sm"
                                style={{ backgroundColor: pal.secondary }}
                              />
                              <span
                                className="w-5 h-5 rounded-full border border-white shadow-sm"
                                style={{ backgroundColor: pal.accent }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-slate-800 block">
                              {pal.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Hex Color Pickers */}
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-700 mb-3">
                      Sesuaikan Warna Kustom (Hex)
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="block">
                        <span className="text-[11px] text-slate-500 block mb-1">
                          Utama (Gelap)
                        </span>
                        <div className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200">
                          <input
                            type="color"
                            value={config.palette.primary}
                            onChange={(e) =>
                              handlePaletteColorChange('primary', e.target.value)
                            }
                            className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                          />
                          <span className="text-[11px] font-mono-num text-slate-700">
                            {config.palette.primary}
                          </span>
                        </div>
                      </label>
                      <label className="block">
                        <span className="text-[11px] text-slate-500 block mb-1">
                          Sekunder
                        </span>
                        <div className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200">
                          <input
                            type="color"
                            value={config.palette.secondary}
                            onChange={(e) =>
                              handlePaletteColorChange(
                                'secondary',
                                e.target.value
                              )
                            }
                            className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                          />
                          <span className="text-[11px] font-mono-num text-slate-700">
                            {config.palette.secondary}
                          </span>
                        </div>
                      </label>
                      <label className="block">
                        <span className="text-[11px] text-slate-500 block mb-1">
                          Aksen Tombol
                        </span>
                        <div className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200">
                          <input
                            type="color"
                            value={config.palette.accent}
                            onChange={(e) =>
                              handlePaletteColorChange('accent', e.target.value)
                            }
                            className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                          />
                          <span className="text-[11px] font-mono-num text-slate-700">
                            {config.palette.accent}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'ekspor' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      File HTML Tunggal Siap Pakai
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kode yang dihasilkan berisi seluruh halaman Company Profile
                      dalam <strong>1 file HTML lengkap</strong> menggunakan
                      Tailwind CSS CDN, Lucide Icons CDN, dan Vanilla
                      JavaScript—lengkap dengan logo, warna, simulasi biaya,
                      modal portofolio, dan link WhatsApp Anda.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={handleDownloadHtml}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-sm cursor-pointer transition-transform active:scale-[0.99]"
                      style={{ backgroundColor: config.palette.accent }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh File .html Lengkap</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyHtml}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">
                            Kode HTML Tersalin!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Salin Seluruh Kode HTML</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setShowCodePreview((v) => !v)}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      {showCodePreview
                        ? 'Sembunyikan Pratinjau Kode HTML'
                        : 'Lihat Pratinjau Kode HTML'}
                    </button>
                    {showCodePreview && (
                      <pre className="mt-3 p-3.5 rounded-xl bg-slate-900 text-slate-200 text-[11px] font-mono-num overflow-x-auto max-h-72 leading-relaxed">
                        {generatedHtml}
                      </pre>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-slate-200 bg-[#F8FAFC] flex items-center justify-between">
              <button
                type="button"
                onClick={() => onChange(DEFAULT_COMPANY_CONFIG)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer"
                style={{ backgroundColor: config.palette.primary }}
              >
                Selesai
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
