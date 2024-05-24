import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/dash.css';
import AuthToken from './auth';

const Dash = ({userId}) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState();
  const [uid, setUserId] = useState('');
  // setUserId(userId)
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://online-shopping-management-backend.onrender.com/getproducts');
        if (response.data.msg === 'Successfully Fetched') {
          setData(response.data.result);
        } else {
          setErr("Error in fetching products");
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setErr("Error in fetching products");
      }
    }
    fetchData();
  }, []);

  const handleClick = (id) =>{
    
    navigate(`/product-detail/${id}`)
    
  }

  

  return (
    <div className='dashboard-body'>
      <AuthToken />
      <div className="dashboard-container">
        <h2>DashBoard</h2>
        <button onClick={() => navigate('/add')}>Add</button>
        <button onClick={()=>navigate("/delete-product")}>Delete</button>
        <button onClick={()=>navigate("/cart")}><i class='fas fa-cart-arrow-down' style={{fontSize:"24px  "}}></i></button>
      <div className='dashboard-nav'></div>
            <div className='dashboard-sidebar'></div>
        <div className='dashboard-content'>
          {data.map((product) => (
            <div className='dashboard-card' key={product._id} onClick={()=> handleClick(product._id)} >
              <div className='product-img'>
                <img src={product.product_image.imageurl} alt={product.product_title} />
              </div>
              <div className='product-info'>
                <p className='product-brand'>{product.product_brand}</p>
                <p className='product-desc'>{product.product_title}</p>
                <p className='product-price'>&#8377;{product.product_price}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dash;
