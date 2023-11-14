import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './formInput.css'
import '../app.css'
import './homepage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import matlogo from '../images/matlogo.png';

const Home = () => {

  const [out,setOut] = useState(false);
  const navigate = useNavigate();

  const handleClick =(e)=> {
      e.preventDefault();
      setOut(true);
  }

  useEffect(()=>{
    if (out) {
      axios.post(https://backend-matcon-production.up.railway.app/logout/')
        .then((response) => {
          console.log('POST request successful', response);
          navigate('/')

        })
        .catch((error) => {
          console.error('Error making POST request', error);
        });
    }
  })
  return (
    <div className='homepage'>
      <div className="container">
      <img src={matlogo} alt="MatconLogo"  className="logo"/>
      </div>
    <form>
      <h1>Choose one of the actions below</h1>
      <Link to="/data-entry">
        <button className='button'>Perform Data Entry</button>
      </Link>
      <Link to="/invoice-processing">
        <button className='button'>Delivery of Finished Goods</button>
      </Link>
      <Link to="/rejected-processing">
        <button className='button'>Delivery of Rejected Goods</button>
      </Link>
      <Link to="/reports-printing">
        <button className='button'>Reports Printing</button>
      </Link>
      <button onClick={handleClick}>Logout</button>
      </form>
    </div>
  );
};

export default Home;


