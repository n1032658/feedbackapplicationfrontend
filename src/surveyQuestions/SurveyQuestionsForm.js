import React, {useState,  Fragment} from "react";
import { useNavigate,useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Header from "../Header";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import "./surveyQuestionsForm.css";
import "../commonStyles/Styles.css";
import {RatingArray,productRevivew,userRatings} from "../helper/data";
// import "survey-react/survey.css";
// import * as Survey from "survey-react"
// // import { useLocation } from "react-router-dom";
// import {SurveyJson} from "../helper/data"
// // import { navigate } from "react-router-dom";
// import Logout from "../Logout";
// const HEADERS = { "Content-Type": "application/json" };
// const HEADERS_PLAIN = { "Content-Type": "text/plain" };

//const HEADERS={'Access-Control-Allow-Origin:':'*'};
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

let sampleArray = []
function SurveyQuestionsForm(props) {
  const navigate = useNavigate();
  const {email,surveyId} = useParams()
  const [radiovalue, setRadioValue] = useState('');
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [userRatingStatus, setUserRatingStatus] = useState('');
  const [needToChangeText, setNeedToChangeText] = useState('');
 
  
 

 
  const handleRatingChange = (item) => {
     setRadioValue(item)
  }
const handleCheckBoxChange = (item) => {
  sampleArray.push(item)
  setCheckboxValues(sampleArray)
}
const handleUserRatingChange = (item) => {
  setUserRatingStatus(item)
}
const onhandleTextAreaCahnge = (value) => {
  setNeedToChangeText(value)
}
const handleSubmit = () => {
  let productReviewList = checkboxValues.filter((c, index) => {
    return checkboxValues.indexOf(c) === index;
});
  const payload = JSON.stringify({ 
    surveyId: surveyId,
    email: email,
    userRating: radiovalue,
    productReview: productReviewList,
    userReview: userRatingStatus,
    productDesc: needToChangeText
  })
  axios
  .post("https://morning-beyond-34988.herokuapp.com/api/saveAnswers", payload, { headers: HEADERS })
  .then((resp) => {
    console.log(resp.data)
    let result = resp.data ? resp.data : '';
    if (result === "success") {
      navigate("/thankyouPage");
    } else {
      // setDisplayResult("Invalid credentials");
    }
  });
}



 let ratingValues = RatingArray.map((item,index) => {
          return (
            <div className="rating-display">
                 <Form.Group className="mb-3" controlId="formBasicRadio">
            <Form.Check inline label={index}  name="group1" type="radio"  onChange={() => handleRatingChange(item)}/>
          </Form.Group>
            </div>
           
          )
 })
let productRatingValue = productRevivew.map((item) => {
       return (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check inline label={item} name="group1" type="checkbox"  onChange={() => handleCheckBoxChange(item)}/>
      </Form.Group>
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
         <p>1. On a scale of zero to ten, how likely to recommend our product to a friend or colleague ? rating</p>
         {ratingValues}
       </div>
       <div className="home_page">
         <p>2. Which of the following phrases best sums up our product?</p>
         {productRatingValue}
       </div>
       <div className="home_page">
         <p>3. How would you rate your experience with our product?</p>
         {userRatingValues}
       </div>
       <div className="home_page">
         <p>4. Could you please provide us with the review to improve our product?</p>
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

export default SurveyQuestionsForm;
