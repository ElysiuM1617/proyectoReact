import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [time, setTime] = useState(new Date());
  const getInitials = (user) => {
  const name = user?.displayName || user?.email || '';
  const parts = name.split(' ');
  if (parts.length === 1 && name.includes('@')) {
    return name.charAt(0).toUpperCase();
  }
  return parts[0].charAt(0).toUpperCase() + (parts[1]?.charAt(0).toUpperCase() || '');
};

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="avatar-circle">{getInitials(user)}</div>
        <h1 className="welcome-text">
          ¡Hola, {user?.displayName || user?.email}!
        </h1>
        <p className="date-time">
          Hoy es {time.toLocaleDateString()}<br />
          {time.toLocaleTimeString()}
        </p>
        <p className="subtitle">Nos alegra verte de nuevo</p>

        <div className="btn-group">
          <button className="btn-primary" onClick={() => alert()}>
            Ver perfil
          </button>
          <button className="btn-secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
