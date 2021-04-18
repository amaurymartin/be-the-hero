import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logoSvg from '../../../assets/logo.svg';

import api from '../../../services/api';

export default function NewUser() {
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function newUser(event) {
    event.preventDefault();

    const payload = {
      name: userName,
      nickname: nickname,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await api.post('/users', payload)

      if(response.status === 201)
        alert("User created!");
    } catch (error) {
      alert("Error! User not created, try again!");
    }
  }

  return (
    <div className="new-user-container">
      <div className="content">
        <section>
          <img src={logoSvg} alt="Be the Hero"/>

          <h1>New User</h1>
          <p>Make your registration, sign in and help people find the incidents of your NGO</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Sign up
          </Link>
        </section>

        <form onSubmit={newUser}>
          <input
            placeholder="Name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <input
            placeholder="Nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <input
            type= "email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type= "password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type= "password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <button className="button" type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
