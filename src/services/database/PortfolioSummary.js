/**
 * portfolio report data line.
 */
module.exports =  class PortfolioSummary {
    constructor( currency, walletname, coinbalance, fiat, lastupdated) {
      this.currency = currency;
      this.walletname = walletname;
      this.coinbalance = coinbalance;
      this.fiat = fiat;
      this.lastupdated = lastupdated;
    };
}