import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { authApi } from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 mx-auto mb-4 shadow-sm" style={{ borderColor: '#E05D00' }}>
            <img src="/lord ganesh.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
          </div>
          <Link to="/" className="text-2xl font-bold text-maroon" style={{ fontFamily: 'Noto Serif, serif' }}>
            Pandit<span className="text-saffron">Seva</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-8" style={{ borderColor: '#D4AF37', borderTopWidth: '3px' }}>
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Email Sent!</h2>
              <p className="text-sm text-gray-500 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Check your inbox.
              </p>
              <Link to="/login" className="gradient-saffron text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all inline-block">
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-gray-900 mb-1">Forgot Password?</h1>
              <p className="text-sm text-gray-500 mb-6">Enter your email and we'll send a reset link.</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-saffron"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-70 text-sm"
                >
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="text-center mt-5">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-saffron transition-colors">
            <ArrowLeft size={12} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
