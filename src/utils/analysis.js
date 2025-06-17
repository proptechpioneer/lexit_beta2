export const propData = {
    selectedPropertyType: null,
    propertyAddress: "1 London Road, London, NW1 1AZ",
    purchasePrice: 500000, // Assuming £ is just for display
    initialDeposit: 125000,
    dateOfPurchase: new Date(2022, 0, 1), // January is 0 in JavaScript Dates
    estimatedMarketValue: 600000,
    epcRating: "G",
    numberBedrooms: 5,
    outstandingMortgage: 250000,
    mortgageType: "Principal and Interest",
    mortgageInterestRate: 0.05, // 5% as a decimal
    mortgageYearsRemaining: 20,
    rentWeekly: 635,
    lettingFees: 0.10, // 10% as a decimal
    serviceCharge: 3600,
    groundRent: 500,
    otherCosts: 1000,
    yourCurrentIncome: 100000
};

// Calculate 10 Year Growth @ 0 with normal CGT
export function calcTYGatzncgt(propertyData) {
    function calculateEpc(propData) {
        const epc = { G: 50000, F: 30000, E: 20000, D: 10000, C: 0, B: 0, A: 0 };
        const epcRating = propData.epcRating;
        return epc[epcRating] || 0;
    }

    const lowerRateCgt = 0.18;
    const highRateCgt = 0.24;
    const threshold = 50270;
    const agencyFees = 0.0150;
    const legalFees = 2500;

    const estimatedMarketValue = propertyData.estimatedMarketValue;
    const yearsGrowth = 10;
    const growthRate = 0;

    const tenYearGrowth = estimatedMarketValue * Math.pow(1 + growthRate, yearsGrowth);
    const grossCapitalReturn = tenYearGrowth - estimatedMarketValue;
    const agencyCosts = tenYearGrowth * agencyFees;
    const totalSaleCosts = agencyCosts + legalFees;
    const epc = calculateEpc(propertyData) || 0;
    const netReturnAfterCosts = grossCapitalReturn - totalSaleCosts - epc;
    const netIncome = propertyData.yourCurrentIncome;
    const cgtRate = netIncome > threshold ? highRateCgt : lowerRateCgt;
    const cgtCost = netReturnAfterCosts * cgtRate;
    const netReturnAfterCostsFinal = netReturnAfterCosts;
    const outstandingMortgage = propertyData.outstandingMortgage;
    const notionalEquity = estimatedMarketValue - outstandingMortgage;
    const returnOnEquity = ((netReturnAfterCostsFinal / notionalEquity) * 100) / 10;

    return {
        growthRate: growthRate,
        netReturnAfterCostsFinal: netReturnAfterCostsFinal,
        notionalEquity: notionalEquity,
        returnOnEquity: returnOnEquity
    };
}

// Calculate 10 Year Growth @ half rate with normal CGT
export function calcTYGatzhalfcgt(propertyData) {
    function calculateEpc(propData) {
        const epc = { G: 50000, F: 30000, E: 20000, D: 10000, C: 0, B: 0, A: 0 };
        const epcRating = propData.epcRating;
        return epc[epcRating] || 0;
    }

    const lowerRateCgt = 0.18;
    const highRateCgt = 0.24;
    const threshold = 50270;
    const agencyFees = 0.0150;
    const legalFees = 2500;
    const midGrowth = 0.01698;

    const estimatedMarketValue = propertyData.estimatedMarketValue;
    const yearsGrowth = 10;
    const growthRateHalfCgt = midGrowth;

    const tenYearGrowth = estimatedMarketValue * Math.pow(1 + growthRateHalfCgt, yearsGrowth);
    const grossCapitalReturn = tenYearGrowth - estimatedMarketValue;
    const agencyCosts = tenYearGrowth * agencyFees;
    const totalSaleCosts = agencyCosts + legalFees;
    const epc = calculateEpc(propertyData) || 0;
    const netReturnAfterCosts = grossCapitalReturn - totalSaleCosts - epc;
    const netIncome = propertyData.yourCurrentIncome + netReturnAfterCosts;
    const cgtRate = netIncome > threshold ? highRateCgt : lowerRateCgt;
    const cgtCost = netReturnAfterCosts * cgtRate;
    const netReturnAfterCostsFinalHalfCgt = netReturnAfterCosts - cgtCost;
    const outstandingMortgage = propertyData.outstandingMortgage;
    const notionalEquityHalfCgt = estimatedMarketValue - outstandingMortgage;
    const returnOnEquityHalfCgt = ((netReturnAfterCostsFinalHalfCgt / notionalEquityHalfCgt) * 100) / 10;

    return {
        growthRateHalfCgt: growthRateHalfCgt * 100,
        netReturnAfterCostsFinalHalfCgt: netReturnAfterCostsFinalHalfCgt,
        notionalEquityHalfCgt: notionalEquityHalfCgt,
        returnOnEquityHalfCgt: returnOnEquityHalfCgt
    };
}

