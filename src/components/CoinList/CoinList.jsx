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

export default class CoinList extends Component {
    // render as a table of coins
    render() {
        return (
            <div label="current prices">
                <Table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ticker</th>
                            <th>Price USD</th>
                            <th>Price NZD</th>
                            <th>Price JPY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // TODO need to future proof this call, pass all the props
                          this.props.coinData.map( ({name, ticker, price, nzd, usd, jpy }) =>
                            <Coin key={ticker} 
                                name={name} 
                                ticker={ticker} 
                                price={price} 
                                nzd={nzd} 
                                usd={usd}
                                jpy={jpy}
                                />
                            )  
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}