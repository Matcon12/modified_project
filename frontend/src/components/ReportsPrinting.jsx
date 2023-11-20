import React, { useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import '../app.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import matlogo from '../images/matlogo.png';
import home from '../images/home-button.png';
import back from '../images/undo.png';


function ReportsPrinting() {

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit =(e)=>{
  //     e.preventDefault();
  //     setGcn_no(document.getElementsByName('gcn_no')[0]?.value);
  //     console.log(gcn_no);
  //     setSubmitted(true);
  // }

  const [out, setOut] = useState(false);
  useEffect(() => {
    if (out) {
      axios.post('http://54.162.29.48:5000/logout/')
        .then((response) => {
          console.log('POST request successful', response);
          alert(response.data.message)
          navigate('/')
          setOut(false)

        })
        .catch((error) => {
          console.error('Error making POST request', error);
        });
    }
  }, [out])

  const handleLogout = (e) => {
    e.preventDefault();
    setOut(true)
  }

  return (
    <div className='app'>
      <div class="container">
        <img src={matlogo} alt="MatconLogo" className="logo" />
        <button className='logout' onClick={handleLogout}>Logout</button>
        <img src={back} onClick={() => navigate(-1)} alt="back button" className='back' />
        <Link to='/home'>
          <img src={home} alt="home" className='logo2' />
        </Link>
      </div>
      <form>
        <h1>Reports Printing</h1>
        <div className='formInput'>
          <Link to="/invoice-input">
            <button>Invoice</button>
          </Link>
          <Link to="/dc-input">
            <button>DC</button>
          </Link>
          <Link to='/invoice-reports'>
            <button>Invoice Reports</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ReportsPrinting;