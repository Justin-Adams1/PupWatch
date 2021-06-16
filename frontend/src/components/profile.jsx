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
import '../components/css/navigation.css';
import ProfileImage from './profileImage';
import PupImage from './pupimg';

const Profile = (props)=>{
    
    const jwt = localStorage.getItem('token');
    const userObject = jwtDecode(jwt);
    const [user, setUser] = useState();
    const [uploadedImage, setUploadedImage] = useState("");
    const [uploadedPupImage, setUploadedPupImage] = useState("");
    const userId = useRef("");
    const [selectedFile, setSelectedFile] = useState([]);
	  const [isSelected, setIsSelected] = useState(false);

    const authUser = async (userObject, jwt)=>{
      try{
        const user = await axios.get(`http://localhost:5000/api/user/${userObject._id}`, {headers: {"x-auth-token": jwt}});
        setUser(user.data);  
        setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
        setUploadedPupImage("http://localhost:5000/" + user.data.pup.pupImg);
        console.log("received user:", user);
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
    },[setIsSelected]);

    const logOut = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    }
    
    const ownerImgSubmit = (event) => {
      event.preventDefault();
      
      console.log('ownerImgChange',selectedFile[0])
      const formData = new FormData();
      formData.append("ownerImg", selectedFile[0]);
      
      var config = {
          method: 'put',
          url: `http://localhost:5000/api/user/uploadmulter/${userId.current._id}`, 
          data : formData,
          headers: {"Content-Type": "multipart/form-data"},
      };

      try{
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          window.location = '/profile';
          })
      .catch(function (error) {
        console.log(error);
        });        
      }catch(error){
        console.log(error);
      };
    }

const ownerImgChange = (event) => {
    console.log("img url", uploadedImage);

    setSelectedFile(event.target.files);
    setIsSelected(true);
};
    
const pupImgSubmit = (event) => {
  event.preventDefault();
  
  console.log('pupImgChange',selectedFile[0])
  const formData = new FormData();
  formData.append("pupImg", selectedFile[0]);
  
  var config = {
      method: 'put',
      url: `http://localhost:5000/api/user/uploadmulter/${userId.current._id}/pup`, 
      data : formData,
      headers: {"Content-Type": "multipart/form-data"},
  };

  try{
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      window.location = '/profile';
      })
  .catch(function (error) {
    console.log(error);
    });        
  }catch(error){
    console.log(error);
  };
}

const pupImgChange = (event) => {
console.log("img url", uploadedPupImage);

setSelectedFile(event.target.files);
setIsSelected(true);
};

    return(
        <>
        {user?
          <Container>
            <Row>
              <Col className="profileStyle">
                <Row>
                  <h1> {user.name} 
                      <Button className="navItemSmall" onClick={logOut}>Log-Out</Button>
                  </h1>
                  <ProfileImage  url={uploadedImage}/>
                    <form onSubmit={ownerImgSubmit} encType='multipart/form-data'>
                    <input type="file" name="ownerImg" onChange={ownerImgChange} />
                    <div className="loginText">
                      <div/>
                    <Button className="btn btn-success btn-md" type="submit">Submit</Button>
                    </div>  
                    </form>
                </Row>
              </Col>
              <Col className="profileStyle">
                About me & Boarding Info
              </Col>
            </Row>
            <Row className="pupProfileStyle" height="300px">
            </Row>
          </Container>      
          :
          <>
          </>  
      }
        </>
    )
}

export default Profile;