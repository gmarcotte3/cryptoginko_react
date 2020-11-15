import React from 'react';
import Coin from '../Coin/Coin';
import styled from 'styled-components'
const CoinGecko = require('../../services/CoinGecko');
const databaseService = require('../../services/database/DatabaseServiceMySql');

const Table = styled.table`
    font-size: 1rem;
  }
`;

const Div = styled.div`
    background: #2B2B2B 0% 0% no-repeat padding-box;
    opacity: 1;
    height: 44px
`;

// Styled button
const Button = styled.button`
    font-size: 11px;
    width: 64px;
    margin: 3px 5px 0;
    vertical-align: middle;
`;


export default function CoinList(props) {
    // render as a table of coins

    const handleRefresh = (event) => {
        event.preventDefault();
        CoinGecko.getCurrentPrices( handleUpdateMyCoins );
    }

    const handleUpdateMyCoins = (coinData ) => {
        console.log(coinData);
        props.handleUpdateMyCoins(coinData);
//        databaseService.saveAddresses( coinData, function callBack() {
//            console.log("finised saving current prices");
//        } );
    }
    
    
    return (
        <div label="current prices">
            <Button className="btn btn-info" onClick={handleRefresh}>Refresh</Button>
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
                        props.coinData.map( ({name, ticker, price, nzd, usd, jpy }) =>
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