import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin, SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import { pandits } from '../data/mockData';
import PanditCard from '../components/PanditCard';
import PageBanner from '../components/PageBanner';

const traditions = ['All', 'Telugu', 'Tamil', 'North Indian', 'Maharashtrian', 'Kannada', 'Malayali'];
const languages  = ['All', 'Telugu', 'Tamil', 'Hindi', 'Sanskrit', 'Kannada', 'Marathi', 'Malayalam'];
const sortOptions = ['Relevance', 'Rating: High to Low', 'Price: Low to High', 'Price: High to Low', 'Experience'];

function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-150 ${
        active
          ? 'gradient-saffron text-white border-transparent shadow-sm'
          : 'border-stone-200 text-stone-600 bg-white hover:border-orange-300 hover:text-stone-800'
      }`}
    >
      {children}
    </button>
  );
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const [query,       setQuery]       = useState(searchParams.get('q')   || '');
  const [location,    setLocation]    = useState(searchParams.get('loc') || '');
  const [tradition,   setTradition]   = useState('All');
  const [language,    setLanguage]    = useState('All');
  const [sortBy,      setSortBy]      = useState('Relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [priceMax,    setPriceMax]    = useState(20000);
  const [onlyAvail,   setOnlyAvail]   = useState(false);

  const clearAll = () => {
    setQuery(''); setLocation(''); setTradition('All');
    setLanguage('All'); setPriceMax(20000); setOnlyAvail(false);
  };

  const hasFilters = tradition !== 'All' || language !== 'All' || priceMax < 20000 || onlyAvail;

  const filtered = useMemo(() => {
    let r = [...pandits];
    if (query) {
      const q = query.toLowerCase();
      r = r.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.specializations.some((s) => s.toLowerCase().includes(q)) ||
        p.traditions.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (location) r = r.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()));
    if (tradition !== 'All') r = r.filter((p) => p.traditions.some((t) => t.toLowerCase().includes(tradition.toLowerCase())));
    if (language  !== 'All') r = r.filter((p) => p.languages.some((l)  => l.toLowerCase().includes(language.toLowerCase())));
    if (onlyAvail) r = r.filter((p) => p.available);
    r = r.filter((p) => p.pricePerPuja <= priceMax);
    if (sortBy === 'Rating: High to Low')   r.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'Price: Low to High')  r.sort((a, b) => a.pricePerPuja - b.pricePerPuja);
    else if (sortBy === 'Price: High to Low')  r.sort((a, b) => b.pricePerPuja - a.pricePerPuja);
    else if (sortBy === 'Experience')          r.sort((a, b) => b.experience - a.experience);
    return r;
  }, [query, location, tradition, language, sortBy, priceMax, onlyAvail]);

  return (
    <div className="min-h-screen bg-cream">
      <PageBanner
        image="/lord ganesh.jpg"
        label="Verified Pandits"
        title="Find Your Pandit"
        subtitle="Discover trusted pandits near you — filtered by tradition, language and ceremony type."
        breadcrumb={[{ label: 'Find Pandits' }]}
        align="left"
        height="h-48 md:h-56"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Search bar ── */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-card border border-stone-100 mb-6">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Query */}
            <div className="flex items-center gap-2.5 flex-1 border border-stone-200 rounded-xl px-3.5 focus-within:border-orange-400 focus-within:shadow-input transition-all">
              <SearchIcon size={15} className="text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Puja, ceremony or pandit name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 py-2.5 text-sm text-stone-800 placeholder-stone-400 outline-none bg-transparent"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-stone-300 hover:text-stone-500 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2.5 border border-stone-200 rounded-xl px-3.5 sm:w-52 focus-within:border-orange-400 focus-within:shadow-input transition-all">
              <MapPin size={15} className="text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="City..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 py-2.5 text-sm text-stone-800 placeholder-stone-400 outline-none bg-transparent"
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                showFilters || hasFilters
                  ? 'gradient-saffron text-white border-transparent shadow-sm'
                  : 'border-stone-200 text-stone-600 bg-white hover:border-orange-300'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-stone-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Tradition */}
                <div>
                  <p className="text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">Tradition</p>
                  <div className="flex flex-wrap gap-1.5">
                    {traditions.map((t) => (
                      <FilterPill key={t} active={tradition === t} onClick={() => setTradition(t)}>{t}</FilterPill>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <p className="text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">Language</p>
                  <div className="flex flex-wrap gap-1.5">
                    {languages.map((l) => (
                      <FilterPill key={l} active={language === l} onClick={() => setLanguage(l)}>{l}</FilterPill>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
                    Max Price: <span className="text-saffron">₹{priceMax.toLocaleString()}</span>
                  </p>
                  <input
                    type="range"
                    min={1000} max={20000} step={500}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>₹1K</span><span>₹20K</span>
                  </div>
                </div>

                {/* Other */}
                <div className="flex flex-col gap-3 justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={onlyAvail}
                      onChange={(e) => setOnlyAvail(e.target.checked)}
                      className="w-4 h-4 rounded accent-orange-500 cursor-pointer"
                    />
                    <span className="text-sm text-stone-600 group-hover:text-stone-800">Available Now Only</span>
                  </label>
                  {hasFilters && (
                    <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-600 font-medium text-left">
                      × Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Results ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-stone-500">
                <span className="font-semibold text-stone-800">{filtered.length}</span> pandits found
                {query && <> for "<span className="text-saffron font-medium">{query}</span>"</>}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 outline-none text-stone-600 bg-white hover:border-orange-300 transition-colors cursor-pointer"
              >
                {sortOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => <PanditCard key={p.id} pandit={p} />)}
              </div>
            ) : (
              <div className="text-center py-24 bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-semibold text-stone-800 mb-1">No pandits found</h3>
                <p className="text-stone-400 text-sm">Try different search terms or adjust your filters.</p>
                {hasFilters && (
                  <button onClick={clearAll} className="mt-4 text-sm text-saffron hover:underline font-medium">
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:w-60 shrink-0 space-y-4">
            {/* Popular Pujas */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-100 shadow-card">
              <h3 className="font-bold text-stone-900 text-sm mb-3">Popular Pujas</h3>
              <div className="space-y-1.5">
                {['Satyanarayana Vratham', 'Griha Pravesh', 'Wedding', 'Ganesh Puja', 'Rudrabhishek'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setQuery(p)}
                    className="flex items-center justify-between w-full text-sm text-stone-600 hover:text-saffron py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors text-left"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-orange-400">🙏</span> {p}
                    </span>
                    <ArrowRight size={12} className="text-stone-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Online puja CTA */}
            <div className="gradient-saffron rounded-2xl p-5 text-white shadow-saffron">
              <div className="text-2xl mb-2">🎥</div>
              <h3 className="font-bold text-sm mb-1">Online Puja</h3>
              <p className="text-xs text-white/80 mb-3 leading-relaxed">Book a live HD video puja from anywhere in the world.</p>
              <button
                onClick={() => setQuery('Online')}
                className="bg-white text-saffron text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors w-full"
              >
                Book Online Puja
              </button>
            </div>

            {/* Muhurat tip */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-semibold text-amber-800 mb-1">🗓️ Next Auspicious Date</p>
              <p className="text-[11px] text-amber-700 leading-relaxed">
                <strong>Apr 18</strong> — Akshaya Tritiya. Ideal for Griha Pravesh & Weddings.
              </p>
              <Link to="/muhurat" className="text-[11px] text-orange-600 hover:underline font-medium mt-1 block">
                View all muhurats →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
