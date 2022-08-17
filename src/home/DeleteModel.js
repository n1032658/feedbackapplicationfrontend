import React, {Fragment} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
export default function DeleteModel({showDeletemodel, deleteObj, handleClosedeleteModel, getTableData}){
   
const handleDelete = () => {
    const payload = {
        loggedinusername: localStorage.getItem('username'),
        surveyid: deleteObj.deleteId
    }
    axios
    .post("https://morning-beyond-34988.herokuapp.com/api/deleteSurvey", payload, { headers: HEADERS })
    .then((resp) => {
      let result = resp.data ? resp.data : '';
      if(result && resp.status === 200){
        getTableData()
        handleClosedeleteModel()
      }else{
      }
    });
}
    return(
        <Fragment>
            <Modal show={showDeletemodel} onHide={handleClosedeleteModel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure want to delete this ${deleteObj.titleTxt} Table`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosedeleteModel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}