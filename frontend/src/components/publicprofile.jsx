import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
    const [ pubUser, setPubUser] = useState('');

    useEffect(() => {
      const pubProfile  = localStorage.getItem('pubProfile');
      const jwt = localStorage.getItem('token');
      authPub(pubProfile, jwt);
      const userObject = jwtDecode(jwt);
    },[]);    
    const authPub = async (userObject, jwt)=>{
      try{
        const pubUser = await axios.get(`http://localhost:5000/api/user/${userObject}`, {headers: {"x-auth-token": jwt}});

        console.log("pubuser",pubUser)

        setUser(pubUser.data);  
        setUploadedImage("http://localhost:5000/" + pubUser.data.ownerImg);
        setUploadedPupImage("http://localhost:5000/" + pubUser.data.pup.pupImg);
        console.log("pup", pubUser.data.pup);
        setPupAboutMe(pubUser.data.pup.aboutMe);
        setPupName(pubUser.data.pup.name);
        setPupLikes(pubUser.data.pup.likes);
        setPupDislikes(pubUser.data.pup.dislikes);
        setPupAllergy(pubUser.data.pup.allergyInfo);
        setBoardingAtmosphere(pubUser.data.boardingAtmosphere);
        setBoardingDescription(pubUser.data.boardingDescription);
        console.log("received user:", pubUser);
      }catch(error){
        console.log(error);
      }
    }

    const [number, setNumber] = useState(false);
    const [message, setMessage] = useState("");
    const [from, setFrom] = useState("");
    const [show, setShow] = useState(false);

    const messageChange = (event) => {
        setMessage(event.target.value);
        setNumber(user.number);
    };

    const handleClick = async (event) => {
        console.log("message", message)
        console.log("number", number)

        const from  = localStorage.getItem('from');
        console.log("user", from)

        try{
          await axios
            .post(`http://localhost:5000/api/message/`, {to: number, body: message, from: from })
            .then(response => {
              console.log(response);
              alert("Message Sent! Thank you")
            })
            .catch(error => {
                console.log('Error', error);
            })
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
                    <h1> {user.name} </h1>
                    <ProfileImage  url={uploadedImage}/>
                  </Row>
                  <Row>
                    <Button className="navItemSmall3" onClick={(()=>setShow(true))}>Send me a message!</Button>
                    <Button className="navItemSmall3" onClick={(()=>setShow(true))}>Add as Friend?</Button>
                    <Modal
                      show={show}
                      className={"modalStyle"}
                      onHide={() => setShow(false)}
                    >
                      <Modal.Body>
                      <Form>
                        <Form.Group>
                            <Form.Label>Send SMS:</Form.Label>
                            <Form.Control className="modalText2" 
                            as="textarea" 
                            onChange={messageChange}/>

                        </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="navItem" onClick={handleClick}>Send!</Button>
                      </Modal.Footer>
                    </Modal>
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