
 import React, { Component } from 'react'
 //import './Coin.css';
 import PropTypes from 'prop-types';
 import styled from 'styled-components'

 const coingeckoService = require('../../services/coingeko-service');
 

 // styled TD
const TD = styled.td`
border: 1px solid #2c2b2b;
width : 25vh;
`;

// Styled button
const Button = styled.button`
border: 3px solid blue;
background-color: black;
color:white;
border-radius: 10px;
font-size: 18px;
text-align: center;
width: 150px;
`;
 /**
  * This class represents a crypto coin with attributes of name, ticker, and price
  * This class also has a member function that get the current price from the internet.
  */
 export default class Coin extends Component {
     constructor(props) {
         super(props);
         this.state = {
             name: this.props.name,
             ticker: this.props.ticker, 
             price: this.props.price
         }

         // tricky dicky sht. the following statement is the way we connect the member function
         // handleClick() to the class.
         this.handleClick = this.handleClick.bind(this); 
     }
     
     
     render() {
         return (
            <tr className="coin-row">
                <TD>{this.props.name}</TD>
                <TD>{this.props.ticker}</TD>
                <TD>${this.state.price}</TD>
                <TD>
                    <Button onClick={this.handleClick}>Refresh</Button>
                </TD>
            </tr>
         )
     }

     /**
      * Come here when you need to process a mouse click event on the refresh coin button.
      * @param {*} event 
      */
     handleClick(event) {
        event.preventDefault();
        console.log("this.props.ticker=", this.props.ticker);
        
        this.getPriceQuoteFromCoingeko( this, this.props.ticker, (response)=> {
            // kind of a useless call back function here.
            console.log("returned from getting data from geko and updating it");
        });
     }
     
 }  //endCoin

 // data member requirements and type.
 Coin.protoType = {
     name: PropTypes.string.isRequired,
     ticker: PropTypes.string.isRequired,
     price: PropTypes.number.isRequired
 }

 /**
  * get all the prices from geko service. 
  * @param {*} callback 
  */
 Coin.prototype.getPricesFromCoingeko = function (callback) {
    console.log("getting prices");
   
    coingeckoService.getPriceQuotes((response) => {
        console.log("geko response=", response);  
        callback(response);
    })
    
 }

 /**
  * when mouse click we come here to get a fresh quote from geko for a particular coin.
  * then set the state for that coin.
  * 
  * @param {*} thisThing a pointer to the coin object so I can update the state
  * @param {*} ticker       
  * @param {*} callback     call this with the results.
  */
 Coin.prototype.getPriceQuoteFromCoingeko = function (thisThing, ticker, callback) {
    console.log("getting price for ", ticker);

    let gekocoinid = coingeckoService.getTickerFromName(ticker);
    console.log( "gekoid=", gekocoinid);
     
    coingeckoService.getPriceQuote(gekocoinid, (response) => {
        console.log("maded it back from geko call",response);
        console.log(response.currency, response.usd);
        thisThing.setState( function (oldState) {
            return { 
                price: response.usd
            }
        }); 
        callback(response);
    });
    
 }
 