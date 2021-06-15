import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import '../components/css/navigation.css';

function Navigation() {
  return (
      <>
        <Container className="navBar">
                <Button className="navItem">Home
                </Button>

                <Button className="navItem">Login / Logout
                </Button>

                <Button className="navItem">Profile
                </Button>
                
                <Button className="navItem">Play Pen
                </Button>
        </Container>  
      </>
  );
}

export default Navigation;