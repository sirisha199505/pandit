import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PanditLogin() {
  const { loginPandit } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    loginPandit({ name: 'Pandit Raghavendra Sharma', email: form.email, id: 1 });
    navigate('/pandit/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative">
      <div className="fixed inset-0 -z-10">
        <img src="/lord ganesh.jpg" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.55)' }} />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
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

        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8">
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
            <button type="submit" disabled={loading} className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-70">
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <button
              onClick={() => { loginPandit({ name: 'Demo Pandit', email: 'demo@pandit.com', id: 1 }); navigate('/pandit/dashboard'); }}
              className="text-sm border border-orange-200 text-orange-600 px-4 py-2 rounded-xl hover:bg-orange-50 transition-all"
            >
              Demo Pandit Access
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Not registered yet?{' '}
            <Link to="/pandit/register" className="text-saffron font-medium hover:underline">Register as Pandit</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
