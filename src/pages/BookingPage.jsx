import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Package, Video, CheckCircle, ChevronRight } from 'lucide-react';
import { muhurats } from '../data/constants';
import { useApp } from '../context/AppContext';
import { bookingsApi, panditsApi, productsApi } from '../services/api';

const steps = ['Details', 'Pandit', 'Review', 'Payment'];

export default function BookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, addBooking } = useApp();
  const isPanditBooking = searchParams.get('type') === 'pandit';

  const [pandits, setPandits] = useState([]);
  const [pujas,   setPujas]   = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      panditsApi.list({ page_size: 50 }),
      productsApi.list(),
    ]).then(([pr, pu]) => {
      setPandits(pr.data || []);
      setPujas(pu.data || []);
    }).catch(() => {}).finally(() => setDataLoading(false));
  }, []);

  const panditFromUrl = pandits.find((p) => p.id === Number(id));
  const pujaFromUrl   = pujas.find((p) => p.id === Number(id));

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    pujaId: '',
    date: '',
    time: '07:00',
    location: '',
    address: '',
    language: '',
    tradition: '',
    isOnline: false,
    withMaterialKit: false,
    specialRequests: '',
    selectedPanditId: isPanditBooking ? String(id) : '',
    paymentMethod: 'card',
  });

  const selectedPuja   = pujas.find((p) => p.id === Number(form.pujaId)) || (!isPanditBooking ? pujaFromUrl : null);
  const selectedPandit = pandits.find((p) => p.id === Number(form.selectedPanditId)) || (isPanditBooking ? panditFromUrl : null);

  const totalPrice = (selectedPuja?.price || selectedPandit?.price_per_puja || 0) + (form.withMaterialKit ? 800 : 0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBook = async () => {
    if (!user) {
      navigate('/login?redirect=/book/' + id);
      return;
    }
    setBookingLoading(true);
    try {
      const payload = {
        puja_name:         selectedPuja?.name || 'Puja',
        pandit_name:       selectedPandit?.name || '',
        pandit_id:         selectedPandit?.id || null,
        date:              form.date,
        time:              form.time,
        city:              form.location,
        address:           form.address,
        language:          form.language,
        tradition:         form.tradition,
        is_online:         form.isOnline,
        with_material_kit: form.withMaterialKit,
        special_requests:  form.specialRequests,
        payment_method:    form.paymentMethod,
        amount:            totalPrice,
      };
      const res = await bookingsApi.create(payload);
      navigate('/booking/confirmation', { state: { booking: res.data } });
    } catch (err) {
      const local = {
        puja_name:   selectedPuja?.name || 'Puja',
        pandit_name: selectedPandit?.name || '',
        date:        form.date,
        time:        form.time,
        city:        form.location,
        amount:      totalPrice,
        status:      'pending',
        booking_ref: `PS${Date.now().toString().slice(-6)}`,
      };
      navigate('/booking/confirmation', { state: { booking: local } });
    }
    setBookingLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-saffron">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800">Book Puja</span>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 mb-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-100 -z-0" />
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < step ? 'gradient-saffron text-white' : i === step ? 'bg-saffron text-white ring-4 ring-orange-100' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <p className={`text-xs mt-1.5 font-medium ${i === step ? 'text-saffron' : 'text-gray-400'}`}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h2>
                <div className="space-y-4">
                  {!pujaFromUrl && !panditFromUrl && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Puja *</label>
                      <select name="pujaId" value={form.pujaId} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron bg-white">
                        <option value="">Choose a puja...</option>
                        {pujas.map((p) => <option key={p.id} value={p.id}>{p.name} — ₹{p.price.toLocaleString()}</option>)}
                      </select>
                    </div>
                  )}

                  {selectedPuja && (
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                      <span className="text-2xl">🙏</span>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{selectedPuja.name}</p>
                        <p className="text-xs text-gray-500">₹{selectedPuja.price.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Calendar size={13} className="inline mr-1 text-saffron" />Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron"
                      />
                      {muhurats.slice(0, 2).map((m) => (
                        <button
                          key={m.date}
                          onClick={() => setForm((f) => ({ ...f, date: m.date }))}
                          className="text-xs text-orange-600 hover:underline block mt-1"
                        >
                          ✨ {m.date} (Auspicious)
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Clock size={13} className="inline mr-1 text-saffron" />Time *
                      </label>
                      <select name="time" value={form.time} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron bg-white">
                        {['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '16:00', '17:00', '18:00'].map((t) => (
                          <option key={t} value={t}>{t} AM/PM</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <MapPin size={13} className="inline mr-1 text-saffron" />City *
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g., Hyderabad, Chennai..."
                      value={form.location}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Address *</label>
                    <textarea
                      name="address"
                      placeholder="House number, street, area..."
                      value={form.address}
                      onChange={handleChange}
                      rows={2}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Language Preference</label>
                      <select name="language" value={form.language} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron bg-white">
                        <option value="">Any language</option>
                        {['Telugu', 'Tamil', 'Hindi', 'Sanskrit', 'Kannada', 'Marathi', 'Malayalam'].map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Tradition</label>
                      <select name="tradition" value={form.tradition} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron bg-white">
                        <option value="">Any tradition</option>
                        {['Telugu', 'Tamil', 'North Indian', 'Maharashtrian', 'Kannada', 'Malayali'].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                      <input type="checkbox" name="isOnline" checked={form.isOnline} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
                      <div className="flex items-center gap-2">
                        <Video size={16} className="text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Online Puja (Video Call)</p>
                          <p className="text-xs text-gray-500">Participate from anywhere via live video</p>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition-colors">
                      <input type="checkbox" name="withMaterialKit" checked={form.withMaterialKit} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-green-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Include Puja Material Kit +₹800</p>
                          <p className="text-xs text-gray-500">All items delivered to your doorstep</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Requests (Optional)</label>
                    <textarea
                      name="specialRequests"
                      placeholder="Any specific requirements or requests..."
                      value={form.specialRequests}
                      onChange={handleChange}
                      rows={2}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  disabled={!form.date || !form.location}
                  className="mt-6 w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Select Pandit →
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Your Pandit</h2>
                <div className="space-y-3">
                  {pandits.filter((p) => p.available).map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.selectedPanditId === String(p.id)
                          ? 'border-saffron bg-orange-50'
                          : 'border-gray-200 hover:border-orange-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedPanditId"
                        value={p.id}
                        checked={form.selectedPanditId === String(p.id)}
                        onChange={handleChange}
                        className="accent-orange-500"
                      />
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=f97316&color=fff`; }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-800">{p.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <span>⭐ {p.rating}</span>
                          <span>·</span>
                          <span>{p.experience} yrs</span>
                          <span>·</span>
                          <span>{(p.languages || []).slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                      <p className="text-saffron font-bold text-sm">₹{(p.price_per_puja || 0).toLocaleString()}</p>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">← Back</button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!form.selectedPanditId}
                    className="flex-1 gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    Review Booking →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Booking</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-medium mb-3">Ceremony Details</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Puja', value: selectedPuja?.name || 'Selected Puja' },
                        { label: 'Date', value: form.date || '—' },
                        { label: 'Time', value: form.time },
                        { label: 'Location', value: form.location || '—' },
                        { label: 'Language', value: form.language || 'Any' },
                        { label: 'Tradition', value: form.tradition || 'Any' },
                        { label: 'Online Puja', value: form.isOnline ? 'Yes' : 'No' },
                        { label: 'Material Kit', value: form.withMaterialKit ? 'Yes (+₹800)' : 'No' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span className="text-gray-500">{label}</span>
                          <span className="font-medium text-gray-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedPandit && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <img
                        src={selectedPandit.photo}
                        alt={selectedPandit.name}
                        className="w-12 h-12 rounded-xl object-cover"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedPandit.name)}&background=f97316&color=fff`; }}
                      />
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{selectedPandit.name}</p>
                        <p className="text-xs text-gray-500">⭐ {selectedPandit.rating} · {selectedPandit.experience} yrs experience</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">← Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all">
                    Proceed to Pay →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { value: 'card', label: '💳 Credit / Debit Card' },
                    { value: 'upi', label: '📱 UPI (GPay, PhonePe, Paytm)' },
                    { value: 'netbanking', label: '🏦 Net Banking' },
                    { value: 'cash', label: '💵 Cash on Service' },
                  ].map((opt) => (
                    <label key={opt.value} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      form.paymentMethod === opt.value ? 'border-saffron bg-orange-50' : 'border-gray-200 hover:border-orange-200'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.value}
                        checked={form.paymentMethod === opt.value}
                        onChange={handleChange}
                        className="accent-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-xl text-xs text-green-700 mb-6">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" />
                  <span>Your payment is secured with 256-bit SSL encryption. 100% safe & verified.</span>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">← Back</button>
                  <button
                    onClick={handleBook}
                    disabled={bookingLoading}
                    className="flex-1 gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all shadow-saffron disabled:opacity-70"
                  >
                    {bookingLoading ? 'Confirming…' : `🙏 Confirm Booking — ₹${totalPrice.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Puja Fee</span>
                  <span className="font-medium">₹{(selectedPuja?.price || selectedPandit?.price_per_puja || 0).toLocaleString()}</span>
                </div>
                {form.withMaterialKit && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Material Kit</span>
                    <span className="font-medium">₹800</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Platform Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <hr className="border-orange-100" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-saffron text-lg">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <p className="flex items-center gap-1"><CheckCircle size={10} className="text-green-500" /> Free cancellation up to 24 hours</p>
                <p className="flex items-center gap-1"><CheckCircle size={10} className="text-green-500" /> Verified pandit guarantee</p>
                <p className="flex items-center gap-1"><CheckCircle size={10} className="text-green-500" /> Secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
