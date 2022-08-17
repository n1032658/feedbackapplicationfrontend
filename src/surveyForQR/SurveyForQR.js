import React, {useState,  Fragment} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Header from "../Header";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import "../surveyQuestions/surveyQuestionsForm.css";
import "../commonStyles/Styles.css";
import {RatingArray,userRatings} from "../helper/data";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function SurveyForQR() {
  const navigate = useNavigate();
//   const {email,surveyId} = useParams()
  const [radiovalue, setRadioValue] = useState('');
  const [userRatingStatus, setUserRatingStatus] = useState('');
  const [needToChangeText, setNeedToChangeText] = useState('');
  const [email, setEmail] = useState('');
 
  
 

 
  const handleRatingChange = (item) => {
     setRadioValue(item)
  }

const handleUserRatingChange = (item) => {
  setUserRatingStatus(item)
}
const onhandleTextAreaCahnge = (value) => {
  setNeedToChangeText(value)
}
const handleSubmit = () => {
//   let productReviewList = checkboxValues.filter((c, index) => {
//     return checkboxValues.indexOf(c) === index;
// });
  const payload = { 
    "surveyId": '62fbdfc3e20c152a265f6433',
    "email": email,
    "userRating": radiovalue,
   "userReview": userRatingStatus,
    "productDesc": needToChangeText
  }
  axios
  .post("https://morning-beyond-34988.herokuapp.com/api/saveAnswers", payload, { headers: HEADERS })
  .then((resp) => {
    let result = resp.data ? resp.data : '';
    if (result === "success") {
      navigate("/thankyouPage");
    } else {
   
    }
  });
}



 let ratingValues = RatingArray.map((item) => {
          return (
            <div className="rating-display">
                 <Form.Group className="mb-3" controlId="formBasicRadio">
            <Form.Check inline label={item}  name="group1" type="radio"  onChange={() => handleRatingChange(item)}/>
          </Form.Group>
            </div>
           
          )
 })

let userRatingValues = userRatings.map((item) => {
  return (
         <Form.Group className="mb-3" controlId="formBasicRadio">
    <Form.Check inline label={item}  name="group2" type="radio"  onChange={() => handleUserRatingChange(item)}/>
  </Form.Group>
  )
})
  return (
   <Fragment>
     <Header />
     <div className="home_page">
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
            <Form.Control type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        </FloatingLabel>
       </div>
       <div className="home_page">
         <p>1. On a scale of zero to ten, how likely to recommend our product to a friend or colleague ? rating</p>
         {ratingValues}
       </div>
       <div className="home_page">
         <p>2. How would you rate your experience with our product?</p>
         {userRatingValues}
       </div>
       <div className="home_page">
         <p>3. Could you please provide us with the review to improve our product?</p>
         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>A paragraph or short answer:</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e) => onhandleTextAreaCahnge(e.target.value)}/>
      </Form.Group>
       </div>
       <div className="ques_button_submit">
          <Button block  variant="primary" type="submit" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </div>
   </Fragment>
  );
}

export default SurveyForQR;
