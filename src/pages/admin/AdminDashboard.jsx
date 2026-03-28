import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi, bookingsApi } from '../../services/api';
import {
  Users, BookOpen, DollarSign, TrendingUp, CheckCircle,
  XCircle, Clock, Eye, LogOut, BarChart3, Settings,
} from 'lucide-react';
import { panditsApi } from '../../services/api';
import StarRating from '../../components/StarRating';

const mockBookings = [
  { id: 'BK001', user: 'Priya Reddy', pandit: 'Pandit Raghavendra Sharma', puja: 'Griha Pravesh', date: '2025-04-18', amount: 5000, status: 'confirmed', city: 'Hyderabad' },
  { id: 'BK002', user: 'Rajesh Kumar', pandit: 'Pandit Venkatesh Iyer', puja: 'Satyanarayana Puja', date: '2025-04-22', amount: 2500, status: 'pending', city: 'Chennai' },
  { id: 'BK003', user: 'Anita Sharma', pandit: 'Pandit Suresh Mishra', puja: 'Wedding', date: '2025-05-03', amount: 15000, status: 'pending', city: 'Varanasi' },
  { id: 'BK004', user: 'Sunita Devi', pandit: 'Pandit Krishnamurthy Bhat', puja: 'Ganesh Puja', date: '2025-03-15', amount: 1500, status: 'completed', city: 'Bengaluru' },
  { id: 'BK005', user: 'Meena Reddy', pandit: 'Pandit Anand Prabhu', puja: 'Lakshmi Puja', date: '2025-03-10', amount: 3000, status: 'completed', city: 'Mumbai' },
];

const pendingPandits = [
  { id: 10, name: 'Pandit Santosh Jha', city: 'Patna', experience: 12, languages: ['Hindi', 'Bhojpuri', 'Sanskrit'], applied: '2025-03-20' },
  { id: 11, name: 'Pandit Krishnaswamy', city: 'Coimbatore', experience: 8, languages: ['Tamil', 'Sanskrit'], applied: '2025-03-22' },
];

