import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate();
  return (
    <div>
      <h3>Online Shopping App</h3>
      <button className='button-submit' style={{padding:'5px 6px'}} onClick={()=>navigate('/login')}> Login </button>
    </div>
  )
}

export default Home
