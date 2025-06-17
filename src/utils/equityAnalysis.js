import { calculateIncomeTax } from "./taxUtils";

// Utility to safely parse numbers
function safeParse(val, fallback = 0) {
    const n = parseFloat(val);
    return isNaN(n) ? fallback : n;
}

// Function to calculate the monthly payment (PMT) for a loan
function calculatePMT(interestRate, numberOfPayments, loanAmount) {
    const monthlyRate = interestRate / 12;
    return (
        (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments))
    );
}

export const propData = {
    propertyAddress: "1 London Road, London, NW1 1AZ",
    purchasePrice: 500000,
    initialDeposit: 125000,
    dateOfPurchase: "2022-01-01",
    estimatedMarketValue: 600000,
    epcRating: "G",
    numberBedrooms: 5,
    outstandingMortgage: 250000,
    mortgageType: "Principal & Interest",
    mortgageInterestRate: 5.0,
    mortgageYearsRemaining: 20,
    rentWeekly: 635,
    lettingFees: 0.1,
    serviceCharge: 3600,
    groundRent: 500,
    otherCosts: 1000,
    yourCurrentIncome: 100000,
};

// revised CGPT
export function equityAnalysis(propData) {
  const years = 10;
  const data = [];

  // Safely parse all numeric fields, defaulting to 0 if missing/invalid
  let rentWeekly = safeParse(propData.rentWeekly) || 0;
  let outstandingMortgage = safeParse(propData.outstandingMortgage) || 0;
  let yourCurrentIncome = safeParse(propData.yourCurrentIncome) || 0;
  const mortgageInterestRate = (safeParse(propData.mortgageInterestRate) || 0) / 100; // Annual rate
  const mortgageYearsRemaining = safeParse(propData.mortgageYearsRemaining) || 0;
  
  let lettingFeesRate = safeParse(propData.lettingFees) || 0;
  if (lettingFeesRate > 1) { lettingFeesRate = lettingFeesRate / 100; }
  
  const serviceChargeBase = safeParse(propData.serviceCharge) || 0;
  const groundRent = safeParse(propData.groundRent) || 0;
  const otherCostsBase = safeParse(propData.otherCosts) || 0;

  // Constants
  const inflation = 0.028; // 2.8%
  const rentalGrowth = 0.0371;
  const vacancyRate = 0.0385;
  const repairsMaintenanceRate = 0.035;

  const numberOfPayments = mortgageYearsRemaining * 12;
  const monthlyInterestRate = mortgageInterestRate / 12;

  // const monthlyPayment = calculatePMT(monthlyInterestRate, numberOfPayments, outstandingMortgage);
  const monthlyPayment = calculatePMT(mortgageInterestRate, numberOfPayments, outstandingMortgage);

  for (let year = 1; year <= years; year++) {
      // Income
      const annualRent = rentWeekly * 52;
      const vacancy = annualRent * vacancyRate;
      const grossRentalIncome = annualRent - vacancy;

    // Expenses
        const lettingFees = grossRentalIncome * lettingFeesRate;
        const repairsMaintenance = grossRentalIncome * repairsMaintenanceRate;
        const serviceCharge = serviceChargeBase * Math.pow(1 + inflation, year - 1);
        const otherCosts = otherCostsBase * Math.pow(1 + inflation, year - 1);
        const totalOperatingExpenses =
            lettingFees + repairsMaintenance + serviceCharge + groundRent + otherCosts;

        // Mortgage
        let totalInterestExpense = 0;
        let totalPrincipalPayment = 0;
        let mortgageExpense;

        const mortgageType = (propData.mortgageType || "").toLowerCase();

        if (mortgageType.includes("interest only")) {
            // Interest-only: interest is paid monthly, principal never reduces
            totalInterestExpense = outstandingMortgage * mortgageInterestRate;
            totalPrincipalPayment = 0;
            mortgageExpense = totalInterestExpense;
        } else {
            // Principal & Interest: reduce mortgage monthly
            for (let m = 0; m < 12; m++) {
                const interestForMonth = outstandingMortgage * (mortgageInterestRate / 12);
                const principalForMonth = monthlyPayment - interestForMonth;
                totalInterestExpense += interestForMonth;
                totalPrincipalPayment += principalForMonth;
                outstandingMortgage -= principalForMonth;
            }
            mortgageExpense = monthlyPayment * 12;
        }    

        // console.log("Mortgage Expense:", mortgageExpense);
        
        // Tax Calculations
        const taxableIncomeWithProperty =
            yourCurrentIncome + grossRentalIncome - totalOperatingExpenses;

        const incomeTaxWithoutProperty = calculateIncomeTax(yourCurrentIncome);
        const notionalTaxOnProperty = calculateIncomeTax(taxableIncomeWithProperty);


        // Calculate income tax with property (subtract 20% of interest expense as tax relief)
        const taxRelief = totalInterestExpense * 0.2;
        const incomeTaxWithProperty = notionalTaxOnProperty - taxRelief;

        const taxDuetoProperty = Math.max(incomeTaxWithProperty - incomeTaxWithoutProperty, 0);

        // Net Income
        const netIncomeAfterTax =
            grossRentalIncome - totalOperatingExpenses - mortgageExpense - taxDuetoProperty;

        // Update rent and income for next year
        rentWeekly *= 1 + rentalGrowth;
        yourCurrentIncome *= 1 + inflation;

        
        // Log for debugging
        console.log(`Year ${year}`, {
        //   grossRentalIncome,
        //   totalOperatingExpenses,
        mortgageExpense,
        //   taxPayable: taxDuetoProperty,
        //   netIncomeAfterTax,
        //   remainingMortgage: mortgageBalance,
        //   interestPaidThisYear: totalInterestThisYear,
        });

        // Prepare data
        data.push({
        year,
        grossRentalIncome,
        totalOperatingExpenses,
        mortgageExpense,
        taxPayable: taxDuetoProperty,
        netIncomeAfterTax,
        });
  }

  // Total over years
  const totalNetIncomeAfterTax = data.reduce((sum, row) => sum + (row.netIncomeAfterTax || 0), 0);
  
  data.push({
    year: 'Total',
    grossRentalIncome: null,
    totalOperatingExpenses: null,
    mortgageExpense: null,
    taxPayable: null,
    netIncomeAfterTax: totalNetIncomeAfterTax,
    });

    return data;
}


