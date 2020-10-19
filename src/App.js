/**
 * Crypto currency portfoilo tracker application.
 * version: prototype
 * This application uses nodeJS with React and a Database
 * see readme file for details.
 * 
 */
import React from 'react';
import logo from './tranquility200x.png';
import './App.css';
import Coins from './components/Coins/Coins';
import Tabs from  "./components/Tabs/Tabs"; 

/**
 * the main line of the crypto ginko application.
 * displays the menu and builds all the components under it.
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 10001,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price:0
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
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="react logo" className="App-logo" />
          <h1 className="apt-title">Crypto Ginko Portfolio Management</h1>
        </header>
        <Tabs> 
          <div label="current prices">
            <Coins coinData={this.state.coinData} />
          </div> 
          <div label="portfolio"> 
            <Tabs>
              <div label="overall">
                <h1>Protfolio total value</h1>
                coming to a screen near you
              </div>
              <div label="By Wallet">
                <h1>By wallet value break down</h1>
                coming to a screen near you
              </div>
              <div label="By Coin">
                <h1>By Coin value break down</h1>
                coming to a screen near you
              </div>
            </Tabs>
          </div> 
          <div label="import wallet csv"> 
            <Tabs>
              <div label="Import Exodus">
                <h1>Protfolio total value</h1>
                coming to a screen near you
              </div>
              <div label="Import Ginko">
                <h1>By wallet value break down</h1>
                coming to a screen near you
              </div>
              <div label="Export Ginko">
                <h1>By Coin value break down</h1>
                coming to a screen near you
              </div>
            </Tabs>
          </div> 
      </Tabs> 
        
      </div>
    );
  }
}
