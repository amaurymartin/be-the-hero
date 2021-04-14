import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logoSvg from '../../../assets/logo.svg';

export default function NewOrganization() {
  return (
    <div className="new-organization-container">
      <div className="content">
        <section>
          <img src={logoSvg} alt="Be the Hero"/>

          <h1>New Non-Governmental Organization</h1>
          <p>Submit your Organization infos to be able to post your incidents</p>

          <Link className="back-link" to="/users/key">
            <FiArrowLeft size={16} color="#e02041" />
            Back
          </Link>
        </section>

        <form>
          <input placeholder="Name"/>
          <input placeholder="Nickname"/>
          <input type= "email" placeholder="Email"/>
          <input type= "whatsapp" placeholder="Whatsapp"/>
          <input type= "city" placeholder="City"/>
          <input type= "state" placeholder="State"/>
          <input type= "country" placeholder="Country"/>

          <button className="button" type="submit">Create Organization</button>
        </form>
      </div>
    </div>
  );
}
