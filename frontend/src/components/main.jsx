import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../components/css/main.css';

function Navigation() {
  return (
      <>
        <Container className="main">
            <Row>
                <Col>
                    Body Colum
                </Col>
            </Row>
        </Container>  
      </>
  );
}

export default Navigation;