import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useApp } from '../context/AppContext';
import { authApi } from '../services/api';

/* ─── Backdrop + container ─── */
function ModalShell({ children, onClose }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(12,10,9,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="animate-scaleIn bg-white rounded-2xl shadow-2xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-10"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ─── Shared input field ─── */
function Field({ label, icon, type = 'text', value, onChange, placeholder, required, rightSlot }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-10 py-3 border-2 border-stone-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:shadow-input transition-all bg-stone-50 focus:bg-white placeholder-stone-400 text-stone-800"
        />
        {rightSlot && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</span>
        )}
      </div>
    </div>
  );
}

/* ─── Divider ─── */
function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-stone-100" />
      <span className="text-xs text-stone-400">{label}</span>
      <div className="flex-1 h-px bg-stone-100" />
    </div>
  );
}

/* ══════════════════════════════════════════
   LOGIN PANEL
══════════════════════════════════════════ */
function LoginPanel({ switchTo }) {
  const { login } = useApp();
  const { closeModal, redirect } = useModal();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShow]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      closeModal();
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    }
    setLoading(false);
  };

  const demoLogin = () => {
    login({ name: 'Demo User', email: 'demo@example.com' });
    closeModal();
    navigate(redirect);
  };

  return (
    <div className="p-7">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 mx-auto mb-4 shadow-saffron" style={{ borderColor: '#E05D00' }}>
          <img src="/lord ganesh.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
        </div>
        <h2 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Noto Serif, serif' }}>
          Welcome Back
        </h2>
        <p className="text-sm text-stone-400 mt-1">Login to manage your bookings</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Email Address"
          icon={<Mail size={15} />}
          type="email"
          value={form.email}
          onChange={set('email')}
          placeholder="you@example.com"
          required
        />
        <Field
          label="Password"
          icon={<Lock size={15} />}
          type={showPass ? 'text' : 'password'}
          value={form.password}
          onChange={set('password')}
          placeholder="••••••••"
          required
          rightSlot={
            <button type="button" onClick={() => setShow(!showPass)} className="text-stone-400 hover:text-stone-600 transition-colors">
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />
        <div className="text-right -mt-2">
          <a href="#" className="text-xs text-saffron hover:underline font-medium">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-saffron disabled:opacity-60 text-sm"
        >
          {loading ? 'Signing in…' : 'Login to PanditSeva'}
        </button>
      </form>

      <Divider label="or" />

      <button
        onClick={demoLogin}
        className="w-full border-2 border-stone-200 hover:border-orange-300 text-stone-600 hover:text-saffron py-2.5 rounded-xl text-sm font-medium transition-all"
      >
        Continue as Demo User
      </button>

      <p className="text-center text-sm text-stone-500 mt-5">
        No account?{' '}
        <button onClick={() => switchTo('signup')} className="text-saffron font-semibold hover:underline">
          Sign up free
        </button>
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   SIGNUP PANEL
══════════════════════════════════════════ */
function SignupPanel({ switchTo }) {
  const { login } = useApp();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShow]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm)    { setError("Passwords don't match."); return; }
    if (form.password.length < 6)          { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await authApi.register({
        full_name:    form.name,
        email:        form.email,
        password:     form.password,
        phone_number: form.phone,
      });
      await login(form.email, form.password);
      closeModal();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="p-7">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 mx-auto mb-4 shadow-saffron" style={{ borderColor: '#E05D00' }}>
          <img src="/lord ganesh.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
        </div>
        <h2 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Noto Serif, serif' }}>
          Create Account
        </h2>
        <p className="text-sm text-stone-400 mt-1">Join 45,000+ families on PanditSeva</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Field label="Full Name"     icon={<User  size={15} />} value={form.name}     onChange={set('name')}    placeholder="Your full name" required />
        <Field label="Email"         icon={<Mail  size={15} />} type="email" value={form.email}    onChange={set('email')}   placeholder="you@example.com" required />
        <Field label="Phone"         icon={<Phone size={15} />} type="tel"   value={form.phone}    onChange={set('phone')}   placeholder="+91 XXXXX XXXXX" />
        <Field label="Password"      icon={<Lock  size={15} />}
          type={showPass ? 'text' : 'password'}
          value={form.password} onChange={set('password')} placeholder="Min. 6 characters" required
          rightSlot={<button type="button" onClick={() => setShow(!showPass)} className="text-stone-400 hover:text-stone-600"><Eye size={15} /></button>}
        />
        <Field label="Confirm Password" icon={<Lock size={15} />} type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" required />

        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-saffron disabled:opacity-60 text-sm mt-2"
        >
          {loading ? 'Creating account…' : 'Create Free Account'}
        </button>
      </form>

      <p className="text-center text-[11px] text-stone-400 mt-3">
        By signing up you agree to our{' '}
        <a href="#" className="text-saffron hover:underline">Terms</a> &{' '}
        <a href="#" className="text-saffron hover:underline">Privacy Policy</a>
      </p>

      <p className="text-center text-sm text-stone-500 mt-4">
        Already have an account?{' '}
        <button onClick={() => switchTo('login')} className="text-saffron font-semibold hover:underline">
          Login
        </button>
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   PANDIT LOGIN PANEL
══════════════════════════════════════════ */
function PanditLoginPanel({ switchTo }) {
  const { loginPandit } = useApp();
  const { closeModal }  = useModal();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShow]   = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    loginPandit({ name: 'Pandit Raghavendra Sharma', email: form.email, id: 1 });
    closeModal();
    navigate('/pandit/dashboard');
    setLoading(false);
  };

  return (
    <div className="p-7">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 mx-auto mb-4 shadow-saffron" style={{ borderColor: '#E05D00' }}>
          <img src="/lord ganesh.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
        </div>
        <h2 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Noto Serif, serif' }}>
          Pandit Portal
        </h2>
        <p className="text-sm text-stone-400 mt-1">Access your dashboard and bookings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email" icon={<Mail size={15} />} type="email" value={form.email} onChange={set('email')} placeholder="pandit@example.com" required />
        <Field label="Password" icon={<Lock size={15} />}
          type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="••••••••" required
          rightSlot={<button type="button" onClick={() => setShow(!showPass)} className="text-stone-400 hover:text-stone-600">{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>}
        />
        <button type="submit" disabled={loading} className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-saffron disabled:opacity-60 text-sm">
          {loading ? 'Signing in…' : 'Login to Dashboard'}
        </button>
      </form>

      <Divider label="or" />

      <button
        onClick={() => { loginPandit({ name: 'Demo Pandit', email: 'demo@pandit.com', id: 1 }); closeModal(); navigate('/pandit/dashboard'); }}
        className="w-full border-2 border-stone-200 hover:border-orange-300 text-stone-600 hover:text-saffron py-2.5 rounded-xl text-sm font-medium transition-all"
      >
        Demo Pandit Access
      </button>

      <p className="text-center text-sm text-stone-500 mt-5">
        Not registered?{' '}
        <button
          onClick={() => { closeModal(); navigate('/pandit/register'); }}
          className="text-saffron font-semibold hover:underline"
        >
          Register as Pandit
        </button>
      </p>

      <div className="mt-4 pt-4 border-t border-stone-100 text-center">
        <button onClick={() => switchTo('login')} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
          ← Back to User Login
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT MODAL — decides which panel to show
══════════════════════════════════════════ */
export default function AuthModal() {
  const { modal, closeModal } = useModal();
  const [view, setView] = useState(null);

  // Sync view with modal prop
  useEffect(() => { if (modal) setView(modal); }, [modal]);

  if (!modal) return null;

  return (
    <ModalShell onClose={closeModal}>
      {view === 'login'       && <LoginPanel       switchTo={setView} />}
      {view === 'signup'      && <SignupPanel       switchTo={setView} />}
      {view === 'panditLogin' && <PanditLoginPanel  switchTo={setView} />}
    </ModalShell>
  );
}
