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

  const handleSubmit = (event) => {
    const newFormData = [];

    event.preventDefault();
    newFormData.push({
        mcc : document.getElementsByName('mcc')[0].value
    })

    newFormData.push({
        grn_no : document.getElementsByName('inw')[0].value
    })

    newFormData.push({
        items : document.getElementsByName('qty')[0].value
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

    const mergedObject = {};
    
    formData.forEach((obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (mergedObject[key] === undefined) {
            mergedObject[key] = obj[key];
          } else {
            if (!Array.isArray(mergedObject[key])) {
              mergedObject[key] = [mergedObject[key]];
            }
            mergedObject[key].push(obj[key]);
          }
        }
      }
    });
    
    console.log(mergedObject);
    
  }

  return (
  <div className='app'>
    <form>
    <div className='formInput'>
      <label>Matcon Company Code</label><input type ="text" name ="mcc"/>
      <label>Inward Delivery Challan Number(GRN Number)</label><input type ="text" name ="inw"/>
      <label>Enter the total no of items</label><input type="number" name="qty" onChange={handleQtyChange} />
      {/* <button onClick={generateFormFields}>Generate Form</button> */}
      

      <div>{generateFormFields()}</div>

      <button onClick={handleSubmit}>Submit</button>

    </div>
    </form>
    <div>
        <h2>Form Data:</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
  </div>
  );
}

export default InvoiceProcessing;
