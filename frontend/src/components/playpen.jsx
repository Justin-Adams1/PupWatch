import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './css/main.css';
import axios from 'axios';
import FormData from 'form-data';
import Logo from './css/pawlogo.jpg'
import PlaypenImage from './plapenImage';

const Profile = (props)=>{
    
    // const jwt = localStorage.getItem('token');
    // const userObject = jwtDecode(jwt);
    const [user, setUser] = useState();
    const [uploadedImage, setUploadedImage] = useState("");
    const [upload, setUpload] = useState("");
    const userId = useRef("");
    const [uploadedPups, setUploadedPups] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

    const getPups = async ()=>{
      try{
        const pups = await axios.get(`http://localhost:5000/api/user/getPlayPen`);
        setUploadedPups(pups.data);  
        console.log(pups);
      }catch(error){
        console.log(error);
      }
    }
    const imgSubmit = (event) => {
        event.preventDefault();
        let name = "pup"
        
        console.log('ImgChange',upload[0])
        const formData = new FormData();
        formData.append("pup", upload[0]);
        
        var config = {
            method: 'post',
            url: "http://localhost:5000/api/playpen/uploadmulter/playpen", 
            data : formData,
            headers: {"Content-Type": "multipart/form-data"},
        };
  
        try{
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location = '/playpen';
            })
        .catch(function (error) {
          console.log(error);
          });        
        }catch(error){
          console.log(error);
        };
      }

    useEffect(() => {
        getPups();
    },[]);
    
    const imgChange = (event) => {    
    setUpload(event.target.files);
    setIsSelected(true);
    };
    
    // console.log("GotUserObject?", userObject)

    return(
        <div>
              <Row>                                                  
                <h4>Upload an image to share with the others in the Play Pen!</h4>                
                <form onSubmit={imgSubmit} encType='multipart/form-data'>
                      <input className="navItemSmall2" type="file" name="ownerImg" onChange={imgChange} />
                      <Button className="navItemSmall2" type="submit">Submit</Button>
                      </form>
              </Row>
            {uploadedPups.map((pup) => (
            <Row>
              <Row>
                <Col>                
                    <PlaypenImage props={pup}/>
                </Col>
              </Row>
            </Row>
))}
        </div>
    )
}

export default Profile;