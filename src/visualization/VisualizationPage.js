import React, {useState,  Fragment} from "react";
import {sampleVisualzieddata} from '../helper/data';
import Header from "../Header";
import HorizontalBarChart from '../charts/HorizontalBarChart';
import "./visualizationPage.css";

export default function Visualization(){

    return(
        <Fragment>
             <Header />
             <div className="visual_page">
                 <p>1. RatingReview :</p>
              <HorizontalBarChart id={0} horizontalbarVisualzieddata={sampleVisualzieddata[0].ratings}/>
       </div>
        </Fragment>
    )
}