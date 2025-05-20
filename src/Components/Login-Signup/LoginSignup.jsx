import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const LoginSignup = () => {
  const [action, setAction] = useState('Iniciar sesion');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !password || (action === 'Registrarse' && !name)) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (!email.includes('@')) {
      setError('Ingrese un email válido.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (action === 'Registrarse') {
      setMessage(`Usuario registrado: ${name} (${email})`);
    } else {
      setMessage(`Bienvenido de nuevo, ${email}`);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit} className="inputs">
        {action === 'Registrarse' && (
          <div className="input">
            <img src={user_icon} alt="user icon" />
            <input
              type="text"
              placeholder="Ingrese su nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <button className="submit">{action}</button>
      </form>

      <div className="toggle-action">
        {action === 'Iniciar sesion' ? (
          <p>
            ¿No tienes una cuenta?{' '}
            <span onClick={() => setAction('Registrarse')}>Regístrate</span>
          </p>
        ) : (
          <p>
            ¿Ya tienes una cuenta?{' '}
            <span onClick={() => setAction('Iniciar sesion')}>Inicia sesión</span>
          </p>
        )}
      </div>
    </div>
  );
};
