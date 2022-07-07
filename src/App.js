import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Form from 'react-bootstrap/Form'
// import { Button, Navbar } from 'react-bootstrap'
import Home from './home/Home';
import SurveyQuestions from './surveyQuestions/SurveyQuestionsForm';
import CreateSurvey from './createSurvey/CreateSurvey';
import Login from './login/Login';
import ThankyouPage from './thankyou/ThankyouPage';
import Register from './register/Regiser';
import Visualization from './visualization/VisualizationPage';



function App() {
return( 
   <Router>
    <Routes>
    <Route exact path="/" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/home" element={<Home/>} />
    <Route exact path="/surveySubmit/:email/:surveyId" element={<SurveyQuestions/>} />
   <Route exact path="/createSurvey" element={<CreateSurvey/>} />
   <Route exact path="/thankyouPage" element={<ThankyouPage />} />
   <Route exact path="/visualization" element={<Visualization />} />
    </Routes>
    </Router>
  );


}

export default App;
