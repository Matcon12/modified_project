import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='app'>
    <form>
    <h1>Register Page</h1>
    <div className='formInput'>
      <label>New Username</label><input type ="text" name ="username"/>
      <label>Password</label><input type ="text" name ="pw"/>
      <label>Confirm Password</label><input type ="text" name ="confirm_pw"/> 
      <Link to ='/home'>
          <button>Submit</button>
      </Link>
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