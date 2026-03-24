import { Link } from 'react-router-dom';
import { Clock, TrendingUp } from 'lucide-react';

export default function PujaCard({ puja }) {
  return (
    <div className="card group flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden h-44 bg-stone-100">
        <img
          src={puja.image}
          alt={puja.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80';
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Category pill */}
        <span className="absolute top-3 left-3 bg-white/95 text-stone-700 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {puja.category}
        </span>

        {/* Price badge */}
        <span className="absolute bottom-3 right-3 gradient-saffron text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          ₹{puja.price.toLocaleString()}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-stone-900 text-sm mb-1 leading-snug">{puja.name}</h3>
        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3">{puja.description}</p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[11px] text-stone-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={10} className="text-orange-400" />
            {puja.duration}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={10} className="text-emerald-500" />
            {puja.popularity}% popular
          </span>
        </div>

        {/* Tradition tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {puja.traditions.slice(0, 2).map((t) => (
            <span key={t} className="text-[10px] font-medium bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full border border-orange-100">
              {t}
            </span>
          ))}
        </div>

        {/* CTA — push to bottom */}
        <div className="mt-auto">
          <Link
            to={`/book/${puja.id}`}
            className="block text-center gradient-saffron text-white text-sm font-medium py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
