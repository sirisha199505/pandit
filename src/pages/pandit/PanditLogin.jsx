import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PanditLogin() {
  const { loginPandit } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginPandit(form.email, form.password);
      navigate('/pandit/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left image panel ── */}
      <div className="hidden lg:flex w-[45%] flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #4A0010 0%, #8B0020 35%, #B84A00 70%, #D4720A 100%)' }}
      >
        {/* Full bleed deity image */}
        <img
          src="/lord ganesh.jpg"
          alt="Lord Ganesha"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ opacity: 0.30 }}
        />
        {/* Content over image */}
        <div className="relative z-10 text-center text-white max-w-xs px-8">
          {/* Ganesha circular portrait */}
          <div className="relative mx-auto mb-6 w-36 h-36">
            <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ background: 'radial-gradient(circle, #FFD700, transparent)' }} />
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: '#D4AF37' }}>
              <img src="/lord ganesh.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
            </div>
          </div>

          <div className="mb-2 text-xs font-semibold tracking-widest uppercase" style={{ color: '#D4AF37' }}>ॐ गं गणपतये नमः</div>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Noto Serif, serif' }}>
            Pandit Portal
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Manage your bookings, profile and earnings — all in one place.
          </p>

          <div className="space-y-3 text-left">
            {[
              'View & accept new bookings',
              'Manage your availability',
              'Track your earnings',
              'Update your profile & specializations',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#D4AF37' }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Gold bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center py-12 px-6 bg-cream relative">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 shadow-sm" style={{ borderColor: '#E05D00' }}>
                <img src="/lord ganesh.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-2xl font-bold text-maroon" style={{ fontFamily: 'Noto Serif, serif' }}>
                Pandit<span className="text-saffron">Seva</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Pandit Login</h1>
            <p className="text-gray-500 text-sm mt-1">Access your dashboard and manage bookings</p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border p-8" style={{ borderColor: '#D4AF37', borderTopWidth: '3px' }}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="pandit@example.com"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-saffron"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-saffron"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-70"
              >
                {loading ? 'Logging in...' : 'Login to Dashboard'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <button
              onClick={() => { loginPandit({ name: 'Demo Pandit', email: 'demo@pandit.com', id: 1 }); navigate('/pandit/dashboard'); }}
              className="w-full text-sm border px-4 py-2.5 rounded-xl transition-all"
              style={{ borderColor: '#D4AF37', color: '#B8860B' }}
            >
              Demo Pandit Access
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Not registered?{' '}
              <Link to="/pandit/register" className="text-saffron font-medium hover:underline">Register as Pandit</Link>
            </p>
          </div>

          <div className="text-center mt-5">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-saffron transition-colors">
              <ArrowLeft size={12} /> Back to User Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
