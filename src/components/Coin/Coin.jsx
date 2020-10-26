
 import React from 'react'
 import PropTypes from 'prop-types';
 import styled from 'styled-components'

  

// styled TD
const TD = styled.td`
    border: 1px solid #2c2b2b;
    width : 25vh;
`;

// Styled button
/*
const Button = styled.button`
    border: 3px solid blue;
    background-color: black;
    color:white;
    border-radius: 10px;
    font-size: 18px;
    text-align: center;
    width: 150px;
`;
*/

 /**
  * This class represents a crypto coin with attributes of name, ticker, and price
  * This class also has a member function that get the current price from the internet.
  */
 export default function Coin(props) {     
   
    const currencyOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }
    const currencyOptionsJpy = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }

    const getPrice = () => { 
        return (
            props.price.toLocaleString(undefined, currencyOptions)
        );
    }
    const getPriceNZD = () => { 
        return (
            props.nzd.toLocaleString(undefined, currencyOptions)
        );
    }
    const getPriceJPY = () => { 
        return (
            props.jpy.toLocaleString(undefined, currencyOptionsJpy)
        );
    }
    
    return (
        <tr className="coin-row">
            <TD>{props.name}</TD>
            <TD>{props.ticker}</TD>
            <TD>${getPrice()}</TD>
            <TD>${getPriceNZD()}</TD>
            <TD>{getPriceJPY()}円</TD>
        </tr>
    )
    
 }  //endCoin

 // data member requirements and type.
 Coin.protoType = {
     name: PropTypes.string.isRequired,
     ticker: PropTypes.string.isRequired,
     price: PropTypes.number.isRequired
 }
 