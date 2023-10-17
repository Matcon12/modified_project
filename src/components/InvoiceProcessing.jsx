import React, { useState } from 'react';
import '../app.css';
import './formInput.css'

function InvoiceProcessing() {
  const [qty, setQty] = useState(0);
  const [formData, setFormData] = useState([]);

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value, 10));
  }

  const generateFormFields = () => {
    const formFields = [];

    for (let i = 0; i < qty; i++) {
      formFields.push(
        <div key={i} className='formInput'>
          <label>Po_slno of item {i}</label>
          <input type="text" name={`Po_slno_${i}`} />
          <label>Quantity needed for item {i}</label>
          <input type="text" name={`items_${i}`} />
        </div>
      );
    }

    return formFields;
  }

  const handleSubmit = () => {
    const newFormData = [];

    newFormData.push({
        mcc : document.getElementsByName('mcc')[0].value
    })

    newFormData.push({
        inw : document.getElementsByName('inw')[0].value
    })

    newFormData.push({
        qty : document.getElementsByName('qty')[0].value
    })

    const po_slnos = []
    const items_all = []

    for (let i = 0; i < qty; i++) {
        po_slnos.push(document.getElementsByName(`Po_slno_${i}`)[0].value);
        items_all.push(document.getElementsByName(`items_${i}`)[0].value);
    }

    newFormData.push({po_slnos});
    newFormData.push({items_all});

    setFormData(newFormData);
    console.log(formData)
  }

  return (
  <div className='app'>
    <form>
    <div className='formInput'>
      <label>Matcon Company Code</label><input type ="text" name ="mcc"/>
      <label>Inward Delivery Challan Number</label><input type ="text" name ="inw"/>
      <label>Enter the quantity</label><input type="number" name="qty" onChange={handleQtyChange} />
      {/* <button onClick={generateFormFields}>Generate Form</button> */}
      

      <div>{generateFormFields()}</div>

      <button onClick={handleSubmit}>Submit</button>

      {/* Display form data */}
      <div>
        <h2>Form Data:</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
    </form>
  </div>
  );
}

export default InvoiceProcessing;
