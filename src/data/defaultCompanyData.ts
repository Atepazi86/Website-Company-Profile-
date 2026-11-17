import { CompanyConfig, ThemePalette } from '../types/company';

export const COLOR_PALETTES: ThemePalette[] = [
  {
    id: 'corporate-cobalt',
    name: 'Biru Korporat',
    primary: '#0F172A',
    secondary: '#1E3A8A',
    accent: '#2563EB',
  },
  {
    id: 'executive-gold',
    name: 'Navy & Emas',
    primary: '#0F172A',
    secondary: '#1E293B',
    accent: '#D97706',
  },
  {
    id: 'emerald-trust',
    name: 'Slate & Zamrud',
    primary: '#0F172A',
    secondary: '#134E4A',
    accent: '#059669',
  },
  {
    id: 'royal-indigo',
    name: 'Indigo Modern',
    primary: '#111827',
    secondary: '#312E81',
    accent: '#4F46E5',
  },
];

export const HERO_IMAGE = '/src/assets/images/hero_corporate_office_1794878734509.jpg';

export const DEFAULT_COMPANY_CONFIG: CompanyConfig = {
  companyName: 'PT Nusantara Karya Mandiri',
  industry: 'Konsultan Teknologi & Infrastruktur Bisnis',
  tagline: 'Solusi Terpercaya untuk Pertumbuhan Bisnis Anda',
  heroHeadline: 'Membangun Infrastruktur Bisnis yang Tangguh dan Terukur.',
  heroSubheadline:
    'Kami mendampingi perusahaan di Indonesia dalam merancang sistem operasional digital, fasilitas komersial, dan strategi ekspansi dengan standar presisi tinggi dan biaya transparan.',
  whatsappNumber: '6281234567890',
  email: 'halo@nusantarakarya.co.id',
  address: 'Menara Sudirman Lt. 14, Jl. Jend. Sudirman Kav. 60, Jakarta Selatan 12190',
  operationalHours: 'Senin – Jumat, 08.30 – 17.30 WIB',
  aboutStory:
    'Didirikan pada tahun 2018, PT Nusantara Karya Mandiri lahir dari keyakinan bahwa setiap perusahaan bertumbuh membutuhkan mitra eksekusi yang menyatukan keahlian teknis, ketepatan jadwal, dan transparansi anggaran. Hingga kini, kami telah dipercaya menangani transformasi operasional berbagai perusahaan manufaktur, ritel, dan jasa di seluruh Indonesia.',
  vision:
    'Menjadi mitra strategis utama bagi korporasi Indonesia dalam membangun fondasi bisnis yang efisien, adaptif, dan berdaya saing global.',
  mission: [
    'Menghadirkan solusi teknis dan operasional yang terukur dampaknya bagi profitabilitas klien.',
    'Menjaga ketepatan waktu pengerjaan serta kejelasan rincian biaya sejak tahap perencanaan.',
    'Membangun tim spesialis bersertifikasi dengan standar layanan purna jual yang responsif.',
  ],
  logoEmblem: 'prism',
  logoFrame: 'squircle',
  customLogoUrl: null,
  palette: COLOR_PALETTES[0],
  stats: [
    { value: 8, suffix: '+', label: 'Tahun Pengalaman', detail: 'Sejak 2018' },
    { value: 145, suffix: '+', label: 'Proyek Selesai', detail: 'Skala Nasional' },
    { value: 98, suffix: '%', label: 'Klien Puas', detail: 'Audit Pasca-Proyek' },
    { value: 24, suffix: ' Jam', label: 'Garansi Respon', detail: 'Dukungan Teknis' },
  ],
  advantages: [
    {
      title: 'Tim Spesialis Bersertifikasi',
      description:
        'Setiap proyek ditangani langsung oleh insinyur, konsultan bisnis, dan manajer proyek berpengalaman lebih dari 7 tahun di industrinya.',
      icon: 'shield',
    },
    {
      title: 'Komitmen Tepat Waktu',
      description:
        'Sistem pelaporan progres mingguan berbasis milestone memastikan setiap tahap selesai sesuai jadwal yang disepakati.',
      icon: 'clock',
    },
    {
      title: 'Struktur Harga Transparan',
      description:
        'Rincian anggaran disusun terbuka tanpa biaya tersembunyi, lengkap dengan kontrak perjanjian layanan (SLA) yang jelas.',
      icon: 'layers',
    },
  ],
  services: [
    {
      id: 'srv-erp',
      code: '01',
      title: 'Pengembangan Sistem ERP & Web Korporat',
      shortDesc:
        'Perancangan aplikasi manajemen operasional, portal pelanggan, dan integrasi sistem keuangan berbasis cloud yang aman.',
      outcome: 'Memangkas proses administrasi manual hingga 60%',
      icon: 'code',
      basePriceMillions: 25,
      unitLabel: 'Mulai Rp 25 Juta',
      minScale: 1,
      maxScale: 10,
      scaleUnit: 'Modul Sistem',
      featured: true,
    },
    {
      id: 'srv-infra',
      code: '02',
      title: 'Konstruksi & Renovasi Ruang Komersial',
      shortDesc:
        'Desain arsitektur hingga pengerjaan fisik kantor modern, showroom, dan fasilitas operasional berstandar K3.',
      outcome: 'Garansi struktur & pemeliharaan hingga 12 bulan',
      icon: 'building',
      basePriceMillions: 45,
      unitLabel: 'Mulai Rp 45 Juta',
      minScale: 1,
      maxScale: 10,
      scaleUnit: 'Unit 50 m²',
      featured: true,
    },
    {
      id: 'srv-marketing',
      code: '03',
      title: 'Strategi Pemasaran Digital & Branding',
      shortDesc:
        'Rebranding identitas perusahaan, manajemen kampanye akuisisi prospek B2B, serta optimasi performa konversi digital.',
      outcome: 'Rata-rata kenaikan prospek berkualitas +140% dalam 6 bulan',
      icon: 'trending',
      basePriceMillions: 12,
      unitLabel: 'Mulai Rp 12 Juta',
      minScale: 1,
      maxScale: 10,
      scaleUnit: 'Bulan Kampanye',
    },
    {
      id: 'srv-supply',
      code: '04',
      title: 'Konsultasi Rantai Pasok & Logistik',
      shortDesc:
        'Audit alur gudang, integrasi pelacakan stok real-time, dan optimasi jaringan distribusi multi-kota.',
      outcome: 'Efisiensi biaya distribusi operasional hingga 22%',
      icon: 'truck',
      basePriceMillions: 18,
      unitLabel: 'Mulai Rp 18 Juta',
      minScale: 1,
      maxScale: 10,
      scaleUnit: 'Titik Gudang',
    },
    {
      id: 'srv-advisory',
      code: '05',
      title: 'Pendampingan Manajemen & SOP Korporat',
      shortDesc:
        'Penyusunan standar operasional prosedur (SOP), KPI divisi, serta pelatihan tim untuk kesiapan ekspansi cabang.',
      outcome: 'Dokumentasi SOP siap audit ISO 9001:2015',
      icon: 'briefcase',
      basePriceMillions: 15,
      unitLabel: 'Mulai Rp 15 Juta',
      minScale: 1,
      maxScale: 10,
      scaleUnit: 'Divisi Kerja',
    },
    {
      id: 'srv-cloud',
      code: '06',
      title: 'Modernisasi Infrastruktur IT & Keamanan',
      shortDesc:
        'Migrasi server terkelola, pengamanan jaringan kantor, serta pemantauan uptime sistem 24 jam penuh.',
      outcome: 'Target ketersediaan sistem 99,9% dengan backup otomatis',
      icon: 'cpu',
      basePriceMillions: 20,
      unitLabel: 'Mulai Rp 20 Juta',
      minScale: 1,
      maxScale: 10,
      scaleUnit: 'Node Infrastruktur',
    },
  ],
  portfolio: [
    {
      id: 'prj-1',
      title: 'Sistem ERP Terintegrasi Multi-Cabang',
      client: 'PT Sentosa Distribusi Nusantara',
      category: 'Teknologi & Sistem',
      year: '2025',
      duration: '14 Minggu',
      image: '/src/assets/images/portfolio_digital_platform_1794878733956.jpg',
      summary:
        'Konsolidasi data inventaris, penagihan otomatis, dan laporan eksekutif real-time untuk 12 cabang regional.',
      challenge:
        'Rekonsiliasi stok antar-cabang sebelumnya memakan waktu 5 hari kerja setiap akhir bulan karena pencatatan terpisah.',
      solution:
        'Membangun platform ERP berbasis web dengan sinkronisasi gudang otomatis, dashboard eksekutif, dan hak akses bertingkat.',
      metrics: [
        { label: 'Kecepatan Tutup Buku', value: '5 Hari → 4 Jam' },
        { label: 'Akurasi Stok', value: '99,4%' },
        { label: 'Cabang Terhubung', value: '12 Kota' },
      ],
    },
    {
      id: 'prj-2',
      title: 'Pembangunan Gedung Kantor & Fasilitas Kerja',
      client: 'Graha Mandiri Investama',
      category: 'Infrastruktur & Merek',
      year: '2025',
      duration: '20 Minggu',
      image: '/src/assets/images/portfolio_commercial_building_1794878734960.jpg',
      summary:
        'Renovasi menyeluruh fasad komersial dan ruang kerja eksekutif seluas 1.800 m² dengan konsep hemat energi.',
      challenge:
        'Klien membutuhkan pembaruan total ruang kantor tanpa mengganggu operasional divisi keuangan yang tetap berjalan.',
      solution:
        'Pengerjaan bertahap per zona lantai dengan sistem manajemen kebisingan, kaca fasad hemat panas, dan pencahayaan otomatis.',
      metrics: [
        { label: 'Luas Area', value: '1.800 m²' },
        { label: 'Efisiensi Listrik', value: '-28% / Bulan' },
        { label: 'Ketepatan Jadwal', value: '100% Tepat' },
      ],
    },
    {
      id: 'prj-3',
      title: 'Modernisasi Pusat Logistik & Gudang Pintar',
      client: 'PT Surya Logistik Prima',
      category: 'Teknologi & Sistem',
      year: '2024',
      duration: '12 Minggu',
      image: '/src/assets/images/portfolio_supply_logistics_1794878736895.jpg',
      summary:
        'Penataan ulang tata letak rak gudang berkapasitas tinggi disertai sistem pemindaian barcode untuk alur keluar-masuk barang.',
      challenge:
        'Tingkat kesalahan pengiriman mencapai 4,2% akibat penempatan palet yang belum terstandarisasi.',
      solution:
        'Implementasi zonasi rak berbasis frekuensi pengiriman dan perangkat lunak pelacakan barang terpadu.',
      metrics: [
        { label: 'Kapasitas Simpan', value: '+35%' },
        { label: 'Kesalahan Kirim', value: 'Turun ke 0,3%' },
        { label: 'Kecepatan Muat', value: '2,1x Lebih Cepat' },
      ],
    },
    {
      id: 'prj-4',
      title: 'Transformasi Identitas Korporat & Company Kit',
      client: 'Armada Kapital Indonesia',
      category: 'Infrastruktur & Merek',
      year: '2024',
      duration: '8 Minggu',
      image: '/src/assets/images/portfolio_brand_boardroom_1794878736365.jpg',
      summary:
        'Perancangan ulang identitas visual korporat, pedoman merek, materi presentasi investor, dan situs web resmi.',
      challenge:
        'Identitas visual lama kurang merepresentasikan skala perusahaan pasca-ekspansi ke sektor pembiayaan korporasi.',
      solution:
        'Menghadirkan sistem visual yang konsisten mulai dari logo, tipografi korporat, hingga perangkat presentasi direksi.',
      metrics: [
        { label: 'Peningkatan Prospek B2B', value: '+140%' },
        { label: 'Aset Pedoman Merek', value: '48 Halaman' },
        { label: 'Adopsi Tim Internal', value: '100%' },
      ],
    },
  ],
  testimonials: [
    {
      id: 'testi-1',
      name: 'Hendra Wijaya',
      role: 'Direktur Operasional',
      company: 'PT Sentosa Distribusi Nusantara',
      quote:
        'Pendekatan tim Nusantara Karya sangat terstruktur. Mereka tidak sekadar membangun sistem, tetapi memahami alur kerja gudang dan keuangan kami hingga proses tutup buku kini jauh lebih cepat.',
      outcome: 'Efisiensi rekonsiliasi 12 cabang dalam 4 jam',
      rating: 5,
    },
    {
      id: 'testi-2',
      name: 'Ratna Kusumawati',
      role: 'VP Corporate Affairs',
      company: 'Graha Mandiri Investama',
      quote:
        'Renovasi kantor seluas 1.800 m² selesai tepat waktu tanpa satu pun pembengkakan anggaran. Komunikasi mingguan mereka membuat jajaran direksi selalu tenang memantau progres.',
      outcome: 'Selesai tepat jadwal dengan penghematan energi 28%',
      rating: 5,
    },
    {
      id: 'testi-3',
      name: 'Budi Santoso',
      role: 'Managing Partner',
      company: 'Armada Kapital Indonesia',
      quote:
        'Rebranding dan pembaruan profil perusahaan kami berdampak langsung pada kepercayaan mitra institusional. Kualitas presentasi dan eksekusinya melampaui ekspektasi.',
      outcome: 'Pertumbuhan prospek kemitraan B2B naik 140%',
      rating: 5,
    },
  ],
};

