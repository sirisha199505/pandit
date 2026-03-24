import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Reusable page-top banner with a background image, overlay, title and breadcrumb.
 *
 * Props:
 *   image      — Unsplash URL string
 *   label      — small pill text above title  (optional)
 *   title      — main heading
 *   subtitle   — body text under title       (optional)
 *   breadcrumb — array of { label, to? }     (optional)
 *   children   — extra content (search bar, pills, etc.) rendered below subtitle
 *   height     — tailwind h-class string, default 'h-56 md:h-64'
 *   align      — 'center' | 'left'           default 'center'
 */
export default function PageBanner({
  image,
  label,
  title,
  subtitle,
  breadcrumb = [],
  children,
  height = 'h-56 md:h-64',
  align = 'center',
}) {
  const isCenter = align === 'center';

  return (
    <div className={`relative ${height} overflow-hidden`}>
      {/* Background image */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Layered overlays: dark base + brand tint */}
      <div className="absolute inset-0 bg-stone-950/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(136,19,55,0.45) 0%, rgba(154,52,18,0.35) 50%, rgba(120,53,15,0.25) 100%)',
        }}
      />

      {/* Bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#fafaf7] to-transparent" />

      {/* Content */}
      <div
        className={`relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${
          isCenter ? 'items-center text-center' : 'items-start text-left'
        }`}
      >
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1 text-white/60 text-xs mb-3 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={11} /> Home
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight size={11} className="text-white/40" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Label pill */}
        {label && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-3">
            {label}
          </span>
        )}

        {/* Title */}
        <h1
          className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className={`text-white/70 text-sm leading-relaxed ${isCenter ? 'max-w-lg' : 'max-w-xl'}`}>
            {subtitle}
          </p>
        )}

        {/* Slot for search bars / pills etc. */}
        {children && <div className="mt-4 w-full">{children}</div>}
      </div>
    </div>
  );
}
