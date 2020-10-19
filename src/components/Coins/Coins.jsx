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



export default class Coins extends Component {
    constructor(props) {
        super(props);
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
                          this.props.coinData.map( ({name, ticker, price }) =>
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