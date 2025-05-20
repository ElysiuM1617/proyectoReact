
import React, { useState } from 'react';
import './LoginSignup.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase'; // Ajusta la ruta si mueves firebase.js a src/
import { useNavigate } from 'react-router-dom';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState('Iniciar sesion');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
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

    try {
      if (action === 'Registrarse') {
        // Registro con Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Guardar el nombre en el perfil del usuario
        await updateProfile(userCredential.user, { displayName: name });
        setMessage(`Usuario registrado: ${name} (${email})`);
        // Opcional: limpiar campos o cambiar a iniciar sesión
        setName('');
        setEmail('');
        setPassword('');
      } else {
        // Inicio de sesión con Firebase
        await signInWithEmailAndPassword(auth, email, password);
        setMessage(`Bienvenido de nuevo, ${email}`);
        setEmail('');
        setPassword('');

        navigate('/home'); // Redirige a la página de inicio después de iniciar sesión
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('El email ya está en uso.');
      } else if (error.code === 'auth/user-not-found') {
        setError('Usuario no encontrado.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta.');
      } else {
        setError('Error: ' + error.message);
      }
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
