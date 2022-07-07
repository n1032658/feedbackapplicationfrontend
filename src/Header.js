import {useEffect,useState,Fragment} from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(){

    return (
        <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/home">Home</Navbar.Brand>
  
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/createsurvey">Create Survey</Nav.Link>
        <Nav.Link href="/visualization">Visualization</Nav.Link>
        {/* <Nav.Link href="/CoinSearch">Cryptocurrency Price Tracker</Nav.Link> */}
 
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


    )
}

export default Header;