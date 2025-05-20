import React, { useState } from 'react';
import './LoginSignup.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from '../../firebase';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';
import eye from '../Assets/eye.png';
import eye_off from '../Assets/eye_off.png';

export const LoginSignup = () => {
  const [action, setAction] = useState('Iniciar sesion');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); //
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || (!forgotPassword && !password) || (action === 'Registrarse' && !name)) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (!email.includes('@')) {
      setError('Ingrese un email válido.');
      return;
    }

    if (!forgotPassword && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      if (action === 'Registrarse') {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage(`Usuario registrado: ${name} (${email})`);
        setAction('Iniciar sesion');
        setName('');
        setPassword('');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/home');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Por favor, ingrese su email.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se ha enviado un correo para restablecer la contraseña.");
    } catch (err) {
      setError("Error al enviar el correo. Asegúrese de que el email sea válido.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{forgotPassword ? "Recuperar contraseña" : action}</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit} className="inputs">
        {!forgotPassword && action === 'Registrarse' && (
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

        {!forgotPassword && (
          <div className="input password-input">
            <img src={password_icon} alt="password icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? eye_off : eye}
              alt="toggle password"
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        {forgotPassword ? (
          <>
            <button type="button" className="submit" onClick={handleResetPassword}>
              Recuperar contraseña
            </button>
            <p className="toggle-action">
              ¿Recordaste tu contraseña?{' '}
              <span onClick={() => setForgotPassword(false)}>Volver</span>
            </p>
          </>
        ) : (
          <>
            {action === 'Iniciar sesion' && !forgotPassword && (
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Recordar sesión</label>
              </div>
            )}
            <button className="submit">{action}</button>

            {action === 'Iniciar sesion' && (
              <>
                <p className="toggle-action">
                  ¿Olvidaste tu contraseña?{' '}
                  <span onClick={() => setForgotPassword(true)}>Recupérala aquí</span>
                </p>

                <p className="toggle-action">
                  ¿No tienes una cuenta?{' '}
                  <span onClick={() => setAction('Registrarse')}>Regístrate</span>
                </p>

              </>
            )}

            {action === 'Registrarse' && (
              <p className="toggle-action">
                ¿Ya tienes una cuenta?{' '}
                <span onClick={() => setAction('Iniciar sesion')}>Inicia sesión</span>
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
};