// Calculate 10 Year Growth @ full rate with normal CGT
export function calcTYGatfullncgt(propertyData) {
    function calculateEpc(propData) {
        const epc = { G: 50000, F: 30000, E: 20000, D: 10000, C: 0, B: 0, A: 0 };
        const epcRating = propData.epcRating;
        return epc[epcRating] || 0;
    }

    const lowerRateCgt = 0.18;
    const highRateCgt = 0.24;
    const threshold = 50270;
    const capitalGrowth = 0.0340;
    const agencyFees = 0.0150;
    const legalFees = 2500;

    const estimatedMarketValue = propertyData.estimatedMarketValue;
    const yearsGrowth = 10;
    const growthRateFullCgt = capitalGrowth;

    const tenYearGrowth = estimatedMarketValue * Math.pow(1 + growthRateFullCgt, yearsGrowth);
    const grossCapitalReturn = tenYearGrowth - estimatedMarketValue;
    const agencyCosts = tenYearGrowth * agencyFees;
    const totalSaleCosts = agencyCosts + legalFees;
    const epc = calculateEpc(propertyData) || 0;
    const netReturnAfterCosts = grossCapitalReturn - totalSaleCosts - epc;
    const netIncome = propertyData.yourCurrentIncome + netReturnAfterCosts;
    const cgtRate = netIncome > threshold ? highRateCgt : lowerRateCgt;
    const cgtCost = netReturnAfterCosts * cgtRate;
    const netReturnAfterCostsFinalFullCgt = netReturnAfterCosts - cgtCost;
    const outstandingMortgage = propertyData.outstandingMortgage;
    const notionalEquityFullCgt = estimatedMarketValue - outstandingMortgage;
    const returnOnEquityFullCgt = ((netReturnAfterCostsFinalFullCgt / notionalEquityFullCgt) * 100) / 10;

    return {
        growthRateFullCgt: growthRateFullCgt * 100,
        netReturnAfterCostsFinalFullCgt: netReturnAfterCostsFinalFullCgt,
        notionalEquityFullCgt: notionalEquityFullCgt,
        returnOnEquityFullCgt: returnOnEquityFullCgt
    };
}

// Function to calculate disaster metric
export function calculateDisasterMetric(propData) {
    if (!propData) {
        return {
            returnDisasterMonthly: 0,
            returnDisasterAggregate: 0
        };
    }

    // Convert to numbers if needed
    const outstandingMortgage = Number(propData.outstandingMortgage);
    let mortgageInterestRate = propData.mortgageInterestRate;
    const mortgageYearsRemaining = Number(propData.mortgageYearsRemaining);

    // Handle interest rate as string with % or as number
    if (typeof mortgageInterestRate === "string" && mortgageInterestRate.includes("%")) {
        mortgageInterestRate = Number(mortgageInterestRate.replace("%", "")) / 100;
    } else {
        mortgageInterestRate = Number(mortgageInterestRate);
        if (mortgageInterestRate > 1) {
            mortgageInterestRate = mortgageInterestRate / 100;
        }
    }

    if (
        isNaN(outstandingMortgage) ||
        isNaN(mortgageInterestRate) ||
        isNaN(mortgageYearsRemaining) ||
        !propData.mortgageType
    ) {
        return {
            returnDisasterMonthly: 0,
            returnDisasterAggregate: 0
        };
    }

    const monthlyInterestRate = mortgageInterestRate / 12;
    const numberOfPayments = mortgageYearsRemaining * 12;

    // Calculate monthly mortgage payment (Principal & Interest)
    let mortgagePrincipleAndInterest = 0;
    if (monthlyInterestRate > 0) {
        mortgagePrincipleAndInterest =
            (outstandingMortgage * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    } else {
        mortgagePrincipleAndInterest = outstandingMortgage / numberOfPayments;
    }

    // Calculate monthly mortgage payment (Interest Only)
    const mortgageInterestOnly = outstandingMortgage * monthlyInterestRate;

    let mortgageExpense = 0;
    if (propData.mortgageType === "Interest Only") {
        mortgageExpense = mortgageInterestOnly;
    } else if (
        propData.mortgageType === "Principal and Interest" ||
        propData.mortgageType === "Principal & Interest"
    ) {
        mortgageExpense = mortgagePrincipleAndInterest;
    }

    const returnDisasterMonthly = mortgageExpense;
    const returnDisasterAggregate = mortgageExpense * 18; // 18 months

    return {
        returnDisasterMonthly,
        returnDisasterAggregate
    };
}