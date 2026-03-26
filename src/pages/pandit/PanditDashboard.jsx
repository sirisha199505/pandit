import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Star, CheckCircle, XCircle, Clock, TrendingUp, LogOut, Bell, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StarRating from '../../components/StarRating';

const mockPanditBookings = [
  { id: 'BK001', user: 'Priya Reddy', puja: 'Griha Pravesh', date: '2025-04-18', time: '09:00 AM', location: 'Hyderabad', price: 5000, status: 'confirmed' },
  { id: 'BK002', user: 'Rajesh Kumar', puja: 'Satyanarayana Puja', date: '2025-04-22', time: '07:00 AM', location: 'Secunderabad', price: 2500, status: 'pending' },
  { id: 'BK003', user: 'Anita Sharma', puja: 'Wedding Ceremony', date: '2025-05-03', time: '08:00 AM', location: 'Hyderabad', price: 15000, status: 'pending' },
  { id: 'BK004', user: 'Sunita Devi', puja: 'Ganesh Puja', date: '2025-03-15', time: '10:00 AM', location: 'Jubilee Hills', price: 1500, status: 'completed' },
];

const earnings = [
  { month: 'Jan', amount: 32000 },
  { month: 'Feb', amount: 41000 },
  { month: 'Mar', amount: 38000 },
  { month: 'Apr', amount: 25000 },
];

const statusConfig = {
  confirmed: { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={12} /> },
  pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={12} /> },
  completed: { color: 'bg-blue-100 text-blue-700', icon: <CheckCircle size={12} /> },
  rejected: { color: 'bg-red-100 text-red-700', icon: <XCircle size={12} /> },
};

