import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../commonStyles/Styles.css";
import axios from "axios";
import { Link } from 'react-router-dom';
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [displayResult, setDisplayResult] = useState("");
 

  const handleSubmit = (event) => {
    event.preventDefault();
    // converts into json format
    const temp = JSON.stringify({

      firstname:firstname,
      lastname:lastname,
      username: userName,
      password: password,
    });

    axios
      .post("https://morning-beyond-34988.herokuapp.com/api/register", temp, { headers: HEADERS })
      .then((resp) => {
        let result = resp.data ? resp.data.status ? resp.data.status : '' : '';
          setDisplayResult(result);
        
      });
  };

 

  return (
   <div className="form_model ">
     <div className="form_header">
      <h2>Survey App</h2>
      </div>
      <Form onSubmit={handleSubmit}  className="form">
        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>First name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          /> </Form.Group>
           <Form.Group className="mb-3" controlId="lastname">
          <Form.Label >Last name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          /> </Form.Group>

         <Form.Group className="mb-3" controlId="userName">
          <Form.Label >UserName</Form.Label>
          <Form.Control
            autoFocus
            type="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          /> </Form.Group>

    
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Enter password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group><br></br>
        <Button block className="mb-3" type="submit" >
          Register
        </Button>
        <Link to="/" style={{ color: "red" }} className="btn btn-link">Login here</Link>

      </Form>
      <span>
        <center>
          {
            displayResult === 'valid' ? <h3 style={{ color: "green" }}>{'Registeration successfull'}</h3> : ''
          }
        </center>
      </span>
    </div>
  );
}
