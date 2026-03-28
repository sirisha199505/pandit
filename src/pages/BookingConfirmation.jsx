import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, User, Phone, Download } from 'lucide-react';

export default function BookingConfirmation() {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No booking details found.</p>
          <Link to="/" className="gradient-saffron text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-10 px-4">
      <div className="max-w-lg mx-auto">

        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Noto Serif, serif' }}>
            Booking Confirmed! 🙏
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Your sacred ceremony has been booked. The pandit will contact you shortly.
          </p>
        </div>

        {/* Booking card */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-4" style={{ borderColor: '#D4AF37', borderTopWidth: '3px' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Booking Reference</p>
                <p className="font-bold text-lg text-saffron font-mono">{booking.booking_ref || `#${booking.id}`}</p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                <CheckCircle size={11} /> Confirmed
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                  <span className="text-base">🙏</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Ceremony</p>
                  <p className="font-semibold text-gray-800">{booking.puja_name}</p>
                </div>
              </div>

              {booking.pandit_name && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                    <User size={14} className="text-saffron" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Pandit</p>
                    <p className="font-semibold text-gray-800">{booking.pandit_name}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <Calendar size={14} className="text-saffron mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-sm font-medium text-gray-800">{booking.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-saffron mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="text-sm font-medium text-gray-800">{booking.time || '—'}</p>
                  </div>
                </div>
              </div>

              {booking.city && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-saffron mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-sm font-medium text-gray-800">{booking.city}{booking.address ? `, ${booking.address}` : ''}</p>
                  </div>
                </div>
              )}

              {booking.is_online && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                  <span className="text-blue-500 text-sm">📹</span>
                  <p className="text-sm text-blue-700 font-medium">Online Puja — Video link will be shared before the ceremony</p>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Payment Method</p>
                <p className="text-sm font-medium text-gray-700 capitalize">{booking.payment_method || 'UPI'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Total Amount</p>
                <p className="text-xl font-bold text-saffron">₹{Number(booking.amount || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="bg-amber-50 px-6 py-4 border-t border-amber-100">
            <p className="text-xs text-amber-700">
              📞 The pandit will call you 24 hours before the ceremony to confirm arrangements.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to="/dashboard"
            className="flex-1 gradient-saffron text-white font-semibold py-3 rounded-xl text-center text-sm hover:opacity-90 transition-all"
          >
            View My Bookings
          </Link>
          <Link
            to="/"
            className="flex-1 border-2 border-gray-200 text-gray-700 font-medium py-3 rounded-xl text-center text-sm hover:bg-gray-50 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
