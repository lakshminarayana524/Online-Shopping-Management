import React, { useContext,useState } from 'react'
import './style/cart.css'
import { AuthContext } from './AuthContext';
import axios from 'axios';
// import UserIdContext from './UserIdContext';

const Cart = () => {

  const { userId } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

console.log("Cart:",userId)
  axios.defaults.withCredentials=true;

  


  return (
    <div className='cart-body'>
      {/* <AuthToken/> */}
      <div className='cart-container'>
        <div className='cart-nav'></div>
        <div className='cart-content'>
          <div className='card-sidebar'></div>
          <div className='cart-card'>
          <div className='card-deliverydate'> 30-23-22 Saturday</div>
            <div className='cart-img'>
              <img src="https://m.media-amazon.com/images/I/61xUlVxYrOL._SX679_.jpg"/>
            </div>
            <div className='cart-info'>
              <p className='cartproduct-name'>Product Name</p>
              <p className='cartproduct-brand'>Product Brand</p>
              <p className='cartproduct-size'>Product Size</p>
              <p className='cartproduct-price'>Product price</p>
            </div>
            <div className='cart-details'>
              <button>Order Details</button>
              <button>Write a review</button>
            </div>
          </div>
          <div className='cart-card'>
          <div className='card-deliverydate'> 30-23-22 Saturday</div>
            <div className='cart-img'>
              <img src="https://m.media-amazon.com/images/I/61xUlVxYrOL._SX679_.jpg"/>
            </div>
            <div className='cart-info'>
              <p className='cartproduct-name'>Product Name</p>
              <p className='cartproduct-brand'>Product Brand</p>
              <p className='cartproduct-size'>Product Size</p>
              <p className='cartproduct-price'>Product price</p>
            </div>
            <div className='cart-details'>
              <button>Order Details</button>
              <button>Write a review</button>
            </div>
          </div>
          <div className='cart-card'>
          <div className='card-deliverydate'> 30-23-22 Saturday</div>
            <div className='cart-img'>
              <img src="https://m.media-amazon.com/images/I/61xUlVxYrOL._SX679_.jpg"/>
            </div>
            <div className='cart-info'>
              <p className='cartproduct-name'>Product Name</p>
              <p className='cartproduct-brand'>Product Brand</p>
              <p className='cartproduct-size'>Product Size</p>
              <p className='cartproduct-price'>Product price</p>
            </div>
            <div className='cart-details'>
              <button>Order Details</button>
              <button>Write a review</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
