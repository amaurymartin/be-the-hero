import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css';

import logoSvg from '../../assets/logo.svg';

export default function Dashboard() {
  return(
    <div className="dashboard-container">
    <header>
      <img src={logoSvg} alt="Be the Hero"/>
      <span>Welcome!</span>

      <Link className="button" to="/incidents/new">New incident</Link>
      <button type="button">
        <FiPower size={18} color="#e02048"></FiPower>
      </button>
    </header>

    <h1>Incidents</h1>

    <ul>
      <li>
        <strong>Incident:</strong>
        <p>Incident title</p>

        <strong>Description:</strong>
        <p>Incident description</p>

        <strong>Value:</strong>
        <p>Incident value</p>

        <button type="button">
          <FiTrash2 size={20} color="#a8a8b3">

          </FiTrash2>
        </button>
      </li>

      <li>
        <strong>Incident:</strong>
        <p>Incident title</p>

        <strong>Description:</strong>
        <p>Incident description</p>

        <strong>Value:</strong>
        <p>Incident value</p>

        <button type="button">
          <FiTrash2 size={20} color="#a8a8b3">

          </FiTrash2>
        </button>
      </li>
      <li>
        <strong>Incident:</strong>
        <p>Incident title</p>

        <strong>Description:</strong>
        <p>Incident description</p>

        <strong>Value:</strong>
        <p>Incident value</p>

        <button type="button">
          <FiTrash2 size={20} color="#a8a8b3">

          </FiTrash2>
        </button>
      </li>
      <li>
        <strong>Incident:</strong>
        <p>Incident title</p>

        <strong>Description:</strong>
        <p>Incident description</p>

        <strong>Value:</strong>
        <p>Incident value</p>

        <button type="button">
          <FiTrash2 size={20} color="#a8a8b3">

          </FiTrash2>
        </button>
      </li>
    </ul>
    </div>
  );
}