export interface IndustryPreset {
  id: string;
  label: string;
  configPatch: Partial<CompanyConfig>;
}

export const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: 'tech-infra',
    label: 'Teknologi & Konsultan Bisnis',
    configPatch: {
      companyName: 'PT Nusantara Karya Mandiri',
      industry: 'Konsultan Teknologi & Infrastruktur Bisnis',
      tagline: 'Solusi Terpercaya untuk Pertumbuhan Bisnis Anda',
      heroHeadline: 'Membangun Infrastruktur Bisnis yang Tangguh dan Terukur.',
      heroSubheadline:
        'Kami mendampingi perusahaan di Indonesia dalam merancang sistem operasional digital, fasilitas komersial, dan strategi ekspansi dengan standar presisi tinggi dan biaya transparan.',
    },
  },
  {
    id: 'construction',
    label: 'Konstruksi & Renovasi',
    configPatch: {
      companyName: 'PT Bangun Persada Konstruksi',
      industry: 'Jasa Konstruksi, Arsitektur & Renovasi Komersial',
      tagline: 'Presisi Struktur, Ketepatan Waktu, Kualitas Teruji',
      heroHeadline: 'Wujudkan Bangunan Komersial Berkualitas Tinggi dan Tepat Waktu.',
      heroSubheadline:
        'Kontraktor umum terpercaya untuk pembangunan gedung kantor, renovasi interior korporat, dan fasilitas industri dengan standar keselamatan K3 dan garansi pemeliharaan penuh.',
    },
  },
  {
    id: 'digital-agency',
    label: 'Agensi Digital Marketing',
    configPatch: {
      companyName: 'Aksara Digital Strategi',
      industry: 'Agensi Pemasaran Digital & Pertumbuhan Merek',
      tagline: 'Mengubah Visibilitas Digital Menjadi Pertumbuhan Omzet Nyata',
      heroHeadline: 'Strategi Pemasaran Berbasis Data untuk Akuisisi Klien Berkualitas.',
      heroSubheadline:
        'Mitra pertumbuhan digital bagi brand B2B dan B2C melalui optimasi kampanye performa, penguatan identitas merek, serta pengembangan website berkonversi tinggi.',
    },
  },
  {
    id: 'food-supply',
    label: 'Supplier Bahan Pangan',
    configPatch: {
      companyName: 'PT Agrindo Pangan Sejahtera',
      industry: 'Supplier Bahan Pangan & Rantai Pasok HoReCa',
      tagline: 'Pasokan Segar, Higienis, dan Terjadwal untuk Bisnis Kuliner Anda',
      heroHeadline: 'Distribusi Bahan Pangan Terstandarisasi untuk Restoran & Hotel.',
      heroSubheadline:
        'Menjamin ketersediaan stok bahan baku berkualitas grade-A dengan armada berpendingin, sertifikasi kelayakan pangan, dan pengiriman harian tepat waktu.',
    },
  },
];
