
import { Form, Table, Row, Container, Button } from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import '../components/css/navigation.css';

const Register = (props)=>{
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ name, setName] = useState('');
    const [ address, setAddress] = useState('');

    const emailChange = (event) => {
        setEmail(event.target.value);
    };
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };
    const nameChange = (event) => {
        setName(event.target.value);
    }
    const addressChange = (event) => {
        setAddress(event.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.log(name, email, password, address);
        axios
            .post(`http://localhost:5000/api/user/`, {name: name, email: email, password: password, address: address})
            .then(response => {
                console.log(response);
                window.location = '/';
            });
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