export default function PanditDashboard() {
  const { pandit, logoutPandit } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState(mockPanditBookings);
  const [isAvailable, setIsAvailable] = useState(true);

  if (!pandit) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-bold mb-3">Login Required</h2>
          <Link to="/pandit/login" className="gradient-saffron text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all inline-block">Pandit Login</Link>
        </div>
      </div>
    );
  }

  const updateStatus = (id, status) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
  };

  const totalEarnings = bookings.filter((b) => b.status === 'completed').reduce((sum, b) => sum + b.price, 0);
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Pandit Navbar */}
      <nav className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 shadow-sm" style={{ borderColor: '#E05D00' }}>
                <img src="/lord ganesh.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
              </div>
              <span className="font-bold text-maroon" style={{ fontFamily: 'Noto Serif, serif' }}>
                Pandit<span className="text-saffron">Seva</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs text-gray-500">Available</span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${isAvailable ? 'bg-green-400' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isAvailable ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </label>
              <button className="relative p-2 rounded-lg hover:bg-orange-50 transition-colors">
                <Bell size={18} className="text-gray-600" />
                {pendingBookings > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{pendingBookings}</span>
                )}
              </button>
              <button onClick={() => { logoutPandit(); navigate('/pandit/login'); }} className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-500 transition-colors">
                <LogOut size={15} /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-saffron flex items-center justify-center text-white text-xl font-bold">
                {pandit.name?.[0] || 'P'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900">{pandit.name}</h1>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={10} /> Verified
                  </span>
                </div>
                <p className="text-sm text-gray-500">{pandit.email}</p>
                <StarRating rating={4.9} size={12} showCount count={312} />
              </div>
            </div>
            <div className={`px-4 py-2 rounded-xl text-sm font-medium ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {isAvailable ? '🟢 Available for Bookings' : '🔴 Not Available'}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Earnings', value: `₹${(totalEarnings + 136000).toLocaleString()}`, icon: <DollarSign size={18} className="text-saffron" />, bg: 'bg-orange-50' },
            { label: 'Bookings This Month', value: bookings.length, icon: <Calendar size={18} className="text-blue-500" />, bg: 'bg-blue-50' },
            { label: 'Pending Requests', value: pendingBookings, icon: <Clock size={18} className="text-yellow-500" />, bg: 'bg-yellow-50' },
            { label: 'Rating', value: '4.9 ⭐', icon: <Star size={18} className="text-amber-500" />, bg: 'bg-amber-50' },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-2xl p-4 border border-orange-50 shadow-sm`}>
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>{s.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {['overview', 'bookings', 'availability', 'earnings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors ${activeTab === tab ? 'text-saffron border-b-2 border-saffron' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 mb-4">Pending Requests</h3>
                {bookings.filter((b) => b.status === 'pending').length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No pending requests. 🎉</p>
                ) : (
                  bookings.filter((b) => b.status === 'pending').map((b) => (
                    <div key={b.id} className="flex items-center justify-between flex-wrap gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{b.puja}</p>
                        <p className="text-xs text-gray-500">👤 {b.user} · 📅 {b.date} · 🕒 {b.time}</p>
                        <p className="text-xs text-gray-500">📍 {b.location} · 💰 ₹{b.price.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(b.id, 'confirmed')} className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-600 flex items-center gap-1">
                          <CheckCircle size={12} /> Accept
                        </button>
                        <button onClick={() => updateStatus(b.id, 'rejected')} className="bg-red-100 text-red-600 text-xs px-3 py-1.5 rounded-lg hover:bg-red-200 flex items-center gap-1">
                          <XCircle size={12} /> Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}

                <h3 className="font-bold text-gray-900 mb-4 mt-6">Upcoming Bookings</h3>
                {bookings.filter((b) => b.status === 'confirmed').map((b) => (
                  <div key={b.id} className="flex items-center justify-between flex-wrap gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{b.puja}</p>
                      <p className="text-xs text-gray-500">👤 {b.user} · 📅 {b.date} · 📍 {b.location}</p>
                    </div>
                    <p className="font-bold text-saffron">₹{b.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4">All Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b border-gray-100">
                        <th className="text-left py-2 pr-4">ID</th>
                        <th className="text-left py-2 pr-4">Puja</th>
                        <th className="text-left py-2 pr-4">User</th>
                        <th className="text-left py-2 pr-4">Date</th>
                        <th className="text-left py-2 pr-4">Amount</th>
                        <th className="text-left py-2 pr-4">Status</th>
                        <th className="text-left py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => {
                        const s = statusConfig[b.status] || statusConfig.pending;
                        return (
                          <tr key={b.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                            <td className="py-3 pr-4 text-gray-400 font-mono text-xs">{b.id}</td>
                            <td className="py-3 pr-4 font-medium">{b.puja}</td>
                            <td className="py-3 pr-4 text-gray-600">{b.user}</td>
                            <td className="py-3 pr-4 text-gray-500">{b.date}</td>
                            <td className="py-3 pr-4 font-semibold text-saffron">₹{b.price.toLocaleString()}</td>
                            <td className="py-3 pr-4">
                              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full w-fit ${s.color}`}>
                                {s.icon} {b.status}
                              </span>
                            </td>
                            <td className="py-3">
                              {b.status === 'pending' && (
                                <div className="flex gap-1">
                                  <button onClick={() => updateStatus(b.id, 'confirmed')} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">Accept</button>
                                  <button onClick={() => updateStatus(b.id, 'rejected')} className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-lg">Reject</button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Manage Availability</h3>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center">
                      <p className="text-xs text-gray-500 mb-2">{day}</p>
                      <button className="w-full py-3 rounded-xl bg-green-100 text-green-700 text-xs font-medium hover:bg-green-200 transition-colors">
                        Available
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <p className="text-sm text-gray-600">Set your available time slots for each day. Families can only book during your available hours.</p>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div>
                <h3 className="font-bold text-gray-900 mb-6">Earnings Overview</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'This Month', value: '₹22,500', change: '+12%' },
                    { label: 'Last Month', value: '₹38,000', change: '+8%' },
                    { label: 'Total Lifetime', value: '₹1,36,000', change: '' },
                    { label: 'Pending Payout', value: '₹7,500', change: '' },
                  ].map((e) => (
                    <div key={e.label} className="bg-orange-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">{e.label}</p>
                      <p className="text-xl font-bold text-saffron">{e.value}</p>
                      {e.change && <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp size={10} /> {e.change}</p>}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm">Monthly Breakdown</h4>
                  {earnings.map((e) => (
                    <div key={e.month} className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 w-8">{e.month}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3">
                        <div className="gradient-saffron h-3 rounded-full" style={{ width: `${(e.amount / 50000) * 100}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 w-20 text-right">₹{e.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
