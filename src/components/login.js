import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './style/login.css';

const Login = () => {
  const [email,setemail]=useState('');
  const [password, setPassword] = useState('');
  const [msg,setmsg]=useState('');
  const [userId, setUserId] = useState('');
  const navigate=useNavigate();

  axios.defaults.withCredentials=true;

  const handleSubmit=(e)=>{
    e.preventDefault();
       axios.post(`https://online-shopping-management-backend.onrender.com/login`,{email,password})
      .then((res)=>{
          if(res.data.msg!=='Login Successfull'){
            setmsg(res.data.msg);
            setUserId(res.data.userId);
              console.log(res.data.msg);
          }
          else{
            navigate('/dashboard')
          }
      })
      .catch(err=>{console.log(err.msg);
        toast.error(err.msg)
    });
  }

  const handleEnter =(e)=>{
    if(e.key==='Enter'){
      handleSubmit(e)
    }
  }


  return (
    <div className='body'>
    <div className="login-container">
      <div className='login-content'>
        
        <h4 className='h4-login'>Login</h4>
        {msg && <p className='error-message-login'>{msg}</p>}
        <div className='form-group'>
          <div className="input-container ">
            <input type="email" value={email}  onChange={(e)=>setemail(e.target.value)}  />
            <label>Email</label>		
          </div>
          <div className="input-container">		
            <input type="password" value={password} onKeyDown={handleEnter} onChange={(e)=>setPassword(e.target.value)} />
            <label>Password</label>
          </div>
            <button className='button-login' onClick={handleSubmit} >Submit</button>
            <p className='signup-down'>click here for <span className='span-signup' onClick={()=>navigate('/signup')}>Signup</span></p>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default Login
