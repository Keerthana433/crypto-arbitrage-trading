// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const binanceModule = require('./binance');
// const krakenModule = require('./kraken');
// const UnicoinDCXLastPrice = require('./unicoindcx');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Your price calculation logic
// function findLowerBidExchange(unicoinDCX, binance, kraken) {
//     const askPriceVolume = 2; //unicoinDCX[0].UDCXVolume
//     const binanceBidPriceVolume = 2; //binance[0].binanceAskPriceVolume
//     const krakenBidPriceVolume = 2; //kraken[0].krakenAskPriceVolume
//     const UDCXVolume = 2;

//     console.log(`Volume: ${askPriceVolume}`);
//     console.log(`unicoinDCX ask Price ${unicoinDCX[0].UDCXBestAskPrice}`);
//     console.log(`Binance Bid Price ${binance[0].binanceBestBidPrice}`);
//     console.log(`Kraken Bid Price ${kraken[0].krakenBestBidPrice}`);

//     // Initialize variables to track minimum ask price and corresponding exchange
//     let minAskPrice = Infinity;
//     let minExchangeName = "";

//     // Compare ask prices and find the minimum using if conditions
//     if (binance[0].binanceBestAskPrice < minAskPrice) {
//       minAskPrice = binance[0].binanceBestAskPrice;
//       minExchangeName = binance[1];
//     }

//     if (kraken[0].krakenBestAskPrice < minAskPrice) {
//       minAskPrice = kraken[0].krakenBestAskPrice;
//       minExchangeName = kraken[1];
//     }

//     if (unicoinDCX[0].UDCXBestAskPrice < minAskPrice) {
//       minAskPrice = unicoinDCX[0].UDCXBestAskPrice;
//       minExchangeName = unicoinDCX[1];
//     }

//     // Log the result
//     console.log("Smallest Ask Price:", minAskPrice);
//     console.log("Exchange Name:", minExchangeName);
//     // console.log(`Order to Buy from ${minExchangeName}`);
//      // Buy logic
//      if (askPriceVolume > 0) {
//         console.log(`Order Buying for ${askPriceVolume} volume at ${minAskPrice}`);
//         // Implement your buy logic here, e.g., placing a buy order
//       }

//     let maxBidPrice = Infinity;
//     let maxBidExchangeName = "";
//     let bidPriceVolume =  "";

//     // Compare ask prices and find the minimum using if conditions
//     if (binance[0].binanceBestBidPrice > minAskPrice && binanceBidPriceVolume === askPriceVolume) {   //binance[0].binanceBidPriceVolume
//       maxBidExchangeName = binance[1];
//       maxBidPrice = binance[0].binanceBestBidPrice;
//       bidPriceVolume = binanceBidPriceVolume
//     }

//     if (kraken[0].krakenBestBidPrice > minAskPrice && krakenBidPriceVolume === askPriceVolume) {   //kraken[0].krakenBidPriceVolume
//       maxBidExchangeName = kraken[1];
//       maxBidPrice = kraken[0].krakenBestBidPrice;
//       bidPriceVolume = krakenBidPriceVolume
//     }

//     let UDCXBestBidPrice = unicoinDCX[0].UDCXBestBidPrice;
//     UDCXBestBidPrice = UDCXBestBidPrice.toString();

//     if (UDCXBestBidPrice > minAskPrice && UDCXVolume === askPriceVolume) {   //unicoinDCX[0].UDCXVolume
//       maxBidExchangeName = unicoinDCX[1];
//       maxBidPrice = unicoinDCX[0].UDCXBestBidPrice;
//       bidPriceVolume = UDCXVolume
//     }

//     // Log the result
//     console.log("High Bid Price:", maxBidPrice);
//     console.log("Exchange Name:", minExchangeName);
//     // console.log(`Order Sell to ${maxBidExchangeName}`);
//     console.log(`Order Selling for ${bidPriceVolume} volume at ${maxBidPrice}`)

//     //Calculate Spread
//     maxBidPrice = maxBidPrice.toString();
//     const spread = maxBidPrice - minAskPrice;
//     console.log("Spread: ", spread);

//     const profit = spread * bidPriceVolume - 0.01; //transactionFees
//     console.log(profit);
   
//   }

// // Your WebSocket logic
// // wss.on('connection', (ws) => {
//   setInterval(() => {
//     const binance = binanceModule.getLastPrice();
//     const kraken = krakenModule.getDetails();
//     const unicoinDCX = UnicoinDCXLastPrice.getLastPrice();

//     if (binance !== undefined) {
//       const data = findLowerBidExchange(unicoinDCX, binance, kraken);

//       // Send data to the client
//     //   ws.send(JSON.stringify(data));
//     }
//   }, 1000);
// // });

