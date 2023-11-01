import React from 'react'
import { useState } from 'react';
import FormInput from './FormInput';
import axios from 'axios';
import { useEffect } from 'react';
import './formInput.css';
import matlogo from '../images/matlogo.png';
import { useNavigate } from 'react-router-dom';

function POForm() {
    const [values, setValues] = useState({});
    const [submitted,setSubmitted] = useState(false);
    const navigate = useNavigate();
    
      const inputs = [
        {
          id: 1,
          name: "po_no",
          type: "string",
          //placeholder: "Customer Id",
        //   errorMessage:
        //     "Username should be 3-16 characters and shouldn't include any special character!",
          label: "PO Number",
          // pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 2,
          name: "po_date",
          type: "date",
         // placeholder: "Birthday",
          label: "PO Date",
        },
        {
          id: 5,
          name: "cust_id",
          type: "text",
          //placeholder: "Customer City",
        //   errorMessage:
        //     "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
          label: "Customer ID",
         // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },
        {
          id: 6,
          name: "quote_ref_no",
          type: "number",
          //placeholder: "Confirm Password",
          //errorMessage: "Passwords don't match!",
          label: "Quote Ref Number",
        },
        {
          id: 7,
          name: "receiver_id",
          type: "text",
          //placeholder: "Confirm Password",
          //errorMessage: "Passwords don't match!",
          label: "Receiver Id",
          //pattern: values.password,
          required: true,
        },
        
        {
          id: 8,
          name: "consignee_id",
          type: "text",
          //placeholder: "Confirm Password",
          //errorMessage: "Passwords don't match!",
          label: "Consignee Id",
          //pattern: values.password,
          required: true,
        },
          {
            id: 9,
            name: "po_sl_no",
            type: "number",
            //placeholder: "Confirm Password",
            //errorMessage: "Passwords don't match!",
            label: "PO Serial Number",
            //pattern: values.password,
            required: true,
          },
          {
            id: 10,
            name: "part_id",
            type: "text",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Part Id",
            required: true,
  
          },
          {
            id: 11,
            name: "qty",
            type: "number",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Quantity",
            required: true,
  
          },
          {
            id: 12,
            name: "uom",
            type: "text",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Unit of Measurement",
            required: true,
  
          },
          {
            id: 13,
            name: "unit_price",
            type: "number",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Unit Price",
            required: true,
          },
          {
            id: 14,
            name: "total_price",
            type: "number",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Total Price",
            required: true,
          },
          {
            id: 15,
            name: "qty_sent",
            type: "number",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Quantity Sent",
            required: true,
          },
        
      ];
    
      const handleSubmit = (event) => {
        event.preventDefault();

        if(values.cust_id.length != 4)
        {
            //console.log(event.target.cust_pin)
          alert('Enter customer id length equal to 4 digits')
        }

        values['open_po'] = document.getElementsByName('open_po')[0]?.value;
        values['open_po_validity'] = document.getElementsByName('open_po_validity')[0]?.value;

        console.log(values)
        setSubmitted(true);
      }
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };


      useEffect(() => {
        if (submitted) {
          axios.post('http://localhost:5000/purchase-order-input/', values)
            .then((response) => {
              console.log('POST request successful', response);
              alert('Data Saved Successfully')
              navigate('/home')
            })
            .catch((error) => {
              console.error('Error making POST request', error.response.data);

              if(error.response.data['non_field_errors'])
              {
                  alert('An item with the same po no and po sl no exists')
              }
            });
        }
        setSubmitted(false)
      }, [values, submitted]);

      var [val,setVal] = useState(false);

      const handleSelect =()=>{ 
        setVal(!val);
      }


      return (
        <div className="app"><div class="container">
        <img src={matlogo} alt="MatconLogo"  className="logo"/>
        </div>
          <div class="container">
            <img src={matlogo} alt="MatconLogo"  className="logo"/>
            </div>
          <form onSubmit={handleSubmit}>
            <h1>Purchase Order</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <label>Open PO</label>
            <select type='boolean' defaultValue="false" name='open_po' onChange={handleSelect}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <br></br>
           { val && <FormInput key='12' label='Open PO Validity' type='date' name ='open_po_validity'/>}
            <button>Submit</button>
          </form>
        </div>
      );
}

export default POForm