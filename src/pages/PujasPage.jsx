import { useState } from 'react';
import { Search } from 'lucide-react';
import { pujas, categories } from '../data/mockData';
import PujaCard from '../components/PujaCard';
import PageBanner from '../components/PageBanner';

export default function PujasPage() {
  const [search, setSearch]               = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = pujas.filter((p) => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-cream pattern-rangoli">
      <PageBanner
        image="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&q=80"
        label="Sacred Ceremonies"
        title="All Pujas & Rituals"
        subtitle="Find and book pandits for every sacred ceremony — from daily pujas to grand weddings, in your language and tradition."
        breadcrumb={[{ label: 'Pujas & Rituals' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-2xl px-4 py-3 shadow-card max-w-md mx-auto mb-7 focus-within:border-orange-400 focus-within:shadow-input transition-all">
          <Search size={16} className="text-stone-400 shrink-0" />
          <input
            type="text"
            placeholder="Search pujas and ceremonies…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-stone-800 placeholder-stone-400 outline-none bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-stone-300 hover:text-stone-500 text-xs transition-colors">✕</button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              activeCategory === 'All'
                ? 'gradient-saffron text-white border-transparent shadow-sm'
                : 'bg-white border-stone-200 text-stone-600 hover:border-orange-300'
            }`}
          >
            All Ceremonies
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat.name
                  ? 'gradient-saffron text-white border-transparent shadow-sm'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-orange-300'
              }`}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-stone-400 mb-5 text-center">
          Showing <span className="font-semibold text-stone-700">{filtered.length}</span> ceremonies
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((puja) => <PujaCard key={puja.id} puja={puja} />)}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-semibold text-stone-800 mb-1">No ceremonies found</h3>
            <p className="text-stone-400 text-sm">Try a different keyword or category.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 text-sm text-saffron hover:underline font-medium">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
