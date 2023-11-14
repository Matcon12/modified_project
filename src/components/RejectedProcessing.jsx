import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react';
import matlogo from '../images/matlogo.png';
import { useNavigate } from 'react-router-dom';

function RejectedProcessing() {
      const navigate = useNavigate();
      const [qty, setQty] = useState(0);
      const [formData, setFormData] = useState({});
      const [submitted,setSubmitted] = useState(false);
      const [Mcc, setMcc] = useState('MEE');
    
      const handleQtyChange = (e) => {
        setQty(parseInt(e.target.value, 10));
      }
    
      const generateFormFields = () => {
        const formFields = [];
    
        for (let i = 0; i < qty; i++) {
          formFields.push(
            <div key={i} className='formInput'>
              <label>PO Serial Number of {i+1}</label>
              <input type="text" name={`Po_slno_${i}`} />
              <label>Quantity needed for item {i+1}</label>
              <input type="text" name={`items_${i}`} />
            </div>
          );
        }
    
        return formFields;
      }
    
      const handleSubmit = (event) => {
        const newFormData = {};
    
        event.preventDefault();

        newFormData['rejected'] = 1;
        newFormData['mcc'] = document.getElementsByName('mcc')[0].value;
        newFormData['grn_no'] = document.getElementsByName('inw')[0].value;
        newFormData['items'] = document.getElementsByName('no_of_items')[0].value;
    
    
        var obj;
    
        for (let i = 0; i < qty; i++) {
          
          const key = `item${i}`
    
          obj = {
                  po_sl_no: document.getElementsByName(`Po_slno_${i}`)[0].value,
                  qty_delivered: document.getElementsByName(`items_${i}`)[0].value,
        };
    
        newFormData[key] = obj;
      }
        setFormData(newFormData);
        console.log(formData);
        setSubmitted(true);
    }
    
      useEffect(() => {
        if (submitted) {
          axios.post(https://backend-matcon-production.up.railway.app/invoice-processing/', formData)
            .then((response) => {
              console.log('POST request successful', response);
              if(response.data == 'zero items')
              {
                alert('Nothing to be delivered')
              } else if(response.data == 'grn_no') {
                alert('The inw_dc challan no does not exist')
              }else if(response.data.slice(0,8) == 'po_sl_no'){
                console.log(response.data.slice(0,8))
                alert('The item does not have a po_sl_no ' + response.data.slice(8))
              }else if(response.data == 'open_po')
              {
                alert('The open po has expired, check the validity')
              }
              else {
              alert('Invoice processed successfully')
              navigate('/home');
              }
            })
            .catch((error) => {
              console.error('Error making POST request', error);
            });
        }
      }, [formData, submitted]);
    
      const handleSelect =()=>{
          var code = document.getElementsByName('mcc')[0]?.value; 
          setMcc(code);
      }
      return (
      <div className='app'>
        <div class="container">
                <img src={matlogo} alt="MatconLogo"  className="logo"/>
                </div>
        <form>
        <h1>Invoice/DC Processing</h1>
        <div className='formInput'>
          <label>Matcon Company Code</label>
          <select type='text' defaultValue="MEE" name='mcc' onChange={handleSelect}>
              <option value="MEE">MEE</option>
              <option value="MAH">MAH</option>
              <option value="MAC">MAC</option>
          </select>
          <label>Inward Delivery Challan Number</label><input type ="text" name ="inw"/>
          <label>Total number of items</label><input type="number" name="no_of_items" onChange={handleQtyChange} />
          <div>{generateFormFields()}</div>
          <button onClick={handleSubmit}>Submit</button>
    
        </div>
        </form>
        {/* <div>
            <h2>Form Data:</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div> */}
      </div>
      );
    
    }
    
    


export default RejectedProcessing