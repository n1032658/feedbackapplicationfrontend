import React, {useState,useEffect,Fragment} from "react";


import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
// import { MDBDataTable } from 'mdbreact';
import Header from "../Header";
import Loader from '../liberary/Loader';
import CsvDownloader from 'react-csv-downloader';

import "../commonStyles/Styles.css";
// import {tableData} from "../helper/data";
import axios from "axios";
import DeleteModel from './DeleteModel';
import ReplyModel from './ReplyModel';
import "./Home.css";



const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const columns = [{
  id: 'email',
  displayName: 'Email'
}, {
  id: 'userRating',
  displayName: 'Rating'
},
{
  id: 'userReview',
  displayName: 'User Statisfaction'
},
{
  id: 'productDesc',
  displayName: 'Review Comments'
},
{
  id: 'sentiment',
  displayName: 'Opinion'
},
{
  id: 'lastResponded',
  displayName: 'Responded Time'
}
];
export default function Home(){
  const [tableDataList, setTableDataList] = useState('')
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [dataMsg, setDataMsg] = useState('');
  const [deleteObj, setDeleteObj] = useState({});
  const [showDeletemodel, setShowdeleteModel] = useState(false);
  const [showReplyModel, setShowReplyModel] = useState(false);
  const [replyData, setReplyData] = useState({});
  const [csvDownloaderData, setCsvDownloaderData] = useState([])
  const [rerender, setRerender] = useState(false);
  const [mainTableData, setMainTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
 

  useEffect(() => {
    getTableData()
},[])

useEffect(() => {
    if(searchTerm === ''){
      getTableData()
    }
},[searchTerm])
    

   const handleDeletingTable = (id,title) => {
    setDeleteObj({deleteId: id, titleTxt: title})
       setShowdeleteModel(true)
   }
 const handleClosedeleteModel = () => {
  setShowdeleteModel(false)
 
 }
 const handleCloseReplyModel = () => {
  setShowReplyModel(false)
 }
    const getTableData = () => {
      const payload = {
        loggedinusername: localStorage.getItem('username')
    }
    setLoaderStatus(true)
    axios
    .post("https://morning-beyond-34988.herokuapp.com/api/tableData", payload, { headers: HEADERS })
    .then((resp) => {
      let result = resp.data ? resp.data.data ?  resp.data.data : []: [];
      if(result.length){
        setTableDataList(result);
        setMainTableData(result);
        setLoaderStatus(false)
      }else{
        setLoaderStatus(false)
        setDataMsg('No Data Found')
      }
    });
  }
  

  
const handleOpenReplyModel = (email,title) => {
    setReplyData({
      email:email,
      title:title
    })
     setShowReplyModel(true)
}
const handleSearch = (iDValue) => { 
  if(searchTerm !== ''){
    let tableBody = []
    let finalTableData = []
    tableDataList && tableDataList.map((item) => {
         if(iDValue === item.id){
           let searchTermValue = searchTerm.toLowerCase()
           item.tableBody.map((item1) => {
               if(item1.sentiment.toLowerCase().includes(searchTermValue)){
                   if(item1){
                    tableBody.push(item1)
                   }
                  
               }
          })
          
          finalTableData.push({
            "id":item.id,
            "tableBody": tableBody,
            "title": item.title
          })
          
         
         }else{
          finalTableData.push({
            "id":item.id,
            "tableBody": item.tableBody,
            "title": item.title
          })
         }
         setMainTableData(finalTableData)
         setRerender(!rerender);
    })
  }
}

    const tableHeader = () => {
      const tableHeaderData = mainTableData && mainTableData.length && mainTableData.map(({tableBody,title,id}) => {
      return (<div className="home_table_page">
        <h3>{title}</h3>
        <div className="downloader-button">
      <CsvDownloader
        filename={title}
        extension=".csv"
        columns={columns}
        datas={tableBody}
        className="download-button-style"
        text="Download CSV" />
    </div>
        <div className="table-header">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
      </Form.Group>
      <Button className="search-button" size="sm" onClick={() => handleSearch(id)}>Search</Button>
        <Button className="button-align" size="sm" onClick={() => handleDeletingTable(id,title)}>Delete Table</Button>
        </div>
        <Table striped bordered hover>
          {
                    <thead>
                    <tr>
                   <th>Email</th>
                   <th>Rating</th>
                   <th>User Statisfaction</th>
                   <th>Review Comments</th>
                   <th>Opinion</th>
                   <th>Responded Time</th>
                    </tr>
                  </thead>
          }  
       {
          tableBody.length > 0 ? tableBody.map(({userRating,userReview,productDesc,sentiment,email,lastResponded}) => {
               return (
                <tbody>
                <tr>
                <td>{email}</td>
                <td>{userRating}</td>
                <td>{userReview}</td>
               <td>{productDesc}</td>
               <td>{sentiment}</td>
               <td>{lastResponded}</td>
               <td><Button type="button" className="reply-button" onClick={() => handleOpenReplyModel(email,title)}>Reply</Button></td>
                </tr>
              </tbody>
               )
         
           }) : 'No Data Found'
      
       }
    </Table>
    </div>)
    
    })
         return tableHeaderData
    }

 

   
    return(
        <Fragment>
              <Header />
      
              <DeleteModel deleteObj={deleteObj} showDeletemodel={showDeletemodel} handleClosedeleteModel={handleClosedeleteModel} getTableData={getTableData}/>
              <ReplyModel showReplyModel={showReplyModel} handleCloseReplyModel={handleCloseReplyModel} replyData={replyData}/>
              {loaderStatus ?  <div className="loader-set"><Loader /></div> :  tableHeader()
             }
             {dataMsg ?  <div className="error-set">{dataMsg}</div> : ''}
        </Fragment>
    )
}