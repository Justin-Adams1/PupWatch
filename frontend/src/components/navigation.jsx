import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
// import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';

import '../components/css/navigation.css';


const goHome = () => {
    window.location = '/home';
};

const goProfile = () => {
    window.location = '/profile';
};

const goPlayPen = () => {
    window.location = '/playpen';
};

const goLogin = () => {
    window.location = '/login';
};

const goRegister = () => {
    window.location = '/register';
};

const goAccount = () => {
    window.location = '/account';
};


function Navigation() {
    
    const jwt = localStorage.getItem('token');

  return (
      <>
        <Container className="navBar">
            {!jwt ?
                <>
                <Button className="navItem" onClick={goLogin}>Login
                </Button>

                <Button className="navItem" onClick={goRegister}>Register
                </Button>
                </>
            :
                <>
                <Button className="navItem" onClick={goHome}>Home
                </Button>

                <Button className="navItem" onClick={goProfile}>Profile
                </Button>

                <Button className="navItem" onClick={goPlayPen}>Play Pen
                </Button>

                <Button className="navItem" onClick={goAccount}>Account
                </Button>
                </>
            }
        </Container>  
      </>
  );
}

export default Navigation;