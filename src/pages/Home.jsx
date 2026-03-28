import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MapPin, ArrowRight, Shield, Star, Zap,
  Globe, Video, Package, Calendar, ChevronRight,
} from 'lucide-react';
import { categories, testimonials, stats, muhurats } from '../data/constants';
import { panditsApi, productsApi } from '../services/api';
import PanditCard from '../components/PanditCard';
import PujaCard from '../components/PujaCard';
import StarRating from '../components/StarRating';
import { PanditCardSkeleton, PujaCardSkeleton } from '../components/LoadingSkeleton';

/* ─── Section header helper ─── */
function SectionHeader({ label, title, subtitle, center = true }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      <span className="section-label" style={{ color: '#D4AF37', background: '#FFFBEA', borderColor: '#D4AF37' }}>{label}</span>
      <h2 className="text-2xl md:text-3xl font-bold text-stone-900">{title}</h2>
      <div className={`flex mt-2 mb-1 ${center ? 'justify-center' : ''}`}>
        <div className="h-0.5 w-12 rounded-full" style={{ background: 'linear-gradient(90deg, #D4AF37, #FFD700)' }} />
        <div className="h-0.5 w-4 rounded-full ml-1" style={{ background: '#D4AF37', opacity: 0.4 }} />
      </div>
      {subtitle && <p className="text-stone-500 text-sm mt-2 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery]       = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [pandits, setPandits]   = useState([]);
  const [pujas, setPujas]       = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      panditsApi.list({ page_size: 3 }),
      productsApi.list(),
    ]).then(([pr, pu]) => {
      setPandits(pr.data || []);
      setPujas(pu.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(searchLocation)}`);
  };

  return (
    <div className="min-h-screen mb-20">

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden">
        {/* Lord Ganesha background image */}
        <div className="absolute inset-0">
          <img
            src="/lord ganesh.jpg"
            alt="Lord Ganesha"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(74,0,16,0.82) 0%, rgba(122,21,32,0.75) 35%, rgba(184,74,0,0.65) 70%, rgba(212,114,10,0.60) 100%)' }} />
          <div className="absolute inset-0 hero-pattern opacity-40" />
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FF6B00 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── Left: Text + Search ── */}
            <div className="flex-1 text-center lg:text-left">
              {/* Trust badge */}
              <div className="animate-fadeInUp inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Trusted by 45,000+ families across India
              </div>

              <h1 className="animate-fadeInUp delay-100 text-4xl md:text-[3.25rem] font-bold text-white leading-tight mb-5">
                Book Verified Pandits
                <span className="block mt-1" style={{ color: '#FFD700' }}>for Every Sacred Ritual</span>
              </h1>

              <p className="animate-fadeInUp delay-200 text-white/75 text-base md:text-lg mb-9 max-w-lg lg:mx-0 mx-auto">
                Connect with experienced pandits for weddings, pujas and ceremonies —
                in your language, your tradition, your city.
              </p>

              {/* Search card */}
              <form
                onSubmit={handleSearch}
                className="animate-fadeInUp delay-300 bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl lg:mx-0 mx-auto"
              >
                <label className="flex items-center gap-2.5 flex-1 px-3">
                  <Search size={16} className="text-stone-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search puja or ceremony..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 py-2.5 text-stone-800 placeholder-stone-400 outline-none text-sm bg-transparent"
                  />
                </label>

                <div className="sm:w-px sm:h-auto h-px bg-stone-200 sm:my-2" />

                <label className="flex items-center gap-2.5 flex-1 px-3">
                  <MapPin size={16} className="text-stone-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="City or location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="flex-1 py-2.5 text-stone-800 placeholder-stone-400 outline-none text-sm bg-transparent"
                  />
                </label>

                <button
                  type="submit"
                  className="gradient-saffron text-white font-semibold rounded-xl px-2.5 py-2.5 hover:opacity-90 active:scale-[0.98] transition-all shadow-sm whitespace-nowrap text-sm w-full sm:w-auto"
                >
                  Find Pandits
                </button>
              </form>

              {/* Quick tags */}
              <div className="animate-fadeInUp delay-400 flex flex-wrap justify-center lg:justify-start gap-2 mt-5">
                {['Satyanarayana Puja', 'Griha Pravesh', 'Wedding', 'Ganesh Puja'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                    className="text-white/70 hover:text-white text-xs border border-white/25 hover:border-white/60 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: God Images ── */}
            <div className="animate-fadeInUp delay-300 flex-shrink-0 flex flex-col items-center gap-4">
              {/* Main deity image – Lord Ganesha */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: 'radial-gradient(circle, #FFD700 0%, #FF6B00 60%, transparent 100%)' }} />
                <div
                  className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-4 shadow-2xl"
                  style={{ borderColor: '#FFD700', boxShadow: '0 0 40px rgba(255,215,0,0.4), 0 0 80px rgba(224,93,0,0.3)' }}
                >
                  <img
                    src="https://thumbs.dreamstime.com/b/digital-artwork-lord-vinayaka-ganesha-positioned-centrally-ambient-warm-lighting-reflects-serene-temple-environment-390515690.jpg"
                    alt="Lord Ganesha"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Om symbol badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#FFD700', color: '#4A0010' }}>
                  ॐ श्री गणेशाय नमः
                </div>
              </div>

              {/* Two smaller deity images */}
              <div className="flex gap-4 mt-3">
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-2xl overflow-hidden border-2 shadow-lg"
                    style={{ borderColor: 'rgba(255,215,0,0.5)' }}
                  >
                    <img
                      src="https://i.pinimg.com/474x/66/41/53/66415315048113072cbcd6a72eb2ee52.jpg"
                      alt="Lord Vishnu"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.parentElement.style.background = 'linear-gradient(135deg,#B84A00,#7A1520)';
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML += '<span style="color:#FFD700;font-size:2rem;display:flex;align-items:center;justify-content:center;height:100%">🪔</span>';
                      }}
                    />
                  </div>
                  <p className="text-center text-white/60 text-[10px] mt-1">Vishnu</p>
                </div>
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-2xl overflow-hidden border-2 shadow-lg"
                    style={{ borderColor: 'rgba(255,215,0,0.5)' }}
                  >
                    <img
                      src="https://m.media-amazon.com/images/I/71d+3vXIfGL._AC_UF894,1000_QL80_.jpg"
                      alt="Lord Shiva"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.parentElement.style.background = 'linear-gradient(135deg,#B84A00,#7A1520)';
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML += '<span style="color:#FFD700;font-size:2rem;display:flex;align-items:center;justify-content:center;height:100%">🕉️</span>';
                      }}
                    />
                  </div>
                  <p className="text-center text-white/60 text-[10px] mt-1">Shiva</p>
                </div>
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-2xl overflow-hidden border-2 shadow-lg"
                    style={{ borderColor: 'rgba(255,215,0,0.5)' }}
                  >
                    <img
                      src="https://www.cliths.com/cdn/shop/files/81VjwgbYBzL._SL1500_medium.jpg?v=1752900799"
                      alt="Goddess Lakshmi"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.parentElement.style.background = 'linear-gradient(135deg,#B84A00,#7A1520)';
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML += '<span style="color:#FFD700;font-size:2rem;display:flex;align-items:center;justify-content:center;height:100%">🌸</span>';
                      }}
                    />
                  </div>
                  <p className="text-center text-white/60 text-[10px] mt-1">Lakshmi</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Wave transition */}
        <div className="relative">
          <svg viewBox="0 0 1440 56" className="w-full block relative z-10" preserveAspectRatio="none" style={{ fill: '#FFFDF5', marginBottom: -2 }}>
            <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" />
          </svg>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="bg-cream -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="card flex flex-col items-center text-center p-5" style={{ borderTop: '3px solid #D4AF37' }}>
                <span className="text-3xl mb-2">{stat.icon}</span>
                <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{stat.value}</p>
                <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CATEGORIES ════════ */}
      <section className="relative py-14">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/ganesh1.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.50)' }} />
          <div className="absolute inset-0 pattern-rangoli" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Browse by Ceremony"
            title="Find the Right Ritual"
            subtitle="From grand weddings to daily prayers — every ceremony, every tradition."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/search?category=${encodeURIComponent(cat.name)}`}
                className="group card flex flex-col items-center p-4 text-center"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl mb-2.5 group-hover:scale-110 transition-transform duration-200`}>
                  {cat.icon}
                </div>
                <p className="text-xs font-semibold text-stone-700 leading-tight">{cat.name}</p>
                <p className="text-[10px] text-stone-400 mt-0.5">{cat.count} pandits</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FEATURED PUJAS ════════ */}
      <section className="bg-white py-14 pattern-geometric">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Sacred Ceremonies" title="Most Booked Pujas" center={false} />
            <Link
              to="/pujas"
              className="flex items-center gap-1 text-saffron font-medium text-sm hover:gap-2 transition-all mb-10"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading
              ? [1,2,3,4].map(i => <PujaCardSkeleton key={i} />)
              : pujas.slice(0, 4).map((puja) => <PujaCard key={puja.id} puja={puja} />)
            }
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="py-14 bg-cream pattern-mandala">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Simple Process"
            title="Book in 3 Easy Steps"
            subtitle="From search to ceremony in minutes — it's that simple."
          />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connector */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+32px)] right-[calc(16.66%+32px)] h-px border-t-2 border-dashed" style={{ borderColor: '#D4AF37' }} />

            {[
              { step: 1, icon: '🔍', title: 'Search & Select', desc: "Choose your puja, tradition, language and preferred date. We'll show the best-matched pandits." },
              { step: 2, icon: '👳', title: 'Choose Your Pandit', desc: 'View verified pandit profiles with genuine ratings and experience. Pick the perfect one.' },
              { step: 3, icon: '✅', title: 'Confirm & Celebrate', desc: 'Book securely, pay online and receive real-time confirmations. Attend your ceremony stress-free.' },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="relative inline-flex mb-5">
                  <div className="w-[104px] h-[104px] rounded-2xl gradient-saffron flex items-center justify-center text-5xl shadow-saffron group-hover:scale-105 transition-transform duration-200">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 rounded-full flex items-center justify-center text-xs font-bold shadow-sm" style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed max-w-[240px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FEATURED PANDITS ════════ */}
      <section className="py-14 bg-white pattern-geometric">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader label="Top Pandits" title="Verified & Trusted Pandits" center={false} />
            <Link
              to="/search"
              className="flex items-center gap-1 text-saffron font-medium text-sm hover:gap-2 transition-all mb-10"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading
              ? [1,2,3].map(i => <PanditCardSkeleton key={i} />)
              : pandits.slice(0, 3).map((p) => <PanditCard key={p.id} pandit={p} />)
            }
          </div>
        </div>
      </section>

      {/* ════════ MUHURAT BANNER ════════ */}
      <section className="py-10" style={{ background: 'linear-gradient(135deg, #FFFBEA 0%, #FFF8DC 100%)', borderTop: '2px solid #D4AF37', borderBottom: '2px solid #D4AF37' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl animate-float shrink-0">🗓️</div>
            <div className="flex-1 text-center md:text-left">
              <span className="section-label">Auspicious Timing</span>
              <h2 className="text-xl font-bold text-stone-900 mb-3">Upcoming Muhurats</h2>
              <div className="flex flex-wrap gap-2">
                {muhurats.slice(0, 3).map((m, i) => (
                  <div
                    key={i}
                    className="bg-white border border-amber-200 rounded-xl px-3 py-2 shadow-sm"
                  >
                    <p className="text-xs font-bold text-stone-800">{m.date}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5 max-w-[180px] truncate">{m.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/muhurat"
              className="shrink-0 gradient-saffron text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-sm flex items-center gap-2 text-sm"
            >
              <Calendar size={14} /> View All Muhurats
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ WHY US ════════ */}
      <section className="relative py-14">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/lord ganesh.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.50)' }} />
          <div className="absolute inset-0 pattern-geometric" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Why Choose Us"
            title="What Makes Us Different"
            subtitle="We combine tradition with technology to deliver a seamless, trustworthy experience."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Shield size={20} />, title: 'Verified Pandits',   desc: 'Every pandit undergoes background verification, credential review and quality assessment before listing.' },
              { icon: <Star   size={20} />, title: 'Rated & Reviewed',   desc: 'Authentic ratings from real families. Honest reviews so you can choose with full confidence.' },
              { icon: <Zap    size={20} />, title: 'Instant Booking',    desc: 'Book in under 5 minutes. Get immediate confirmation with pandit contact details.' },
              { icon: <Globe  size={20} />, title: 'Multi-Language',     desc: 'Pandits fluent in Telugu, Tamil, Hindi, Kannada, Malayalam, Marathi and Sanskrit.' },
              { icon: <Video  size={20} />, title: 'Online Puja',        desc: "Can't be there in person? Book a live HD video call puja from anywhere in the world." },
              { icon: <Package size={20} />, title: 'Material Kits',     desc: 'Order complete puja samagri kits delivered to your doorstep alongside the pandit booking.' },
            ].map((feat, i) => (
              <div
                key={i}
                className="card p-6 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200" style={{ background: '#FFFBEA', color: '#D4AF37', border: '1.5px solid #D4AF37' }}>
                  {feat.icon}
                </div>
                <h3 className="font-bold text-stone-900 mb-1.5 text-sm">{feat.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section className="py-14 bg-cream pattern-rangoli">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Testimonials"
            title="What Families Say"
            subtitle="Real stories from families who celebrated their most sacred moments with us."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="card p-6 relative flex flex-col"
              >
                {/* Quote mark */}
                <span className="absolute top-5 right-5 text-5xl font-serif leading-none select-none" style={{ color: '#D4AF37', opacity: 0.35 }}>
                  "
                </span>
                <StarRating rating={t.rating} size={13} />
                <p className="text-stone-600 text-sm mt-3 mb-5 leading-relaxed flex-1">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-stone-50">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border-2" style={{ borderColor: '#D4AF37' }}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=ea580c&color=fff`;
                    }}
                  />
                  <div>
                    <p className="font-semibold text-sm text-stone-900">{t.name}</p>
                    <p className="text-[11px] text-stone-400">{t.location} &middot; {t.puja}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #881337 0%, #9a3412 40%, #c2410c 75%, #d97706 100%)' }}>
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>
            Get Started Today
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'Noto Serif, serif' }}
          >
            Ready to Book a Sacred Ceremony?
          </h2>
          <p className="text-white/70 text-sm mb-8">
            Join 45,000+ families who have trusted PanditSeva for their most important moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/pujas"
              className="font-semibold px-7 py-3 rounded-xl transition-all shadow-md text-sm"
              style={{ background: '#D4AF37', color: '#4A0010' }}
            >
              Book a Puja Now
            </Link>
            <Link
              to="/pandit/register"
              className="font-semibold px-7 py-3 rounded-xl transition-all text-sm"
              style={{ border: '2px solid #D4AF37', color: '#FFD700' }}
            >
              Register as Pandit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
