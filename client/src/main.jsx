import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Context Providers
import { AuthProvider } from './context/AuthContext.jsx';
import { OfflineProvider } from './context/OfflineContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { DemoProvider } from './context/DemoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OfflineProvider>
          <NotificationProvider>
            <DemoProvider>
              <App />
            </DemoProvider>
          </NotificationProvider>
        </OfflineProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
