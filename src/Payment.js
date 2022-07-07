import {useEffect,useState,Fragment} from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Navbar'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
 
 
 function Payment(){

    return (
        <div>
<head>
<title>Payment</title>
</head>

<body class="payment">

	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Payment Details</h3>
						
					</div>
					<div  class="panel-body">
						<form role="form">
							<div class="form-group">
								<label for="cardNumber"> CARD NUMBER</label>
								<div class="input-group">
									<input type="text" class="form-control" id="cardNumber"
										placeholder="Valid Card Number" value="487534584589357" required autofocus readonly/> <span
										class="input-group-addon"><span
										class="glyphicon glyphicon-lock"></span></span>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-7 col-md-7">
							<label for="expityMonth"> EXPIRY DATE</label>	
									<div class="form-group">
										<div class="col-xs-6 col-lg-6 pl-ziro">
											<input type="text" class="form-control" id="expityMonth"
												placeholder="MM" value="08" readonly />
										</div>
										<div class="col-xs-6 col-lg-6 pl-ziro">
											<input type="text" class="form-control" id="expityYear"
												placeholder="YY" value="2025" readonly />
										</div>
									</div>
								</div>
								<div class="col-xs-5 col-md-5 pull-right">
									<div class="form-group">
										<label for="cvCode"> CV CODE</label> <input type="password"
											class="form-control" id="cvCode" value="458" placeholder="CV" required readonly/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			
				<br /> 
				<a 
					class="btn btn-success btn-lg btn-block" role="button">Pay</a>
			
					
			</div>
		</div>
	</div>
</body>
</  div>
)
}

export default Payment;