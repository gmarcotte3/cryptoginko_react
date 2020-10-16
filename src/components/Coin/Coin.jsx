
 import React, { Component } from 'react'
 import './Coin.css';
 import PropTypes from 'prop-types';

 const coingeckoService = require('../../services/coingeko-service');
 
 /**
  * This class represents a crypto coin with attributes of name, ticker, and price
  * This class also has a member function that get the current price from the internet.
  */
 export default class Coin extends Component {
     constructor(props) {
         super(props);
         this.state = {
             price: this.props.price
         }

         // tricky dicky sht. the following statement is the way we connect the member function
         // handleClick() to the class.
         this.handleClick = this.handleClick.bind(this); 
     }
     
     
     render() {
         return (
            <tr className="coin-row">
                <td>{this.props.name}</td>
                <td>{this.props.ticker}</td>
                <td>${this.state.price}</td>
                <td>
                    <button onClick={this.handleClick}>Refresh</button>
                </td>
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
   
    console.log("what is thisThing", thisThing);  
    coingeckoService.getPriceQuote(gekocoinid, (response) => {
        console.log("maded it back from geko call",response);
        console.log(response.currency, response.usd);
        console.log("what is thisThing", thisThing);  
        thisThing.setState( function (oldState) {
            return { 
                price: response.usd
            }
        }); 
        callback(response);
    });
    
 }
 