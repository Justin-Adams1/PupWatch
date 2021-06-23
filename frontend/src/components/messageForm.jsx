import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import config from '../config.json';
import { React, useState,  useEffect, useRef} from 'react';
import axios from 'axios';
import './css/main.css';

const MessageForm = (props)=>{
    
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
        <>
            <button className="messageItem"  
                    type="textarea"  
                    onClick={() => goPublicProfile()}
                    placeholder="Hey! I'm interested in arranging a boarding session (etc)">
            My Profile
            </button>
        </>
    )
}

export default MessageForm;