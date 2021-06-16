import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
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


function Navigation() {
  return (
      <>
        <Container className="navBar">
                <Button className="navItem" onClick={goHome}>Home
                </Button>

                <Button className="navItem" onClick={goLogin}>Login
                </Button>

                <Button className="navItem" onClick={goRegister}>Register
                </Button>

                <Button className="navItem" onClick={goProfile}>Profile
                </Button>

                <Button className="navItem" onClick={goPlayPen}>Play Pen
                </Button>
        </Container>  
      </>
  );
}

export default Navigation;