import React from 'react';
import { Container } from '@material-ui/core';

import useStyles from './styles';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

  const classes = useStyles();

 
  return (

    <Router>
   <Switch>
    <Container maxWidth="lg">
    <Navbar />
      
     <Route exact path='/'>
     <Home  />
     </Route>
     <Route path='/auth' component={Auth} />
    </Container>
    </Switch>
    </Router>
  );
};

export default App;
