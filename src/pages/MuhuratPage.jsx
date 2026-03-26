import { Link } from 'react-router-dom';
import { Calendar, Star, ArrowRight } from 'lucide-react';
import { muhurats } from '../data/mockData';
import PageBanner from '../components/PageBanner';

const allMuhurats = [
  ...muhurats,
  { date: "2025-06-15", day: "Sunday", title: "Auspicious for Namakaran & Annaprashana", type: "muhurat" },
  { date: "2025-07-04", day: "Friday", title: "Dev Shayani Ekadashi — Ideal for Vishnu Puja", type: "festival" },
  { date: "2025-08-09", day: "Saturday", title: "Nag Panchami — Excellent for Rudrabhishek", type: "festival" },
  { date: "2025-09-29", day: "Monday", title: "Navratri begins — Best for Devi Puja", type: "festival" },
  { date: "2025-10-20", day: "Monday", title: "Diwali — Lakshmi Puja auspicious all day", type: "festival" },
  { date: "2025-11-05", day: "Wednesday", title: "Kartik Purnima — Ideal for Satyanarayan Puja", type: "auspicious" },
];

const typeConfig = {
  festival: { color: 'bg-rose-100 text-rose-700 border-rose-200', label: 'Festival', icon: '🎉' },
  auspicious: { color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Auspicious', icon: '✨' },
  muhurat: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Muhurat', icon: '📅' },
};

export default function MuhuratPage() {
  return (
    <div className="min-h-screen relative">
      {/* Ganesh background */}
      <div className="fixed inset-0 -z-10">
        <img src="/lord ganesh.jpg" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.50)' }} />
      </div>
      <PageBanner
        image="/lord ganesh.jpg"
        label="Auspicious Timing"
        title="Upcoming Muhurats"
        subtitle="Choose the most auspicious dates for your ceremonies. Our Vedic astrologers curate the best muhurats for each type of ritual."
        breadcrumb={[{ label: 'Muhurats & Festivals' }]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {Object.entries(typeConfig).map(([key, val]) => (
            <span key={key} className={`text-xs border px-3 py-1.5 rounded-full ${val.color}`}>
              {val.icon} {val.label}
            </span>
          ))}
        </div>

        {/* Muhurat List */}
        <div className="space-y-4 mb-10">
          {allMuhurats.map((m, i) => {
            const cfg = typeConfig[m.type];
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-orange-50 hover:border-orange-200 hover:shadow-gold transition-all flex items-center gap-4"
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl gradient-saffron flex flex-col items-center justify-center text-white">
                  <span className="text-lg font-bold leading-none">{m.date.split('-')[2]}</span>
                  <span className="text-xs opacity-80">
                    {new Date(m.date).toLocaleString('default', { month: 'short' })} {m.date.split('-')[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm">{m.title}</p>
                    <span className={`text-xs border px-2 py-0.5 rounded-full ${cfg.color}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{m.day}, {m.date}</p>
                </div>
                <Link
                  to={`/book/1?date=${m.date}`}
                  className="shrink-0 flex items-center gap-1 text-xs text-saffron font-medium hover:gap-2 transition-all"
                >
                  Book <ArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Astrology CTA */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-orange-100 text-center">
          <div className="text-4xl mb-3">🔭</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Need a Custom Muhurat?</h2>
          <p className="text-gray-500 text-sm mb-5">
            Our expert Vedic astrologers can calculate the most auspicious muhurat for your specific ceremony based on your birth chart and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/search" className="gradient-saffron text-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-all">
              Book a Pandit
            </Link>
            <a href="tel:+918005008080" className="border border-saffron text-saffron font-medium px-6 py-3 rounded-xl hover:bg-orange-50 transition-all">
              Call for Muhurat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
