import React from 'react'
import {useState} from 'react';
import FormInput from './FormInput';
import axios from 'axios';
import { useEffect } from 'react';
import matlogo from '../images/matlogo.png';

function CustomerMasterForm() {
    const [values, setValues] = useState({});
    const [submitted,setSubmitted] = useState(false);
    
      const inputs = [
        {
          id: 1,
          name: "cust_id",
          type: "text",
          placeholder: "Enter Customer Id",
          label: "Customer ID",
          required: true,
        },
        {
          id: 2,
          name: "cust_name",
          type: "text",
         placeholder: "Enter Customer Name",
          label: "Customer Name",
          required: true,
        },
        {
          id: 3,
          name: "cust_addr1",
          type: "text",
          placeholder : "Enter Customer Address Line 1",
          label: "Customer Address Line 1",
        },
        {
          id: 4,
          name: "cust_addr2",
          type: "text",
          placeholder : "Enter Customer Address Line 2",
          label: "Customer Address Line 2",
        },
        {
          id: 5,
          name: "cust_city",
          type: "text",
          placeholder: "Enter Customer City",
          label : "Customer City",
          required: true,
        },
        {
          id: 6,
          name: "cust_st_code",
          type: "number",
          placeholder: "Enter State Code",
          label: "State Code",
          required: true,
        },
        {
            id: 7,
            name: "cust_st_name",
            type: "text",
            placeholder: "Enter Customer State",
            label: "State Name",
            required: true,
          },
          {
            id: 8,
            name: "cust_pin",
            type: "number",
            placeholder: "Enter Customer PIN",
            label: "Customer PIN",
            required: true,
          },
          {
            id: 9,
            name: "cust_gst_id",
            type: "text",
            placeholder: "Enter Customer GST ID",
            label: "Customer GST ID",
            required: true,
          },
        
      ];
    
      const handleSubmit = (event) => {
        event.preventDefault();

        if(values.cust_id.length != 4)
        {
          alert('Enter customer id length equal to 4 digits')
        }
        if(values.cust_pin.length != 6)
        {
          alert('Enter pin length equal to 6 digits')
        }
        console.log(values)
        setSubmitted(true)
      }

      useEffect(() => {
        if (submitted) {
          axios.post('http://localhost:5000/customer-master-input/', values)
            .then((response) => {
              console.log('POST request successful', response);
            })
            .catch((error) => {
              console.error('Error making POST request', error);
            });
        }
      }, [values, submitted]);
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      return (
        <div className="app">
          <img src={matlogo} alt="MatconLogo"  className="logo"/>
          <form onSubmit={handleSubmit}>
            <h1>Customer Master</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button>Submit</button>
          </form>
        </div>
      );
}

export default CustomerMasterForm