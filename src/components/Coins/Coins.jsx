import React, { Component } from 'react';
//import './Coins.css';
import Coin from '../Coin/Coin';
import styled from 'styled-components'

const Table = styled.table`
    margin: 50px auto 50px auto;
    display: inline-block;
    font-size: 1.4rem;
  }
`;

// temparary list of my default coins. TODO: this will be loaded from a database
const baseCoins = [
    {
        name: 'Bitcoin',
        ticker: 'BTC', 
        price: 0
    },
    {
        name: 'bitcoin-cash',
        ticker: 'BCH', 
        price: 0
    },
    {
        name: 'Ethereum',
        ticker: 'ETH', 
        price: 0
    },
    {
        name: 'Dash',
        ticker: 'DASH', 
        price: 0
    }

];

export default class Coins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coins: baseCoins,
        }
    }
    

    // render as a table of coins
    render() {
        return (
            <div label="current prices">
                <Table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ticker</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          this.state.coins.map( ({name, ticker, price }) =>
                          <Coin key={ticker} 
                                name={name} 
                                ticker={ticker} 
                                price={price} />
                        )  
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}