import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle, XCircle, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageBanner from '../components/PageBanner';
import { BookingRowSkeleton } from '../components/LoadingSkeleton';

const statusConfig = {
  confirmed: { color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={13} />, label: 'Confirmed' },
  pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: <AlertCircle size={13} />, label: 'Pending' },
  completed: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <CheckCircle size={13} />, label: 'Completed' },
  cancelled: { color: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle size={13} />, label: 'Cancelled' },
};

export default function UserDashboard() {
  const { user, bookings, bookingsLoaded, fetchBookings } = useApp();
  const [searchParams] = useSearchParams();
  const justBooked = searchParams.get('booked') === 'true';

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  // Normalize field names (backend uses snake_case, fallback for local)
  const normalizeBooking = (b) => ({
    id:          b.id || b.booking_ref,
    pujaName:    b.puja_name  || b.pujaName  || '—',
    panditName:  b.pandit_name || b.panditName || '—',
    date:        b.date,
    time:        b.time,
    location:    b.city || b.location || '—',
    price:       b.amount || b.price || 0,
    status:      b.status || 'pending',
    booking_ref: b.booking_ref || b.id,
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-500 text-sm mb-5">Please login to view your bookings and dashboard.</p>
          <Link to="/login" className="gradient-saffron text-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-all inline-block">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <PageBanner
        image="https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1600&q=80"
        label="My Account"
        title={`Welcome, ${user.name?.split(' ')[0] || 'Devotee'}`}
        subtitle="Manage your bookings, track ceremonies and view your sacred journey."
        breadcrumb={[{ label: 'Dashboard' }]}
        height="h-48 md:h-56"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {justBooked && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle size={20} className="text-green-600 shrink-0" />
            <div>
              <p className="font-semibold text-green-800">Booking Confirmed! 🎉</p>
              <p className="text-sm text-green-600">Your puja booking has been confirmed. The pandit will contact you shortly.</p>
            </div>
          </div>
        )}

        {/* Welcome */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gradient-saffron flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.[0] || 'U'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Namaste, {user.name}! 🙏</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: '📋' },
            { label: 'Completed', value: bookings.filter((b) => b.status === 'completed').length, icon: '✅' },
            { label: 'Upcoming', value: bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').length, icon: '📅' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-orange-50 shadow-sm text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-2xl font-bold text-saffron">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">My Bookings</h2>
            <Link to="/pujas" className="text-sm text-saffron font-medium hover:underline">+ Book New Puja</Link>
          </div>

          {!bookingsLoaded ? (
            <div className="divide-y divide-gray-50">
              {[1,2,3].map((i) => <BookingRowSkeleton key={i} />)}
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-800 mb-1">No bookings yet</h3>
              <p className="text-sm text-gray-500 mb-4">Book your first puja and start your spiritual journey.</p>
              <Link to="/pujas" className="gradient-saffron text-white font-medium px-5 py-2.5 rounded-xl hover:opacity-90 transition-all inline-block">
                Explore Pujas
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {bookings.map((raw) => {
                const booking = normalizeBooking(raw);
                const status = statusConfig[booking.status] || statusConfig.pending;
                return (
                  <div key={booking.id} className="p-5 hover:bg-orange-50/40 transition-colors">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{booking.pujaName}</h3>
                          <span className={`flex items-center gap-1 text-xs border px-2 py-0.5 rounded-full ${status.color}`}>
                            {status.icon} {status.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">👳 {booking.panditName}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Calendar size={11} className="text-orange-400" />{booking.date}</span>
                          <span className="flex items-center gap-1"><Clock size={11} className="text-orange-400" />{booking.time}</span>
                          <span className="flex items-center gap-1"><MapPin size={11} className="text-orange-400" />{booking.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-saffron">₹{Number(booking.price).toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">{booking.booking_ref}</p>
                        {booking.status === 'completed' && (
                          <button className="text-xs text-amber-600 hover:underline flex items-center gap-1 mt-2 ml-auto">
                            <Star size={10} /> Rate & Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
