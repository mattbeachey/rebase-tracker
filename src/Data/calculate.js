const rebasePeriodInHours = 8;
const rebasesPerYear = 8760 / rebasePeriodInHours;

// quick calculations 
const percentToMultiple = percent => (percent + 100)/100;
const annualToDailyMultiple = apy => Math.pow(apy, 1/rebasesPerYear);

const evenPriceXDaysOut = (days, buyPrice, apy) => {
    const annualMultiple = percentToMultiple(apy);
    const dailyMultiple = annualToDailyMultiple(annualMultiple);
    const multipleUpOverXDays = Math.pow(dailyMultiple, days);
    const breakEvenPrice = buyPrice / multipleUpOverXDays;
    return breakEvenPrice;
}

const xPriceXDaysOut = (days, buyPrice, apy, multipleAtXDays) => {
    const annualMultiple = percentToMultiple(apy);
    const dailyMultiple = annualToDailyMultiple(annualMultiple);
    const multipleUpOverXDays = Math.pow(dailyMultiple, days);
    const xPrice = (buyPrice * multipleAtXDays) / multipleUpOverXDays;
    return xPrice;
}

export default {evenPriceXDaysOut, xPriceXDaysOut};