import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.css';

import heroesPng from '../../assets/heroes.png';
import logoSvg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function NewSession(event) {
    event.preventDefault();

    const headers = { email, password };

    try {
      const response = await api.post('/sessions', {}, { headers });

      if (response.status === 201) {
        localStorage.setItem('Authorization', response.data.key);
        localStorage.setItem('organizationNickname', response.data.nickname);
        history.push(`/organizations/${response.data.key}`);
        window.location.reload();
      }
    } catch (error) {
      alert('Error! Wrong email or password! Try again!');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoSvg} alt="Be the Hero" />

        <form onSubmit={NewSession}>
          <h1>Login</h1>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Sign in</button>

          <Link className="back-link" to="/organizations/new">
            <FiLogIn size={16} color="#e02041" />
            Sign up
          </Link>
        </form>
      </section>

      <img src={heroesPng} alt="Heroes" />
    </div>
  );
}
