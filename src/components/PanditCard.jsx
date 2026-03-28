import { Link } from 'react-router-dom';
import { MapPin, Clock, CheckCircle, Zap, ArrowRight } from 'lucide-react';
import StarRating from './StarRating';

const badgeStyles = {
  'Grand Master':   'bg-violet-50 text-violet-700 border-violet-200',
  'Top Rated':      'bg-orange-50 text-orange-700 border-orange-200',
  'Verified Expert':'bg-blue-50  text-blue-700  border-blue-200',
  'Perfect Rated':  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Verified':       'bg-stone-50 text-stone-600 border-stone-200',
};

export default function PanditCard({ pandit }) {
  const badge = badgeStyles[pandit.badge] || badgeStyles['Verified'];

  return (
    <div className="card group flex flex-col overflow-hidden">
      {/* Card header */}
      <div className="p-5">
        <div className="flex gap-4">
          {/* Photo */}
          <div className="relative shrink-0">
            <img
              src={pandit.photo}
              alt={pandit.name}
              className="w-[62px] h-[62px] rounded-xl object-cover border-2 border-stone-100 group-hover:border-orange-200 transition-colors duration-200"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pandit.name)}&background=ea580c&color=fff&size=62`;
              }}
            />
            <span
              title={pandit.available ? 'Available' : 'Busy'}
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${pandit.available ? 'bg-emerald-400' : 'bg-stone-300'}`}
            />
          </div>

          {/* Name + badge + price */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1 mb-1">
              <h3 className="font-semibold text-stone-900 text-[0.875rem] leading-snug line-clamp-2">
                {pandit.name}
              </h3>
              <div className="text-right shrink-0 ml-2">
                <p className="text-saffron font-bold text-sm leading-none">
                  ₹{(pandit.price_per_puja || pandit.pricePerPuja || 0).toLocaleString()}
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">per puja</p>
              </div>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-1.5 mb-2">
              {pandit.verified && (
                <CheckCircle size={11} className="text-blue-500 shrink-0" />
              )}
              <span className={`text-[10px] font-medium border px-2 py-0.5 rounded-full ${badge}`}>
                {pandit.badge}
              </span>
            </div>

            {/* Rating */}
            <StarRating rating={pandit.rating} size={11} showCount count={pandit.reviews} />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-2.5 text-[11px] text-stone-500">
          <MapPin size={10} className="text-orange-400 shrink-0" />
          <span className="truncate">{pandit.city || pandit.location}</span>
        </div>

        {/* Divider + meta */}
        <div className="mt-3 pt-3 border-t border-stone-50">
          {/* Languages */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {pandit.languages.slice(0, 3).map((lang) => (
              <span
                key={lang}
                className="text-[10px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Response + experience */}
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <Zap size={10} className="text-emerald-500" />
              {pandit.response_time || pandit.responseTime}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} className="text-stone-400" />
              {pandit.experience} yrs exp
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto px-5 pb-5">
        <Link
          to={`/pandit/${pandit.id}`}
          className="flex items-center justify-center gap-1.5 w-full gradient-saffron text-white text-sm font-medium py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-sm group/btn"
        >
          View Profile & Book
          <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
