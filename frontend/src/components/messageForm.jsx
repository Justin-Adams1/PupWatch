    import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import config from '../config.json';
import { React, useState,  useEffect, useCallback} from 'react';
import axios from 'axios';
import twilio from 'twilio';

const MessageForm = (props)=>{

    const accountSid = config.TWILIO_ACCOUNT_SID;
    const authToken = config.TWILIO_AUTH_TOKEN;
    const twilNumber = config.TWILIO_NUMBER;
    
    useEffect((props) => {

        setNumber(props.props.number);
        console.log("messageFormNumberset",props);

        const accountSid = config.TWILIO_ACCOUNT_SID;
        const authToken = config.TWILIO_AUTH_TOKEN;
        const twilNumber = config.TWILIO_NUMBER;

      }, []);

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

    const onClick = (user) => {
        var twilio = require('twilio');
        var client = new twilio(accountSid, authToken);
        client.messages
        .create({
          to: "+"+user.number,
          from: twilNumber,
          body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        })
        .then(message => console.log(message.sid));
      };


    return(
        <Container>
            <Row>
                <Col>
                          <button   className="navItem"  
                                    type="textarea"  
                                    onClick={onClick(props)}
                                    placeholder="Hey! I'm interested in arranging a boarding session (etc)">
                            Send me a message!
                          </button>
                </Col>
            </Row>
        </Container>
    )
}

export default MessageForm;