// websocketModule.js

const WebSocket = require('ws');

const symbol = 'btcusdt';
const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@ticker`;

const socket = new WebSocket(wsUrl);

let bidPrice = null, askPrice = null, bidPriceVolume = null, askPriceVolume = null;
let isFirstMessageReceived = false;

socket.on('open', () => {
    console.log(`WebSocket connection established for ${symbol}.`);
});

socket.on('message', (data) => {
    const message = JSON.parse(data);
    bidPrice = message.b;
    askPrice = message.a;
    bidPriceVolume = message.B;
    askPriceVolume = message.A;

    

    // If this is the first message, set the flag to true
    if (!isFirstMessageReceived) {
        isFirstMessageReceived = true;
    }
});

socket.on('error', (error) => {
    console.error(`WebSocket error for ${symbol}:`, error);
});

// Export a function to get the lastPrice

function getLastPrice() {
    const binance = [{"binanceBestBidPrice":bidPrice,"binanceBestAskPrice":askPrice,"binanceBidPriceVolume":bidPriceVolume,"binanceAskPriceVolume": askPriceVolume}, 'Binance']
    
    return isFirstMessageReceived ? binance : undefined;
}

module.exports = {
    getLastPrice,
};

function checkLastPricePeriodically() {
    setInterval(() => {
        const currentLastPrice = getLastPrice();
        if (currentLastPrice !== undefined) {
            // console.log(`Current last price: ${currentLastPrice}`);
        }
    }, 1000); // Adjust the interval as needed (in milliseconds)
}

// Start checking the last price periodically
checkLastPricePeriodically();
