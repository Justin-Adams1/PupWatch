import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const MessageForm = (props)=>{

    console.log("messageFormLoad", props);

    const handleClick = (event) => {
        event.preventDefault();
        console.log("Submit")

      
        // Geocode.setApiKey(apiKey);
      
        // Geocode.fromAddress("address").then(
        //   (response) => {
        //     const { lat, lng } = response.results[0].geometry.location;
        //     console.log(lat, lng);
        //   },
        //   (error) => {
        //     console.error(error);
        //   }
        // );

        // axios
        //     .post(`http://localhost:5000/api/auth/`, {})
        //     .then(response => {
        //         // twillio message out
        //         })
        //     .catch(error => {
        //         console.log('Error', error);
        //         })
    }


    return(
        <Container>
            <Row>
                <Col>
                    <Form  onSubmit={(event)=>handleClick(event)}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label >Send me a message!</Form.Label>
                            <Form.Control className="formMessage" type="textarea" placeholder="Hey! I'm interested in arranging a boarding session (etc)" />
                          <button className="navItem" type="submit">
                            Send
                          </button>
                        </Form.Group>                            
                        </Form>
                        <h6>I'll text you back as soon as possible. Thank you!</h6>
                </Col>
            </Row>

        </Container>
    )
}

export default MessageForm;