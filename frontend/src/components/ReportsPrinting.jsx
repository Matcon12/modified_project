import React, { useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import '../app.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import matlogo from '../images/matlogo.png';

function ReportsPrinting(){
    
    const [gcn_no,setGcn_no] = useState('');
    const [submitted, setSubmitted] =useState(false);
    const handleSubmit =(e)=>{
        e.preventDefault();
        // var no = document.getElementsByName('gcn_no')[0]?.value;
        // console.log(no)
        // dc['gcn_no'] = no
        setGcn_no(document.getElementsByName('gcn_no')[0]?.value);
        console.log(gcn_no);
        setSubmitted(true);
    }

    return (
        <div className='app'>
            <div class="container">
            <img src={matlogo} alt="MatconLogo"  className="logo"/>
            </div>
          <form>
          <h1>Reports Printing</h1>
          <div className='formInput'>
          <label>Enter the Outward DC Number</label><input type="text" name="gcn_no"/>
          <Link to ="/invoice-printing">
              <button>Invoice</button>
          </Link>
          <Link to ="/dc-printing">
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