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

    const [ pupName, setPupName] = useState('');
    const [ pupAboutMe, setPupAboutMe] = useState('');
    const [ pupLikes, setPupLikes] = useState('');
    const [ pupDislikes, setPupDislikes] = useState('');
    const [ pupAllergy, setPupAllergy] = useState('');
    
    const [ boardingAtmosphere, setBoardingAtmosphere] = useState("");
    const [ boardingDescription, setBoardingDescription] = useState("");

    const pupNameChange = (event) => {
        setPupName(event.target.value);
    };
    const pupAboutMeChange = (event) => {
        setPupAboutMe(event.target.value);
    };
    const pupLikesChange = (event) => {
        setPupLikes(event.target.value);
    }
    const pupDislikesChange = (event) => {
        setPupDislikes(event.target.value);
    }
    const pupAllergyChange = (event) => {
        setPupAllergy(event.target.value);
    }

    const boardingAtmosphereChange = (event) => {
        setBoardingAtmosphere(event.target.value);
    }
    const boardingDescriptionChange = (event) => {
        setBoardingDescription(event.target.value);
    }

    const addPup = (event) => {
      event.preventDefault();
      console.log(pupName);
      try{
      axios
          .put(`http://localhost:5000/api/user/${userObject._id}/aboutme/pup/`,
          {
            name: pupName,
            aboutMe: pupAboutMe,
            likes: pupLikes,
            dislikes: pupDislikes,
            allergyInfo: pupAllergy,
            pupImg: user.pup.pupImg
          }, 
          {headers: {"x-auth-token": jwt}}
          )
          .then(response => {
              console.log(response);
              window.location = '/profile';
          });
      }catch(error){
        console.log(error);
      }
  }

    const submitBoardingInfo = (event) => {
        event.preventDefault();
        try{
        axios
            .put(`http://localhost:5000/api/user/${userObject._id}/updateinfo`,
            {
              boardingAtmosphere: boardingAtmosphere,
              boardingDescription: boardingDescription,
            }, 
            {headers: {"x-auth-token": jwt}}
            )
            .then(response => {
                console.log(response);
                window.location = '/profile';
            });
        }catch(error){
          console.log(error);
        }
    }

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
    },[setIsSelected, setUploadedPupImage]);

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
    
const submitAddPup = (event) => {
  event.preventDefault();
  
  console.log('pupImgChange',selectedFile[0])
  const formData = new FormData();
  // formData.append("name", pupName);
  // formData.append("likes", pupLikes);
  // formData.append("dislikes", pupDislikes);
  // formData.append("aboutMe", pupAboutMe);
  // formData.append("allergyInfo", pupAllergy);
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
                      <input className="navItemSmall2" type="file" name="ownerImg" onChange={ownerImgChange} />
                      <Button className="navItemSmall2" type="submit">Submit</Button>
                      </form>
                  </Row>
                </Col>
                <Col className="profileStyle2">
                      <Row height="300px">              
                          <Form onSubmit={(event)=>submitBoardingInfo(event)}>

                          <Form.Group>
                              <Form.Label>Atmosphere</Form.Label>
                              <Form.Control as="textarea" defaultValue={user.boardingAtmosphere} placeholder={user.boardingAtmosphere}onChange={boardingAtmosphereChange}/>
                          </Form.Group>

                          <Form.Group>
                              <Form.Label>About My Boarding description:</Form.Label>
                              <Form.Control rows={12} as="textarea" defaultValue={user.boardingDescription} placeholder={user.boardingDescription} onChange={boardingDescriptionChange}/>
                          </Form.Group>

                          <Button className="navItemSmall" type="submit">Update My Boarding Info</Button>
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
                    <Row>
                          <form onSubmit={submitAddPup} encType='multipart/form-data'>
                          <input className="navItemSmall2" type="file" name="ownerImg" onChange={pupImgChange} />
                            <Button className="navItemSmall2" type="submit">Submit</Button>
                          </form>  
                    </Row>
                    </Col>                  
                    <Col className="pupDataCol">                                         
                      <Form onSubmit={(event)=>addPup(event)}>

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={pupName} placeholder={pupName} onChange={pupNameChange}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>About My Pup!</Form.Label>
                            <Form.Control rows={2} as="textarea" defaultValue={pupAboutMe} placeholder={pupAboutMe} onChange={pupAboutMeChange}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Pup Likes</Form.Label>
                            <Form.Control as="textarea" defaultValue={pupLikes} placeholder={pupLikes}onChange={pupLikesChange}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Pup Dislikes</Form.Label>
                          <Form.Control as="textarea" defaultValue={pupDislikes} placeholder={pupDislikes} onChange={pupDislikesChange}/>
                        </Form.Group>
                      
                        <Form.Group>
                          <Form.Label>Allergies</Form.Label>
                            <Form.Control as="textarea" defaultValue={pupAllergy} placeholder={pupAllergy}onChange={pupAllergyChange}/>
                        </Form.Group>   
                                        
                        <Button className="navItemSmall" type="submit">Update Pup!</Button>
                    </Form>
                  </Col>   
                  </Row>
                : 
                  <Row className="pupProfileStyle" height="300px">
                    <h3>Upload an image of your Pup to get started!</h3>
                    <PupImage url={uploadedPupImage}/>
                    <form onSubmit={submitAddPup} encType='multipart/form-data'>
                    <input type="file" name="ownerImg" onChange={pupImgChange} />
                    <div className="loginText">
                    <Button className="btn btn-success btn-md" type="submit">Submit</Button>
                    </div>  
                    </form>
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