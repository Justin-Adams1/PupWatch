import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { React, useState,  useEffect, useRef} from 'react';
import axios from 'axios';
import './css/main.css';
import ProfileImage from './infoWindowPic';

const InfoWindow = (props)=>{
    
    useEffect((props) => {

        setNumber(props.props.number);
        console.log("messageformProps",props);

      }, []);
      
    const [internalState, setInternalState] = useState(props);
    const previousValueRef = useRef();
    const previousValue=previousValueRef.current;
    if(props !== previousValue && props !== internalState) {
        setInternalState(props);
    }
    useEffect(() => {
        previousValueRef.current = props;
    });

    const [number, setNumber] = useState()

    // const handleClick = (event) => {
    //     event.preventDefault();
    //     console.log("Submit")

        // axios
        //     .post(`http://localhost:5000/api/auth/`, {})
        //     .then(response => {
        //         // twillio message out
        //         })
        //     .catch(error => {
        //         console.log('Error', error);
        //         })
    // }

    
const goPublicProfile = () => {
    console.log("gopub")
    window.location = '/publicprofile';
};
useEffect(() => {
    const listener = e => {
       if (e === "click") {
        window.location = '/publicprofile';
       }
    };
    window.addEventListener("click", listener);
    return () => {
       window.removeEventListener("click", listener);
    };
 }, 
 []);


    return(
        <div>              
              <Container className="infoWindow">
                <Row>
                  <Col>
                    <ProfileImage  url={props.marker.ownerImg}/>
                  </Col>
                  <Col>
                  <Row>
                    <Col>
                      <p>{props.marker.name}</p>
                      <p className="infoWindowTextBottom">{props.marker.boardingDescription}</p>
                        <button className="messageItem"  
                                type="textarea"  
                                onClick={(event)=>goPublicProfile(event)}
                                placeholder="Hey! I'm interested in arranging a boarding session (etc)"
                        >
                                My Profile
                        </button>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                  </Col>
                </Row>
              </Container>
        </div>
    )
}

export default InfoWindow;