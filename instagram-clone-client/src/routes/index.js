import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    //Link,
    Switch,
} from 'react-router-dom';
import Home from './home';
import Login from './login';

import 'semantic-ui-css/semantic.min.css';
import '../css/main.css'; //si no se pone el ./ va a buscar al directorio de node_modules

//const Toolbar = ()=> [
//    <Link to="/">Home</Link>,
//    <Link to="/register">Register</Link>
//]
//const Home = ()=> [<Toolbar />, <h1>Home</h1>];
//const Register = ()=> [<Toolbar />, <h1>Register</h1>];

export default ()=>(
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
        </Switch>
    </Router>
)