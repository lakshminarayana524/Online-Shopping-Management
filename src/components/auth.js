import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const AuthToken = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(AuthContext);

  useEffect(() => {
    axios.get('https://online-shopping-management-backend.onrender.com/verify', { withCredentials: true })
      .then((res) => {
        if (res.data.msg === "No token found" || res.data.msg === "Wrong Token") {
          toast.error(res.data.msg);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          const userId = res.data.userId;
          setUserId(userId);
          localStorage.setItem('userId', userId);
        }
      })
      .catch(err => console.log(err));
  }, [navigate, setUserId]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default AuthToken;
