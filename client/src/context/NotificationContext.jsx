import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ title, message, type = 'info', duration = 4000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Render Floating Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-elevated border transition-all duration-300 transform translate-y-0 ${
              toast.type === 'success'
                ? 'bg-pravaah-emerald-light border-pravaah-emerald/30 text-pravaah-navy'
                : toast.type === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : toast.type === 'match'
                ? 'bg-pravaah-teal-light border-pravaah-teal/30 text-pravaah-navy'
                : 'bg-white border-pravaah-border text-pravaah-navy'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-sm">{toast.title}</h4>
                <p className="text-xs text-pravaah-muted mt-0.5">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-pravaah-muted hover:text-pravaah-navy text-xs ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
