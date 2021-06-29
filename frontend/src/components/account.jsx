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
import BoardImage from './boardImage';

const Profile = (props)=>{
    
    const jwt = localStorage.getItem('token');
    const userObject = jwtDecode(jwt);
    const [user, setUser] = useState();
    const [uploadedImage, setUploadedImage] = useState("");
    const [uploadedPupImage, setUploadedPupImage] = useState("");
    const userId = useRef("");
    const [selectedFile1, setSelectedFile1] = useState([]);
    const [selectedFile2, setSelectedFile2] = useState([]);
	  const [isSelected1, setIsSelected1] = useState(false);
	  const [isSelected2, setIsSelected2] = useState(false);
    
    const [uploadedBoardImage1, setBoardImage1] = useState("");
    const [uploadedBoardImage2, setBoardImage2] = useState("");
    
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
      console.log("pup", user.data.pup);
      setBoardImage1("http://localhost:5000/" + user.data.boardingImage1);
      setBoardImage2("http://localhost:5000/" + user.data.boardingImage2);
      setBoardingAtmosphere(user.data.boardingAtmosphere);
      setBoardingDescription(user.data.boardingDescription);

      setUser(user.data);  
      setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
      setUploadedPupImage("http://localhost:5000/" + user.data.pup.pupImg);

      friendRef.current = user.data.pupList;

      setName(user.data.name);

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
  },[setIsSelected1,setIsSelected2,setUploadedPupImage, setPendingPups, setBoardImage1, setBoardImage2]);



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

const submitBoardImage1 = (event) => {
  event.preventDefault();
  
  console.log('boardImageChange',selectedFile1[0])
  const formData = new FormData();
  formData.append("boardingImage1", selectedFile1[0]);
  
  var config = {
      method: 'put',
      url: `http://localhost:5000/api/user/uploadmulter/${userId.current._id}/board1`, 
      data : formData,
      headers: {"Content-Type": "multipart/form-data"},
  };

  try{
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      window.location = '/account';
      })
  .catch(function (error) {
    console.log(error);
    });        
  }catch(error){
    console.log(error);
  };
}
const submitBoardImage2 = (event) => {
  event.preventDefault();
  
  console.log('boardImageChange',selectedFile2[0])
  const formData = new FormData();
  formData.append("boardingImage2", selectedFile2[0]);
  
  var config = {
      method: 'put',
      url: `http://localhost:5000/api/user/uploadmulter/${userId.current._id}/board2`, 
      data : formData,
      headers: {"Content-Type": "multipart/form-data"},
  };

  try{
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      window.location = '/account';
      })
  .catch(function (error) {
    console.log(error);
    });        
  }catch(error){
    console.log(error);
  };
}

const boardImage1Change = (event) => {
console.log("board 1", uploadedBoardImage1.url);

setSelectedFile1(event.target.files);
setIsSelected1(true);
};
const boardImage2Change = (event) => {
  console.log("board 2", uploadedBoardImage2.url);
  
  setSelectedFile2(event.target.files);
  setIsSelected2(true);
  };

// useEffect(() => {
//     const jwt = localStorage.getItem('token');
//     const userObject = jwtDecode(jwt);
//     authUser(userObject, jwt);
//     userId.current = userObject;
    
// },[setIsSelected]);


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
                <Row className="pupProfileStyle">
                        <h3>Upload an image of your Boarding Location to get started!</h3>
                      <Col>
                        <BoardImage url={uploadedBoardImage1}/>
                        <form onSubmit={submitBoardImage1} encType='multipart/form-data'>
                        <input type="file" name="ownerImg" onChange={boardImage1Change} />
                        <div className="loginText">
                        <Button className="btn btn-success btn-md" type="submit">Submit</Button>
                        </div>  
                        </form>
                      </Col>
                      <Col>
                        <BoardImage url={uploadedBoardImage2}/>
                        <form onSubmit={submitBoardImage2} encType='multipart/form-data'>
                        <input type="file" name="ownerImg" onChange={boardImage2Change} />
                        <div className="loginText">
                        <Button className="btn btn-success btn-md" type="submit">Submit</Button>
                        </div>  
                        </form>
                      </Col>              
                    </Row>

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