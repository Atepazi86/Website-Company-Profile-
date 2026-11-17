import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Building2, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { PortfolioItem } from '../types/company';

interface PortfolioSectionProps {
  items: PortfolioItem[];
  companyName: string;
  whatsappNumber: string;
  primaryColor: string;
  accentColor: string;
}

type CategoryFilter = 'Semua' | 'Teknologi & Sistem' | 'Infrastruktur & Merek';

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  items,
  companyName,
  whatsappNumber,
  primaryColor,
  accentColor,
}) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('Semua');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories: CategoryFilter[] = [
    'Semua',
    'Teknologi & Sistem',
    'Infrastruktur & Merek',
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === 'Semua') return items;
    return items.filter((item) => item.category === activeFilter);
  }, [items, activeFilter]);

  const getProjectWhatsappUrl = (project: PortfolioItem) => {
    const cleanPhone = whatsappNumber.replace(/\D/g, '');
    const msg = `Halo ${companyName}, saya tertarik berkonsultasi mengenai proyek serupa dengan portofolio "${project.title}" (${project.client}).`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="portofolio" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p
              className="text-xs font-semibold tracking-wider uppercase mb-3"
              style={{ color: accentColor }}
            >
              Portofolio & Studi Kasus
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
              Rekam Jejak Eksekusi Proyek di Berbagai Industri
            </h2>
          </motion.div>

          {/* Interactive Filter Controls */}
          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl self-start md:self-auto"
            role="tablist"
            aria-label="Filter kategori portofolio"
          >
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolioFilterIndicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: primaryColor }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setSelectedProject(project)}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  {!failedImages[project.id] ? (
                    <img
                      src={project.image}
                      alt={`${project.title} — ${project.client}`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
                      }}
                    >
                      <Building2 className="w-10 h-10 mb-2 opacity-80" />
                      <span className="text-sm font-semibold text-center">{project.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-white">
                    <div className="text-xs text-white/85 flex items-center gap-2">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-num">{project.year}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      <span>Detail</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1.5">
                      {project.client} · {project.duration}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <span className="block text-[11px] text-slate-500 truncate">
                          {metric.label}
                        </span>
                        <span className="block text-sm font-bold text-slate-900 font-mono-num mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Portfolio Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                {!failedImages[selectedProject.id] ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Building2 className="w-12 h-12 opacity-80" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Tutup detail proyek"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.client}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">
                    {selectedProject.year} ({selectedProject.duration})
                  </span>
                </div>

                <h3
                  id="modal-project-title"
                  className="mt-2 text-2xl font-bold text-slate-900 tracking-tight"
                >
                  {selectedProject.title}
                </h3>

                <div className="mt-5 grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="block text-xs text-slate-500">{m.label}</span>
                      <span className="block text-base sm:text-lg font-bold text-slate-900 font-mono-num mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4 text-sm text-slate-600 leading-relaxed">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Tantangan Klien</h4>
                    <p>{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" style={{ color: accentColor }} />
                      <span>Solusi & Implementasi</span>
                    </h4>
                    <p>{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Tutup Jendela
                  </button>
                  <a
                    href={getProjectWhatsappUrl(selectedProject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform active:scale-[0.98]"
                    style={{ backgroundColor: accentColor }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="whitespace-nowrap">Konsultasi Proyek Serupa</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
