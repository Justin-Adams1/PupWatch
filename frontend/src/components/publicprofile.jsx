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

    const [ pupName, setPupName] = useState('');
    const [ pupAboutMe, setPupAboutMe] = useState('');
    const [ pupLikes, setPupLikes] = useState('');
    const [ pupDislikes, setPupDislikes] = useState('');
    const [ pupAllergy, setPupAllergy] = useState('');
    
    const [ boardingAtmosphere, setBoardingAtmosphere] = useState("");
    const [ boardingDescription, setBoardingDescription] = useState("");

    const authUser = async (userObject, jwt)=>{
      try{
        const user = await axios.get(`http://localhost:5000/api/user/${userObject._id}`, {headers: {"x-auth-token": jwt}});

        setUser(user.data);  
        setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
        setUploadedPupImage("http://localhost:5000/" + user.data.pup.pupImg);
        console.log("pup", user.data.pup);
        setPupAboutMe(user.data.pup.aboutMe);
        setPupName(user.data.pup.name);
        setPupLikes(user.data.pup.likes);
        setPupDislikes(user.data.pup.dislikes);
        setPupAllergy(user.data.pup.allergyInfo);
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
    },[]);


return(
        <>
        {user?
            <Container>
              <Row>
                <Col className="profileStyle">
                  <Row>
                    <h1> {user.name} </h1>
                    <ProfileImage  url={uploadedImage}/>
                  </Row>
                </Col>
                <Col className="profileStyle2">
                      <Row height="300px">              
                          <Form>

                          <Form.Group>
                              <Form.Label>Atmosphere</Form.Label>
                              <Form.Control as="textarea" plaintext readonly defaultValue={user.boardingAtmosphere} placeholder={user.boardingAtmosphere}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>About My Boarding description:</Form.Label>
                              <Form.Control rows={8} as="textarea" plaintext readonly defaultValue={user.boardingDescription} placeholder={user.boardingDescription}/>
                          </Form.Group>

                        </Form>
                      </Row>
                </Col>
              </Row>
                {user.pup.pupImg ?
                  <Row className="pupProfileStyle">
                    <Col>
                    <Row className="popImgCol">
                      <Col className="pupImgCol">
                      <h1> {pupName}  </h1>      
                          <PupImage  url={uploadedPupImage}/>            
                      </Col>        
                    </Row>
                    </Col>                  
                    <Col className="pupDataCol">                                         
                      <Form>

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control rows={1}  type="text"  plaintext readonly defaultValue={pupName} placeholder={pupName}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>About My Pup!</Form.Label>
                            <Form.Control rows={2} as="textarea" plaintext readonly defaultValue={pupAboutMe} placeholder={pupAboutMe}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Pup Likes</Form.Label>
                            <Form.Control rows={1} as="textarea" plaintext readonly defaultValue={pupLikes} placeholder={pupLikes}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Pup Dislikes</Form.Label>
                          <Form.Control rows={1} as="textarea" plaintext readonly defaultValue={pupDislikes} placeholder={pupDislikes}/>
                        </Form.Group>
                      
                        <Form.Group>
                          <Form.Label>Allergies</Form.Label>
                            <Form.Control as="textarea" plaintext readonly defaultValue={pupAllergy} placeholder={pupAllergy}/>
                        </Form.Group>   

                    </Form>
                  </Col>   
                  </Row>
                : 
                  <Row className="pupProfileStyle" height="300px">
                    <PupImage url={uploadedPupImage}/>
                  </Row>
              }
            </Container>
          :
          <>
          </>
        }
        </>
    )
  }

export default Profile;