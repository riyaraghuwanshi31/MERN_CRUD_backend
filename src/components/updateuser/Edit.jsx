import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

 const users = {
    name: "",
    address: "",
    email: "",
    dob:"",
    password:""
 }

 const {id} = useParams();
 const navigate = useNavigate();
 const [user, setUser] = useState(users);

 const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
 }

 useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
 },[id])


 const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
 }

  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Update user</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input type="text" value={user.name} onChange={inputChangeHandler} id="name" name="name" autoComplete='off' placeholder='First name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="address">Address</label>
                <input type="text" value={user.address} onChange={inputChangeHandler} id="address" name="address" autoComplete='off' placeholder='Address' />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" value={user.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="dob">Date of Birth</label>
                <input type="text" value={user.dob} onChange={inputChangeHandler} id="dob" name="dob" autoComplete='off' placeholder='Date of Birth' />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="text" value={user.password} onChange={inputChangeHandler} id="password" name="password" autoComplete='off' placeholder='Password' />
            </div>
            <div className="inputGroup">
                <label htmlFor="course">Course</label>
                <input type="course" value={user.course} onChange={inputChangeHandler} id="course" name="course" autoComplete='off' placeholder='Course' />
            </div>
            <div className="inputGroup">
                <button type="submit">UPDATE USER</button>
            </div>
        </form>
    </div>
  )
}

export default Edit