// Calculate 10 Year Growth @ 0 with normal CGT
export function calcTYGat40cgt(propertyData) {
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
        growthRate2: growthRate,
        netReturnAfterCostsFinal2: netReturnAfterCostsFinal,
        notionalEquity2: notionalEquity,
        returnOnEquity2: returnOnEquity,
    };
}

// Calculate 10 Year Growth @ half rate with normal CGT
export function calcTYGatzhalf40cgt(propertyData) {
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
    const cgtForty = 0.40;

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
    const cgtRate = cgtForty;
    const cgtCost = netReturnAfterCosts * cgtRate;
    const netReturnAfterCostsFinalHalfCgt = netReturnAfterCosts - cgtCost;
    const outstandingMortgage = propertyData.outstandingMortgage;
    const notionalEquityHalfCgt = estimatedMarketValue - outstandingMortgage;
    const returnOnEquityHalfCgt = ((netReturnAfterCostsFinalHalfCgt / notionalEquityHalfCgt) * 100) / 10;

    return {
        growthRateHalfCgt2: growthRateHalfCgt * 100,
        netReturnAfterCostsFinalHalfCgt2: netReturnAfterCostsFinalHalfCgt,
        notionalEquityHalfCgt2: notionalEquityHalfCgt,
        returnOnEquityHalfCgt2: returnOnEquityHalfCgt,
    };
}

// Calculate 10 Year Growth @ full rate with normal CGT
export function calcTYGatfull40cgt(propertyData) {
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
    const cgtForty = 0.40;

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
    const cgtRate = cgtForty;
    const cgtCost = netReturnAfterCosts * cgtRate;
    const netReturnAfterCostsFinalFullCgt = netReturnAfterCosts - cgtCost;
    const outstandingMortgage = propertyData.outstandingMortgage;
    const notionalEquityFullCgt = estimatedMarketValue - outstandingMortgage;
    const returnOnEquityFullCgt = ((netReturnAfterCostsFinalFullCgt / notionalEquityFullCgt) * 100) / 10;

    return {
        growthRateFullCgt2: growthRateFullCgt * 100,
        netReturnAfterCostsFinalFullCgt2: netReturnAfterCostsFinalFullCgt,
        notionalEquityFullCgt2: notionalEquityFullCgt,
        returnOnEquityFullCgt2: returnOnEquityFullCgt,
    };
}