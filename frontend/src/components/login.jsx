import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './css/main.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from './navigation';
import Logo from './css/pawlogo.jpg';
import config from "../config.json";
import Geocode from "react-geocode";
import '../components/css/navigation.css';

const apiKey = config.API_KEY;


const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChange = (event) => {
        setEmail(event.target.value);
    };
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleClick = (event) => {
        event.preventDefault();
        console.log("Submit")

      
        Geocode.setApiKey(apiKey);
      
        Geocode.fromAddress("address").then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
          },
          (error) => {
            console.error(error);
          }
        );

        axios
            .post(`http://localhost:5000/api/auth/`, {email: email, password: password})
            .then(response => {
                const token  = response.data;
                localStorage.setItem('token', token);
                window.location="/profile";
                })
            .catch(error => {
                console.log('Error', error);
                })
    }

    return(
        <Container>
            <Table>                    
                <Row className="postStyle">
                    <Form  onSubmit={(event)=>handleClick(event)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="loginText">Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={emailChange}/>
                            <Form.Text className="loginText">
                            -----We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="loginText">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={passwordChange}/>
                          <Button className="navItem" type="submit">
                            Submit
                          </Button>
                        </Form.Group>                            
                        </Form>
                </Row>
            </Table>
        </Container>
    )
}

export default Login;