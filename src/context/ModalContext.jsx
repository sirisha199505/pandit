import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

// modal can be: null | 'login' | 'signup' | 'panditLogin'
export function ModalProvider({ children }) {
  const [modal, setModal]   = useState(null);
  const [redirect, setRedir] = useState('/dashboard');

  const openLogin       = useCallback((redir = '/dashboard') => { setRedir(redir); setModal('login'); },       []);
  const openSignup      = useCallback(() => setModal('signup'),       []);
  const openPanditLogin = useCallback(() => setModal('panditLogin'),  []);
  const closeModal      = useCallback(() => setModal(null),           []);

  return (
    <ModalContext.Provider value={{ modal, redirect, openLogin, openSignup, openPanditLogin, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
