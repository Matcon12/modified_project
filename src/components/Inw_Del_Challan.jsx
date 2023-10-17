import React, { useState } from 'react'
import FormInput from './FormInput';

// GRN_No
// GRN_Date
// Rework_DC
// PO_No
// PO_Date
// Receiver_ID
// Consignee_ID
// PO_Sl_No
// Cust_ID
// Part_ID
// Part_Name
// Qty_Received
// Purpose
// UOM
// Unit_Price
// Total_Price
// Qty_Delivered
// Qty_Balance
function Inw_Del_Challan() {

    const [values,setValues] = useState({});

    const inputs = [
        {
            id: 1,
            name: "grn_no",
            type: "",
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
            id: 3,
            name: "rework_dc",
            type: "boolean",
            label: "Rework DC",
          },
          {
            id: 4,
            name: "po_no",
            type: "Number",
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
            type: "number",
            label: "Receiver ID",
            required: true,
          },
          {
            id: 7,
            name: "consignee_id",
            type: "number",
            label: "Consignee Id",
            required: true,
          },
            {
              id: 8,
              name: "po_slno",
              type: "number",
              label: "PO Serial Number",
              required: true,
            },
            {
              id: 9,
              name: "cust_id",
              type: "number",
              label: "Customer ID",
              required: true,
    
            },
            {
              id: 10,
              name: "part_id",
              type: "number",
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
        console.log(values)
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
            <button>Submit</button>
          </form>
        </div>
      );
}

export default Inw_Del_Challan