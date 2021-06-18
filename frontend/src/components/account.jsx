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
    
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [pupList, setPupList] = useState("");
    const [pendingPups, setPendingPups] = useState("");
    const [aboutMe, setAboutMe] = useState("");


  const authUser = async (userObject, jwt)=>{
    try{
      const user = await axios.get(`http://localhost:5000/api/user/${userObject._id}`, {headers: {"x-auth-token": jwt}});

      setUser(user.data);  
      setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
      setUploadedPupImage("http://localhost:5000/" + user.data.pup.pupImg);

      setName(user.data.name);
      setEmail(user.data.email);
      setPupList(user.data.pupList);
      setPendingPups(user.data.pendingPups);
      setAboutMe(user.data.aboutMe)

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
  },[setIsSelected, setUploadedPupImage]);

    
    const nameChange = (event) => {
      setName(event.target.value);
  }
  const emailChange = (event) => {
      setEmail(event.target.value);
  }
  const pupListChange = (event) => {
      setPupList(event.target.value);
  }
  const pendingPupsChange = (event) => {
      setPendingPups(event.target.value);
  }
  const aboutMeChange = (event) => {
      setAboutMe(event.target.value);
  }

    const logOut = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    }

    const handleClick = (event) => {
      event.preventDefault();
      try{
      axios
          .put(`http://localhost:5000/api/user/${userObject._id}/changeall/`,
          {
              pupname: user.pup.name, 
              pupaboutMe: user.pup.aboutMe, 
              puplikes: user.pup.likes, 
              pupdislikes: user.pup.dislikes, 
              pupallergyInfo: user.pup.allergyInfo,
              pupImg: user.pup.pupImg,
              name: name,
              email: email,
              aboutMe: aboutMe,
              ownerImg: user.ownerImg,
              boardingAtmosphere: user.boardingAtmosphere,
              boardingDescription: user.boardingDescription,
              pupList: pupList,
              pendingPups: pendingPups,
              address: user.address,
              boardingPicture1: user.boardingPicture1,
              boardingPicture2: user.boardingPicture2,
              geoAddress: user.geoAddress,
          }, 
          {headers: {"x-auth-token": jwt}}
          )
          .then(response => {
              console.log(response);
              window.location = '/account';
          });
      }catch(error){
        console.log(error);
      }
  }

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
                  </Row>
                </Col>
                <Col className="profileStyle2">
                      <Row height="300px">              
                          <Form onSubmit={(event)=>handleClick(event)}>

                          <Form.Group>
                              <Form.Label>Name</Form.Label>
                              <Form.Control as="textarea" defaultValue={name} placeholder={name} onChange={nameChange}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>About Me</Form.Label>
                              <Form.Control as="textarea" defaultValue={aboutMe} placeholder={aboutMe} onChange={aboutMeChange}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>Email</Form.Label>
                              <Form.Control as="textarea" defaultValue={email} placeholder={email} onChange={emailChange}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>Pup Friends</Form.Label>
                              <Form.Control as="textarea" defaultValue={pupList} placeholder={pupList} onChange={pupListChange}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>Pending Pup Friends</Form.Label>
                              <Form.Control as="textarea" defaultValue={pendingPups} placeholder={pendingPups} onChange={pendingPupsChange}/>
                          </Form.Group>
                          <Button className="navItemSmall" type="submit">Update My Info</Button>
                        </Form>
                      </Row>
                </Col>
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