import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AuthToken = ({ setuId }) => { // Pass the setuId function as a prop
  const navigate = useNavigate();
  const [vmsg, setvmsg] = useState('');

  useEffect(() => {
    axios.get('https://online-shopping-management-backend.onrender.com/verify')
      .then((res) => {
        if (res.data.msg === "No token found" || res.data.msg === "Wrong Token") {
          setvmsg(res.data.msg);
          setTimeout(() => {
            navigate('/');
          }, 100000);
          toast.error(res.data.msg);
        } else {
          const userId = res.data.userId;
          console.log("check", userId);
          localStorage.setItem('userId', userId); // Store userId in localStorage
          setuId(userId); // Call the passed setuId function to update state in Utilities.js
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {vmsg && (
        <>
          <p style={{ color: 'red' }}>{vmsg}</p>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default AuthToken;
