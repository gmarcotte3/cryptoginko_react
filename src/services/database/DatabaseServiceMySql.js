'use strict';

/**
 * MySQL service
 */
const mysql = require('mysql');
const CryptoAddress = require('./CryptoAddress');
//const currentprice = require('../CurrentPrice');
const PortfolioSummary = require('./PortfolioSummary');

//var readConfig = require('read-config'),
//    config = readConfig('config.json');

const config = {
        "applicationInstanceName" : "georgesWallet",
        "node_port": 3000,
        "dbhost" : "172.17.0.2",
        "dbuser" : "gmarcotte",
        "dbpassword" : "letMeInn2020",
        "database" : "cryptoginkotest"
    };

// connection object parameters from the config.json file
var connection = mysql.createConnection({
    // connection properties here
    host : config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.database,
    multipleStatements: true
});



/**
 * get a list of addresses.
 * 
 * @param {*} req 
 *                 id      : optional id of the address ( if pressent will only return one address if it exists)
 *                 currency: optional returns all addresses filtered by currency.
 *                 wallet  : optional return all addresses filtered by wallet name. 
 * @param {*} callBack function. 
 */
function getAddress(req, callBack) {
    // console.log("parameters=", req.query);                      //debuggery
    // console.log("parameter id=", req.query.id);                 //debuggery
    // console.log("parameter currency=", req.query.currency);     //debuggery
    // console.log("parameter wallet=", req.query.wallet);         //debuggery

    var addreses = [];

    var query = "SELECT address, currency, walletname, coinbalance, memo, lastupdate FROM addresspublic ORDER BY currency, walletname, address, lastupdate;";
    connection.query(query, null, function(err,results)  {

        if ( !!err ) {
            console.log('sql error', err);
            callBack({ "status": "failure", "addresses" : [], "err" : err});
        } else {
            
            for( let j = 0; j < results.length; j++) {
                let row = results[j];
                addreses[j] = new CryptoAddress( row.address, row.currency, row.walletname,row.coinbalance, row.memo, row.lastupdate);
            }             
            callBack({ "status": "success", "addresses" : addreses});
        }
    });
}


function saveAddresses( addresses, callBack ) {
    var numRecordsToInsert = addresses.length;
    console.log("saveAddresses number of addresses to save: ", numRecordsToInsert);
   
    var query = "";


    let addr = addresses[0];

    for ( var j=0; j < addresses.length; j++) {
        query = query.concat("INSERT INTO addresspublic (address, coinbalance, currency, walletname, memo) VALUES ");
      let addr = addresses[j];      
      let valueStr = `( '${addr.address}', ${addr.coinbalance}, '${addr.currency}', '${addr.wallet}', '${addr.memo}') `;
      query = query.concat(valueStr);

      let updateStr = ` ON DUPLICATE KEY UPDATE coinbalance=${addr.coinbalance}, walletname='${addr.wallet}', memo='${addr.memo}'; `;
      query = query.concat(updateStr);
    }

    console.log("query=", query);
    connection.query(query, null, function(err,results) {
        if (err) throw err;
        callBack();
    }); 

}


function saveCurrentPrice( currentprice, callBack ) {
    var numRecordsToInsert = currentprice.length;
    console.log("saveCurrentPrice Number of prices to save: ", numRecordsToInsert);
   
    var query = "";


    for ( var j=0; j < currentprice.length; j++) {
      
      let cprice = currentprice[j];
      
      query = query.concat("insert into currentprice ( currency, jpy, usd, nzd, gbp, eur, aud ) Values ");

      let valueStr = `( '${cprice.currency}', ${cprice.jpy}, ${cprice.usd}, ${cprice.nzd}, ${cprice.gbp}, ${cprice.eur}, ${cprice.aud})`;
      query = query.concat(valueStr);

      let updateStr = ` ON DUPLICATE KEY UPDATE jpy=${cprice.jpy}, usd=${cprice.usd}, nzd=${cprice.nzd}, gbp=${cprice.gbp}, eur=${cprice.eur}, aud=${cprice.aud}; `;
      query = query.concat(updateStr);
    }

    //console.log( "saveCurrentPrice ", currentprice[0]); // debuggery
    //console.log("query=", query);  //debuggery
    connection.query(query, null, function(err,results) {
        if (err) throw err;
        callBack();
    }); 

}

/**
 * calculates the sum of coin balance and sum of value in the specified fiat currency.
 * 
 * this function validates the fiat currency type and will default if fiat currency type is not
 * valid or missing.
 * 
 * @param {*} fiat 
 * @param {*} callBack 
 */
function getPortfolioSummaryByCurrencyAndWallet(fiat, callBack) {
    var portSum = [];

    var fiatSymbolPostfix = '';
    var fiatSymbolPrefix = '';
    var fiatType = "";
    var fiatMultiplayer = 1.0;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    switch ( fiat ) {
        case 'nzd':
            fiatType = 'cp.nzd';
            fiatSymbolPrefix = '$';
            formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'NZD',
              });
              fiatMultiplayer = 1.0;
            break;
        case 'jpy':
            fiatType = 'cp.jpy';
            fiatSymbolPostfix = '万';
            formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'JPY',
              });
              fiatMultiplayer = 10000.0;
            break;
        case 'usd':
            fiatType = 'cp.usd';
            fiatSymbolPrefix = '$';
            formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              });
              fiatMultiplayer = 1.0;
            break;
        case 'eur':
            fiatType = 'cp.eur';
            formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'EUR',
              });
              fiatMultiplayer = 1.0;
            break;
        case 'gbp':
            fiatType = 'cp.aud';
            fiatSymbolPrefix = '$';
            formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'GBP',
              });
              fiatMultiplayer = 1.0;
            break;
        case 'aud':
            fiatType = 'cp.nzd';
            fiatSymbolPrefix = '$';
            formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'AUD',
            });
            fiatMultiplayer = 1.0;
            break;
    
        default:
            fiatType = 'cp.usd';
            fiatSymbolPostfix = '';
            formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'NZD',
              });
            fiatMultiplayer = 1.0;
    }

    var query = 
    `SELECT ap.currency, ap.walletname, sum(ap.coinbalance) as coinbal, sum(coinbalance)*${fiatType} as fiat FROM addresspublic as ap join currentprice as cp on ( ap.currency = cp.currency) group by ap.currency, ap.walletname; `;

    connection.query(query, null, function(err,results)  {

        if ( !!err ) {
            console.log('sql error', err);
            callBack({ "status": "failure", "addresses" : [], "err" : err});
        } else {
            var totalFiat = 0.0;
            for( let j = 0; j < results.length; j++) {
                let row = results[j];
                portSum[j] = new PortfolioSummary( row.currency, row.walletname, row.coinbal, (formatter.format(row.fiat / fiatMultiplayer )  + fiatSymbolPostfix), null);
                totalFiat = totalFiat + row.fiat;
            }    
            var totalFiatFormated = formatter.format(totalFiat / fiatMultiplayer ) + fiatSymbolPostfix ; //fiatSymbolPrefix + totalFiat.toFixed(2) + fiatSymbolPostfix;    
            callBack({ "status": "success", "portSum" : portSum, "totalFiat" : totalFiatFormated });
        }
    });
}


module.exports = { getAddress, saveAddresses, saveCurrentPrice, getPortfolioSummaryByCurrencyAndWallet }
