import React from 'react'
import {useState} from 'react';
import FormInput from './FormInput';

// mat company code
// inv del challan No
// no of part items

// po sl no
// qty
function InvoiceProcessing() {
    const [values, setValues] = useState({});
    
      const inputs = [
        {
          id: 1,
          name: "mat_company_code",
          type: "text",
          //placeholder: "Customer Id",
        //   errorMessage:
        //     "Username should be 3-16 characters and shouldn't include any special character!",
          label: "Matcon Company Code",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 2,
          name: "inv_del_challan_no",
          type: "text",
         // placeholder: "Customer Name",
         // errorMessage: "It should be a valid email address!",
          label: "Inward Delivery Challan Number",
          required: true,
        },
        {
          id: 3,
          name: "part_items_no",
          type: "number",
         // placeholder: "Birthday",
          label: "Number of part items",
        },
        {
            id: 4,
            name: "po_slno",
            type: "number",
           // placeholder: "Birthday",
            label: "PO Serial Number",
          },
          {
            id: 5,
            name: "qty",
            type: "number",
           // placeholder: "Birthday",
            label: "Quantity",
          },
        
      ];
    
      const handleSubmit = (event) => {
        event.preventDefault();

        console.log(values)
      }
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    

    const inputs2 = [
        {
            id:1,
            name : "po_sl_no",
            type : "text",
            label : "PO Serial Number",
        },{
            id:2,
            name : "qty",
            type : "number",
            label : "Quantity",
        }
      ];
    
      const [values2, setValues2] = useState({});
      var items = [];
      const [toggle,setToggle] = useState(false);

      const generateFields = (e) => {
         let a = values.part_items_no;
        // for(var i=0;i<qty;i++){
        //     var a = inputs2.map((input) => (
        //         <FormInput
        //           key={input.id}
        //           {...input}
        //           value={values2[input.name]}
        //           onChange={onChange2}
        //         />
        //       ))
        //       items.push(a);
        // }
        // setToggle(true);
        // console.log(items)
        // console.log(items[0][0].props.name);
        // console.log(items[0][0].props.id);
        // console.log(items[0][1].props.name);
        // console.log(items[0][1].props.id);
        // return items;
        var arr =[];
        for(var i = 0;i<a;i++)
        {
            arr.push(i);
        }
        setToggle(true);
        
      }

    // const generateFields = () => {

    // }

    const onChange2 = (e) => {
        setValues2({ ...values2, [e.target.name]: e.target.value });
      };
    
      var arr = [1,2,3];
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




{/* <form>
{ toggle && arr.map((item) => (
        item.map((field) => {
            <FormInput
                key={field.id}
                {...field}
                value={values2[field.name]}
                onChange={onChange}
            />
        })
))} 
</form> */}






