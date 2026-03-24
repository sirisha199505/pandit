import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const footerLinks = {
  'Quick Links': [
    { to: '/pujas',           label: 'All Pujas' },
    { to: '/search',          label: 'Find Pandits' },
    { to: '/muhurat',         label: 'Auspicious Dates' },
    { to: '/signup',          label: 'Register as User' },
    { to: '/pandit/register', label: 'Register as Pandit' },
    { to: '/admin',           label: 'Admin Panel' },
  ],
  'Popular Pujas': [
    'Satyanarayana Vratham',
    'Griha Pravesh',
    'Wedding Ceremony',
    'Ganesh Puja',
    'Rudrabhishek',
    'Lakshmi Puja',
    'Navagraha Shanti',
  ],
};

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      {/* Top stripe */}
      <div className="h-0.5 gradient-saffron opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-saffron flex items-center justify-center shadow-sm">
                <span className="text-white text-lg leading-none">🕉</span>
              </div>
              <span
                className="text-lg font-bold text-white tracking-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Pandit<span className="text-orange-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-stone-500 leading-relaxed mb-5">
              India's most trusted platform to book verified pandits for all your religious ceremonies and rituals.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: <Facebook size={14} />, label: 'Facebook' },
                { icon: <Instagram size={14} />, label: 'Instagram' },
                { icon: <Youtube size={14} />, label: 'Youtube' },
                { icon: <Twitter size={14} />, label: 'Twitter' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-orange-600 flex items-center justify-center transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks['Quick Links'].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-stone-500 hover:text-orange-400 transition-colors duration-150 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-stone-700 group-hover:bg-orange-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Pujas */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Popular Pujas</h4>
            <ul className="space-y-2.5">
              {footerLinks['Popular Pujas'].map((puja) => (
                <li key={puja}>
                  <Link
                    to="/pujas"
                    className="text-sm text-stone-500 hover:text-orange-400 transition-colors duration-150"
                  >
                    {puja}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Contact Us</h4>
            <ul className="space-y-3 mb-5">
              {[
                { icon: <Phone size={13} />, text: '+91 800 500 8080', sub: 'Mon–Sat, 8AM–8PM' },
                { icon: <Mail size={13} />, text: 'support@panditconnect.in' },
                { icon: <MapPin size={13} />, text: 'Serving 120+ cities across India' },
              ].map(({ icon, text, sub }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <span className="text-orange-500 mt-0.5 shrink-0">{icon}</span>
                  <div>
                    <p className="text-sm text-stone-400">{text}</p>
                    {sub && <p className="text-xs text-stone-600">{sub}</p>}
                  </div>
                </li>
              ))}
            </ul>

            {/* App download badge */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5">
              <p className="text-xs font-semibold text-orange-400 mb-1">Download Our App</p>
              <p className="text-xs text-stone-600 mb-2.5">Available on iOS & Android</p>
              <div className="flex gap-2">
                {['App Store', 'Google Play'].map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-medium text-stone-400 bg-stone-800 hover:bg-stone-700 transition-colors px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">© 2025 PanditConnect. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-stone-600">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((l) => (
              <a key={l} href="#" className="hover:text-orange-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
