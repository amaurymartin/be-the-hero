import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logoSvg from '../../../assets/logo.svg';

export default function NewIncident() {
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoSvg} alt="Be the Hero"/>

          <h1>New incident</h1>
          <p>Describe the incident in detail to find a hero to solve it </p>

          <Link className="back-link" to="/users/key">
            <FiArrowLeft size={16} color="#e02041" />
            Back
          </Link>
        </section>

        <form>
          <input placeholder="Title"/>
          <textarea placeholder="Description"/>
          <input type="number" placeholder="Value"/>

          <button className="button" type="submit">Create incident</button>
        </form>
      </div>
    </div>
  );
}
