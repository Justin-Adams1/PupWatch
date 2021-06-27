import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/main';
import Login from './components/login';
import Profile from './components/profile';
import PublicProfile from './components/publicprofile';
import Register from './components/register';
import Home from './components/home';
import PlayPen from './components/playpen';
import Account from './components/account';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from './components/navigation';
import Logo from './components/css/logo3.jpg'
import Logo2 from './components/css/logo2.jpg'


import './components/css/main.css';

const jwt = localStorage.getItem('token');

function App() {

  return (
      <>
      <Container>
        <Row>
            <img src={Logo} alt="Paw Watch Logo" className="logo"/>   
            <img src={Logo2} alt="Paw Watch Logo" className="logo2"/>  
            <Navigation className="navBar"/>  
        </Row>
        <Row className="main"> 
          <Router>
            <Switch>
              {!jwt ?
              <>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />

              </>
              :    
                <>         
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/main" component={Main} />
                <Route exact path="/playpen" component={PlayPen} />
                <Route exact path="/publicprofile" component={PublicProfile} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/account" component={Account} />
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