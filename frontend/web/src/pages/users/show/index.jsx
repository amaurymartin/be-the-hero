import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css';

import logoSvg from '../../../assets/logo.svg';

import api from '../../../services/api';

export default function ShowUser() {
  const history = useHistory();

  const [authorization, setAuthorization] = useState([]);
  const [userNickname, setNickname] = useState([]);

  const [incidents, setIncidents] = useState([]);
  // const [organization, setOrganization] = useState([]);

  function logout() {
    localStorage.clear();

    history.push('/');
  }

  const getIncidents = useCallback(() => {
    const headers = { authorization };

    api.get('/incidents', { headers })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [authorization]);

  useEffect(() => {
    setNickname(localStorage.getItem('organizationNickname'));
    setAuthorization(localStorage.getItem('Authorization'));

    getIncidents();
  }, [getIncidents]);

  async function deleteIncident(incidentKey) {
    const headers = { authorization };

    try {
      const response = await api.delete(`/incidents/${incidentKey}`, { headers });

      if (response.status === 204) history.push(`/users/${authorization}`);
    } catch (error) {
      alert('Error! Incident not deleted! Try again!');
    } finally {
      getIncidents();
    }
  }

  return (
    <div className="show-user-container">
      <header>
        <img src={logoSvg} alt="Be the Hero" />
        <span>
          { 'Welcome, ' }
          {userNickname}
          !
        </span>

        <Link className="button" to="/organizations/new">New Organization</Link>
        <Link className="button" to="/incidents/new">New incident</Link>
        <button type="button" onClick={logout}>
          <FiPower size={18} color="#e02048" />
        </button>
      </header>

      <h1>Incidents</h1>

      <ul>
        { incidents.map((incident) => (
          <li key={incident.key}>
            <strong>Incident:</strong>
            <p>{incident.title}</p>

            <strong>Description:</strong>
            <p>{incident.description}</p>

            <strong>Value:</strong>
            <p>
              {
                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                  .format(incident.value)
              }
            </p>

            <button type="button" onClick={() => deleteIncident(incident.key)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
