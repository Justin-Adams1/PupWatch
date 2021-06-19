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
import Navigation from './components/navigation';
import Logo from './components/css/pawlogo.jpg'


import './components/css/main.css';

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