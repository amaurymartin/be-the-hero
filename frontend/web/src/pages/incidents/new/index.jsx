import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logoSvg from '../../../assets/logo.svg';

import api from '../../../services/api';

export default function NewIncident() {
  const history = useHistory();

  const [authorization, setAuthorization] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setAuthorization(localStorage.getItem('Authorization'));
  }, [authorization]);

  async function newIncident(event) {
    event.preventDefault();

    const headers = { authorization };

    const payload = { title, description, value };

    try {
      const response = await api.post('/incidents', payload, { headers });

      if (response.status === 201) {
        alert('Incident created!');
        history.push(`/organizations/${authorization}`);
      }
    } catch (error) {
      alert('Error! Incident not created, try again!');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoSvg} alt="Be the Hero" />

          <h1>New incident</h1>
          <p>Describe the incident in detail to find a hero to solve it </p>

          <Link className="back-link" to={`/organizations/${authorization}`}>
            <FiArrowLeft size={16} color="#e02041" />
            Back
          </Link>
        </section>

        <form onSubmit={newIncident}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">Create incident</button>
        </form>
      </div>
    </div>
  );
}
