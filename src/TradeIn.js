import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import "./App.css";
import { useNavigate } from "react-router-dom";


export default function TradeIn(props){
  const navigate = useNavigate();
const [shareID, setShareID] = useState('');
const [company_name, setCompany_name] = useState('');
const [company_symbol, setCompany_symbol] = useState('');
const [no_of_shares, setNo_of_shares] = useState('');
const [currency, setCurrency] = useState('');
const [price, setPrice] = useState('');
const [last_update, setLast_update] = useState('');
const [shares_quantity, setShares_quantity] = useState("");
const [category, setCategory] = useState("");
const [displayResult, setDisplayResult] = useState('');

    useEffect(() => {
         console.log(props.selectedItem)
         setShareID(props.selectedItem["shareID"])
         setCompany_name(props.selectedItem["company_name"])
         setCompany_symbol(props.selectedItem["company_symbol"])
         setNo_of_shares(props.selectedItem["no_of_shares"])
         setPrice(props.selectedItem["price"])
         setCurrency(props.selectedItem["currency"])
         setLast_update(props.selectedItem["last_update"])
        //setShares_quantity(props.selectedItem["shares_quantity"])
         
    },[props.selectedItem])
    let handleChange=(event) =>{
        this.setShares_quantity({value: event.target.value});
        this.setCategory({value: event.target.value});
      }
   const handlePayment=()=>{
    navigate("/Payment");

   }
   
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(company_name);

    //converts into json format
    const temp=JSON.stringify({
        shareID: shareID,
        company_name: company_name,
        company_symbol:company_symbol,
        currency:currency,
        //no_of_shares:no_of_shares,
        price:price,
        last_update:last_update,
        shares_quantity:shares_quantity,
        category:category
    })
console.log(temp);
    try {
      let res = await fetch("http://localhost:7780/order/calculateCost", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: temp
      });
      let resJson = await res.json();
      console.log(resJson);
      setDisplayResult(resJson.message)
    } catch (err) {
      console.log(err);
    }
  };
    return (<div>
        
<Form onSubmit={handleSubmit}>

<table border="0" cellpadding="5">
      
            <tr>
               
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <td>Enter Share ID</td>
  <td><input type="number" value={shareID}/></td>
    
  </Form.Group>
  </tr>

  <tr>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <td><Form.Label>Company Name </Form.Label></td>
    <td> <input type="text" value={company_name} placeholder="Company Name" /></td>
  </Form.Group>
  </tr>
  <tr>
  <Form.Group className="mb-3" controlId="formBasicPassword">
  <td> <Form.Label>Company Symbol</Form.Label></td>
  <td><input type="text" value={company_symbol} /></td>
  </Form.Group>
  </tr>
  <tr>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <td><Form.Label>Number of shares</Form.Label></td>
  <td><Form.Control type="text" value={no_of_shares} /></td>
  </Form.Group>
  </tr>
  <tr>
  <Form.Group className="mb-3">
  <td><Form.Label style={{color: "red"}}>Enter the quantity*</Form.Label></td>
  <td><Form.Control type="number" required="required" value={shares_quantity} onChange={(e) => setShares_quantity(e.target.value)}  placeholder="Enter the quantity" />
  </td> </Form.Group>
  </tr>
  <tr>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <td><Form.Label>Price</Form.Label></td>
  <td><input type="text" value={price} /></td>
  </Form.Group>
  </tr>
  <tr><div>
   <td> <label>Currency</label></td>
   <td><input type="text" value={currency}/>
   
</td></div></tr><br></br>

  <tr>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <td><Form.Label>Last update date</Form.Label></td>
  <td><Form.Control type="text" value={last_update}/></td>
  </Form.Group> </tr>
  
  <tr><div>
   <td> <label>Buy or Sell</label></td>
    <td><select type="text" value={category} onChange={(e) => setCategory(e.target.value)}>
    <option value="none">Select an Option</option>
<option value="sell">Sell</option>
  <option value="buy">Buy</option> 
</select></td></div></tr><br></br>
<tr>
<td colspan="20" ><input type="submit" style={{color: "white", backgroundColor:"green"}} value="Submit" />{'                 '}
<Button block size="lg" onClick={()=>handlePayment() }>Pay</Button></td></tr>

</table>
</Form>


<span><h1 style={{color: "red", backgroundColor:"yellow"}}>{displayResult} </h1></span>

        </div>
       
    )

}
