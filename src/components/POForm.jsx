import React from 'react'
import { useState } from 'react';
import FormInput from './FormInput';


// PO_No	String
// PO_Date	Date
// Open_PO	Boolean
// Open_PO_Validity	Date
// Cust_ID	String
// Quote_Ref_No	String
// Receiver_ID	String
// Consignee_ID	String
// PO_Sl_No	
// Part_ID	
// Quantity	
// UOM	
// Unit_Price	
// Total_Price	
// Qty_Sent	
function POForm() {
    const [values, setValues] = useState({
        // username: "",
        // email: "",
        // birthday: "",
        // password: "",
        // confirmPassword: "",
      });
    
      const inputs = [
        {
          id: 1,
          name: "po_no",
          type: "string",
          //placeholder: "Customer Id",
        //   errorMessage:
        //     "Username should be 3-16 characters and shouldn't include any special character!",
          label: "PO Number",
          pattern: "^[A-Za-z0-9]{3,16}$",
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
          id: 3,
          name: "open_po",
          type: "boolean",
         // placeholder: "Birthday",
          label: "Open PO",
        },
        {
          id: 3,
          name: "open_po_validity",
          type: "date",
         // placeholder: "Birthday",
          label: "Open PO Validity",
        },
        {
          id: 4,
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
          id: 5,
          name: "quote_refno",
          type: "number",
          //placeholder: "Confirm Password",
          //errorMessage: "Passwords don't match!",
          label: "Quote Ref Number",
          //pattern: values.password,
          required: true,
        },
        {
          id: 6,
          name: "reciever_id",
          type: "number",
          //placeholder: "Confirm Password",
          //errorMessage: "Passwords don't match!",
          label: "Receiver Id",
          //pattern: values.password,
          required: true,
        },
        
        {
          id: 7,
          name: "consignee_id",
          type: "number",
          //placeholder: "Confirm Password",
          //errorMessage: "Passwords don't match!",
          label: "Consignee Id",
          //pattern: values.password,
          required: true,
        },
          {
            id: 8,
            name: "po_slno",
            type: "number",
            //placeholder: "Confirm Password",
            //errorMessage: "Passwords don't match!",
            label: "PO Serial Number",
            //pattern: values.password,
            required: true,
          },
          {
            id: 3,
            name: "part_id",
            type: "text",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Part Id",
            required: true,
  
          },
          {
            id: 3,
            name: "qty",
            type: "number",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Quantity",
            required: true,
  
          },
          {
            id: 3,
            name: "uom",
            type: "text",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Unit of Measurement",
            required: true,
  
          },
          {
            id: 3,
            name: "unit_price",
            type: "number",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Unit Price",
            required: true,
          },
          {
            id: 3,
            name: "total_price",
            type: "number",
           // placeholder: "Customer Name",
           // errorMessage: "It should be a valid email address!",
            label: "Total Price",
            required: true,
          },
          {
            id: 3,
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
            <h1>Purchase Order</h1>
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

export default POForm