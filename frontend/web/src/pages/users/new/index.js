import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logoSvg from '../../../assets/logo.svg';

export default function NewUser() {
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

        <form>
          <input placeholder="Name"/>
          <input placeholder="Nickname"/>
          <input type= "email" placeholder="Email"/>
          <input type= "password" placeholder="Password"/>
          <input type= "password" placeholder="Confirm password"/>

          <button className="button" type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
