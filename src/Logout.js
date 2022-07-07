import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Navbar } from "react-bootstrap";
export default function Logout() {

    const navigate = useNavigate();
 const logout =() => {
    localStorage.removeItem('email');
    navigate("/");

    }
return (<div><Button onClick={logout}>LogOut</Button></div>)}