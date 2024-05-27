import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import './style/addProduct.css';
import { AuthContext } from './AuthContext';

const Addprojects = () => {
    const [brand, setbrand] = useState('');
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [desc, setdesc] = useState('');
    const [img, setimg] = useState('');
    const [size,setsize]=useState({S : false , M :false , L :false ,XL : false ,XXL : false});
    const [color,setcolor]=useState('');
    const [colorname,setcolorname]=useState('');
    const [imagepreview,setimagepreview]=useState(null);
    const [send,setsend]=useState(false);
    const navigate=useNavigate();

    axios.defaults.withCredentials=true;

    const onSubmit = (e) => {
        e.preventDefault();
        const file = new FormData();
        file.append("image", img);
        file.append("brand", brand);
        file.append("name", name);
        file.append("price", price);
        file.append("size",JSON.stringify(size));
        file.append("color",color);
        file.append("colorname",colorname);
        file.append("desc", desc);

        axios.post('https://online-shopping-management-backend.onrender.com/addProducts', file)
            .then(res => {
                if (res.data.msg === "Product add Successfully") {
                    setsend(true);
                    console.log(res.data.msg);
                }
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        // This effect will run when the brand, name, price, or img state changes
        if (send) {
            // If any of the state values are not empty, show the toast
            toast.success('Product added successfully');
            setsend(false);
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000);
        }
    }, [send]); 

    const handlefilereader=(e)=>{
        const file=e.target.files[0];
        setimg(file);

        if(file){
            const reader =new FileReader();
            reader.onloadend=()=>{
                setimagepreview(reader.result);
            };
            reader.readAsDataURL(file);
        }else{
            setimagepreview(null);
        }
    };

    const handleSizeChange =(s)=>{
        setsize(prev =>({
            ...prev,
            [s]:!prev[s]
        }));
    }

    console.log(color)

    return (
        <div className='add-project'>
            <h1>Add a new project</h1>
            {/* <AuthToken /> */}
            {imagepreview && (
                <div className="image-preview">
                    <img src={imagepreview} alt="Preview" />
                </div>
            )}
            <div className="input-container">
                <input type="text" id="input" name="brand" value={brand} onChange={e => setbrand(e.target.value)} required="" />
                <label htmlFor="input" className="label">Brand</label>
                <div className="underline"></div>
            </div>
            <div className="input-container">
                <input type="text" id="input" name="name" value={name} onChange={e => setname(e.target.value)} required="" />
                <label htmlFor="input" className="label">Name</label>
                <div className="underline"></div>
            </div>
            <div className="input-container">
                <input type="text" id="input" name="price" value={desc} onChange={e => setdesc(e.target.value)} required="" />
                <label htmlFor="input" className="label">Description</label>
                <div className="underline"></div>
            </div>
            <div className="input-container">
                <input type="text" id="input" name="price" value={price} onChange={e => setprice(e.target.value)} required="" />
                <label htmlFor="input" className="label">Price</label>
                <div className="underline"></div>
            </div>
            <div className="input-container">
                <input type="file" id="input" name="image"  onChange={handlefilereader} required />
                <div className="underline"></div>

            </div>
            <div className="size-container">
                <p>Select Sizes:</p>
                {Object.keys(size).map((s,i)=>(
                <label key={i}>
                    <input type="checkbox" checked={size[s]} onChange={()=>handleSizeChange(s)} required/>
                    {s}
                </label>
                ))}
            </div>
            <div className='input-container'>
                <input type="text" name="color" value={colorname} onChange={(e)=>setcolorname(e.target.value)} required/>
                <label htmlFor='input' className='label'>Color Name</label>
                <div className="underline"></div>
            </div>
            <div className='input-container'>
                <input type="color" name="color" value={color} onChange={(e)=>setcolor(e.target.value)} required/>
                <label htmlFor='input' className='label'>Color</label>
                <div className="underline"></div>
            </div>

            <input type="submit" onClick={onSubmit} />
            <ToastContainer />
        </div>
    );
};

export default Addprojects;
