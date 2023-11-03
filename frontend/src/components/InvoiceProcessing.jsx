import React, { useState,useEffect } from 'react';
import '../app.css';
import './formInput.css'
import axios from 'axios';
import matlogo from '../images/matlogo.png';
import { useNavigate } from 'react-router-dom';

function InvoiceProcessing() {
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
      axios.post('http://localhost:5000/invoice-processing/', formData)
        .then((response) => {
          console.log('POST request successful', response);
          alert('Data saved successfully')
          navigate('/home');
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
      <label>Enter the number of items</label><input type="number" name="no_of_items" onChange={handleQtyChange} />
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
export default InvoiceProcessing;
