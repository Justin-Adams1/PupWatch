
import { Form, Table, Row, Container, Button } from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import '../components/css/navigation.css';
import config from "../config.json";
import Geocode from "react-geocode";
import userEvent from '@testing-library/user-event';

const apiKey = config.API_KEY;



const Register = (props)=>{
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ name, setName] = useState('');
    const [ address, setAddress] = useState('');
    const [ geoAddress, setGeoAddress] = useState([]);
    const [ lat, setLat] = useState('');
    const [ lng, setLng] = useState('');

    const emailChange = (event) => {
        setEmail(event.target.value);
    };
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };
    const nameChange = (event) => {
        setName(event.target.value);
    };
    const addressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleClick = async (event) => {
      event.preventDefault();

      await Geocode.setApiKey(apiKey);
      await Geocode.setLocationType("ROOFTOP");
      
      await Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;

          const geoAddress = [lat,lng];

          axios
              .post(`http://localhost:5000/api/user/`, {
                name: name,
                email: email,
                password: password, 
                address: address, 
                geoAddress: geoAddress,
              })
              .then(response => {
                  const token  = response.data.token;
                  localStorage.setItem('token', token);
                    window.location="/profile";
                    })
              .catch(error => { console.log('Error', error);})
        },
        (error) => {
          console.error(error);
        }
      );
  }        

    return(
        <Container>
            <Table> 
                <Row >
                  <Form onSubmit={(event)=>handleClick(event)}>

                    <Form.Group controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Name"onChange={nameChange}/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"onChange={emailChange}/>
                          <Form.Text>
                            -----We'll never share your email with anyone else.
                          </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"onChange={passwordChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="address" placeholder="Address: 1234 Road, City, State, 5-Zip" onChange={addressChange}/>
                    <Button className="navItem" type="submit">
                      Register
                    </Button>
                    </Form.Group>
                  </Form>
                </Row>
            </Table>
        </Container>
    )
}

export default Register;