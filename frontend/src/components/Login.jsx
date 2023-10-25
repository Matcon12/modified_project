import React from 'react'
import { redirect } from 'react-router-dom';
import '../app.css'
import { Link } from 'react-router-dom';

function Login() {

    const handleSubmit =(e)=> {
        e.preventDefault();
    }

    return (
        <div className='app'>
          <form>
          <h1>Login Page</h1>
          <div className='formInput'>
            <label>Username</label><input type ="text" name ="username"/>
            <label>Password</label><input type ="text" name ="pw"/> 
            <Link to ='/home'>
                <button>Submit</button>
            </Link>
          </div>
          </form>
        </div>
        );
  
}

export default Login