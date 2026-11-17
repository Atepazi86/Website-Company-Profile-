import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  ShieldCheck,
  Star,
  TrendingUp,
  Truck,
  X,
} from 'lucide-react';
import { CompanyConfig, ServiceItem } from './types/company';
import { DEFAULT_COMPANY_CONFIG, HERO_IMAGE } from './data/defaultCompanyData';
import { LogoMark } from './components/LogoMark';
import { AnimatedCounter } from './components/AnimatedCounter';
import { CostEstimator } from './components/CostEstimator';
import { PortfolioSection } from './components/PortfolioSection';
import { CustomizerDrawer } from './components/CustomizerDrawer';

const STORAGE_KEY = 'company_profile_custom_config_v1';

function getServiceIcon(icon: ServiceItem['icon']) {
  switch (icon) {
    case 'code':
      return <Code2 className="w-5 h-5" />;
    case 'building':
      return <Building2 className="w-5 h-5" />;
    case 'trending':
      return <TrendingUp className="w-5 h-5" />;
    case 'truck':
      return <Truck className="w-5 h-5" />;
    case 'briefcase':
      return <Briefcase className="w-5 h-5" />;
    case 'cpu':
    default:
      return <Cpu className="w-5 h-5" />;
  }
}

export default function App() {
  const [config, setConfig] = useState<CompanyConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_COMPANY_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_COMPANY_CONFIG;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const [heroTilt, setHeroTilt] = useState({ rotateX: 0, rotateY: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore quota errors
    }

    const root = document.documentElement;
    root.style.setProperty('--brand-primary', config.palette.primary);
    root.style.setProperty('--brand-secondary', config.palette.secondary);
    root.style.setProperty('--brand-accent', config.palette.accent);
    root.style.setProperty('--brand-accent-soft', `${config.palette.accent}14`);
    document.title = `${config.companyName} — ${config.tagline}`;
  }, [config]);

  const cleanPhone = config.whatsappNumber.replace(/\D/g, '') || '6281234567890';

  const getWhatsAppUrl = (customMessage: string) =>
    `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMessage)}`;

  const mainConsultUrl = getWhatsAppUrl(
    `Halo ${config.companyName}, saya ingin berkonsultasi mengenai kebutuhan bisnis dan layanan Anda.`
  );

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({
      rotateX: -y * 5,
      rotateY: x * 6,
    });
  };

  const resetHeroTilt = () => setHeroTilt({ rotateX: 0, rotateY: 0 });

  const navItems = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Portofolio', href: '#portofolio' },
    { label: 'Testimoni', href: '#testimoni' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      {/* Scroll Progress Hairline */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left pointer-events-none"
        style={{ scaleX, backgroundColor: config.palette.accent }}
      />

      {/* Sticky Glassmorphism Navbar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Mark & Wordmark */}
          <a
            href="#beranda"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-lg"
          >
            <LogoMark
              emblem={config.logoEmblem}
              frame={config.logoFrame}
              companyName={config.companyName}
              primaryColor={config.palette.primary}
              accentColor={config.palette.accent}
              customLogoUrl={config.customLogoUrl}
              size="md"
            />
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 max-w-[200px] sm:max-w-none truncate">
              {config.companyName}
            </span>
          </a>

          {/* Zone 2: Single-line Nav Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link-underline hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={mainConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap shrink-0"
              style={{ backgroundColor: config.palette.accent }}
            >
              <span>Konsultasi Gratis</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Smooth Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-slate-200 bg-white"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2">
                  <a
                    href={mainConsultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{ backgroundColor: config.palette.accent }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konsultasi Gratis via WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section
          id="beranda"
          className="relative bg-architectural-grid pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 flex flex-col justify-center"
              >
                <p
                  className="text-xs font-semibold tracking-wider uppercase mb-4"
                  style={{ color: config.palette.accent }}
                >
                  {config.industry} · {config.tagline}
                </p>

                <h1 className="text-[clamp(2.15rem,4vw,3.3rem)] font-extrabold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance]">
                  {config.heroHeadline}
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {config.heroSubheadline}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href={mainConsultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] whitespace-nowrap"
                    style={{ backgroundColor: config.palette.accent }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hubungi via WhatsApp</span>
                  </a>
                  <a
                    href="#layanan"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors whitespace-nowrap"
                  >
                    <span>Lihat Layanan</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              {/* Right Interactive Visual Frame */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:col-span-6 [perspective:1200px]"
              >
                <motion.div
                  onMouseMove={handleHeroMouseMove}
                  onMouseLeave={resetHeroTilt}
                  animate={{
                    rotateX: heroTilt.rotateX,
                    rotateY: heroTilt.rotateY,
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  className="relative h-full min-h-[300px] lg:min-h-[430px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900"
                >
                  {!heroImageError ? (
                    <img
                      src={HERO_IMAGE}
                      alt={`Kantor operasional ${config.companyName}`}
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center p-8 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${config.palette.primary} 0%, ${config.palette.secondary} 100%)`,
                      }}
                    >
                      <Building2 className="w-14 h-14 opacity-80 mb-3" />
                      <p className="text-lg font-bold text-center">
                        {config.companyName}
                      </p>
                      <p className="text-sm text-white/75 text-center mt-1">
                        {config.tagline}
                      </p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-white/80 font-medium">
                        {config.companyName}
                      </p>
                      <p className="text-sm sm:text-base font-semibold mt-0.5">
                        {config.tagline}
                      </p>
                    </div>
                    <span className="hidden sm:inline-block text-xs font-mono-num text-white/85 shrink-0">
                      {config.operationalHours.split(',')[0]}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Stats Bar below Hero */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 lg:mt-14 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {config.stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                    style={{ color: config.palette.primary }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-500">{stat.detail}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. Tentang Kami (About Us) */}
        <section
          id="tentang"
          className="py-20 lg:py-28 bg-white border-y border-slate-200/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Column 1: Story + Vision & Mission */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <p
                  className="text-xs font-semibold tracking-wider uppercase mb-3"
                  style={{ color: config.palette.accent }}
                >
                  Tentang Kami
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                  Dedikasi Korporat untuk Keberlanjutan Bisnis Klien
                </h2>
                <p className="mt-5 text-base text-slate-600 leading-relaxed">
                  {config.aboutStory}
                </p>

                <div className="mt-8 pt-8 border-t border-slate-200 space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Visi Perusahaan
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {config.vision}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Misi Utama
                    </h3>
                    <ul className="mt-2.5 space-y-2.5 text-sm text-slate-600">
                      {config.mission.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 mt-0.5 shrink-0"
                            style={{ color: config.palette.accent }}
                          />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Column 2: 3 Key Advantages */}
              <div className="lg:col-span-6 space-y-5">
                {config.advantages.map((adv, idx) => {
                  const IconComp =
                    adv.icon === 'shield'
                      ? ShieldCheck
                      : adv.icon === 'clock'
                        ? Clock
                        : Layers;
                  return (
                    <motion.div
                      key={adv.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 flex items-start gap-4 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white transition-transform duration-200 group-hover:scale-105"
                        style={{ backgroundColor: config.palette.primary }}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {adv.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                          {adv.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Layanan / Produk Utama (Asymmetric Bento Grid) */}
        <section id="layanan" className="py-20 lg:py-28 bg-[#F8FAFC]">
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
                style={{ color: config.palette.accent }}
              >
                Layanan & Solusi Utama
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                Layanan Terintegrasi Sesuai Kebutuhan Skala Usaha
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Setiap layanan dirancang dengan target hasil yang jelas. Klik
                tombol konsultasi pada layanan pilihan Anda untuk terhubung
                langsung dengan tim kami.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {config.services.map((srv, idx) => {
                const colSpan =
                  idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
                const serviceWaUrl = getWhatsAppUrl(
                  `Halo ${config.companyName}, saya ingin menanyakan informasi lebih lanjut mengenai layanan "${srv.title}". Mohon jadwal konsultasi dan penawarannya.`
                );
                return (
                  <motion.article
                    key={srv.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`${colSpan} group bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                          style={{
                            backgroundColor: `${config.palette.accent}14`,
                            color: config.palette.accent,
                          }}
                        >
                          {getServiceIcon(srv.icon)}
                        </div>
                        <span className="font-mono-num text-xs font-semibold text-slate-400">
                          {srv.code}.
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        {srv.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                        {srv.shortDesc}
                      </p>

                      <p className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">
                        Dampak: {srv.outcome}
                      </p>
                    </div>

                    <div className="mt-6 pt-2 flex items-center justify-between gap-3">
                      <span className="font-mono-num text-xs font-semibold text-slate-700">
                        {srv.unitLabel}
                      </span>
                      <a
                        href={serviceWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-transform duration-150 active:scale-95 whitespace-nowrap shrink-0"
                        style={{ backgroundColor: config.palette.accent }}
                      >
                        <span>Tanya Layanan Ini</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Simulasi Estimasi Biaya */}
        <CostEstimator
          services={config.services}
          companyName={config.companyName}
          whatsappNumber={config.whatsappNumber}
          primaryColor={config.palette.primary}
          accentColor={config.palette.accent}
        />

        {/* 6. Portofolio / Galeri Proyek */}
        <PortfolioSection
          items={config.portfolio}
          companyName={config.companyName}
          whatsappNumber={config.whatsappNumber}
          primaryColor={config.palette.primary}
          accentColor={config.palette.accent}
        />

        {/* 7. Testimoni Klien & Partner */}
        <section
          id="testimoni"
          className="py-20 lg:py-28 bg-white border-t border-slate-200/80"
        >
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
                style={{ color: config.palette.accent }}
              >
                Testimoni Klien & Mitra
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                Dipercaya oleh Pimpinan Perusahaan di Indonesia
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {config.testimonials.map((t, idx) => (
                <motion.article
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-slate-300 hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    <div
                      className="flex items-center gap-1 text-amber-500 mb-4"
                      aria-label={`Rating ${t.rating} dari 5 bintang`}
                    >
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80">
                    <p
                      className="text-xs font-semibold mb-2"
                      style={{ color: config.palette.accent }}
                    >
                      Hasil: {t.outcome}
                    </p>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer 4 Kolom */}
      <footer
        className="text-white pt-16 pb-10"
        style={{ backgroundColor: config.palette.primary }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
            {/* Col 1: Profil Singkat */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <LogoMark
                  emblem={config.logoEmblem}
                  frame={config.logoFrame}
                  companyName={config.companyName}
                  primaryColor={config.palette.primary}
                  accentColor={config.palette.accent}
                  customLogoUrl={config.customLogoUrl}
                  size="md"
                />
                <span className="font-bold text-base leading-snug">
                  {config.companyName}
                </span>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                {config.tagline}. {config.industry} yang mengutamakan presisi
                eksekusi, transparansi anggaran, dan hasil berkelanjutan.
              </p>
            </div>

            {/* Col 2: Tautan Cepat */}
            <div>
              <h3 className="text-sm font-bold mb-4">Tautan Cepat</h3>
              <ul className="space-y-2.5 text-xs text-white/75">
                <li>
                  <a href="#beranda" className="hover:text-white transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#tentang" className="hover:text-white transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#layanan" className="hover:text-white transition-colors">
                    Layanan Utama
                  </a>
                </li>
                <li>
                  <a href="#estimasi" className="hover:text-white transition-colors">
                    Simulasi Estimasi Biaya
                  </a>
                </li>
                <li>
                  <a href="#portofolio" className="hover:text-white transition-colors">
                    Portofolio Proyek
                  </a>
                </li>
                <li>
                  <a href="#testimoni" className="hover:text-white transition-colors">
                    Testimoni Klien
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Daftar Layanan */}
            <div>
              <h3 className="text-sm font-bold mb-4">Daftar Layanan</h3>
              <ul className="space-y-2.5 text-xs text-white/75">
                {config.services.slice(0, 5).map((srv) => (
                  <li key={srv.id}>
                    <a
                      href="#layanan"
                      className="hover:text-white transition-colors line-clamp-1"
                    >
                      {srv.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Kontak & Alamat */}
            <div>
              <h3 className="text-sm font-bold mb-4">Kontak & Operasional</h3>
              <ul className="space-y-3 text-xs text-white/75 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-white/60" />
                  <span>{config.address}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 text-white/60" />
                  <span>{config.operationalHours}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0 text-white/60" />
                  <a
                    href={mainConsultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-num hover:text-white transition-colors"
                  >
                    +{cleanPhone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-white/60" />
                  <a
                    href={`mailto:${config.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {config.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} {config.companyName}. Seluruh hak
              cipta dilindungi.
            </p>
            <p>Profesionalisme · Ketepatan Waktu · Transparansi Biaya</p>
          </div>
        </div>
      </footer>

      {/* Floating Customizer & HTML Export Trigger (Bottom-Left) */}
      <button
        type="button"
        onClick={() => setCustomizerOpen(true)}
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white text-slate-900 border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs font-semibold cursor-pointer"
        aria-label="Kustomisasi Logo, Warna & Ekspor HTML"
      >
        <Palette className="w-4 h-4" style={{ color: config.palette.accent }} />
        <span className="hidden sm:inline whitespace-nowrap">
          Kustomisasi & Ekspor HTML
        </span>
        <span className="sm:hidden">Kustomisasi</span>
      </button>

      {/* Floating WhatsApp Button (Bottom-Right) */}
      <a
        href={mainConsultUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi via WhatsApp"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs sm:text-sm font-semibold"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">
          Chat WhatsApp
        </span>
      </a>

      {/* Customizer & Single-File HTML Export Drawer */}
      <CustomizerDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        config={config}
        onChange={setConfig}
      />
    </div>
  );
}
