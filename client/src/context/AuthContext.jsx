import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from token or default demo session
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('pravaah_token');
      if (token) {
        try {
          const res = await apiClient.get('/auth/me');
          if (res.success && res.user) {
            setUser(res.user);
          }
        } catch (err) {
          console.warn('Session refresh error:', err.message);
          // Fallback to demo default if server is starting up
          const savedUser = localStorage.getItem('pravaah_user_cache');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } else {
        // Auto initialize as Ramesh Kumar (Trainee) for instant evaluation
        quickSwitchRole('trainee');
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.success) {
        localStorage.setItem('pravaah_token', res.token);
        localStorage.setItem('pravaah_user_cache', JSON.stringify(res.user));
        setUser(res.user);
        return res;
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('pravaah_token');
    localStorage.removeItem('pravaah_user_cache');
    setUser(null);
  };

  // Quick switch role utility for Judge Demo & Pair Programming
  const quickSwitchRole = (roleType) => {
    let demoUser = null;
    let mockToken = 'mock_jwt_token_demo';

    if (roleType === 'trainee') {
      demoUser = {
        id: 'usr-trainee-001',
        name: 'Ramesh Kumar',
        email: 'ramesh@pravaah.org',
        role: 'trainee',
        phone: '+91 98765 43210',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        profile: {
          id: 'trainee-001',
          registration_number: 'PRV-TR-2026-0491',
          district: 'Anand',
          state: 'Gujarat',
          employment_readiness: 71.0,
          evidence_confidence: 88.0
        }
      };
    } else if (roleType === 'admin') {
      demoUser = {
        id: 'usr-admin-001',
        name: 'Dr. Arvind Patel',
        email: 'admin@pravaah.org',
        role: 'admin',
        phone: '+91 98250 12345',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
        profile: {
          designation: 'Regional Training Director',
          center: 'Anand Cooperative Skill Development Institute'
        }
      };
    } else if (roleType === 'employer') {
      demoUser = {
        id: 'usr-emp-001',
        name: 'Vikram Mehta (Amul GCMMF)',
        email: 'employer@amuldairy.coop',
        role: 'employer',
        phone: '+91 99099 88776',
        avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
        profile: {
          id: 'emp-001',
          organization_name: 'Gujarat Cooperative Milk Marketing Federation (Amul)',
          organization_type: 'Dairy Cooperative Federation',
          district: 'Anand',
          state: 'Gujarat'
        }
      };
    }

    if (demoUser) {
      localStorage.setItem('pravaah_token', mockToken);
      localStorage.setItem('pravaah_user_cache', JSON.stringify(demoUser));
      setUser(demoUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, quickSwitchRole, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
