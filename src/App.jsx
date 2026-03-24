import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

// Pages
import Home           from './pages/Home';
import Search         from './pages/Search';
import PanditProfile  from './pages/PanditProfile';
import BookingPage    from './pages/BookingPage';
import PujasPage      from './pages/PujasPage';
import MuhuratPage    from './pages/MuhuratPage';
import UserDashboard  from './pages/UserDashboard';
import Login          from './pages/Login';
import Signup         from './pages/Signup';

// Pandit pages
import PanditLogin    from './pages/pandit/PanditLogin';
import PanditRegister from './pages/pandit/PanditRegister';
import PanditDashboard from './pages/pandit/PanditDashboard';

// Admin pages
import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Auth modals — always mounted inside Router so they can navigate */}
      <AuthModal />
    </div>
  );
}

function FullLayout({ children }) {
  return <div className="min-h-screen">{children}</div>;
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

            {/* Auth — kept as pages for direct URL fallback */}
            <Route path="/login"    element={<FullLayout><Login   /></FullLayout>} />
            <Route path="/signup"   element={<FullLayout><Signup  /></FullLayout>} />

            {/* Pandit */}
            <Route path="/pandit/login"      element={<FullLayout><PanditLogin    /></FullLayout>} />
            <Route path="/pandit/register"   element={<FullLayout><PanditRegister /></FullLayout>} />
            <Route path="/pandit/dashboard"  element={<FullLayout><PanditDashboard /></FullLayout>} />

            {/* Admin */}
            <Route path="/admin"             element={<FullLayout><AdminLogin     /></FullLayout>} />
            <Route path="/admin/dashboard"   element={<FullLayout><AdminDashboard /></FullLayout>} />
          </Routes>
        </Router>
      </ModalProvider>
    </AppProvider>
  );
}
