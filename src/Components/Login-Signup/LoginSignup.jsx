import React, { useState }  from 'react'
import './LoginSignup.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

export const LoginSignup = () => {

    const [action, setAction]= useState('Registrarse');

    return (
        <div>
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action==="Iniciar sesion"?<div></div>:
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Ingrese su nombre'/>
                    </div>}
                    
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email"placeholder='Ingrese su email'/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Ingrese su contraseña'/>
                    </div>
                </div>
                {action==="Iniciar sesion"?<div></div>:
                <div className="forgot-password">Olvidó su contraseña? <span>Click aquí</span></div>}
                <div className="submit-container">
                    <div className={action==="Iniciar sesion"?"submit gray":"submit"}onClick={()=>{setAction("Registrarse")}}>Registrarse</div>
                    <div className={action==="Registrarse"?"submit gray":"submit"}onClick={()=>{setAction("Iniciar sesion")}}>Iniciar sesión</div>
                </div>
            </div>
        </div>
    )
}
