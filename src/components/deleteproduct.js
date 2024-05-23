import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/dash.css';
import AuthToken from './auth';

const Deleteproduct = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/getproducts');
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



  const handleDelete=(id)=>{
    axios.delete(`http://localhost:3001/delete-prod/${id}`)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  return (
    <div className='dashboard-body'>
      <AuthToken />
      <div className="dashboard-container">
        <h2>Delete</h2>
      <div className='dashboard-nav'>
            <button style={{fontWeight:"50px",float:"left",marginLeft:"25px",cursor:"pointer"}} onClick={()=>navigate('/dashboard')}>&larr; Back</button></div>
            <div className='dashboard-sidebar'></div>
        <div className='dashboard-content'>
          {data.map((product) => (
            <div className='dashboard-card' key={product._id} >
              <div className='product-img'>
                <img src={product.product_image.imageurl} alt={product.product_title} />
              </div>
              <div className='product-info'>
                <p className='product-brand'>{product.product_brand}</p>
                <p className='product-desc'>{product.product_title}</p>
                <p className='product-price'>&#8377;{product.product_price}</p>
              </div>
              <button className='delete' onClick={()=>handleDelete(product._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Deleteproduct;
