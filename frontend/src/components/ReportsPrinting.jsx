import React, { useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import '../app.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import matlogo from '../images/matlogo.png';

function ReportsPrinting(){
    
    const [submitted, setSubmitted] =useState(false);

    // const handleSubmit =(e)=>{
    //     e.preventDefault();
    //     setGcn_no(document.getElementsByName('gcn_no')[0]?.value);
    //     console.log(gcn_no);
    //     setSubmitted(true);
    // }

    return (
        <div className='app'>
            <div class="container">
            <img src={matlogo} alt="MatconLogo" className="logo"/>
            </div>
          <form>
          <h1>Reports Printing</h1>
          <div className='formInput'>
          <Link to ="/invoice-input">
              <button>Invoice</button>
          </Link>
          <Link to ="/dc-input">
              <button>DC</button>
          </Link>
          <Link to ='/invoice-reports'>
          <button>Invoice Reports</button>
          </Link>
          </div>
          </form>
        </div>
        );
}

export default ReportsPrinting;