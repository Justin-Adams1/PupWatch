import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './css/main.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FormData from 'form-data';
import { publicDecrypt } from 'crypto';
import Navigation from './navigation';
import Logo from './css/pawlogo.jpg'
import { copyFileSync } from 'fs';

const Profile = (props)=>{
    
    // const jwt = localStorage.getItem('token');
    // const userObject = jwtDecode(jwt);
    const [user, setUser] = useState();
    const [uploadedImage, setUploadedImage] = useState("");
    const userId = useRef("");

    // const authUser = async (userObject, jwt)=>{
    //   try{
    //     const user = await axios.get(`http://localhost:5000/api/user/${userObject._id}`, {headers: {"x-auth-token": jwt}});
    //     setUser(user.data);  
    //     setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
    //     console.log(user);
    //   }catch(error){
    //     console.log(error);
    //   }
    // }

    // useEffect(() => {
    //     const jwt = localStorage.getItem('token');
    //     const userObject = jwtDecode(jwt);
    //     authUser(userObject, jwt);
    //     userId.current = userObject;
    //     console.log("Profile Page Load")
    // },[]);
    
    // console.log("GotUserObject?", userObject)

    return(
        <>
        <h1>Play Pen</h1>
        </>
    )
}

export default Profile;