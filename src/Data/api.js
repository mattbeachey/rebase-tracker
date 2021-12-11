const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const getPriceData = async (rangeInDays) => {
    const price = await CoinGeckoClient.coins.fetchMarketChart('wonderland', {
        days: rangeInDays,
        vs_currency: 'usd',
    });
    return price;
}

export default getPriceData;