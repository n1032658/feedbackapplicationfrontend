import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import Header from "../Header";
import HorizontalBarChart from '../charts/HorizontalBarChart';
import PieChart from '../charts/NewPieChart';
import Loader from '../liberary/Loader';
import "../commonStyles/Styles.css";
import "./visualizationPage.css";
const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
export default function Visualization(){
const [visualizationData, setVisualizationData] = useState([])
const [loaderStatus, setLoaderStatus] = useState(false);
const [dataMsg, setDataMsg] = useState('');

    useEffect(() => {
      getVisualizationData()
    },[])

const getVisualizationData = () => {
    const payload = {
        loggedinusername: localStorage.getItem('username')
    }
    setLoaderStatus(true)
    axios
    .post("https://morning-beyond-34988.herokuapp.com/api/visualization", payload, { headers: HEADERS })
    .then((resp) => {
      console.log(resp)
      let result = resp.data ? resp.data.surveyresult ?  resp.data.surveyresult : []: [];
      if(result.length){
        setVisualizationData(result)
        setLoaderStatus(false)
      }else{
        setLoaderStatus(false)
        setDataMsg('No Data Found')
      }
     
    });
}

function Displaydata(recipients){
  const tableDisplayData = recipients && recipients.length && recipients.map(({productDesc}) => {
    return (
      <div className="table_display">
          {productDesc}
      </div>
    )
})
  return tableDisplayData
}
const responeddata = (recipients) => {
  const statusData = recipients && recipients.length && recipients.map(({responded,email}) => {
    return (
      <div className="table_display">
         {
           responded ? `${email} is responded `: `${email} Not Responded`
         }
      </div>
    )
})
  return statusData
}
 const ChartDisplaydata = () => {
  const chartDisplays = visualizationData && visualizationData.length && visualizationData.map((item,index) => {
            return (
              <div className="main-body">
                  <h3>{item.title}</h3>
                 <div className="visual_page">
                          <p>Status</p>
                   {responeddata(item.recipients)}
                    
                </div>
                  <div className="visual_page">
                          <p>1. RatingReview :</p>
                      <HorizontalBarChart id={item._id} horizontalbarVisualzieddata={item.ratings}/>
                </div>
                 <div className="visual_page">
                 <p>2. ProductRating :</p>
             <PieChart id={index} pieChartVisualzieddata={item.satisfied_status}/>
       </div>
               
                <div className="visual_page">
                          <p>3. ProductReviewDesc :</p>
                    {Displaydata(item.recipients)}
                </div>
              </div>
            )
        })
    return chartDisplays
 }

    return(
        <Fragment>
             <Header />
             {loaderStatus ?  <div className="loader-set"><Loader /></div> :  ChartDisplaydata()
             }
             {dataMsg ?  <div className="error-set">{dataMsg}</div> : ''}
        </Fragment>
    )
}