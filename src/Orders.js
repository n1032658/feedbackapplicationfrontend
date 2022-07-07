import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import TradeIn from './TradeIn';
import Form from 'react-bootstrap/Form'
import { Button, Navbar } from 'react-bootstrap'
import Header from './Header';
import Logout from './Logout';

const HEADERS={'Content-Type':'application/json'};


//const HEADERS={'Access-Control-Allow-Origin:':'*'};

function Orders() {
  const [data, setData] = useState([]);
  const [pageDisplay, setPagwDisplay] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => { 
axios.get("http://localhost:7780/order/displayOrders",{headers:HEADERS}).then((resp) => {
  //console.log(resp);

  let result =resp.data ? resp.data : []
  setData(result)

})
  },[])
 

  
  
 
  let tableResult = data && data.map((item) => {
     return (
 
<tr>

<td >{item.orderid}</td>
				<td >{item.shareID}</td>
        <td>{item.company_name}</td>
        <td>{item.company_symbol}</td>
        <td>{item.shares_quantity}</td>
        <td>{item.currency}</td>
        <td>{item.price}</td>
        <td>{item.total_price}</td>
        <td>{item.last_update}</td>
        <td>{item.category}</td>
		</tr>

     )
  })
return( 
    <div>
      
        <Header/> <Logout/>
<div align="center">

<h1 style={{color: "blue"}}>My Orders</h1>
<br/><br/>
  
  
 

 <div>
  
  <table  border="1" cellpadding="10" cellspacing="2">

  <thead>

		<tr>
        <th style={{backgroundColor: "lightblue"}}>Order Id</th>
			<th style={{backgroundColor: "lightblue"}}>Share Id</th>
			<th style={{backgroundColor: "lightblue"}}>Company Name</th>
			<th style={{backgroundColor: "lightblue"}}>Company symbol</th>
			<th style={{backgroundColor: "lightblue"}}>Quantity bought</th>
      <th style={{backgroundColor: "lightblue"}}>currency</th>
			<th style={{backgroundColor: "lightblue"}}>Share Price</th>
            <th style={{backgroundColor: "lightblue"}}>Total price</th>
      <th style={{backgroundColor: "lightblue"}}>Last update</th>
      <th style={{backgroundColor: "lightblue"}}>Category</th>
		</tr>
    </thead>
		{tableResult}
	</table>
  </div>
   </div>
    </div>
  );


}

export default Orders;
