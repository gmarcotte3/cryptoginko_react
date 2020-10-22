/**
 * Crypto currency portfoilo tracker application.
 * version: prototype
 * This application uses nodeJS with React and a Database
 * see readme file for details.
 * 
 */
import React from 'react';
import './App.css';
import CoinList from './components/CoinList/CoinList';
import GinkoHeader from './components/GinkoHeader/GinkoHeader';
import Tabs from  "./components/Tabs/Tabs"; 
import Portfolio from './components/Portfolio/Portfolio';
import ImportWalletCSV from './components/ImportWalletCSV/ImportWalletCSV';
//const coingeckoService = require('./services/coingeko-service');
import axios from 'axios';
 

const COIN_COUNT = 35;

/**
 * the main line of the crypto ginko application.
 * displays the menu and builds all the components under it.
 */
export default class App extends React.Component {
  state = {
    balance: 10001,
    myCoins : [
      {
        name: 'Bitcoin',
        ticker: 'BTC'
      },
      {
        name: 'bitcoin-cash',
        ticker: 'BCH'
      },
      {
        name: 'Ethereum',
        ticker: 'ETH'
      },
      {
        name: 'Dash',
        ticker: 'DASH'
      },
      {
        name: 'Cardano',
        ticker: 'ADA'
      }
    ],
    coinData: [
    ]
  }


  componentDidMount = async () => {
    let response = await axios.get('https://api.coingecko.com/api/v3/coins');
    let coinData1 = response.data.slice(0,COIN_COUNT).map(function(coin) {
      return {
        key:   coin.id,
        name:  coin.name, 
        ticker: coin.symbol.toUpperCase(),
        balance: 0,
        price: coin.market_data.current_price.usd,
        nzd : coin.market_data.current_price.nzd, 
        usd : coin.market_data.current_price.usd, 
        jpy : coin.market_data.current_price.jpy,
        gbp : coin.market_data.current_price.gbp,
        eur : coin.market_data.current_price.eur,
        aud : coin.market_data.current_price.aud
      };
    });
    
    let coinData = this.filterOutCoinsNotInThePortfiolo(coinData1); 
    this.setState({ coinData});
  }

  filterOutCoinsNotInThePortfiolo = (coinsIn) => {
    let coinsOut = [];
    for ( let j=0; j< coinsIn.length; j++) {  
      for ( let i = 0; i< this.state.myCoins.length; i++) {
        if (this.state.myCoins[i].ticker == coinsIn[j].ticker ) {
          coinsOut.push(coinsIn[j]);
          break;
        }
      }
    }
    console.log(coinsOut);
    return coinsOut;
  };

  render() {
    return (
      <div className="App">
        <GinkoHeader />
        <Tabs> 
          <div label="current prices">
            <CoinList coinData={this.state.coinData}/>
          </div> 
          <div label="Portfolio"> 
            <Portfolio />
          </div> 
          <div label="import wallet csv"> 
            <ImportWalletCSV />
          </div> 
      </Tabs> 
        
      </div>
    );
  }
}
