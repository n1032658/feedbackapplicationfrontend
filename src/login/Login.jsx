import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../commonStyles/Styles.css";
import { Link } from "react-router-dom";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [displayResult, setDisplayResult] = useState("");
 

  const handleSubmit = (event) => {
    event.preventDefault();
    const temp = JSON.stringify({
      username: userName,
      password: password,
    });

    axios
      .post("https://morning-beyond-34988.herokuapp.com/api/login", temp, { headers: HEADERS })
      .then((resp) => {
        let result = resp.data ? resp.data.status ?  resp.data.status: '': '';
        if (result === "valid") {
          localStorage.setItem('username', userName);
          navigate("/home", { state: userName });
        } else {
          setDisplayResult("Invalid credentials");
        }
      });
  };

  

  return (
    <div className="form_model">
      <div className="form_header">
         <h2>Survey App</h2>
      </div>
      <Form
        onSubmit={handleSubmit}
        className="form"
      >
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>Enter username</Form.Label>
          <Form.Control
            autoFocus
            type="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label >Enter password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <p>if you are new user? Please Register</p>
        <br></br>
        <Button block  variant="primary" type="submit" >
          Login
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/register" className="btn btn-link">
          Register
        </Link>
      </Form>
      <span>
        <center>
          <h3 style={{ color: "Red" }}>{displayResult} </h3>
        </center>
      </span>
    </div>
  );
}
