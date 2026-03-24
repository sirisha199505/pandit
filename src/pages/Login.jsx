import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [searchParams] = useSearchParams();
  const { login } = useApp();
  const navigate = useNavigate();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise((r) => setTimeout(r, 700));
    if (form.email && form.password) {
      login({ name: form.email.split('@')[0].replace(/[._]/g, ' '), email: form.email });
      navigate(redirect);
    } else {
      setError('Please enter valid credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-[45%] gradient-hero hero-pattern flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="text-center text-white max-w-xs">
          <div className="text-6xl mb-6">🕉️</div>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sacred Ceremonies<br />Made Simple
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Book verified pandits for every ritual — in your language, your tradition, your city.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[['500+', 'Pandits'], ['50K+', 'Pujas Done'], ['120+', 'Cities'], ['4.9★', 'Rating']].map(([v, l]) => (
              <div key={l} className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-amber-300">{v}</p>
                <p className="text-xs text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-stone-50">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-saffron mb-8 transition-colors">
            <ArrowLeft size={13} /> Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome Back
            </h1>
            <p className="text-stone-400 text-sm mt-1">Login to manage your bookings</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-7">
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')}
                    className="w-full pl-10 pr-4 py-3 border-2 border-stone-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:shadow-input transition-all bg-stone-50 focus:bg-white placeholder-stone-400"
                    required />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide">Password</label>
                  <a href="#" className="text-xs text-saffron hover:underline font-medium">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')}
                    className="w-full pl-10 pr-10 py-3 border-2 border-stone-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:shadow-input transition-all bg-stone-50 focus:bg-white placeholder-stone-400"
                    required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-saffron disabled:opacity-60 text-sm mt-2">
                {loading ? 'Signing in…' : 'Login to PanditConnect'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-stone-100" />
              <span className="text-xs text-stone-400">or</span>
              <div className="flex-1 h-px bg-stone-100" />
            </div>

            <button
              onClick={() => { login({ name: 'Demo User', email: 'demo@example.com' }); navigate(redirect); }}
              className="w-full border-2 border-stone-200 hover:border-orange-300 text-stone-600 hover:text-saffron py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              Continue as Demo User
            </button>

            <p className="text-center text-sm text-stone-500 mt-5">
              No account?{' '}
              <Link to="/signup" className="text-saffron font-semibold hover:underline">Sign up free</Link>
            </p>
          </div>

          <p className="text-center text-xs text-stone-400 mt-4">
            Are you a Pandit?{' '}
            <Link to="/pandit/login" className="text-saffron hover:underline font-medium">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
