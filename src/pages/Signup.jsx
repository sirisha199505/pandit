import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Signup() {
  const { login } = useApp();
  const navigate  = useNavigate();

  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError("Passwords don't match."); return; }
    if (form.password.length < 6)       { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login({ name: form.name, email: form.email, phone: form.phone });
    navigate('/dashboard');
    setLoading(false);
  };

  const fields = [
    { key: 'name',    label: 'Full Name',     icon: <User  size={15} />, type: 'text',     placeholder: 'Your full name' },
    { key: 'email',   label: 'Email Address', icon: <Mail  size={15} />, type: 'email',    placeholder: 'you@example.com' },
    { key: 'phone',   label: 'Phone Number',  icon: <Phone size={15} />, type: 'tel',      placeholder: '+91 XXXXX XXXXX' },
    { key: 'password',label: 'Password',      icon: <Lock  size={15} />, type: 'password', placeholder: 'Min. 6 characters', hasToggle: true },
    { key: 'confirm', label: 'Confirm Password', icon: <Lock size={15} />, type: 'password', placeholder: 'Repeat password' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-[45%] gradient-hero hero-pattern flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="text-center text-white max-w-xs">
          <div className="text-6xl mb-6">🪔</div>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Join 45,000+<br />Happy Families
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Create a free account and book verified pandits for your most sacred ceremonies.
          </p>
          <div className="mt-8 space-y-3">
            {['Instant booking confirmation', 'Verified & trusted pandits', 'Book in your language', 'Free cancellation policy'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-stone-50 overflow-y-auto">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-saffron mb-8 transition-colors">
            <ArrowLeft size={13} /> Back to Home
          </Link>

          <div className="mb-7">
            <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Create Account
            </h1>
            <p className="text-stone-400 text-sm mt-1">Free forever — no hidden charges</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-7">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {fields.map(({ key, label, icon, type, placeholder, hasToggle }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">{icon}</span>
                    <input
                      type={hasToggle && showPass ? 'text' : type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={set(key)}
                      className="w-full pl-10 pr-10 py-3 border-2 border-stone-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:shadow-input transition-all bg-stone-50 focus:bg-white placeholder-stone-400"
                      required={key !== 'phone'}
                    />
                    {hasToggle && (
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-saffron disabled:opacity-60 text-sm mt-2"
              >
                {loading ? 'Creating account…' : 'Create Free Account'}
              </button>
            </form>

            <p className="text-center text-[11px] text-stone-400 mt-4">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-saffron hover:underline">Terms</a>
              {' '}&{' '}
              <a href="#" className="text-saffron hover:underline">Privacy Policy</a>
            </p>

            <p className="text-center text-sm text-stone-500 mt-4 pt-4 border-t border-stone-50">
              Already have an account?{' '}
              <Link to="/login" className="text-saffron font-semibold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
