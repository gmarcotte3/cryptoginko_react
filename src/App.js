import React from 'react';
import logo from './tranquility200x.png';
import './App.css';
import Coin from './components/Coin/Coin';
import Tabs from "./components/Tabs/Tabs"; 

/**
 * the main line of the crypto ginko application.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="react logo" className="App-logo" />
        <h1 className="apt-title">Crypto Ginko portfolio management</h1>
      </header>
      <Tabs> 
        <div label="current prices"> 
          <table className="coin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ticker</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <Coin name="Bitcoin" ticker="BTC" price={50000.00} />
                <Coin name="Oshirieum" ticker="ETH" price={5000.00} /> 
              </tbody>
          </table>
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

export default App;
