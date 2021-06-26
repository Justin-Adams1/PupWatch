import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
    const [selectedFile, setSelectedFile] = useState([]);
	  const [isSelected, setIsSelected] = useState(false);
    
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [pupList, setPupList] = useState([]);
    const [pendingPups, setPendingPups] = useState([]);
    const [aboutMe, setAboutMe] = useState("");
    const friendRef = useRef();

    const [ pupName, setPupName] = useState('');
    const [ pupAboutMe, setPupAboutMe] = useState('');
    const [ pupLikes, setPupLikes] = useState('');
    const [ pupDislikes, setPupDislikes] = useState('');
    const [ pupAllergy, setPupAllergy] = useState('');
    
    const [ boardingAtmosphere, setBoardingAtmosphere] = useState("");
    const [ boardingDescription, setBoardingDescription] = useState("");


  const authUser = async (userObject, jwt)=>{
    try{
      const user = await axios.get(`http://localhost:5000/api/user/${userObject._id}`, {headers: {"x-auth-token": jwt}});console.log("userObject", userObject)       

      setUser(user.data);  
      const from = localStorage.setItem('from', user.data.number);
      const authUser = localStorage.setItem('authUser', user.data._id);
      console.log("from", from)

      setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
      setUploadedPupImage("http://localhost:5000/" + user.data.pup.pupImg);
      console.log("pup", user.data.pup);
      setPupAboutMe(user.data.pup.aboutMe);
      setPupName(user.data.pup.name);
      setPupLikes(user.data.pup.likes);
      setPupDislikes(user.data.pup.dislikes);
      setPupAllergy(user.data.pup.allergyInfo);
      setBoardingAtmosphere(user.data.boardingAtmosphere);
      setBoardingDescription(user.data.boardingDescription);

      setUser(user.data);  
      setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
      setUploadedPupImage("http://localhost:5000/" + user.data.pup.pupImg);

      friendRef.current = user.data.pupList;

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
  },[setIsSelected, setUploadedPupImage, setPendingPups]);



    const logOut = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    }  

    const boardingAtmosphereChange = (event) => {
      setBoardingAtmosphere(event.target.value);
  }
  const boardingDescriptionChange = (event) => {
      setBoardingDescription(event.target.value);
  }

  const addPup = (event) => {
    event.preventDefault();
    try{
    axios
        .put(`http://localhost:5000/api/user/${userObject._id}/changeall/`,
        {
            pupname: pupName, 
            pupaboutMe: pupAboutMe, 
            puplikes: pupLikes, 
            pupdislikes: pupDislikes, 
            pupallergyInfo: pupAllergy,
            pupImg: user.pup.pupImg,
            name: user.name,
            email: user.email,
            aboutMe: user.aboutMe,
            ownerImg: user.ownerImg,
            boardingAtmosphere: boardingAtmosphere,
            boardingDescription: boardingDescription,
            pupList: user.pupList,
            pendingPups: user.pendingPups,
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
                          <Form onSubmit={(event)=>addPup(event)}>

                          <Form.Group>
                              <Form.Label>Atmosphere</Form.Label>
                              <Form.Control as="textarea" defaultValue={boardingAtmosphere} placeholder={boardingAtmosphere}onChange={boardingAtmosphereChange}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>About My Boarding description:</Form.Label>
                              <Form.Control rows={12} as="textarea" defaultValue={boardingDescription} placeholder={boardingDescription} onChange={boardingDescriptionChange}/>
                          </Form.Group>

                          <Button className="navItemSmall" type="submit">Update My Boarding Info</Button>
                        </Form>
                      </Row>
                </Col>
                {/* <Col className="profileStyle2">
                      <Row height="300px">              
                          <Form onSubmit={(event)=>handleClick(event)}>

                          <Form.Group>
                              <Form.Label>Name</Form.Label>
                              <Form.Control as="textarea" defaultValue={name} placeholder={name} onChange={nameChange}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>Email</Form.Label>
                              <Form.Control as="textarea" defaultValue={email} placeholder={email} onChange={emailChange}/>
                          </Form.Group>
                          <Button className="navItemSmall" type="submit">Update My Info</Button>

                          <Container className="pendingPup">
                                {pupList.map((pup) => (
                                              <Row>
                                                <Row>                                                  
                                                  <h4>Pup Friends:</h4>
                                                </Row>
                                                <Row>
                                                  <Col>
                                                    <p>{pup.name}</p>
                                                  </Col>
                                                  <Col className="buttonXSGroup">    
                                                    <ButtonGroup>
                                                      <Button className="buttonXS" onClick={()=>deleteFriend(pup)}> Delete Friend</Button>
                                                      </ButtonGroup>
                                                  </Col>
                                                </Row>
                                              </Row>
                                ))}

                          </Container>

                          <Container className="pendingPup">
                                {pendingPups.map((pup) => (
                                              <Row>
                                                <Row>                                                  
                                                  <h4>Pending Pup Friends:</h4>
                                                </Row>
                                                <Row>
                                                  <Col>
                                                    <p>{pup.name}</p>
                                                  </Col>
                                                  <Col className="buttonXSGroup">    
                                                    <ButtonGroup>
                                                      <Button className="buttonXS" onClick={()=>acceptRequest(pup)}>Accept </Button>
                                                      <Button className="buttonXS" onClick={()=>deleteRequest(pup)}>Reject</Button>
                                                      </ButtonGroup>
                                                  </Col>
                                                </Row>
                                              </Row>
                                ))}

                          </Container>

                                      
                        </Form>
                      </Row>
                </Col> */}
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