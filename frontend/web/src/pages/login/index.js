import React from 'react';

import { FiLogIn } from 'react-icons/fi';

import './style.css';

import heroesPng from '../../assets/heroes.png';
import logoSvg from '../../assets/logo.svg';

export default function Login() {
  return(
    <div className="login-container">
      <section className="form">
      <img src={logoSvg} alt="Be the Hero"/>

      <form>
        <h1>Login</h1>
        <input placeholder="Email"/>
        <input type= "password" placeholder="Password" />
        <button className="button" type="submit">Sign in</button>
        <a href="/register">
          <FiLogIn size={16} color="#e02041" />
          Sign up
        </a>
      </form>

      </section>

      <img src={heroesPng} alt="Heroes"/>
    </div>
  );
}
