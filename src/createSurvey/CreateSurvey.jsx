import React, { useState,Fragment } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import axios from "axios";
import validator from 'validator';
import Header from "../Header";
import "./CreateSurvey.css";
import "../commonStyles/Styles.css"
const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
export default function CreateSurvey(){
    const [title, setTitle] = useState();
    const [subjectLine, setSubjectLine] = useState();
    const [emailBody, setEmailBody] = useState();
    const [recipentsEmailAddress, setRecipentsEmailAddress] = useState('');
    const [displayResult, setDisplayResult] = useState();
   const [errorMessage, setErrorMessage] = useState('');
   const [emailMessage, setEmailMessage] = useState('');
   const [show, setShow] = useState(false);
   



    const handleClick = () => {
          const payload = JSON.stringify({ 
          title: title,
          subject: subjectLine,
          recipients: recipentsEmailAddress,
          body: emailBody,
          loggedinusername: localStorage.getItem('username')
        })
        if(recipentsEmailAddress === ''){
            setEmailMessage('Please Enter Email')
            setErrorMessage('')
        }
       
        if(recipentsEmailAddress !== ''){
            let errorMessage = validator.isEmail(recipentsEmailAddress) === false ? 'Please Enter Valid Email' : '' 
            setErrorMessage(errorMessage)
            setEmailMessage('')
        }
    
        if(recipentsEmailAddress !== '' && validator.isEmail(recipentsEmailAddress)){
            axios
            .post("https://morning-beyond-34988.herokuapp.com/api/surveys", payload, { headers: HEADERS })
            .then((resp) => {
              let result = resp.data ? resp.data.message ?  resp.data.message: '': '';
              setDisplayResult(result)
              setShow(true)
              // if (result === "valid") {
              //   // navigate("/home");



              //   localStorage.setItem('username', userName);
              //   navigate("/home", { state: userName });
              // } else {
              //   setDisplayResult("Invalid credentials");
              // }
            });
        }
        
        
    }

    const handleCancelClick = () => {
        setTitle('');
        setSubjectLine('');
        setEmailBody('');
        setRecipentsEmailAddress('')
    }
    return(
        <Fragment>
            <Header />
             <div  className="survey_email">
                  {/* <span style={{color:'green'}}>{displayResult}</span> */}
                  <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg={'success'} > 
                  <Toast.Header>
                  <strong className="me-auto">Email Success Message</strong>
          </Toast.Header>
                   <Toast.Body>{displayResult}</Toast.Body>
                   </Toast>
                 <h3>Email</h3>
                <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                    <Form.Control type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Recipent's Email Address" className="mb-3">
                    <Form.Control type="text" placeholder="Recipient's" onChange={(e) => setRecipentsEmailAddress(e.target.value)}/>
                    <span style={{color:'red'}}>{errorMessage}</span>
                   {emailMessage ?  <span style={{color:'red'}}>{emailMessage}</span> : ''} 
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Subject Line" className="mb-3">
                    <Form.Control type="text" placeholder="Subject Line"  onChange={(e) => setSubjectLine(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Email Body" className="mb-3">
                    <Form.Control type="text" placeholder="Email Body" onChange={(e) => setEmailBody(e.target.value)} />
                </FloatingLabel>
             
                <div className="button_submit">
                <Button block  variant="primary" type="submit" onClick={() => handleClick()}>
                   Submit
                 </Button>
                </div>
                 <Button block  variant="danger" onClick={() => handleCancelClick()}>
                   Cancel
                 </Button>
             </div>
        </Fragment>
    )
}