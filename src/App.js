import './App.css';
import Dash from './components/dash';
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import AddProduct from './components/addProducts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/product_detail';
import Deleteproduct from './components/deleteproduct';
import Utilities from './components/UserIdContext'
import Cart from './components/cart';

function App() {
  return (
    <div className="App">
      {/* <Utilities /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dash />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path="/add" element={<AddProduct />} />
          <Route path='/product-detail/:id' element={<ProductDetails />} />
          <Route path='/delete-product' element={<Deleteproduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
