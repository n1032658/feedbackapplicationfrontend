import React, {useState,Fragment} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import axios from "axios";

const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
export default function ReplyModel({showReplyModel,handleCloseReplyModel,replyData}){
   const [commentTxt, setCommentTxt] = useState('');
   const [show, setShow] = useState(false);
   const [displayResult, setDisplayResult] = useState();

const handleSubmit = () => {
    const payload = JSON.stringify({
      email: replyData.email,
      comment: commentTxt,
      title: replyData.title
        // loggedinusername: localStorage.getItem('username'),
    })
    // console.log(payload)
    axios
    .post("https://morning-beyond-34988.herokuapp.com/api/sendReplyMail", payload, { headers: HEADERS })
    .then((resp) => {
      // console.log(resp)
      let result = resp.data ? resp.data.message ?  resp.data.message: '': '';
      if(result && resp.status === 200){
        setDisplayResult(result)
        setShow(true)
        handleCloseReplyModel()
      }else{
      }
    });
}
    return(
        <Fragment>
            <Modal show={showReplyModel} onHide={handleCloseReplyModel}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg={'success'} > 
                  <Toast.Header>
                  <strong className="me-auto">Reply Success Message</strong>
                 </Toast.Header>
                   <Toast.Body>{displayResult}</Toast.Body>
              </Toast>
        <Modal.Header closeButton>
          <Modal.Title>Reply Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingInput" label="email" className="mb-3">
                    <Form.Control type="text" placeholder="Email" value={replyData.email} disabled />
    </FloatingLabel>
    <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '70px' }}
          onChange={(e) => setCommentTxt(e.target.value)}
        />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReplyModel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}