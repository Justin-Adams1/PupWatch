import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapContainer from './map';

import '../components/css/main.css';

function PublicProfile() {
  return (
      <>
        <Container className="main">
            <Row>
            Public Profile
            </Row>
        </Container>  
      </>
  );
}

export default PublicProfile;