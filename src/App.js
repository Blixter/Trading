import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Start from './components/pages/Start';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Trading from './components/pages/Trading';
import Navbar from './components/Navbar';


function App() {
    return (
        <Router>
            <Navbar />
                <Route exact path="/" component={Start} />
                <Route path="/register" component={Register} />
                <Route path="/Login" component={Login} />
                <Route path="/Trading" component={Trading} />
            {/* <footer className="footer mt-auto">
                <div className="container">Bla bla</div>
            </footer> */}
        </Router>
    );
}

export default App;