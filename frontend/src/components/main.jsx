import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapContainer from '../components/map';
import Navigation from './navigation';
import Logo from './css/pawlogo.jpg'

import '../components/css/main.css';

function Main() {
  return (
      <>
      <Container>
        <Row>
          <Navigation className="navBar"/>
          <img src={Logo} alt="Paw Watch Logo" className="logo"/>       
        </Row>
        <Row> 
          <Main />   
        </Row> 
      </Container>
      </>
  );
}

export default Main;