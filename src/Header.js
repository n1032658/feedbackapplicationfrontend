import React from 'react';
import Button from "react-bootstrap/Button"
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Navbar';
import "./commonStyles/Styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(){
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('username');
    navigate("/")
  }
    return (
        <Navbar bg="light" expand="lg" >
  <Container >
    <Navbar.Brand href="/home">Home</Navbar.Brand>
    <Navbar.Brand href="/createsurvey">Create Survey</Navbar.Brand>
    <Navbar.Brand  href="/visualization">Visualization</Navbar.Brand>
    <Navbar.Brand  href="/qrCode">QR Code</Navbar.Brand>
    <Navbar.Toggle />
   
    <Navbar.Collapse>
      <div className="header-nav">
      <Navbar.Text>
          <Button onClick={() => handleClick()}>Logout</Button>
      </Navbar.Text>
      </div>
         
    </Navbar.Collapse>
  </Container>
</Navbar>


    )
}

export default Header;