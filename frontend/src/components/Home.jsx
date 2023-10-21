import React from 'react';
import { Link } from 'react-router-dom';
import './formInput.css'
import '../app.css'
import './homepage.css'

const Home = () => {
  return (
    <div className='homepage'>
    <form>
      <h1>Choose one of the actions below</h1>
      <Link to="/data-entry">
        <button className='button'>Perform Data Entry</button>
      </Link>
      <Link to="/invoice-processing">
        <button className='button'>Delivery of finished Goods</button>
      </Link>
      <Link to="/invoice-processing">
        <button className='button'>Delivery of rejected Goods</button>
      </Link>
      <Link to="/">
        <button className='button'>Reports Printing</button>
      </Link>
      </form>
    </div>
  );
};

export default Home;


