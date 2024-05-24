import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './style/signup.css'


const Signup = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials=true;

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, one uppercase letter, one number, and one special character.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    if (password !== retypePassword) {
      if(retypePassword){
      setPasswordError('Passwords do not match.');
      }else{
        setPasswordError('Retype Password')
      }
      return;
    }
    if (!validatePassword()) return;
    // Submit the form if all conditions are satisfied
    // Add your form submission logic here

    axios.post(`https://online-shopping-management-backend.onrender.com/signup`,{name,email,password})
        .then((res)=>{

          if(res.data.msg==='Email already exist'){
            setPasswordError(res.data.msg);
          }

            if(res.data.msg==='Created Successful'){
              setTimeout(()=>{
                navigate('/login')
              },"5000")
              toast.success('Succeddfully stored details')
              setname('') 
              setEmail('')
              setPassword('')
            }
        })

  };

  const handleEnter =(e)=>{
    if(e.key==='Enter'){
      handleSubmit(e);
    }
  }


  return (
    <div className='body'>
      <div className="signup-container">
        <div className='signup-content'>
          <h4 className='h4-signup'>Signup</h4>
          <div className='form-group'>
          <div className="input-container">
              <input type="name" value={name} onChange={(e) => setname(e.target.value)} />
              <label>Name</label>
            </div>
            <div className="input-container">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Email</label>
            </div>
            <div className="input-container">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
            {password && (
              <div className="input-container">
                <input type="password" value={retypePassword} onKeyDown={handleEnter} onChange={(e) => setRetypePassword(e.target.value)} />
                <label>Retype Password</label>
              </div>
            )}
            {passwordError && <p className="error-message">{passwordError}</p>}
            <button className='button-signup' onClick={handleSubmit}>Submit</button>
            <p className='signup-down'>click here for <span className='span-signup' onClick={() => navigate('/login')}>Login</span></p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
