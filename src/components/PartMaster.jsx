import React, { useState } from 'react'
import './formInput.css';
import axios from 'axios';
import { useEffect } from 'react';
import matlogo from '../images/matlogo.png';
import { useNavigate } from 'react-router-dom';

function PartMaster() {


    const [formData, setFormData] = useState({});
    const [submitted,setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit =(event) => {

        event.preventDefault();
        const newFormData = {};

        // newFormData.push({
        //     part_id : document.getElementsByName('part_id')[0].value
        // });
        newFormData['part_id'] = document.getElementsByName('part_id')[0].value

        // newFormData.push({
        //     part_name : document.getElementsByName('part_name')[0].value
        // });
        newFormData['part_name'] = document.getElementsByName('part_name')[0].value

        // newFormData.push({
        //     cust_id : document.getElementsByName('cust_id')[0].value
        // });
        newFormData['cust_id'] = document.getElementsByName('cust_id')[0].value

        console.log(newFormData);
        setFormData(newFormData);
        setSubmitted(true);
    }
    useEffect(() => {
        if (submitted) {
          axios.post(https://backend-matcon-production.up.railway.app/part-master-input/', formData)
            .then((response) => {
              console.log('POST request successful', response);
              alert('Data Saved Successfully')
              navigate('/home')
            })
            .catch((error) => {
              console.error('Error making POST request', error.response.data['cust_id']);

              if(error.response.data['cust_id']){
                alert('Please enter a valid customer id')
              } else if(error.response.data['part_id']){
                alert('This part id already exists')
              }
            });
        }
      }, [formData, submitted]);

    return (
        <div className='app'>
          <div class="container">
            <img src={matlogo} alt="MatconLogo"  className="logo"/>
            </div>
          <form>
          <h1>Part Master</h1>
          <div className='formInput'>
            <label>Part Code</label><input type ="text" name ="part_id"/>
            <label>Part Name</label><input type ="text" name ="part_name"/>
            <label>Customer Id</label><input type="text" name="cust_id" />      
            <button onClick={handleSubmit}>Submit</button>
          </div>
          </form>
        </div>
        );
}

export default PartMaster