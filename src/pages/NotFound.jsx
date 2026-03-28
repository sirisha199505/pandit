import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 mx-auto mb-6 shadow-lg" style={{ borderColor: '#D4AF37' }}>
          <img src="/lord ganesh.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
        </div>
        <h1 className="text-7xl font-bold text-saffron mb-2" style={{ fontFamily: 'Noto Serif, serif' }}>404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-8">
          Om Shanti 🙏 — The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="gradient-saffron text-white font-semibold px-7 py-3 rounded-xl hover:opacity-90 transition-all text-sm"
          >
            Go to Home
          </Link>
          <Link
            to="/pujas"
            className="border-2 text-gray-700 font-medium px-7 py-3 rounded-xl hover:bg-gray-50 transition-all text-sm"
            style={{ borderColor: '#D4AF37' }}
          >
            Browse Pujas
          </Link>
        </div>
      </div>
    </div>
  );
}
