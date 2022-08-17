import React, { Fragment } from "react";
import QRImage from '../img/QR-Code-image.jpeg';
import Header from "../Header";
import Figure from 'react-bootstrap/Figure';
import "./QRCode.css"

export default function QRCode(){

    return (
      <Fragment>
        <Header/>
          <div className="qr-code-style">
          <Figure>
      <Figure.Image
        width={450}
        height={450}
        alt="qrcode"
        src={QRImage}
      />
      {/* <Figure.Caption>
        Nulla vitae elit libero, a pharetra augue mollis interdum.
      </Figure.Caption> */}
    </Figure>
          </div>
      </Fragment>
    )
}