import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import BackToTop from './components/BackToTop';

// Pages
import Home               from './pages/Home';
import Search             from './pages/Search';
import PanditProfile      from './pages/PanditProfile';
import BookingPage        from './pages/BookingPage';
import BookingConfirmation from './pages/BookingConfirmation';
import PujasPage          from './pages/PujasPage';
import MuhuratPage        from './pages/MuhuratPage';
import UserDashboard      from './pages/UserDashboard';
import Login              from './pages/Login';
import Signup             from './pages/Signup';
import ForgotPassword     from './pages/ForgotPassword';
import NotFound           from './pages/NotFound';

// Pandit pages
import PanditLogin    from './pages/pandit/PanditLogin';
import PanditRegister from './pages/pandit/PanditRegister';
import PanditDashboard from './pages/pandit/PanditDashboard';

// Admin pages
import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function GaneshBg({ src }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          opacity: 0.10,
        }}
      />
    </div>
  );
}

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <GaneshBg src="/ganesh3.jpg" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AuthModal />
        <BackToTop />
      </div>
    </div>
  );
}

function FullLayout({ children }) {
  return (
    <div className="min-h-screen relative">
      <GaneshBg src="/lord ganesh.jpg" />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}

function DashLayout({ children }) {
  return (
    <div className="min-h-screen relative">
      <GaneshBg src="/ganesh2.jpg" />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ModalProvider>
        <Router>
          <Routes>
            {/* Main site */}
            <Route path="/"         element={<MainLayout><Home          /></MainLayout>} />
            <Route path="/search"   element={<MainLayout><Search        /></MainLayout>} />
            <Route path="/pandit/:id" element={<MainLayout><PanditProfile /></MainLayout>} />
            <Route path="/book/:id" element={<MainLayout><BookingPage   /></MainLayout>} />
            <Route path="/pujas"    element={<MainLayout><PujasPage     /></MainLayout>} />
            <Route path="/muhurat"  element={<MainLayout><MuhuratPage   /></MainLayout>} />
            <Route path="/dashboard" element={<MainLayout><UserDashboard /></MainLayout>} />

            {/* Booking confirmation */}
            <Route path="/booking/confirmation" element={<FullLayout><BookingConfirmation /></FullLayout>} />

            {/* Auth */}
            <Route path="/login"           element={<FullLayout><Login          /></FullLayout>} />
            <Route path="/signup"          element={<FullLayout><Signup         /></FullLayout>} />
            <Route path="/forgot-password" element={<FullLayout><ForgotPassword /></FullLayout>} />

            {/* Pandit */}
            <Route path="/pandit/login"      element={<FullLayout><PanditLogin    /></FullLayout>} />
            <Route path="/pandit/register"   element={<FullLayout><PanditRegister /></FullLayout>} />
            <Route path="/pandit/dashboard"  element={<DashLayout><PanditDashboard /></DashLayout>} />

            {/* Admin */}
            <Route path="/admin"             element={<FullLayout><AdminLogin     /></FullLayout>} />
            <Route path="/admin/dashboard"   element={<DashLayout><AdminDashboard /></DashLayout>} />

            {/* 404 */}
            <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          </Routes>
        </Router>
      </ModalProvider>
    </AppProvider>
  );
}
