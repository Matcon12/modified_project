import React from 'react';
import { Link } from 'react-router-dom';
import './formInput.css'
import '../app.css'
import './homepage.css'
import matlogo from '../images/matlogo.png';

const DataEntry = () => {
  return (
    <div className='homepage'>
      <img src={matlogo} alt="MatconLogo"  className="logo"/>
    <form>
      <h1>Choose the form to perform the data entry</h1>
      <Link to="/cm-form">
        <button className='button'>Customer Master Form</button>
      </Link>
      <Link to="/pm-form">
        <button className='button'>Part Master Form</button>
      </Link>
      <Link to="/po-form">
        <button className='button'>Purchase Order Form</button>
      </Link>
      <Link to="/inw-form">
        <button className='button'>Inward Delivery Form</button>
      </Link>
      </form>
    </div>
  );
};

export default DataEntry;


