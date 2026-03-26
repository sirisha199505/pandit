import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useModal } from '../context/ModalContext';

const navLinks = [
  { to: '/',        label: 'Home' },
  { to: '/search',  label: 'Find Pandits' },
  { to: '/pujas',   label: 'Pujas' },
  { to: '/muhurat', label: 'Muhurat' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdown] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useApp();
  const { openLogin, openSignup, openPanditLogin } = useModal();
  const location = useLocation();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 glass border-b transition-shadow duration-200 ${
        scrolled ? 'border-stone-200 shadow-md' : 'border-stone-100 shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 shadow-sm" style={{ borderColor: '#E05D00' }}>
              <img
                src="/lord ganesh.jpg"
                alt="Lord Ganesha"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="leading-none">
              <span
                className="text-[1.15rem] font-bold tracking-tight"
                style={{ fontFamily: 'Noto Serif, serif', color: '#8B0020' }}
              >
                Pandit<span style={{ color: '#E05D00' }}>Seva</span>
              </span>
              <p className="text-[10px] text-stone-400 font-normal mt-0.5 leading-none">
                Every Ritual, Every Tradition
              </p>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive(to)
                    ? 'text-saffron bg-orange-50'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {label}
                {isActive(to) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-saffron" />
                )}
              </Link>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdown(!dropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-stone-200 hover:border-orange-300 bg-white hover:bg-orange-50 transition-all text-sm font-medium text-stone-700"
                >
                  <div className="w-6 h-6 rounded-full gradient-saffron flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[80px] truncate">{user.name?.split(' ')[0]}</span>
                  <ChevronDown
                    size={13}
                    className={`text-stone-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="animate-scaleIn absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-stone-100 py-1.5 origin-top-right">
                    <div className="px-4 py-2 border-b border-stone-50 mb-1">
                      <p className="text-xs font-semibold text-stone-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-600 hover:bg-orange-50 hover:text-saffron transition-colors"
                    >
                      <LayoutDashboard size={14} /> My Bookings
                    </Link>
                    <div className="border-t border-stone-50 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setDropdown(false); }}
                        className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openLogin()}
                  className="px-4 py-1.5 text-sm font-medium text-stone-600 hover:text-saffron transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={openSignup}
                  className="gradient-saffron text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}

            <div className="w-px h-5 bg-stone-200 mx-1" />

            <button
              onClick={openPanditLogin}
              className="text-xs font-medium text-stone-500 hover:text-saffron border border-stone-200 hover:border-orange-300 px-3 py-1.5 rounded-lg transition-all bg-white"
            >
              Pandit Portal
            </button>
          </div>

          {/* ── Mobile menu button ── */}
          <button
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4">
          <div className="space-y-1 mb-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-orange-50 text-saffron'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-stone-100 pt-3 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-2">
                  <div className="w-7 h-7 rounded-full gradient-saffron flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-stone-800">{user.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-stone-600 hover:bg-stone-50"
                >
                  <LayoutDashboard size={14} /> My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => { openLogin(); setMenuOpen(false); }}
                  className="flex-1 text-center text-sm font-medium border border-stone-200 rounded-lg py-2 text-stone-600 hover:bg-stone-50"
                >
                  Login
                </button>
                <button
                  onClick={() => { openSignup(); setMenuOpen(false); }}
                  className="flex-1 text-center text-sm font-medium gradient-saffron text-white rounded-lg py-2"
                >
                  Sign Up
                </button>
              </div>
            )}
            <button
              onClick={() => { openPanditLogin(); setMenuOpen(false); }}
              className="block w-full text-center text-xs font-medium text-stone-500 border border-stone-200 rounded-lg py-2 hover:bg-stone-50"
            >
              Pandit Portal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
