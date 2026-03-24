import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if ((form.username === 'admin' && form.password === 'admin123') || (form.username && form.password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">🪔</span>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">PanditSeva Management</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          {error && <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-xl text-sm text-red-300">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                  placeholder="admin"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Admin Login'}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">Demo: any username/password works</p>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4">
          <Link to="/" className="text-gray-500 hover:text-gray-300">← Back to Site</Link>
        </p>
      </div>
    </div>
  );
}
