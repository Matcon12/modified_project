import React, { useState } from 'react'
import FormInput from './FormInput';
import axios from 'axios';

function Inw_Del_Challan() {

    const [values,setValues] = useState({});

    const inputs = [
        {
            id: 1,
            name: "grn_no",
            type: "text",
            label: "GRN Number",
            required: true,
          },
          {
            id: 2,
            name: "grn_date",
            type: "date",
            label: "GRN Date",
          },
          {
            id: 4,
            name: "po_no",
            type: "text",
            label: "PO Number",
          },
          {
            id: 5,
            name: "po_date",
            type: "date",
            label: "PO Date",
            required: true,
          },
          {
            id: 6,
            name: "receiver_id",
            type: "text",
            label: "Receiver ID",
            required: true,
          },
          {
            id: 7,
            name: "consignee_id",
            type: "text",
            label: "Consignee Id",
            required: true,
          },
            {
              id: 8,
              name: "po_sl_no",
              type: "number",
              label: "PO Serial Number",
              required: true,
            },
            {
              id: 9,
              name: "cust_id",
              type: "text",
              label: "Customer ID",
              required: true,
    
            },
            {
              id: 10,
              name: "part_id",
              type: "text",
              label: "Part ID",
              required: true,
            },
            {
              id: 11,
              name: "part_name",
              type: "text",
              label: "Part Name",
              required: true,
            },
            {
              id: 12,
              name: "qty_received",
              type: "number",
              label: "Quantity Received",
              required: true,
            },
            {
              id: 13,
              name: "purpose",
              type: "text",
              label: "Purpose",
              required: true,
            },
            {
              id: 14,
              name: "uom",
              type: "text",
              label: "Unit of Measurement",
              required: true,
            },
            {
                id: 15,
                name: "unit_price",
                type: "number",
                label: "Unit Price",
                required: true,
              },
              {
                id: 16,
                name: "total_price",
                type: "number",
                label: "Total Price",
                required: true,
              },
              {
                id: 17,
                name: "qty_delivered",
                type: "number",
                label: "Quantity Delivered",
                required: true,
              },
              {
                id: 18,
                name: "qty_balance",
                type: "number",
                label: "Quantity Balance",
                required: true,
              },
    ]
    const handleSubmit = (event) => {
        event.preventDefault();

        values['rework_dc'] = document.getElementsByName[0]?.value;

        console.log(typeof values.qty_balance)
        axios.post('http://localhost:5000/inward-dc-input/', values).then((response) => {
                console.log('Data saved:', response.data);

                if(response.status == 200)
                console.log('server responded');
            })
            .catch((error) => {
                console.error('Error:', error);        
                // console.log(typeof values.unit_price)
            });
      }
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };



    
      return (
        <div className="app">
          <form onSubmit={handleSubmit}>
            <h1>Inward Delivery Challan</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <label>Rework DC</label>
            <br></br>
            <select type='boolean' defaultValue="false" name='rework_dc'>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <button>Submit</button>
          </form>
        </div>
      );
}

export default Inw_Del_Challan