// // Serve your HTML page
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const binanceModule = require('./binance');
const krakenModule = require('./kraken');
const UnicoinDCXLastPrice = require('./unicoindcx');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Your price calculation logic
function findLowerBidExchange(unicoinDCX, binance, kraken) {
    const askPriceVolume = 1; //unicoinDCX[0].UDCXVolume
    const binanceBidPriceVolume = 1; //binance[0].binanceAskPriceVolume
    const krakenBidPriceVolume = 1; //kraken[0].krakenAskPriceVolume
    const UDCXVolume = 1;

    console.log(`Volume: ${askPriceVolume}`);
    console.log(`unicoinDCX ask Price ${unicoinDCX[0].UDCXBestAskPrice}`);
    console.log(`Binance Bid Price ${binance[0].binanceBestBidPrice}`);
    console.log(`Kraken Bid Price ${kraken[0].krakenBestBidPrice}`);

    // Initialize variables to track minimum ask price and corresponding exchange
    let minAskPrice = Infinity;
    let minExchangeName = "";

    // Compare ask prices and find the minimum using if conditions
    if (binance[0].binanceBestAskPrice < minAskPrice) {
      minAskPrice = binance[0].binanceBestAskPrice;
      minExchangeName = binance[1];
    }

    if (kraken[0].krakenBestAskPrice < minAskPrice) {
      minAskPrice = kraken[0].krakenBestAskPrice;
      minExchangeName = kraken[1];
    }

    if (unicoinDCX[0].UDCXBestAskPrice < minAskPrice) {
      minAskPrice = unicoinDCX[0].UDCXBestAskPrice;
      minExchangeName = unicoinDCX[1];
    }

    // Log the result
    console.log("Smallest Ask Price:", minAskPrice);
    console.log("Exchange Name:", minExchangeName);
    // console.log(`Order to Buy from ${minExchangeName}`);
     // Buy logic
     if (askPriceVolume > 0) {
        console.log(`Order Buying for ${askPriceVolume} volume at ${minAskPrice}`);
        // Implement your buy logic here, e.g., placing a buy order
      }

    let maxBidPrice = Infinity;
    let maxBidExchangeName = "";
    let bidPriceVolume =  "";

    // Compare ask prices and find the minimum using if conditions
    if (binance[0].binanceBestBidPrice > minAskPrice && binanceBidPriceVolume === askPriceVolume) {   //binance[0].binanceBidPriceVolume
      maxBidExchangeName = binance[1];
      maxBidPrice = binance[0].binanceBestBidPrice;
      bidPriceVolume = binanceBidPriceVolume
    }

    if (kraken[0].krakenBestBidPrice > minAskPrice && krakenBidPriceVolume === askPriceVolume) {   //kraken[0].krakenBidPriceVolume
      maxBidExchangeName = kraken[1];
      maxBidPrice = kraken[0].krakenBestBidPrice;
      bidPriceVolume = krakenBidPriceVolume
    }

    let UDCXBestBidPrice = unicoinDCX[0].UDCXBestBidPrice;
    UDCXBestBidPrice = UDCXBestBidPrice.toString();

    if (UDCXBestBidPrice > minAskPrice && UDCXVolume === askPriceVolume) {   //unicoinDCX[0].UDCXVolume
      maxBidExchangeName = unicoinDCX[1];
      maxBidPrice = unicoinDCX[0].UDCXBestBidPrice;
      bidPriceVolume = UDCXVolume
    }

    // Log the result
    console.log("High Bid Price:", maxBidPrice);
    console.log("Exchange Name:", maxBidExchangeName);
    // console.log(`Order Sell to ${maxBidExchangeName}`);
    console.log(`Order Selling for ${bidPriceVolume} volume at ${maxBidPrice}`)

    //Calculate Spread
    maxBidPrice = maxBidPrice.toString();
    const spread = maxBidPrice - minAskPrice;
    console.log("Spread: ", spread);

    const profit = spread * askPriceVolume; //transactionFees
    console.log(profit);
    const coinPair = 'BTC/USD'

  return {
    coinPair,
    minAskPrice,
    minExchangeName,
    maxBidPrice,
    maxBidExchangeName,
    profit,
  };
}

// Your WebSocket logic
wss.on('connection', (ws) => {
  setInterval(() => {
    const binance = binanceModule.getLastPrice();
    const kraken = krakenModule.getDetails();
    const unicoinDCX = UnicoinDCXLastPrice.getLastPrice();

    if (binance !== undefined) {
      const data = findLowerBidExchange(unicoinDCX, binance, kraken);

      // Send data to the client
      ws.send(JSON.stringify(data));
    }
  }, 1000);
});

// Serve your HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(30001, () => {
  console.log('Server is running on http://localhost:3001');
});
