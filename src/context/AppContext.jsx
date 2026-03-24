import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in
  const [pandit, setPandit] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      pujaName: 'Satyanarayana Vratham',
      panditName: 'Pandit Raghavendra Sharma',
      date: '2025-04-18',
      time: '09:00 AM',
      location: 'Hyderabad',
      status: 'confirmed',
      price: 2500,
      panditPhone: '+91 98765 43210',
    },
  ]);
  const [cart, setCart] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const loginPandit = (data) => setPandit(data);
  const logoutPandit = () => setPandit(null);

  const addBooking = (booking) => {
    setBookings((prev) => [
      ...prev,
      { ...booking, id: `BK${String(Date.now()).slice(-4)}`, status: 'pending' },
    ]);
  };

  return (
    <AppContext.Provider
      value={{ user, login, logout, pandit, loginPandit, logoutPandit, bookings, addBooking, cart, setCart }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
