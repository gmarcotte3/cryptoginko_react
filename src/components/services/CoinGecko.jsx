
import axios from 'axios';


const COIN_COUNT = 35;

const getCurrentPrices = (back ) => {
    axios.get('https://api.coingecko.com/api/v3/coins')
    .then( res => {
        let coinData = res.data.slice(0,COIN_COUNT).map(function(coin) {
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
          back(coinData);
    });

}





export {
    getCurrentPrices
}
