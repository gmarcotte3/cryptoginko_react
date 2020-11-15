
// crypto Address object
module.exports =  class CryptoAddress {
  constructor( address, currency, wallet, coinbalance, memo, lastupdated) {
    this.address = address;
    this.coinbalance = coinbalance;
    this.currency = currency;
    this.wallet = wallet;
    this.memo = memo;
    this.lastupdated = lastupdated;
  };

}