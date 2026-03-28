import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, bookingsApi } from '../services/api';

const AppContext = createContext(null);

function loadStored() {
  try {
    const token = localStorage.getItem('ps_token');
    const user  = JSON.parse(localStorage.getItem('ps_user')  || 'null');
    const pandit = JSON.parse(localStorage.getItem('ps_pandit') || 'null');
    return { token, user, pandit };
  } catch {
    return { token: null, user: null, pandit: null };
  }
}

export function AppProvider({ children }) {
  const stored = loadStored();

  const [user,    setUser]    = useState(stored.user);
  const [pandit,  setPandit]  = useState(stored.pandit);
  const [token,   setToken]   = useState(stored.token);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoaded, setBookingsLoaded] = useState(false);

  // ── Real login (calls backend) ──────────────────────────────────
  const login = async (emailOrUserObj, password) => {
    // Allow direct object login for demo access
    if (typeof emailOrUserObj === 'object' && !password) {
      setUser(emailOrUserObj);
      localStorage.setItem('ps_user', JSON.stringify(emailOrUserObj));
      return;
    }
    const res = await authApi.login(emailOrUserObj, password);
    const userData = { ...res.data.info, token: res.data.token };
    setUser(userData);
    setToken(res.data.token);
    localStorage.setItem('ps_token', res.data.token);
    localStorage.setItem('ps_user', JSON.stringify(userData));
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setBookings([]);
    setBookingsLoaded(false);
    localStorage.removeItem('ps_token');
    localStorage.removeItem('ps_user');
  };

  // ── Pandit auth ─────────────────────────────────────────────────
  const loginPandit = async (emailOrObj, password) => {
    if (typeof emailOrObj === 'object' && !password) {
      setPandit(emailOrObj);
      localStorage.setItem('ps_pandit', JSON.stringify(emailOrObj));
      return;
    }
    const res = await authApi.login(emailOrObj, password);
    const panditData = { ...res.data.info, token: res.data.token };
    setPandit(panditData);
    setToken(res.data.token);
    localStorage.setItem('ps_token', res.data.token);
    localStorage.setItem('ps_pandit', JSON.stringify(panditData));
    return res.data;
  };

  const logoutPandit = () => {
    setPandit(null);
    localStorage.removeItem('ps_pandit');
  };

  // ── Bookings ────────────────────────────────────────────────────
  const fetchBookings = useCallback(async () => {
    if (!token) return;
    try {
      const res = await bookingsApi.myList();
      setBookings(res.data || []);
      setBookingsLoaded(true);
    } catch {
      setBookingsLoaded(true);
    }
  }, [token]);

  useEffect(() => {
    if (user && token && !bookingsLoaded) fetchBookings();
  }, [user, token, bookingsLoaded, fetchBookings]);

  const addBooking = async (bookingData) => {
    try {
      const res = await bookingsApi.create(bookingData);
      setBookings((prev) => [res.data, ...prev]);
      return res.data;
    } catch (e) {
      // fallback: store locally so UI still works
      const local = { ...bookingData, id: `local_${Date.now()}`, status: 'pending' };
      setBookings((prev) => [local, ...prev]);
      return local;
    }
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      pandit, loginPandit, logoutPandit,
      token,
      bookings, addBooking, fetchBookings, bookingsLoaded,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
