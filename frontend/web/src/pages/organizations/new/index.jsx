import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logoSvg from '../../../assets/logo.svg';

import api from '../../../services/api';

export default function NewOrganization() {
  const [organizationName, setOrganizationName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const history = useHistory();

  async function newOrganization(event) {
    event.preventDefault();

    const payload = {
      name: organizationName,
      nickname,
      email,
      password,
      confirmPassword,
      whatsapp,
      city,
      state,
      country,
    };

    let message;

    try {
      const response = await api.post('/organizations', payload);

      if (response.status === 201) message = 'Organization created!';
    } catch (error) {
      message = 'Error! Organization not created, try again!';
    }

    alert(message);

    history.push('/');
  }

  return (
    <div className="new-organization-container">
      <div className="content">
        <section>
          <img src={logoSvg} alt="Be the Hero" />

          <h1>New Non-Governmental Organization</h1>
          <p>Submit your Organization infos to be able to post your incidents</p>

          {/* TODO: FIX this back link */}
          <Link className="back-link" to="/users/key">
            <FiArrowLeft size={16} color="#E02041" />
            Back
          </Link>
        </section>

        <form onSubmit={newOrganization}>
          <input
            placeholder="Name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
          <input
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="email"
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
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="whatsapp"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <input
            type="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <button className="button" type="submit">Create Organization</button>
        </form>
      </div>
    </div>
  );
}
