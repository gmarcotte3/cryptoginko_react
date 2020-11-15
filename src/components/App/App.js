/**
 * Crypto currency portfoilo tracker application.
 * version: prototype
 * This application uses nodeJS with React and a Database
 * see readme file for details.
 * 
 */
import React, {useState, useEffect} from 'react';
import './App.css';
import CoinList from '../CoinList/CoinList';
import GinkoHeader from '../GinkoHeader/GinkoHeader';
import Tabs from  "../Tabs/Tabs"; 
import Portfolio from '../Portfolio/Portfolio';
import ImportWalletCSV from '../ImportWalletCSV/ImportWalletCSV';
 
//name, ticker, price, nzd, usd, jpy 

const myCoins0 = [
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    price: 0.0,
    nzd: 0.0,
    usd: 0.0,
    jpy: 0.0
  },
  {
    name: 'bitcoin-cash',
    ticker: 'BCH',
    price: 0.0,
    nzd: 0.0,
    usd: 0.0,
    jpy: 0.0
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    price: 0.0,
    nzd: 0.0,
    usd: 0.0,
    jpy: 0.0
  },
  {
    name: 'Dash',
    ticker: 'DASH',
    price: 0.0,
    nzd: 0.0,
    usd: 0.0,
    jpy: 0.0
  },
  {
    name: 'Cardano',
    ticker: 'ADA',
    price: 0.0,
    nzd: 0.0,
    usd: 0.0,
    jpy: 0.0
  }
]


/**
 * the main line of the crypto ginko application.
 * displays the menu and builds all the components under it.
 */
export default function App(props) {

  const [myCoins, setMyCoins] = useState([]);
  const [defaultFiatCurrency, setDefaultFiatCurrency] = useState('NZD');

  const [totalValue, setTotalValue] = React.useState(-1);
  const [porfolioFiatValues, setPortfolioFiatValues] = React.useState([]);
  const [portfolioByCoins, setPortfolioByCoins] = React.useState([]);

  
  const handleUpdateMyCoins = (coinData1 ) => {
//    let coinData2 = filterOutCoinsNotInThePortfiolo(coinData1)
    setMyCoins([...coinData1]);
  }

  const filterOutCoinsNotInThePortfiolo = (coinsIn) => {
    let coinsOut = [];
    for ( let j=0; j< coinsIn.length; j++) {  
      for ( let i = 0; i< myCoins0.length; i++) {
        if (myCoins0[i].ticker === coinsIn[j].ticker ) {
          coinsOut.push(coinsIn[j]);
          break;
        }
      }
    }
    return coinsOut;
  };

  useEffect( function() {
      if ( totalValue < 0)
      {
        setTotalValue(0);
        console.log("refreshing now ..... ");
      }
  });

  
    return (
      <div className="App">
        <GinkoHeader />
        <Tabs> 
          <div label="Portfolio"> 
            <Portfolio />
          </div> 
          <div label="current prices">
            <CoinList coinData={myCoins} handleUpdateMyCoins={handleUpdateMyCoins}/>
          </div> 
          <div label="import wallet csv"> 
            <ImportWalletCSV />
          </div> 
      </Tabs> 
        
      </div>
    );
  
}
