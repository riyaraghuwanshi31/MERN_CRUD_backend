import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    fname:"",
    address:"",
    email:"",
    password:""
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
  }


  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Add new user</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input type="text" onChange={inputHandler} id="name" name="name" autoComplete='off' placeholder='Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="address">Address</label>
                <input type="text" onChange={inputHandler} id="address" name="address" autoComplete='off' placeholder='Address' />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="dob">Email</label>
                <input type="text" onChange={inputHandler} id="dob" name="dob" autoComplete='off' placeholder='Date of Birth' />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='password' />
            </div>
            <div className="inputGroup">
                <label htmlFor="course">Course</label>
                <input type="text" onChange={inputHandler} id="text" name="course" autoComplete='off' placeholder='course' />
            </div>
            <div className="inputGroup">
                <button type="submit">ADD USER</button>
            </div>
        </form>
    </div>
  )
}

export default Add