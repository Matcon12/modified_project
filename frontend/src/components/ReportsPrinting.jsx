import React, { useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import '../app.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

function ReportsPrinting(){
    
    const [dc,setDc] = useState({});
    const [submitted, setSubmitted] =useState(false);
    const handleSubmit =(e)=>{
        e.preventDefault();
        var no = document.getElementsByName('gcn_no')[0]?.value;
        console.log(no)
        dc['gcn_no'] = no
        setSubmitted(true);
    }

    // useEffect(() => {
    //     if (submitted) {
    //       axios.post('http://localhost:5000/reports-printing/', dc)
    //         .then((response) => {
    //           console.log('POST request successful', response);
    //         })
    //         .catch((error) => {
    //           console.error('Error making POST request', error.response.data);

    //           if(error.response.data['non_field_errors'])
    //           {
    //               alert('An item with the same po no and po sl no exists')
    //           }
    //         });
    //     }
    //     setSubmitted(false)
    //   }, [dc, submitted]);

      

    return (
        <div className='app'>
          <form>
          <h1>Reports Printing</h1>
          <div className='formInput'>
          <label>Enter the GCN Number</label><input type="text" name="gcn_no"/>
          <Link to ="/invoice-printing">
              <button>Invoice</button>
          </Link>
          <Link to ="/dc-printing">
              <button>DC</button>
          </Link>
          </div>
          </form>
        </div>
        );
}

export default ReportsPrinting;