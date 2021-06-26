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
  const [uploadedBoardImage1, setBoardImage1] = useState("");
  const [uploadedBoardImage2, setBoardImage2] = useState("");

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
          .put(`http://localhost:5000/api/user/${userObject._id}/updateinfo`, {
            boardingAtmosphere: boardingAtmosphere,
            boardingDescription: boardingDescription,
          },{headers: {"x-auth-token": jwt}})
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
        console.log("userObject", userObject)       

        setUser(user.data);  
        const from = localStorage.setItem('from', user.data.number);
        const authUser = localStorage.setItem('authUser', user.data._id);
        console.log("from", from)

        setUploadedImage("http://localhost:5000/" + user.data.ownerImg);
        setUploadedPupImage("http://localhost:5000/" + user.data.pup.pupImg);
        console.log("pup", user.data.pup);
        setPupAboutMe(user.data.pup.aboutMe);
        setBoardImage1("http://localhost:5000/" + user.data.boardImage1);
        setBoardImage2("http://localhost:5000/" + user.data.boardImage2);
        setPupName(user.data.pup.name);
        setPupLikes(user.data.pup.likes);
        setPupDislikes(user.data.pup.dislikes);
        setPupAllergy(user.data.pup.allergyInfo);
        setBoardingAtmosphere(user.data.boardingAtmosphere);
        setBoardingDescription(user.data.boardingDescription);

        
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
        
    },[setIsSelected, setUploadedPupImage, setBoardingAtmosphere, setBoardingDescription, setPupName, setPupLikes, setPupDislikes, setPupAllergy]);

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

const acceptRequest = async (pup) => {

let newFriend = [];
let newFriendList = []; 

if(user.pupList === null){
    newFriendList.push({name: user.pup.name}, {id: user._id});
}else{
    newFriendList.push({name: user.pup.name}, {id: user._id}, {previous: user.pupList});       
}

console.log(user.pendingPups[0]._id)

try{
  await axios
    .patch(`http://localhost:5000/api/user/acceptRequest`, {pupFriend: newFriendList, id: user._id, pup: user.pup.name, otherPup: user.pendingPups[0].name, otherId: user.pendingPups[0]._id})
    .then(response => {
      console.log(response);
      alert("Accepted Friend!")
      window.location = '/profile';
    })
    .catch(error => {
        console.log('Error', error);
    })
}catch(error){
  console.log(error);
}
}

const deleteRequest = async (pup) => {

try{
  await axios
    .patch(`http://localhost:5000/api/user/deleteRequest`, {id: user._id})
    .then(response => {
      console.log(response);
      alert("Deleted Request")
      window.location = '/account';
    })
    .catch(error => {
        console.log('Error', error);
    })
}catch(error){
  console.log(error);
}
}

const deleteFriend = async (pup) => {

try{
  await axios
    .patch(`http://localhost:5000/api/user/deleteFriend`, {id: user._id, })
    .then(response => {
      console.log(response);
      alert("Deleted Friend");
      window.location = '/profile';
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
                </Col>
              </Row>
                {user.pup.pupImg ?
                  <Row className="pupProfileStyle">
                    <Col>
                    <Row>
                      <Col>
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
                    <Col>                                         
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