import React, { useState } from 'react'
import './formInput.css';

function PartMaster() {


    const [formData, setFormData] = useState({});
    const handleSubmit =(event) => {

        event.preventDefault();
        const newFormData = [];

        newFormData.push({
            part_id : document.getElementsByName('part_id')[0].value
        });

        newFormData.push({
            part_name : document.getElementsByName('part_name')[0].value
        });

        newFormData.push({
            cust_id : document.getElementsByName('cust_id')[0].value
        });

        console.log(newFormData);
        setFormData(newFormData);

    }
    return (
        <div className='app'>
          <form>
          <h1>Part Master</h1>
          <div className='formInput'>
            <label>Part Id</label><input type ="text" name ="part_id"/>
            <label>Part Name</label><input type ="text" name ="part_name"/>
            <label>Customer Id</label><input type="text" name="cust_id" />      
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

export default PartMaster