import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import matlogo from '../images/matlogo.png';


function Register() {

  const [values,setValues] = useState({});
  const [submitted,setSubmitted] = useState(false);


const navigate = useNavigate();



  const handleSubmit=(e)=>{
      e.preventDefault();
      values['uname'] = document.getElementsByName('username')[0]?.value;
      values['pass1'] = document.getElementsByName('pw')[0]?.value;
      values['pass2'] = document.getElementsByName('confirm_pw')[0]?.value;
      setSubmitted(true);
  }


  useEffect(() => {
    if (submitted) {
      axios.post('http://localhost:5000/signup/', values)
        .then((response) => {
          console.log('POST request successful', response);
          navigate('/login');
        })
        .catch((error) => {
          console.error('Error making POST request', error);
          if(error.response.data['username']){
            alert('This user is already registered')
          } else if(error.response.data['pw']){
            alert('Passwords do not match');
          }
        });
    }
    setSubmitted(false);
  }, [values, submitted]);

  
  return (
    <div className='app'>
    <img src={matlogo} alt="MatconLogo"  className="logo"/>
    <form>
    <h1>Register Page</h1>
    <div className='formInput'>
      <label>New Username</label><input type ="text" name ="username"/>
      <label>Password</label><input type ="text" name ="pw"/>
      <label>Confirm Password</label><input type ="text" name ="confirm_pw"/> 
      <button onClick={handleSubmit}>Submit</button>
      <h3>Existing User?</h3>
      <Link to ='/login'>
        <button>Sign In</button>
      </Link>
    </div>
    </form>
  </div>
  )
}

export default Register