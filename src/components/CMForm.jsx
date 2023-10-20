import React from 'react'
import {useState} from 'react';
import FormInput from './FormInput';

// Cust_ID
// Cust_Name
// Cust_Address
// Cust_City
// Cust_St_Code
// Cust_St_Name
// Cust_PIN
// Cust_GST-ID

function CMForm() {
    const [values, setValues] = useState({});
    
      const inputs = [
        {
          id: 1,
          name: "cust_id",
          type: "text",
          label: "Customer ID",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 2,
          name: "cust_name",
          type: "text",
         // placeholder: "Customer Name",
         // errorMessage: "It should be a valid email address!",
          label: "Customer Name",
          required: true,
        },
        {
          id: 3,
          name: "cust_addr",
          type: "text",
         // placeholder: "Birthday",
          label: "Customer Address",
        },
        {
          id: 4,
          name: "cust_city",
          type: "text",
          //placeholder: "Customer City",
        //   errorMessage:
        //     "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
          label: "Customer City",
         // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },
        {
          id: 5,
          name: "cust_stcode",
          type: "number",
          //placeholder: "Confirm Password",
          //errorMessage: "Passwords don't match!",
          label: "State Code",
          //pattern: values.password,
          required: true,
        },
        {
            id: 6,
            name: "cust_stname",
            type: "text",
            //placeholder: "Confirm Password",
            //errorMessage: "Passwords don't match!",
            label: "State Name",
            //pattern: values.password,
            required: true,
          },
          {
            id: 7,
            name: "cust_pin",
            type: "number",
            //placeholder: "Confirm Password",
            //errorMessage: "Passwords don't match!",
            label: "Customer PIN",
            //pattern: values.password,
            required: true,
          },
          {
            id: 8,
            name: "cust_gst",
            type: "number",
            //placeholder: "Confirm Password",
            //errorMessage: "Passwords don't match!",
            label: "Customer GST",
            //pattern: values.password,
            required: true,
          },
        
      ];
    
      const handleSubmit = (event) => {
        event.preventDefault();

        if(values.cust_id.length != 4 )
        {
            //console.log(event.target.cust_pin)
          alert('Enter customer id length equal to 4 digits')
        }
        if(values.cust_pin.length != 6)
        {
            //console.log(event.target.cust_pin)
          alert('Enter pin length equal to 6 digits')
        }
        console.log(values)
      }
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      return (
        <div className="app">
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

export default CMForm