import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/main';
import Login from './components/login';
import Profile from './components/profile';
import PublicProfile from './components/publicprofile';
import Register from './components/register';
import PlayPen from './components/playpen';
import Home from './components/home';
import config from "./config.json";
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from './components/navigation';
import Logo from './components/css/pawlogo.jpg'

import './components/css/main.css';

const apiKey = config.API_KEY;
const jwt = localStorage.getItem('token');

function App() {

  return (
      <>
      <Container>
        <Row>
          <Navigation className="navBar"/>
          <img src={Logo} alt="Paw Watch Logo" className="logo"/>       
        </Row>
        <Row className="main"> 
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/main" component={Main} />
              <Route exact path="/playpen" component={PlayPen} />
              <Route exact path="/publicprofile" component={PublicProfile} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />
              {!jwt ?
                <Redirect to="/login" />
              :
              <>
              </>
              }
            </Switch>
          </Router>   
        </Row> 
      </Container>
      </>
  );
}

export default App;