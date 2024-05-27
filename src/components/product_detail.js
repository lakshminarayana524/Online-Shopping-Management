  import React, { useEffect, useState,useContext } from 'react';
  import {AuthContext} from './AuthContext';
  import { useNavigate, useParams } from 'react-router-dom';
  import axios from 'axios';
  import './style/product-details.css';
import { toast } from 'react-toastify';

  const ProductDetails = ({uId}) => {
      const { id } = useParams();
      const [details, setDetails] = useState({});
      const [selectedSize, setSelectedSize] = useState('');
      const navigate = useNavigate();
      const {userId}=useContext(AuthContext);

      axios.defaults.withCredentials=true;

      useEffect(() => {
          axios.get(`https://online-shopping-management-backend.onrender.com/getprod/${id}`)
              .then(res => {
                  if (res.data.msg === "Data Fecthed Successfully!") {
                      setDetails(res.data.product);
                  }
              })
              .catch(err => {
                  console.error(err);
              });
      }, [id]);

      const handleSize = (size) => {
          setSelectedSize(prevSize => (prevSize === size ? '' : size));
      };

      console.log(selectedSize);

      const getSizeNameFromKey = (key) => {
        // Define a map for non-numeric size keys
        const sizeMap = {
            S: 'Small',
            M: 'Medium',
            L: 'Large',
            XL: 'Extra Large',
            XXL: 'Double Extra Large',
            // Add more mappings as needed
        };

        // Check if the key is a numeric string
        if (!isNaN(parseInt(key))) {
            // Convert numeric strings to size names
            switch (key) {
                case '0':
                    return 'S';
                case '1':
                    return 'M';
                case '2':
                    return 'L';
                case '3':
                    return 'XL';
                case '4':
                    return 'XXL';
                // Add more cases as needed
                default:
                    return ''; // Handle other cases accordingly
            }
        } else {
            // Return the size name from the map for non-numeric keys
            return sizeMap[key] || '';
        }
    };

    const uid=localStorage.getItem('userId');

        const handleCart =()=>{ 
            const  product={
                id:details._id,
                size:selectedSize,
                price:details.product_price,
                userID:userId,
            }

            axios.post(`https://online-shopping-management-backend.onrender.com/addToCart`,product)
            .then(res=>{
                if(res.data.msg==='Added To Cart'){
                    toast.success('Added To Cart');
                }
            })
        }

        console.log(details._id,selectedSize,details.product_price,userId);

      return (
          <div className='product-body'>
              {/* <AuthToken /> */}
              <div className='product-nav'>
              <button style={{ fontWeight: "50px", float: "left", marginLeft: "25px", cursor:"pointer" ,background:'transparent',boarder:'0px'}} onClick={() => navigate('/dashboard')}>&larr; Back</button>

              </div>
              <div className='product-content'>
                  <div className='product-images'>
                      <img src={details.product_image && details.product_image.imageurl} alt="Product" />
                  </div>
                  <div className='product-details'>
                      <p className='product-brand'>{details.product_brand}</p>
                      <p className='product-desc'>{details.product_title}</p>
                      <p className='product-price'> MRP &#8377;{details.product_price}</p>
                      <div className='product-info'>
                          <p className='product-color'>{details.product_color_name}</p>
                          <div className='product-color-icon' style={{ backgroundColor: details.product_color }}></div>
                      </div>
                      <div className='product-info-size'>
                          <p className='product-size-text'>Select Size</p>
                          {details.product_size && Object.keys(details.product_size).map((key) => {
                              const sizeName = getSizeNameFromKey(key);
                              if (sizeName && details.product_size[key]) {
                                  return (
                                      <button
                                          key={key}
                                          className={`product-size ${selectedSize === sizeName && 'Selected'}`}
                                          onClick={() => handleSize(sizeName)}
                                      >
                                          {sizeName}
                                      </button>
                                  );
                              }
                              return null;
                          })}
                      </div>


                      <div className='product-order'>
                        {!selectedSize && <p style={{color:'#939598',fontSize:'15px'}}>Please select size before add to cart</p>}
                          <button className='product-cart' disabled={!selectedSize} onClick={handleCart} >&#xf217;	Add To Bag</button>
                      </div>
                  </div>
              </div>
          </div>
      );
  };

  export default ProductDetails;