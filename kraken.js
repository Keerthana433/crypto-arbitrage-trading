const WebSocket = require('ws');

const baseUrl = "https://api.kraken.com";
const symbol = "BTCUSD"; // Replace with the desired symbol
let bidPrice = null; // Variable to store bidPrice
let askPrice = null; 
let bidPriceVolume = null;
let askPriceVolume = null;

// https://api.kraken.com/0/public/Ticker?pair=BTCUSD
// Function to fetch ticker information from Gemini API
async function getKrakenTicker() {
  try {
    const response = await fetch(`${baseUrl}/0/public/Ticker?pair=${symbol}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // const timestampHeader = response.headers.get('Date');

    // if (timestampHeader) {
    //   console.log('Timestamp:', timestampHeader);
    // } else {
    //   console.log('Timestamp not found in headers.');
    // }

    const ticker = await response.json();
    bidPrice = ticker.result.XXBTZUSD.b[0];
    bidPriceVolume = ticker.result.XXBTZUSD.b[2];
    askPrice = ticker.result.XXBTZUSD.a[0];
    askPriceVolume = ticker.result.XXBTZUSD.a[2];
    //console.log(`Kraken Ticker information for ${symbol}:`, ticker.result.XXBTZUSD.c[0]);
  } catch (error) {
    console.error('Error fetching Gemini ticker information:', error);
  }
}

// Call the function to start fetching Gemini ticker information every 100 milliseconds
setInterval(getKrakenTicker, 100);

function getDetails(){
  const kraken = [{
    "krakenBestBidPrice":bidPrice,
    "krakenBestAskPrice":askPrice,
    "krakenBidPriceVolume": bidPriceVolume, 
    "krakenAskPriceVolume": askPriceVolume
  }, "kraken"]
  return kraken
}

module.exports = {
  getDetails
}