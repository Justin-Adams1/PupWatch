import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation';
import Main from './components/main';
import Logo from './pawlogo.jpg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <Container>
      <Row>
        <Navigation className="navBar"/>       
      </Row>
      <Row>
        <img src={Logo} alt="Paw Watch Logo" className="logo"/> 
        <Main />   
      </Row> 
    </Container>
  );
}

export default App;
