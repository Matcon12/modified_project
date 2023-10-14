import React from 'react'
import {useState} from 'react';
import FormInput from './FormInput';
import axios from 'axios';

function InvoiceProcessing() {
    const [values, setValues] = useState({});
    
      const inputs = [
        {
          id: 1,
          name: "grn_no",
          type: "number",
          placeholder: "Enter GRN NO",
          label: "Inward delivery number",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 2,
          name: "po_no",
          type: "number",
          placeholder: "Enter Purchase Order NO",
          label: "Purchase Order Number",
        },
        {
            id: 3,
            name: "po_sl_no",
            type: "number",
            placeholder: "Enter PO Serial Number",
            label: "PO Serial Number",
          },
          {
            id: 4,
            name: "qty_received",
            type: "number",
            placeholder: "Enter Quantity Delivered",
            label: "Quantity",
          },
        
      ];
    
      const handleSubmit = (event) => {
        event.preventDefault();

        console.log(values)

        axios.post('http://localhost:5000/input/', values)
            .then((response) => {
                console.log('Data saved:', response.data);

                if(response.status == 200)
                console.log('server responded');
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        
      }
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
      var items = [];
      const [toggle,setToggle] = useState(false);

      return (
        <div className="app">
          <form onSubmit={handleSubmit}>
            <h1>Invoice Processing</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button onClick={handleSubmit}>Submit</button>
           
          </form>
        </div>
      );
}

export default InvoiceProcessing





