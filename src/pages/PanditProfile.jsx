import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Clock, CheckCircle, Star, Zap, Phone, MessageCircle,
  Video, Package, ChevronRight, Award, Users, Calendar,
} from 'lucide-react';
import { pandits, pujas } from '../data/mockData';
import StarRating from '../components/StarRating';
import PageBanner from '../components/PageBanner';

const mockReviews = [
  { id: 1, name: 'Sunita Devi', rating: 5, date: 'March 2025', puja: 'Griha Pravesh', text: 'Excellent pandit, very knowledgeable and punctual. Explained every ritual in our language.' },
  { id: 2, name: 'Ravi Kumar', rating: 5, date: 'Feb 2025', puja: 'Satyanarayana Puja', text: 'Very authentic and professional. Will book again for sure!' },
  { id: 3, name: 'Meena Reddy', rating: 4, date: 'Jan 2025', puja: 'Wedding', text: 'Our wedding ceremony was performed beautifully. Pandit ji was calm and composed.' },
];

export default function PanditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const pandit = pandits.find((p) => p.id === Number(id));

  if (!pandit) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-800">Pandit not found</h2>
          <Link to="/search" className="text-saffron hover:underline mt-2 block">Back to Search</Link>
        </div>
      </div>
    );
  }

  const badgeColor = {
    'Grand Master': 'bg-purple-100 text-purple-700',
    'Top Rated': 'bg-orange-100 text-orange-700',
    'Verified Expert': 'bg-blue-100 text-blue-700',
    'Perfect Rated': 'bg-green-100 text-green-700',
    'Verified': 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-cream">
      <PageBanner
        image="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=1600&q=80"
        label="Pandit Profile"
        title={pandit.name}
        subtitle={`${pandit.experience} years experience · ${pandit.traditions.join(', ')} tradition`}
        breadcrumb={[{ label: 'Find Pandits', to: '/search' }, { label: pandit.name }]}
        align="left"
        height="h-52 md:h-64"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50">
              <div className="flex gap-5">
                <div className="relative shrink-0">
                  <img
                    src={pandit.photo}
                    alt={pandit.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-100"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pandit.name)}&background=f97316&color=fff&size=96`; }}
                  />
                  {pandit.available && (
                    <span className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      Available
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">{pandit.name}</h1>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {pandit.verified && (
                          <span className="flex items-center gap-1 text-xs text-blue-600">
                            <CheckCircle size={12} /> Verified
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColor[pandit.badge] || badgeColor['Verified']}`}>
                          {pandit.badge}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-saffron">₹{pandit.pricePerPuja.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">starting per puja</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <StarRating rating={pandit.rating} size={14} showCount count={pandit.reviews} />
                    <span className="text-xs text-gray-400">·</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={11} className="text-orange-400" />
                      {pandit.location}
                    </div>
                    <span className="text-xs text-gray-400">·</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Zap size={11} className="text-green-500" />
                      {pandit.responseTime} response
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-orange-50">
                {[
                  { label: 'Experience', value: `${pandit.experience} Years`, icon: <Award size={16} className="text-saffron" /> },
                  { label: 'Pujas Done', value: pandit.completedPujas.toLocaleString(), icon: <Users size={16} className="text-saffron" /> },
                  { label: 'Happy Families', value: `${pandit.reviews}+`, icon: <Star size={16} className="text-saffron" /> },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="flex justify-center mb-1">{stat.icon}</div>
                    <p className="font-bold text-gray-900 text-sm">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-50 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['about', 'services', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-saffron border-b-2 border-saffron'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'about' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">About</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{pandit.bio}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {pandit.languages.map((l) => (
                          <span key={l} className="text-sm bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100">
                            🗣️ {l}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Traditions</h3>
                      <div className="flex flex-wrap gap-2">
                        {pandit.traditions.map((t) => (
                          <span key={t} className="text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-100">
                            🛕 {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Specializations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pandit.specializations.map((s) => (
                        <div key={s} className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl">
                          <span className="text-xl">🙏</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{s}</p>
                            <p className="text-xs text-gray-500">Starting ₹{pandit.pricePerPuja.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-saffron">{pandit.rating}</p>
                        <StarRating rating={pandit.rating} size={14} />
                        <p className="text-xs text-gray-500 mt-1">{pandit.reviews} reviews</p>
                      </div>
                      <div className="flex-1 space-y-1">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2 text-xs">
                            <span className="w-3">{star}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-amber-400 h-1.5 rounded-full"
                                style={{ width: `${star === 5 ? 75 : star === 4 ? 18 : 5}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{review.name}</p>
                            <p className="text-xs text-gray-400">{review.puja} · {review.date}</p>
                          </div>
                          <StarRating rating={review.rating} size={12} />
                        </div>
                        <p className="text-sm text-gray-600">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Book This Pandit</h3>

              <div className="space-y-3 mb-5">
                {[
                  { icon: <Video size={16} className="text-saffron" />, label: 'Online Puja Available', desc: 'Book video call puja' },
                  { icon: <Package size={16} className="text-saffron" />, label: 'Material Kit', desc: 'Delivered to your door' },
                  { icon: <Calendar size={16} className="text-saffron" />, label: 'Flexible Timing', desc: 'Choose your muhurat' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-2.5 bg-orange-50 rounded-xl">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-orange-50 rounded-xl p-3 mb-5">
                <p className="text-xs text-gray-500 mb-1">Starting from</p>
                <p className="text-2xl font-bold text-saffron">₹{pandit.pricePerPuja.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Price varies per ceremony</p>
              </div>

              <Link
                to={`/book/${pandit.id}?type=pandit`}
                className={`block text-center text-white font-semibold py-3 rounded-xl transition-all shadow-sm mb-3 ${
                  pandit.available
                    ? 'gradient-saffron hover:opacity-90'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {pandit.available ? '📅 Book Now' : 'Currently Unavailable'}
              </Link>

              <div className="flex gap-2">
                <a
                  href={`tel:+91${pandit.id}0000000`}
                  className="flex-1 flex items-center justify-center gap-1 border border-orange-300 text-orange-600 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-50 transition-all"
                >
                  <Phone size={14} /> Call
                </a>
                <button className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
                  <MessageCircle size={14} /> Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