const statusConfig = {
  confirmed: { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={11} /> },
  pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={11} /> },
  completed: { color: 'bg-blue-100 text-blue-700', icon: <CheckCircle size={11} /> },
  rejected: { color: 'bg-red-100 text-red-700', icon: <XCircle size={11} /> },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [panditList, setPanditList] = useState([]);
  const [pendingList, setPendingList] = useState(pendingPandits);
  const [bookingList, setBookingList] = useState([]);
  const [liveBookings, setLiveBookings] = useState([]);

  useEffect(() => {
    panditsApi.list({ page_size: 100 }).then((res) => {
      if (res?.data?.length) setPanditList(res.data);
    }).catch(() => {});
    bookingsApi.adminList().then((res) => {
      if (res?.data?.length) {
        setLiveBookings(res.data);
        setBookingList(res.data);
      }
    }).catch(() => {});
  }, []);

  const approvePandit = (id) => {
    const newPandit = pendingList.find((p) => p.id === id);
    if (newPandit) {
      setPanditList((prev) => [...prev, { ...newPandit, rating: 0, reviews: 0, verified: false, available: true, photo: '', badge: 'New', completedPujas: 0, responseTime: '-', specializations: [], traditions: [], bio: '', pricePerPuja: 2000 }]);
      setPendingList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const totalRevenue = bookingList.filter((b) => b.status === 'completed').reduce((s, b) => s + b.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2" style={{ borderColor: '#E05D00' }}>
                <img src="/lord ganesh.jpg" alt="Logo" className="w-full h-full object-cover object-top" />
              </div>
              <span className="font-bold" style={{ fontFamily: 'Noto Serif, serif' }}>
                PanditSeva <span className="text-orange-400 text-sm font-normal">Admin</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xs text-gray-400 hover:text-white">View Site</Link>
              <button onClick={() => navigate('/admin')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
                <LogOut size={13} /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Pandits', value: panditList.length, icon: <Users size={18} className="text-saffron" />, bg: 'bg-orange-50', sub: `${pendingList.length} pending approval` },
            { label: 'Total Bookings', value: bookingList.length, icon: <BookOpen size={18} className="text-blue-500" />, bg: 'bg-blue-50', sub: `${bookingList.filter(b => b.status === 'pending').length} pending` },
            { label: 'Revenue (Month)', value: `₹${(totalRevenue + 285000).toLocaleString()}`, icon: <DollarSign size={18} className="text-green-500" />, bg: 'bg-green-50', sub: 'After 15% platform fee' },
            { label: 'Cities Covered', value: '120+', icon: <BarChart3 size={18} className="text-purple-500" />, bg: 'bg-purple-50', sub: 'Across India' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>{s.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs font-medium text-gray-600 mt-0.5">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {['overview', 'pandits', 'bookings', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors ${activeTab === tab ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Pending Pandit Approvals */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Pending Pandit Approvals
                    {pendingList.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingList.length}</span>}
                  </h3>
                  {pendingList.length === 0 ? (
                    <p className="text-gray-500 text-sm">No pending approvals. ✅</p>
                  ) : (
                    <div className="space-y-3">
                      {pendingList.map((p) => (
                        <div key={p.id} className="flex items-center justify-between flex-wrap gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                          <div>
                            <p className="font-semibold text-sm text-gray-800">{p.name}</p>
                            <p className="text-xs text-gray-500">📍 {p.city} · {p.experience} yrs exp · Applied: {p.applied}</p>
                            <div className="flex gap-1 mt-1">
                              {p.languages.map((l) => (
                                <span key={l} className="text-xs bg-white text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">{l}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => approvePandit(p.id)} className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-600 flex items-center gap-1">
                              <CheckCircle size={12} /> Approve
                            </button>
                            <button onClick={() => setPendingList((prev) => prev.filter((x) => x.id !== p.id))} className="bg-red-100 text-red-600 text-xs px-3 py-1.5 rounded-lg hover:bg-red-200 flex items-center gap-1">
                              <XCircle size={12} /> Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Bookings */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">
                    Recent Bookings
                    {liveBookings.length > 0 && <span className="ml-2 text-xs text-green-600 font-normal">● Live</span>}
                  </h3>
                  <div className="space-y-2">
                    {(liveBookings.length > 0 ? liveBookings : bookingList).slice(0, 5).map((b) => {
                      const s = statusConfig[b.status] || statusConfig.pending;
                      const isLive = liveBookings.length > 0;
                      return (
                        <div key={b.id} className="flex items-center justify-between flex-wrap gap-2 p-3 bg-gray-50 rounded-xl">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{isLive ? b.puja_name : b.puja}</p>
                            <p className="text-xs text-gray-500">
                              {isLive ? `${b.pandit_name || 'Pandit'} · ${b.city || '—'} · ${b.date}` : `${b.user} → ${b.pandit} · ${b.city} · ${b.date}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-saffron">₹{Number(isLive ? b.amount : b.amount).toLocaleString()}</span>
                            <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${s.color}`}>
                              {s.icon} {b.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pandits' && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4">All Pandits ({panditList.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b border-gray-100 text-left">
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Location</th>
                        <th className="py-2 pr-4">Rating</th>
                        <th className="py-2 pr-4">Bookings</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {panditList.map((p) => (
                        <tr key={p.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <img src={p.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=f97316&color=fff&size=32`} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium">{p.name}</p>
                                <p className="text-xs text-gray-400">{p.badge}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-gray-500 text-xs">{p.city || p.location || 'N/A'}</td>
                          <td className="py-3 pr-4">{p.rating ? <StarRating rating={p.rating} size={11} /> : <span className="text-xs text-gray-400">New</span>}</td>
                          <td className="py-3 pr-4 text-gray-600">{p.completed_pujas || p.completedPujas || 0}</td>
                          <td className="py-3 pr-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${p.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {p.verified ? 'Verified' : 'Unverified'}
                            </span>
                          </td>
                          <td className="py-3">
                            <Link to={`/pandit/${p.id}`} className="text-xs text-orange-500 hover:underline flex items-center gap-1">
                              <Eye size={11} /> View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4">All Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b border-gray-100 text-left">
                        <th className="py-2 pr-3">ID</th>
                        <th className="py-2 pr-3">Puja</th>
                        <th className="py-2 pr-3">User</th>
                        <th className="py-2 pr-3">Pandit</th>
                        <th className="py-2 pr-3">Date</th>
                        <th className="py-2 pr-3">Amount</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingList.map((b) => {
                        const s = statusConfig[b.status] || statusConfig.pending;
                        return (
                          <tr key={b.id} className="border-b border-gray-50 hover:bg-orange-50/30">
                            <td className="py-3 pr-3 font-mono text-xs text-gray-400">{b.booking_ref || b.id}</td>
                            <td className="py-3 pr-3 font-medium text-xs">{b.puja_name || b.puja}</td>
                            <td className="py-3 pr-3 text-xs text-gray-600">{b.user_name || b.user || '—'}</td>
                            <td className="py-3 pr-3 text-xs text-gray-600">{b.pandit_name || b.pandit || '—'}</td>
                            <td className="py-3 pr-3 text-xs text-gray-500">{b.date}</td>
                            <td className="py-3 pr-3 font-semibold text-saffron text-xs">₹{Number(b.amount || 0).toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full w-fit ${s.color}`}>
                                {s.icon} {b.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="font-bold text-gray-900">Platform Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-4 text-sm">Revenue (Last 6 Months)</h4>
                    <div className="space-y-3">
                      {[
                        { month: 'Oct', value: 185000 },
                        { month: 'Nov', value: 220000 },
                        { month: 'Dec', value: 310000 },
                        { month: 'Jan', value: 275000 },
                        { month: 'Feb', value: 340000 },
                        { month: 'Mar', value: 285000 },
                      ].map((d) => (
                        <div key={d.month} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-8">{d.month}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div className="bg-orange-500 h-3 rounded-full transition-all" style={{ width: `${(d.value / 400000) * 100}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-gray-700 w-20 text-right">₹{(d.value / 1000).toFixed(0)}K</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-4 text-sm">Top Booked Pujas</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Satyanarayana Puja', count: 1820, pct: 90 },
                        { name: 'Wedding Ceremony', count: 645, pct: 32 },
                        { name: 'Griha Pravesh', count: 520, pct: 26 },
                        { name: 'Ganesh Puja', count: 410, pct: 20 },
                        { name: 'Lakshmi Puja', count: 380, pct: 19 },
                      ].map((p) => (
                        <div key={p.name} className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 flex-1 truncate">{p.name}</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${p.pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-10 text-right">{p.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
