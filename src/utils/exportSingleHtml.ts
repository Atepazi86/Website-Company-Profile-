import { CompanyConfig } from '../types/company';
import { getLogoSvgString } from '../components/LogoMark';
import { HERO_IMAGE } from '../data/defaultCompanyData';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateSingleFileHtml(config: CompanyConfig, originBase = ''): string {
  const cleanPhone = config.whatsappNumber.replace(/\D/g, '') || '6281234567890';
  const waConsultUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Halo ${config.companyName}, saya ingin berkonsultasi mengenai layanan Anda.`
  )}`;

  const logoMarkup = getLogoSvgString(
    config.logoEmblem,
    config.logoFrame,
    config.companyName,
    config.palette.primary,
    config.palette.accent,
    config.customLogoUrl
  );

  const heroImgSrc = originBase ? `${originBase}${HERO_IMAGE}` : HERO_IMAGE;

  const servicesJson = JSON.stringify(
    config.services.map((s) => ({
      id: s.id,
      code: s.code,
      title: s.title,
      basePriceMillions: s.basePriceMillions,
      unitLabel: s.unitLabel,
      minScale: s.minScale,
      maxScale: s.maxScale,
      scaleUnit: s.scaleUnit,
    }))
  );

  const portfolioData = config.portfolio.map((p) => ({
    ...p,
    image: originBase && p.image.startsWith('/') ? `${originBase}${p.image}` : p.image,
  }));
  const portfolioJson = JSON.stringify(portfolioData);

  const servicesCardsHtml = config.services
    .map((srv, idx) => {
      const spanClass = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
      const srvWa = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Halo ${config.companyName}, saya tertarik menanyakan detail layanan "${srv.title}". Mohon informasi penawaran dan jadwal konsultasinya.`
      )}`;
      const lucideIcon =
        srv.icon === 'code'
          ? 'code-2'
          : srv.icon === 'building'
            ? 'building-2'
            : srv.icon === 'trending'
              ? 'trending-up'
              : srv.icon === 'truck'
                ? 'truck'
                : srv.icon === 'briefcase'
                  ? 'briefcase'
                  : 'cpu';

      return `
          <div class="${spanClass} reveal-up group bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div>
              <div class="flex items-center justify-between gap-4 mb-5">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-colors" style="background-color: var(--brand-accent-soft); color: var(--brand-accent);">
                  <i data-lucide="${lucideIcon}" class="w-5 h-5"></i>
                </div>
                <span class="font-mono-num text-xs font-semibold text-slate-400">${escapeHtml(srv.code)}.</span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">${escapeHtml(srv.title)}</h3>
              <p class="mt-2.5 text-sm text-slate-600 leading-relaxed">${escapeHtml(srv.shortDesc)}</p>
              <p class="mt-4 text-xs font-medium text-slate-500 pt-3 border-t border-slate-100">Hasil: ${escapeHtml(srv.outcome)}</p>
            </div>
            <div class="mt-6 flex items-center justify-between gap-3 pt-2">
              <span class="font-mono-num text-xs font-semibold text-slate-700">${escapeHtml(srv.unitLabel)}</span>
              <a href="${srvWa}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-transform active:scale-95 whitespace-nowrap" style="background-color: var(--brand-accent);">
                <span>Tanya Layanan Ini</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>`;
    })
    .join('\n');

  const portfolioCardsHtml = portfolioData
    .map(
      (prj) => `
          <article data-category="${escapeHtml(prj.category)}" data-project-id="${escapeHtml(prj.id)}" class="portfolio-card reveal-up group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col">
            <div class="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img src="${escapeHtml(prj.image)}" alt="${escapeHtml(prj.title)}" referrerpolicy="no-referrer" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div style="display:none; background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));" class="w-full h-full items-center justify-center p-6 text-white text-center font-semibold text-sm">${escapeHtml(prj.title)}</div>
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent"></div>
              <div class="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-white">
                <div class="text-xs text-white/85 flex items-center gap-2">
                  <span>${escapeHtml(prj.category)}</span>
                  <span>·</span>
                  <span class="font-mono-num">${escapeHtml(prj.year)}</span>
                </div>
                <span class="inline-flex items-center gap-1 text-xs font-semibold bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <span>Detail</span>
                  <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
                </span>
              </div>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p class="text-xs text-slate-500 font-medium mb-1.5">${escapeHtml(prj.client)} · ${escapeHtml(prj.duration)}</p>
                <h3 class="text-lg sm:text-xl font-bold text-slate-900">${escapeHtml(prj.title)}</h3>
                <p class="mt-2.5 text-sm text-slate-600 leading-relaxed">${escapeHtml(prj.summary)}</p>
              </div>
              <div class="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3">
                ${prj.metrics
                  .map(
                    (m) => `
                  <div>
                    <span class="block text-[11px] text-slate-500 truncate">${escapeHtml(m.label)}</span>
                    <span class="block text-sm font-bold text-slate-900 font-mono-num mt-0.5">${escapeHtml(m.value)}</span>
                  </div>`
                  )
                  .join('')}
              </div>
            </div>
          </article>`
    )
    .join('\n');

  const testimonialsHtml = config.testimonials
    .map(
      (t) => `
          <article class="reveal-up bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-all duration-200 hover:-translate-y-1">
            <div>
              <div class="flex items-center gap-1 text-amber-500 mb-4" aria-label="Rating 5 dari 5 bintang">
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
              </div>
              <p class="text-sm sm:text-base text-slate-700 leading-relaxed">"${escapeHtml(t.quote)}"</p>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100">
              <p class="text-xs font-semibold mb-2" style="color: var(--brand-accent);">Hasil: ${escapeHtml(t.outcome)}</p>
              <p class="text-sm font-bold text-slate-900">${escapeHtml(t.name)}</p>
              <p class="text-xs text-slate-500">${escapeHtml(t.role)} · ${escapeHtml(t.company)}</p>
            </div>
          </article>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(config.companyName)} — ${escapeHtml(config.tagline)}</title>
  <meta name="description" content="${escapeHtml(config.heroSubheadline)}" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --brand-primary: ${config.palette.primary};
      --brand-secondary: ${config.palette.secondary};
      --brand-accent: ${config.palette.accent};
      --brand-accent-soft: ${config.palette.accent}14;
    }
    html { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-mono-num { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
    .bg-architectural-grid {
      background-image: linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }
    .nav-link-underline { position: relative; }
    .nav-link-underline::after {
      content: ''; position: absolute; left: 0; bottom: -4px; width: 100%; height: 2px;
      background-color: var(--brand-accent); transform: scaleX(0); transform-origin: right;
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .nav-link-underline:hover::after { transform: scaleX(1); transform-origin: left; }
    .reveal-up { opacity: 0; transform: translateY(20px); transition: opacity 550ms cubic-bezier(0.16, 1, 0.3, 1), transform 550ms cubic-bezier(0.16, 1, 0.3, 1); }
    .reveal-up.is-visible { opacity: 1; transform: translateY(0); }
    @media (prefers-reduced-motion: reduce) {
      .reveal-up { opacity: 1; transform: none; transition: none; }
    }
  </style>
</head>
<body class="bg-[#F8FAFC] text-slate-900 antialiased">
  <!-- Scroll Progress Bar -->
  <div id="scroll-progress" class="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left scale-x-0 transition-transform duration-75" style="background-color: var(--brand-accent);"></div>

  <!-- Navbar -->
  <header class="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
      <a href="#beranda" class="flex items-center gap-3 whitespace-nowrap shrink-0">
        ${logoMarkup}
        <span class="font-bold text-base sm:text-lg tracking-tight text-slate-900">${escapeHtml(config.companyName)}</span>
      </a>

      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
        <a href="#beranda" class="nav-link-underline hover:text-slate-900 whitespace-nowrap shrink-0">Beranda</a>
        <a href="#tentang" class="nav-link-underline hover:text-slate-900 whitespace-nowrap shrink-0">Tentang Kami</a>
        <a href="#layanan" class="nav-link-underline hover:text-slate-900 whitespace-nowrap shrink-0">Layanan</a>
        <a href="#portofolio" class="nav-link-underline hover:text-slate-900 whitespace-nowrap shrink-0">Portofolio</a>
        <a href="#testimoni" class="nav-link-underline hover:text-slate-900 whitespace-nowrap shrink-0">Testimoni</a>
      </nav>

      <div class="flex items-center gap-3 shrink-0">
        <a href="${waConsultUrl}" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-transform active:scale-95 whitespace-nowrap shrink-0" style="background-color: var(--brand-accent);">
          <span>Konsultasi Gratis</span>
        </a>
        <button id="mobile-menu-btn" type="button" aria-label="Buka menu navigasi" class="md:hidden w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100">
          <i data-lucide="menu" class="w-5 h-5"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
      <a href="#beranda" class="mobile-nav-link block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Beranda</a>
      <a href="#tentang" class="mobile-nav-link block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Tentang Kami</a>
      <a href="#layanan" class="mobile-nav-link block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Layanan</a>
      <a href="#portofolio" class="mobile-nav-link block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Portofolio</a>
      <a href="#testimoni" class="mobile-nav-link block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Testimoni</a>
      <a href="${waConsultUrl}" target="_blank" rel="noopener noreferrer" class="block text-center mt-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style="background-color: var(--brand-accent);">Konsultasi Gratis via WhatsApp</a>
    </div>
  </header>

  <main>
    <!-- Hero Section -->
    <section id="beranda" class="relative bg-architectural-grid pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div class="lg:col-span-6 flex flex-col justify-center">
            <p class="text-xs font-semibold tracking-wider uppercase mb-4" style="color: var(--brand-accent);">
              ${escapeHtml(config.industry)} · ${escapeHtml(config.tagline)}
            </p>
            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance]">
              ${escapeHtml(config.heroHeadline)}
            </h1>
            <p class="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              ${escapeHtml(config.heroSubheadline)}
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-3.5">
              <a href="${waConsultUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap" style="background-color: var(--brand-accent);">
                <i data-lucide="message-circle" class="w-4 h-4"></i>
                <span>Hubungi via WhatsApp</span>
              </a>
              <a href="#layanan" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 transition-colors whitespace-nowrap">
                <span>Lihat Layanan</span>
                <i data-lucide="arrow-down" class="w-4 h-4"></i>
              </a>
            </div>
          </div>

          <div class="lg:col-span-6">
            <div class="relative h-full min-h-[300px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <img src="${escapeHtml(heroImgSrc)}" alt="${escapeHtml(config.companyName)}" referrerpolicy="no-referrer" onerror="this.style.display='none';" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
              <div class="absolute bottom-5 left-5 right-5 text-white">
                <p class="text-xs text-white/80 font-medium">${escapeHtml(config.companyName)}</p>
                <p class="text-sm sm:text-base font-semibold mt-0.5">${escapeHtml(config.tagline)}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Strip -->
        <div class="mt-14 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          ${config.stats
            .map(
              (st) => `
            <div>
              <div class="text-3xl sm:text-4xl font-extrabold tracking-tight" style="color: var(--brand-primary);">
                <span class="counter-value font-mono-num" data-target="${st.value}" data-suffix="${escapeHtml(st.suffix)}">${st.value}${escapeHtml(st.suffix)}</span>
              </div>
              <p class="mt-1 text-sm font-semibold text-slate-900">${escapeHtml(st.label)}</p>
              <p class="text-xs text-slate-500">${escapeHtml(st.detail)}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- Tentang Kami -->
    <section id="tentang" class="py-20 lg:py-28 bg-white border-y border-slate-200/80">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-6 reveal-up">
            <p class="text-xs font-semibold tracking-wider uppercase mb-3" style="color: var(--brand-accent);">Tentang Kami</p>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
              Dedikasi Korporat untuk Keberlanjutan Bisnis Klien
            </h2>
            <p class="mt-5 text-base text-slate-600 leading-relaxed">${escapeHtml(config.aboutStory)}</p>

            <div class="mt-8 pt-8 border-t border-slate-200 space-y-5">
              <div>
                <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Visi Perusahaan</h3>
                <p class="mt-1.5 text-sm text-slate-600 leading-relaxed">${escapeHtml(config.vision)}</p>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Misi Utama</h3>
                <ul class="mt-2 space-y-2 text-sm text-slate-600">
                  ${config.mission
                    .map(
                      (m) => `
                    <li class="flex items-start gap-2.5">
                      <i data-lucide="check-circle-2" class="w-4 h-4 mt-0.5 shrink-0" style="color: var(--brand-accent);"></i>
                      <span>${escapeHtml(m)}</span>
                    </li>`
                    )
                    .join('')}
                </ul>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 space-y-5">
            ${config.advantages
              .map((adv) => {
                const ic = adv.icon === 'shield' ? 'shield-check' : adv.icon === 'clock' ? 'clock' : 'layers';
                return `
              <div class="reveal-up bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white" style="background-color: var(--brand-primary);">
                  <i data-lucide="${ic}" class="w-5 h-5"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">${escapeHtml(adv.title)}</h3>
                  <p class="mt-1.5 text-sm text-slate-600 leading-relaxed">${escapeHtml(adv.description)}</p>
                </div>
              </div>`;
              })
              .join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Layanan -->
    <section id="layanan" class="py-20 lg:py-28 bg-[#F8FAFC]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mb-12 reveal-up">
          <p class="text-xs font-semibold tracking-wider uppercase mb-3" style="color: var(--brand-accent);">Layanan & Solusi</p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Layanan Terintegrasi Sesuai Kebutuhan Skala Usaha
          </h2>
          <p class="mt-4 text-base text-slate-600 leading-relaxed">
            Pilih layanan yang relevan untuk konsultasi langsung dengan tim spesialis kami melalui WhatsApp.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          ${servicesCardsHtml}
        </div>
      </div>
    </section>

    <!-- Simulasi Estimasi Biaya -->
    <section id="estimasi" class="py-20 lg:py-28 bg-white border-y border-slate-200/80">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mb-12 reveal-up">
          <p class="text-xs font-semibold tracking-wider uppercase mb-3" style="color: var(--brand-accent);">Simulasi Estimasi Biaya</p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Hitung Perkiraan Investasi Proyek Secara Real-Time
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div class="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <label for="calc-service" class="block text-sm font-semibold text-slate-900 mb-2">1. Pilih Jenis Layanan</label>
              <select id="calc-service" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900"></select>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
                <label for="calc-scale" class="text-sm font-semibold text-slate-900">2. Skala Proyek</label>
                <span id="calc-scale-label" class="font-mono-num text-sm font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200"></span>
              </div>
              <input id="calc-scale" type="range" min="1" max="10" value="3" class="w-full accent-blue-600" />
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900 mb-2">3. Tingkat Paket</p>
              <div class="grid grid-cols-3 gap-3">
                <button type="button" data-tier="standar" class="tier-btn p-3 rounded-xl border border-slate-200 bg-white text-left text-xs font-semibold">Standar</button>
                <button type="button" data-tier="profesional" class="tier-btn p-3 rounded-xl border border-slate-200 bg-white text-left text-xs font-semibold">Profesional</button>
                <button type="button" data-tier="enterprise" class="tier-btn p-3 rounded-xl border border-slate-200 bg-white text-left text-xs font-semibold">Enterprise</button>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <label class="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium cursor-pointer">
                <input id="calc-express" type="checkbox" class="w-4 h-4" />
                <span>Prioritas Ekspres (-25% Waktu)</span>
              </label>
              <label class="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium cursor-pointer">
                <input id="calc-support" type="checkbox" checked class="w-4 h-4" />
                <span>Garansi & Pemeliharaan 6 Bulan</span>
              </label>
            </div>
          </div>

          <div class="lg:col-span-5 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between" style="background-color: var(--brand-primary);">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-white/15 text-sm">
                <span class="font-medium text-white/90">Ringkasan Estimasi</span>
                <span id="calc-duration" class="font-mono-num text-xs text-white/75"></span>
              </div>
              <p class="mt-6 text-xs uppercase tracking-wider text-white/70">Kisaran Investasi Proyek</p>
              <div id="calc-price-range" class="mt-2 text-2xl sm:text-3xl font-bold font-mono-num"></div>
              <p class="mt-3 text-xs text-white/70 leading-relaxed">Angka indikatif awal. Rincian RAB resmi disusun setelah konsultasi teknis.</p>
            </div>
            <a id="calc-wa-btn" href="${waConsultUrl}" target="_blank" rel="noopener noreferrer" class="mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg" style="background-color: var(--brand-accent);">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              <span>Kirim Hasil Estimasi ke WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Portofolio -->
    <section id="portofolio" class="py-20 lg:py-28 bg-[#F8FAFC]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div class="max-w-xl reveal-up">
            <p class="text-xs font-semibold tracking-wider uppercase mb-3" style="color: var(--brand-accent);">Portofolio & Studi Kasus</p>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Rekam Jejak Eksekusi Proyek</h2>
          </div>
          <div class="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl">
            <button type="button" data-filter="Semua" class="filter-btn px-3.5 py-2 text-xs font-semibold rounded-lg text-white" style="background-color: var(--brand-primary);">Semua</button>
            <button type="button" data-filter="Teknologi & Sistem" class="filter-btn px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-600">Teknologi & Sistem</button>
            <button type="button" data-filter="Infrastruktur & Merek" class="filter-btn px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-600">Infrastruktur & Merek</button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          ${portfolioCardsHtml}
        </div>
      </div>
    </section>

    <!-- Testimoni -->
    <section id="testimoni" class="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mb-12 reveal-up">
          <p class="text-xs font-semibold tracking-wider uppercase mb-3" style="color: var(--brand-accent);">Testimoni Klien</p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Dipercaya oleh Pimpinan Perusahaan di Indonesia</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${testimonialsHtml}
        </div>
      </div>
    </section>
  </main>

  <!-- Footer 4 Kolom -->
  <footer class="text-white pt-16 pb-10" style="background-color: var(--brand-primary);">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
        <div>
          <div class="flex items-center gap-3 mb-4">
            ${logoMarkup}
            <span class="font-bold text-base">${escapeHtml(config.companyName)}</span>
          </div>
          <p class="text-xs text-white/75 leading-relaxed">${escapeHtml(config.tagline)}. ${escapeHtml(config.industry)}.</p>
        </div>
        <div>
          <h3 class="text-sm font-bold mb-4">Tautan Cepat</h3>
          <ul class="space-y-2.5 text-xs text-white/75">
            <li><a href="#beranda" class="hover:text-white">Beranda</a></li>
            <li><a href="#tentang" class="hover:text-white">Tentang Kami</a></li>
            <li><a href="#layanan" class="hover:text-white">Layanan Utama</a></li>
            <li><a href="#estimasi" class="hover:text-white">Simulasi Estimasi</a></li>
            <li><a href="#portofolio" class="hover:text-white">Portofolio Proyek</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-bold mb-4">Layanan Kami</h3>
          <ul class="space-y-2.5 text-xs text-white/75">
            ${config.services.slice(0, 5).map((s) => `<li><a href="#layanan" class="hover:text-white">${escapeHtml(s.title)}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-bold mb-4">Kontak & Jam Kerja</h3>
          <ul class="space-y-2.5 text-xs text-white/75 leading-relaxed">
            <li>${escapeHtml(config.address)}</li>
            <li>${escapeHtml(config.operationalHours)}</li>
            <li>WhatsApp: +${cleanPhone}</li>
            <li>Email: ${escapeHtml(config.email)}</li>
          </ul>
        </div>
      </div>
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
        <p>© ${new Date().getFullYear()} ${escapeHtml(config.companyName)}. Seluruh hak cipta dilindungi.</p>
        <p>Profesionalisme · Ketepatan · Transparansi</p>
      </div>
    </div>
  </footer>

  <!-- Modal Portofolio -->
  <div id="project-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
      <button id="modal-close-btn" type="button" aria-label="Tutup modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
      <p id="modal-meta" class="text-xs text-slate-500 font-medium"></p>
      <h3 id="modal-title" class="mt-2 text-2xl font-bold text-slate-900"></h3>
      <div id="modal-metrics" class="mt-5 grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200"></div>
      <div class="mt-5 space-y-3 text-sm text-slate-600">
        <div><strong class="text-slate-900 block mb-1">Tantangan Klien:</strong><span id="modal-challenge"></span></div>
        <div><strong class="text-slate-900 block mb-1">Solusi Kami:</strong><span id="modal-solution"></span></div>
      </div>
      <div class="mt-6 pt-4 border-t border-slate-200 flex justify-end">
        <a id="modal-wa-link" href="${waConsultUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style="background-color: var(--brand-accent);">
          <i data-lucide="message-circle" class="w-4 h-4"></i>
          <span>Konsultasi Proyek Serupa</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Floating WhatsApp Button -->
  <a href="${waConsultUrl}" target="_blank" rel="noopener noreferrer" aria-label="Chat via WhatsApp" class="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full text-white text-xs sm:text-sm font-semibold shadow-xl transition-transform hover:scale-105" style="background-color: #16A34A;">
    <i data-lucide="message-circle" class="w-5 h-5"></i>
    <span class="hidden sm:inline">Chat WhatsApp</span>
  </a>

  <script>
    lucide.createIcons();

    // Scroll Progress Bar
    const progressEl = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (progressEl) progressEl.style.transform = 'scaleX(' + pct + ')';
    }, { passive: true });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));
    document.querySelectorAll('.mobile-nav-link').forEach((a) => {
      a.addEventListener('click', () => mobileMenu?.classList.add('hidden'));
    });

    // Scroll Reveal & Animated Counters
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));

    // Cost Estimator Logic
    const SERVICES = ${servicesJson};
    const WA_PHONE = '${cleanPhone}';
    const COMPANY_NAME = ${JSON.stringify(config.companyName)};
    const selEl = document.getElementById('calc-service');
    const scaleEl = document.getElementById('calc-scale');
    const scaleLbl = document.getElementById('calc-scale-label');
    const expressEl = document.getElementById('calc-express');
    const supportEl = document.getElementById('calc-support');
    const priceEl = document.getElementById('calc-price-range');
    const durEl = document.getElementById('calc-duration');
    const waBtn = document.getElementById('calc-wa-btn');
    let currentTier = 'profesional';

    SERVICES.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.code + '. ' + s.title + ' (' + s.unitLabel + ')';
      selEl?.appendChild(opt);
    });

    function fmtIdr(m) {
      if (m >= 1000) return 'Rp ' + (m / 1000).toFixed(2).replace(/\\.00$/, '').replace('.', ',') + ' Miliar';
      return 'Rp ' + Math.round(m).toLocaleString('id-ID') + ' Juta';
    }

    function updateCalc() {
      const srv = SERVICES.find((s) => s.id === selEl?.value) || SERVICES[0];
      const scale = Number(scaleEl?.value || 3);
      const mult = currentTier === 'standar' ? 1 : currentTier === 'profesional' ? 1.45 : 2.1;
      const bonus = currentTier === 'standar' ? 0 : currentTier === 'profesional' ? 2 : 4;
      const sub = srv.basePriceMillions * (1 + (scale - 1) * 0.28) * mult;
      const total = sub + (expressEl?.checked ? sub * 0.18 : 0) + (supportEl?.checked ? 4.5 : 0);
      const minC = total * 0.92;
      const maxC = total * 1.12;
      let wks = Math.max(2, Math.round(scale * 1.4) + bonus);
      if (expressEl?.checked) wks = Math.max(2, Math.round(wks * 0.75));

      if (scaleLbl) scaleLbl.textContent = scale + ' ' + srv.scaleUnit;
      if (priceEl) priceEl.textContent = fmtIdr(minC) + ' – ' + fmtIdr(maxC);
      if (durEl) durEl.textContent = 'Durasi ± ' + wks + ' Minggu';
      if (waBtn) {
        const msg = 'Halo ' + COMPANY_NAME + ', hasil simulasi biaya:\\n• Layanan: ' + srv.title + '\\n• Skala: ' + scale + ' ' + srv.scaleUnit + '\\n• Paket: ' + currentTier + '\\n• Estimasi: ' + fmtIdr(minC) + ' – ' + fmtIdr(maxC);
        waBtn.setAttribute('href', 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(msg));
      }
      document.querySelectorAll('.tier-btn').forEach((b) => {
        const active = b.getAttribute('data-tier') === currentTier;
        b.style.borderColor = active ? 'var(--brand-accent)' : '#E2E8F0';
        b.style.backgroundColor = active ? '#FFFFFF' : '#F8FAFC';
      });
    }

    document.querySelectorAll('.tier-btn').forEach((b) => {
      b.addEventListener('click', () => { currentTier = b.getAttribute('data-tier') || 'profesional'; updateCalc(); });
    });
    [selEl, scaleEl, expressEl, supportEl].forEach((el) => el?.addEventListener('input', updateCalc));
    updateCalc();

    // Portfolio Filter & Modal
    const PROJECTS = ${portfolioJson};
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter');
        document.querySelectorAll('.filter-btn').forEach((b) => {
          const on = b === btn;
          b.style.backgroundColor = on ? 'var(--brand-primary)' : 'transparent';
          b.style.color = on ? '#FFFFFF' : '#475569';
        });
        document.querySelectorAll('.portfolio-card').forEach((card) => {
          const show = cat === 'Semua' || card.getAttribute('data-category') === cat;
          card.style.display = show ? 'flex' : 'none';
        });
      });
    });

    const modalEl = document.getElementById('project-modal');
    document.querySelectorAll('.portfolio-card').forEach((card) => {
      card.addEventListener('click', () => {
        const prj = PROJECTS.find((p) => p.id === card.getAttribute('data-project-id'));
        if (!prj || !modalEl) return;
        document.getElementById('modal-meta').textContent = prj.category + ' · ' + prj.client + ' · ' + prj.year;
        document.getElementById('modal-title').textContent = prj.title;
        document.getElementById('modal-challenge').textContent = prj.challenge;
        document.getElementById('modal-solution').textContent = prj.solution;
        document.getElementById('modal-metrics').innerHTML = prj.metrics.map((m) =>
          '<div><span class="block text-xs text-slate-500">' + m.label + '</span><span class="block text-sm font-bold text-slate-900 font-mono-num">' + m.value + '</span></div>'
        ).join('');
        document.getElementById('modal-wa-link').setAttribute('href', 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent('Halo ' + COMPANY_NAME + ', saya ingin konsultasi proyek serupa: ' + prj.title));
        modalEl.classList.remove('hidden');
      });
    });
    document.getElementById('modal-close-btn')?.addEventListener('click', () => modalEl?.classList.add('hidden'));
    modalEl?.addEventListener('click', (e) => { if (e.target === modalEl) modalEl.classList.add('hidden'); });
  </script>
</body>
</html>`;
}
