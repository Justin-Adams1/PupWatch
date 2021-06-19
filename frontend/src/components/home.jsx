import { useState, useEffect, useRef } from 'react';
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import './css/main.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import MapContainer from './map';

const Profile = (props)=>{
    
    const jwt = localStorage.getItem('token');
    const userObject = jwtDecode(jwt);
    const [user, setUser] = useState();
    const [uploadedImage, setUploadedImage] = useState("");
    const userId = useRef("");
    const [geoAddress, setGeoAddress] = useState([]);
    const [markerPack, setMarkerPack] = useState([]);

    const authUser = async (userObject, jwt)=>{
      try{
        const user = await axios.get(`http://localhost:5000/api/user/${userObject._id}`, {headers: {"x-auth-token": jwt}});
        setUser(user.data);  
        setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
        setGeoAddress(user.data.geoAddress);

        getMarkerPackCollection();

        console.log(user);
      }catch(error){
        console.log(error);
      }
    }

    const getMarkerPackCollection = async() => {

      try{
        const rawMarkerPack = await axios.get(`http://localhost:5000/api/user/populateAddress`, {headers: {"x-auth-token": jwt}});
        setMarkerPack(rawMarkerPack.data);  
      }catch(error){
        console.log(error);
      }

    }

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        const userObject = jwtDecode(jwt);
        authUser(userObject, jwt);
        userId.current = userObject;
        console.log("Profile Page Load")
    },[]);

    return(
        <>
          <MapContainer className="mapContainer" geoAddress={geoAddress} markerPack={markerPack}/>
        </>
    )
}

export default Profile;