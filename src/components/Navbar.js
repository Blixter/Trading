import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavMenu = () => {
    
    return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Gold Trading</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/trading">Trading</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    );
};

export default NavMenu;