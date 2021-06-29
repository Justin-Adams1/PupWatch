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
import PublicBoardImage from './boardImage';
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
    const [uploadedBoardImage1, setBoardImage1] = useState("");
    const [pupBreed, setPupBreed] = useState("");
    const [uploadedBoardImage2, setBoardImage2] = useState("");

    useEffect(() => {
      const pubProfile  = localStorage.getItem('pubProfile');
      const jwt = localStorage.getItem('token');
      const from  = localStorage.getItem('from');
      authPub(pubProfile, jwt);
      let userObject = jwtDecode(jwt);
    },[]);    
    
    const authPub = async (userObject, jwt)=>{
      try{
        const pubUser = await axios.get(`http://localhost:5000/api/user/${userObject}`, {headers: {"x-auth-token": jwt}});

        console.log("pup", pubUser.data.pup);
        console.log("received public user:", pubUser);

        setPubUser(pubUser.data);  
        setUploadedImage("http://localhost:5000/" + pubUser.data.ownerImg);
        setUploadedPupImage("http://localhost:5000/" + pubUser.data.pup.pupImg);
        setPupAboutMe(pubUser.data.pup.aboutMe);
        setPupName(pubUser.data.pup.name);
        setPupLikes(pubUser.data.pup.likes);
        setPupDislikes(pubUser.data.pup.dislikes);
        setPupBreed(pubUser.data.pup.breed);
        setPupAllergy(pubUser.data.pup.allergyInfo);
        setBoardingAtmosphere(pubUser.data.boardingAtmosphere);
        setBoardingDescription(pubUser.data.boardingDescription);
        setBoardImage1("http://localhost:5000/" + pubUser.data.boardingImage1);
        setBoardImage2("http://localhost:5000/" + pubUser.data.boardingImage2);

        try{
          userObject = jwtDecode(jwt);
          const user = await axios.get(`http://localhost:5000/api/user/${userObject._id}`, {headers: {"x-auth-token": jwt}});
  
          setUser(user.data);  
          const from = localStorage.setItem('from', user.data.number);
          console.log("received user:", user);
        }catch(error){
          console.log(error);
        }
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
        console.log("from", from)

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
    const pupBreedChange = (event) => {
        setPupBreed(event.target.value);
    }

    const addFriend = async () => {
      const authUser  = localStorage.getItem('authUser');

      let newFriend = [];
      let newFriendList = []; 

      if(user.pendingPupList === null){
          newFriendList.push({name: user.pup.name}, {id: user._id});
      }else{
          newFriendList.push({name: user.pup.name}, {id: user._id}, {previous: user.pupList});       
      }

      console.log("Auth User Pup Name", user.pup.name);
      console.log("new pending friend", newFriend);
      console.log("To User:", pubUser.name)
      console.log("newFriendList", newFriendList)
      console.log("userpupList", user.pupList)
      

      try{
        await axios
          .patch(`http://localhost:5000/api/user/friendrequest`, {pupFriend: newFriendList, from: user._id, toUser: pubUser._id})
          .then(response => {
            console.log(response);
            alert("Friend request sent!")
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
                    <h1> {pubUser.name} </h1>
                    <ProfileImage url={uploadedImage}/>
                  </Row>
                  <Row>
                    <Button className="navItemSmall3" onClick={(()=>setShow(true))}>Send me a message!</Button>
                    <Button className="navItemSmall3" onClick={addFriend}>Add as Friend?</Button>
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
                              <Form.Control as="textarea" plaintext disable="true" defaultValue={pubUser.boardingAtmosphere} placeholder={pubUser.boardingAtmosphere}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>About My Boarding description:</Form.Label>
                              <Form.Control rows={8} as="textarea" plaintext disable="true" defaultValue={pubUser.boardingDescription} placeholder={pubUser.boardingDescription}/>
                          </Form.Group>

                        </Form>
                      </Row>
                </Col>
              </Row>
                {user.pup.pupImg ?
                  <Row className="publicpupProfileStyle">
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
                            <Form.Control rows={1}  type="text"  plaintext disabled="true" defaultValue={pupName} placeholder={pupName}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Breed</Form.Label>
                            <Form.Control type="text" plaintext disabled="true" defaultValue={pupBreed} placeholder={pupBreed}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>About My Pup!</Form.Label>
                            <Form.Control rows={2} as="textarea" plaintext disabled="true" defaultValue={pupAboutMe} placeholder={pupAboutMe}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Pup Likes</Form.Label>
                            <Form.Control rows={1} as="textarea" plaintext disabled="true" defaultValue={pupLikes} placeholder={pupLikes}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Pup Dislikes</Form.Label>
                          <Form.Control rows={1} as="textarea" plaintext disabled="true" defaultValue={pupDislikes} placeholder={pupDislikes}/>
                        </Form.Group>
                      
                        <Form.Group>
                          <Form.Label>Allergies</Form.Label>
                            <Form.Control as="textarea" plaintext disabled="true" defaultValue={pupAllergy} placeholder={pupAllergy}/>
                        </Form.Group>   

                    </Form>
                  </Col> 
                    <Row>
                      <Col>
                      <PublicBoardImage url={uploadedBoardImage1}/>   
                      </Col>  
                      <Col>
                      <PublicBoardImage url={uploadedBoardImage2}/>
                      </Col>             
                    </Row>  
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