const ioClient = require("socket.io-client");
const _ = require('lodash');

const socket = ioClient.connect(
  "wss://exchange-websocket.unicoindcx.com/ticker",
  {
    path: "/public",
  }
);

let bidPrice = null, askPrice = null, volume = null;// Variable to store UnicoinDCXLastPrice
console.log("🚀 ~ file: unicoindcx.js:12 ~ bidPrice:", bidPrice)

socket.on("events", (data) => {
    const symbol = _.get(data, 'data.symbol.symbol');

    if (symbol === 'BTCUSDT') {
      // console.log("Data", data.data)
        volume = _.get(data, 'data.last_qty');
        askPrice = _.get(data, 'data.best_ask_price');
        bidPrice = _.get(data, 'data.best_bid_price');       
    }
});

function getLastPrice(){
  return [{
        "UDCXBestBidPrice": bidPrice, 
        "UDCXBestAskPrice": askPrice, 
        "UDCXVolume": volume,
      },"UnicoinDCX"];
}

module.exports ={
  getLastPrice
}