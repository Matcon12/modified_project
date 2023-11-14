import React from 'react'
import {useState} from 'react';
import FormInput from './FormInput';
import axios from 'axios';
import { useEffect } from 'react';
import matlogo from '../images/matlogo.png';
import { useNavigate } from 'react-router-dom';
import home from '../images/home_5973800.png';

function CustomerMasterForm() {
    const [values, setValues] = useState({});
    const [submitted,setSubmitted] = useState(false);

    const navigate = useNavigate();
    
      const inputs = [
        {
          id: 1,
          name: "cust_id",
          type: "text",
          label: "Customer ID",
          required: true,
        },
        {
          id: 2,
          name: "cust_name",
          type: "text",
          label: "Customer Name",
          required: true,
        },
        {
          id: 3,
          name: "cust_addr1",
          type: "text",
          label: "Customer Address Line 1",
        },
        {
          id: 4,
          name: "cust_addr2",
          type: "text",
          label: "Customer Address Line 2",
        },
        {
          id: 5,
          name: "cust_city",
          type: "text",
          label : "Customer City",
          required: true,
        },
        {
          id: 6,
          name: "cust_st_code",
          type: "number",
          label: "State Code",
          required: true,
        },
        {
            id: 7,
            name: "cust_st_name",
            type: "text",
            label: "State Name",
            required: true,
          },
          {
            id: 8,
            name: "cust_pin",
            type: "number",
            label: "PIN Code",
            required: true,
          },
          {
            id: 9,
            name: "cust_gst_id",
            type: "text",
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
          axios.post('https://backend-matcon-production.up.railway.appcustomer-master-input/', values)
            .then((response) => {
              console.log('POST request successful', response);
              alert('Data Saved Successfully')
              navigate('/home')
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
          <div class="container">
           <img src={matlogo} alt="MatconLogo"  className="logo"/>
            </div>
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