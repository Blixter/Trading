import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Start from './components/pages/Start';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Trading from './components/pages/Trading';
import Navbar from './components/Navbar';



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Route exact path="/" component={Start} />
                <Route path="/register" component={Register} />
                <Route 
                    path="/Login"
                    render={(props) => <Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/Trading" component={Trading} />
            <footer bg="dark" variant="dark" className="footer">
                <p className="footerText">Copyright © 2019 Robin Blixter</p>
            </footer>
        </Router>
    );
}

export default App;