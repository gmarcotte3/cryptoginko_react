/**
 * coin geko service.
 * this service will retrive a crypto coin price quote from coingeko.com API
 * https://www.coingecko.com/en/api
 * 
 * 
 * TODO
 * deprecated pending: this service can be replaced by nodejs module found at:
 * https://github.com/miscavage/CoinGecko-API
 * 
 * use the following command to install the module.
 * npm install coingecko-api
 * 
 */
const axios = require('axios');
const request = require('request');



const EXTERNAL_URL = "https://api.coingecko.com/api/v3/coins";

// this will convert our ticker to a coin gecko coinID
const cryptoCurrencyToCoingekoID = { 
    ADA : 'cardano',
    DASH: 'dash', 
    BTC : 'bitcoin', 
    BCH : 'bitcoin-cash', 
    EOS : 'eos',
    ETH : 'ethereum', 
    IOT : 'iota',
    LTC : 'litecoin',
    NEM : 'nem',
    NEO : 'neo',
    XRM : 'monero',
    XLM : 'Stellar',
    ZEC : 'Zcash', 
    LINK: 'chainlink',
    MKR : 'maker'
}

/**
 * converts a ticker into a coingeko ID
 * @param {*} ticker 
 */
const getTickerFromName = (ticker) => {
    let gekoID = cryptoCurrencyToCoingekoID[ticker];
    if ( !gekoID ) {
        return ({err: "invalid currency name", coinName: ticker});
    } else {
        return ( gekoID );
    }
}
module.exports.getTickerFromName = getTickerFromName;

/**
 * gets a single price quote in number of fiat currencies 
 * The price quote will return with the price aas properties of diffeent fiat currentcies nzd, usd, jpy, gbp, eur, aud 
 * 
 * @deprecated
 * @param {*} ticker    The coin to get the price quote 
 * @param {*} callback  call when data is ready
 */
const getPriceQuote = (ticker, callback) => {
    let url = EXTERNAL_URL + '/' + ticker;
    console.log( "trying url="+url)
    request( url, { json: true }, (err, res, body) => {
        if (err) {
            return (callback(err))
        }

        return callback( { currency : ticker, 
            nzd : body.market_data.current_price.nzd, 
            usd : body.market_data.current_price.usd, 
            jpy : body.market_data.current_price.jpy,
            gbp : body.market_data.current_price.gbp,
            eur : body.market_data.current_price.eur,
            aud : body.market_data.current_price.aud
         });
    });

}
module.exports.getPriceQuote = getPriceQuote; 

/**
 * This functon will return all the prices coin geko is tracking
 * {currency, nzd, usd, jpy, gbp, jpy, gbp, eur, aud}
 * @depricated
 */
const getPriceQuotes = (callback) => {
    let url = EXTERNAL_URL;
    console.log( "trying url="+url)
    request( url, { json: true }, (err, res, body) => {
        if (err) {
            return (callback(err))
        }
        let results = [];

        body.forEach(element => {
            results.push( {currency : element.symbol.toUpperCase(), 
                nzd : element.market_data.current_price.nzd, 
                usd : element.market_data.current_price.usd, 
                jpy : element.market_data.current_price.jpy,
                gbp : element.market_data.current_price.gbp,
                eur : element.market_data.current_price.eur,
                aud : element.market_data.current_price.aud
             });
        });

        return callback( results );
        //return callback(body.market_data.current_price);
    });

}
module.exports.getPriceQuotes = getPriceQuotes; 


const getCurrentPrices = (back ) => {
    axios.get(EXTERNAL_URL)
    .then( res => {
 //       let coinData = res.data.slice(0,COIN_COUNT).map(function(coin) {
        let coinData = res.data.map(function(coin) {
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

module.exports.getCurrentPrices = getCurrentPrices;