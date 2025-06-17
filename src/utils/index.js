import { calculateIncomeTax } from "./taxUtils";

export const propData = {
    "propertyAddress": "1 Cross Sreet, London N£3 7EX ",
    "purchasePrice": "500000",
    "initialDeposit": "125000",
    "dateOfPurchase": "2022-01-01",
    "estimatedMarketValue": "600000",
    "epc": "G",
    "outstandingMortgage": "250000",
    "mortgageType": "Principal and Interest",
    "mortgageInterestRate": "5.0%",
    "mortgageYearsRemaining": "20",
    "rentWeekly": "635",
    "lettingFees": "10.0%",
    "serviceCharge": "3600",
    "groundRent": "500",
    "otherCosts": "1000",
    "yourCurrentIncome": "100000"
};

export const propertyOptions = [
    { "name": "Detached House" },
    { "name": "Apartment"},
    { "name": "Semi-Detached House" },
    { "name": "Terraced House" },
    { "name": "End-of-Terrace House" }
];

// Standard Model Variables
const inflation = 0.028;
const rentalGrowth = 0.0371;
const capitalGrowth = 0.034;
const vacancy = 0.0385;
const repairsMaintenance = 0.0350;

// Historic SDLT Rates (checked 2025-05-07)
const historicSdltRates = [
    {
        from: "1900-01-01",
        to: "1958-07-31",
        tier: "Tier 0",
        thresholds: [{ limit: Infinity, rate: 0 }]
    },

    {
        from: "1958-08-01",
        to: "1963-07-31",
        tier: "Tier 1",
        thresholds: [
            { limit: 3500, rate: 0 },
            { limit: 4500, rate: 0.005 },
            { limit: 5250, rate: 0.01 },
            { limit: 6000, rate: 0.015 },
            { limit: Infinity, rate: 0.02 }
        ]
    },

    {
        from: "1963-08-01",
        to: "1967-07-31",
        tier: "Tier 2",
        thresholds: [
            { limit: 4500, rate: 0 },
            { limit: 6000, rate: 0.005 },
            { limit: Infinity, rate: 0.01 }
        ]
    },

    {
        from: "1967-08-01",
        to: "1972-07-31",
        tier: "Tier 3",
        thresholds: [
            { limit: 5500, rate: 0 },
            { limit: 7000, rate: 0.005 },
            { limit: Infinity, rate: 0.01 }
        ]
    },

    {
        from: "1972-08-01",
        to: "1974-04-30",
        tier: "Tier 4",
        thresholds: [
            { limit: 10000, rate: 0 },
            { limit: 15000, rate: 0.005 },
            { limit: Infinity, rate: 0.01 }
        ]
    },

    {
        from: "1974-05-01",
        to: "1980-04-05",
        tier: "Tier 5",
        thresholds: [
            { limit: 15000, rate: 0 },
            { limit: 20000, rate: 0.005 },
            { limit: 25000, rate: 0.01 },
            { limit: 30000, rate: 0.015 },
            { limit: Infinity, rate: 0.02 }
        ]
    },
    
    {
        from: "1980-04-06",
        to: "1982-03-21",
        tier: "Tier 6",
        thresholds: [
            { limit: 20000, rate: 0 },
            { limit: 25000, rate: 0.005 },
            { limit: 30000, rate: 0.01 },
            { limit: 35000, rate: 0.015 },
            { limit: Infinity, rate: 0.02 }
        ]
    },
    
    {
        from: "1982-03-22",
        to: "1984-03-12",
        tier: "Tier 7",
        thresholds: [
            { limit: 25000, rate: 0 },
            { limit: 30000, rate: 0.005 },
            { limit: 35000, rate: 0.01 },
            { limit: 40000, rate: 0.015 },
            { limit: Infinity, rate: 0.02 }
            ]
    },
    
    {
        from: "1984-03-13",
        to: "1991-12-19",
        tier: "Tier 8",
        thresholds: [
            { limit: 30000, rate: 0 },
            { limit: Infinity, rate: 0.01 }
            ]
    },
    
    {
        from: "1991-12-20",
        to: "1992-08-19",
        tier: "Tier 9",
        thresholds: [
        { limit: 250000, rate: 0 },
        { limit: Infinity, rate: 0.01 }
        ]
    },
    
    {
        from: "1992-08-20",
        to: "1993-03-15",
        tier: "Tier 10",
        thresholds: [
        { limit: 30000, rate: 0 },
        { limit: Infinity, rate: 0.01 }
    ]
    },

    {    
        from: "1993-03-16",
        to: "1997-07-07",
        tier: "Tier 11",
        thresholds: [
        { limit: 60000, rate: 0 },
        { limit: Infinity, rate: 0.01 }
    ]
    },
    
    {
        from: "1997-07-08",
        to: "1998-03-23",
        tier: "Tier 12",
        thresholds: [
        { limit: 60000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.015 },
        { limit: Infinity, rate: 0.02 }
    ]
    },

    {
        from: "1998-03-24",
        to: "1999-03-15",
        tier: "Tier 13",
        thresholds: [
        { limit: 60000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.02 },
        { limit: Infinity, rate: 0.03 }
    ]
    },
    
    {
        from: "1999-03-16",
        to: "2000-03-27",
        tier: "Tier 14",
        thresholds: [
        { limit: 60000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.025 },
        { limit: Infinity, rate: 0.035 }
    ]
    },

    {
        from: "2000-03-28",
        to: "2005-03-16",
        tier: "Tier 15",
        thresholds: [
        { limit: 60000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.03 },
        { limit: Infinity, rate: 0.04 }
    ]
    },
    
    {
        from: "2005-03-17",
        to: "2006-03-22",
        tier: "Tier 16",
        thresholds: [
        { limit: 120000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.03 },
        { limit: Infinity, rate: 0.04 }
    ]
    },

    {
        from: "2006-03-23",
        to: "2008-09-02",
        tier: "Tier 17",
        thresholds: [
        { limit: 125000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.3 },
        { limit: Infinity, rate: 0.04 }
    ]
    },

    {
        from: "2008-09-03",
        to: "2009-12-31",
        tier: "Tier 18",
        thresholds: [
        { limit: 175000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.03 },
        { limit: Infinity, rate: 0.04 }
        ]
    },

    {
        from: "2010-01-01",
        to: "2011-04-05",
        tier: "Tier 19",
        thresholds: [
        { limit: 125000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.03 },
        { limit: Infinity, rate: 0.04 }
    ]
    },

    {
        from: "2011-04-06",
        to: "2012-03-21",
        tier: "Tier 20",
        thresholds: [
        { limit: 125000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.03 },
        { limit: 1000000, rate: 0.04 },
        { limit: Infinity, rate: 0.05 }
    ]
    },

    {
        from: "2012-03-22",
        to: "2014-12-02",
        tier: "Tier 21",
        thresholds: [
        { limit: 125000, rate: 0 },
        { limit: 250000, rate: 0.01 },
        { limit: 500000, rate: 0.03 },
        { limit: 1000000, rate: 0.04 },
        { limit: 2000000, rate: 0.05 },
        { limit: Infinity, rate: 0.07 }
    ]
    },

    {
    from: "2014-12-03",
    to: "2016-03-31",
    tier: "Tier 22",
    thresholds: [
        { limit: 125000, rate: 0 },
        { limit: 250000, rate: 0.02 },
        { limit: 925000, rate: 0.05 },
        { limit: 1500000, rate: 0.10 },
        { limit: Infinity, rate: 0.12 }
    ]
    },

    {
    from: "2016-04-01",
    to: "2040-12-31",
    tier: "Tier 23",
    thresholds: [
        { limit: 40000, rate: 0 },
        { limit: 250000, rate: 0.03 },
        { limit: 925000, rate: 0.08 },
        { limit: 1500000, rate: 0.13 },
        { limit: Infinity, rate: 0.15 }
    ]
    }
];

// Utility to safely parse numbers from strings or numbers
function safeParse(value) {
    return parseFloat(String(value ?? "").replace(/[^0-9.-]+/g, ""));
}

// // Utility to safely parse numbers from strings or numbers
// function safeParse(value) {
//     return parseFloat(String(value ?? "").replace(/[^0-9.-]+/g, ""));
// }

// Calculate Value
export function calculateValue(propData) {
    const purchasePrice = safeParse(propData.purchasePrice);
    const estimatedMarketValue = safeParse(propData.estimatedMarketValue);
    const increase = estimatedMarketValue - purchasePrice; 
    return increase.toFixed(0); 
    console.log("Calculated Value:", increase.toFixed(0));
}

// Monthly Income Calculation
export function calculatemonthlyIncome(propData) {
    const rentWeekly = safeParse(propData.rentWeekly);
    const annualRent = rentWeekly * 52;
    const grossAnnualPropertyIncome = annualRent * (1 - vacancy);
    const lettingFees = safeParse(propData.lettingFees) / 100;
    const lettingFeesAmount = grossAnnualPropertyIncome * lettingFees;
    const maintenanceCostsAmount = grossAnnualPropertyIncome * repairsMaintenance;
    const serviceCharge = safeParse(propData.serviceCharge);
    const groundRent = safeParse(propData.groundRent);
    const otherCosts = safeParse(propData.otherCosts);
    const totalCosts = lettingFeesAmount + maintenanceCostsAmount + serviceCharge + groundRent + otherCosts;
    const monthlyIncome = ((grossAnnualPropertyIncome - totalCosts)/12) 
    return monthlyIncome.toFixed(0);
}


// Gross Yield Calculation
export function calculateGrossYield(propData) {
    const rentWeekly = safeParse(propData.rentWeekly);
    const propertyValue = safeParse(propData.estimatedMarketValue);
    if (isNaN(rentWeekly) || isNaN(propertyValue) || propertyValue === 0) return 0;
    const annualRent = rentWeekly * 52;
    const grossAnnualPropertyIncome = annualRent * (1 - vacancy);
    const grossYield = (grossAnnualPropertyIncome / propertyValue) * 100;
    return grossYield.toFixed(2);
}

// Net Yield Calculation
export function calculateNetYield(propData) {
    const rentWeekly = safeParse(propData.rentWeekly);
    const propertyValue = safeParse(propData.estimatedMarketValue);
    if (isNaN(rentWeekly) || isNaN(propertyValue) || propertyValue === 0) return 0;
    const annualRent = rentWeekly * 52;
    const grossAnnualPropertyIncome = annualRent * (1 - vacancy);
    const lettingFees = safeParse(propData.lettingFees) / 100;
    const lettingFeesAmount = grossAnnualPropertyIncome * lettingFees;
    const maintenanceCostsAmount = grossAnnualPropertyIncome * repairsMaintenance;
    const serviceCharge = safeParse(propData.serviceCharge);
    const groundRent = safeParse(propData.groundRent);
    const otherCosts = safeParse(propData.otherCosts);
    const totalCosts = lettingFeesAmount + maintenanceCostsAmount + serviceCharge + groundRent + otherCosts;
    const netYield = ((grossAnnualPropertyIncome - totalCosts) / propertyValue) * 100;
    return netYield.toFixed(2);
}

// Calculate Principal and Interest Payment (PMT)
export function calculatePandIPmt(propData) {
    const interestRate = safeParse(propData.mortgageInterestRate) / 100 / 12;
    const numberOfYears = safeParse(propData.mortgageYearsRemaining);
    const numberOfPayments = numberOfYears * 12;
    const principal = safeParse(propData.outstandingMortgage);
    if (interestRate === 0 || numberOfPayments === 0) return 0;
    const monthlyPayment = (principal * interestRate) / (1 - Math.pow(1 + interestRate, -numberOfPayments));
    return monthlyPayment;
}

// Calculate Debt Service Coverage Ratio (DSCR)
export function calculateDscr(propData) {
    const rentWeekly = safeParse(propData.rentWeekly);
    const annualRent = rentWeekly * 52;
    const grossAnnualPropertyIncome = annualRent * (1 - vacancy);
    const lettingFees = safeParse(propData.lettingFees) / 100;
    const lettingFeesAmount = grossAnnualPropertyIncome * lettingFees;
    const maintenanceCostsAmount = grossAnnualPropertyIncome * repairsMaintenance;
    const serviceCharge = safeParse(propData.serviceCharge);
    const groundRent = safeParse(propData.groundRent);
    const otherCosts = safeParse(propData.otherCosts);
    const totalOperatingCosts = lettingFeesAmount + maintenanceCostsAmount + serviceCharge + groundRent + otherCosts;
    const netAnnualIncome = grossAnnualPropertyIncome - totalOperatingCosts;
    const principal = safeParse(propData.outstandingMortgage);
    const interestRate = safeParse(propData.mortgageInterestRate) / 100 / 12;
    const numberOfPayments = safeParse(propData.mortgageYearsRemaining) * 12;
    let annualMortgagePayment;
    if ((propData.mortgageType || "").toLowerCase().includes("interest only")) {
        annualMortgagePayment = principal * (safeParse(propData.mortgageInterestRate) / 100);
    } else {
        if (interestRate === 0 || numberOfPayments === 0) return 0;
        const monthlyMortgagePayment = (principal * interestRate) / (1 - Math.pow(1 + interestRate, -numberOfPayments));
        annualMortgagePayment = monthlyMortgagePayment * 12;
    }
    if (annualMortgagePayment === 0) return 0;
    const dscr = netAnnualIncome / annualMortgagePayment;
    return dscr.toFixed(2);
}

// Calculate Operating Expense Load (OPEX Load)
export function calculateOpexLoad(propData) {
    const rentWeekly = safeParse(propData.rentWeekly);
    const annualRent = rentWeekly * 52;
    const grossAnnualPropertyIncome = annualRent * (1 - vacancy);
    const lettingFees = safeParse(propData.lettingFees) / 100;
    const lettingFeesAmount = grossAnnualPropertyIncome * lettingFees;
    const maintenanceCostsAmount = grossAnnualPropertyIncome * repairsMaintenance;
    const serviceCharge = safeParse(propData.serviceCharge);
    const groundRent = safeParse(propData.groundRent);
    const otherCosts = safeParse(propData.otherCosts);
    const totalCosts = lettingFeesAmount + maintenanceCostsAmount + serviceCharge + groundRent + otherCosts;
    if (grossAnnualPropertyIncome === 0) return 0;
    const preOpexLoad = totalCosts / grossAnnualPropertyIncome;
    const opexLoad = preOpexLoad * 100;
    return opexLoad.toFixed(2);
}

// Calculate SDLT (Stamp Duty Land Tax) based on purchase price and date
export function calculateHistoricSdlt(propData) {
    try {
        const date = new Date(propData.dateOfPurchase);
        const purchasePrice = safeParse(propData.purchasePrice);
        const applicableRate = historicSdltRates.find(rate => {
            const fromDate = new Date(rate.from);
            const toDate = new Date(rate.to);
            return date >= fromDate && date <= toDate;
        });
        if (!applicableRate) {
            throw new Error("No SDLT rate found for the given date.");
        }
        let remainingPrice = purchasePrice;
        let sdlt = 0;
        let previousLimit = 0;
        for (const threshold of applicableRate.thresholds) {
            if (remainingPrice <= 0) break;
            const taxableAmount = Math.min(remainingPrice, threshold.limit - previousLimit);
            const taxForThisThreshold = taxableAmount * threshold.rate;
            sdlt += taxForThisThreshold;
            remainingPrice -= taxableAmount;
            previousLimit = threshold.limit;
        }
        return {
            tier: applicableRate.tier,
            sdlt: sdlt.toFixed(2)
        };
    } catch (error) {
        throw error;
    }
}

// Calculate Net Rental After Tax (NRAT)
export function calculateNrat(propData) {
    const vacancyRate = 0.0385;
    try {
        if (!propData.initialDeposit || !propData.rentWeekly || !propData.outstandingMortgage) {
            throw new Error("Missing required data fields.");
        }
        const initialDeposit = safeParse(propData.initialDeposit);
        const sdltResult = calculateHistoricSdlt(propData);
        const sdlt = safeParse(sdltResult.sdlt);
        const totalCash = initialDeposit + sdlt;
        const rentWeekly = safeParse(propData.rentWeekly);
        const annualRent = rentWeekly * 52;
        const grossAnnualPropertyIncome = annualRent * (1 - vacancyRate);
        const lettingFees = safeParse(propData.lettingFees) / 100;
        const lettingFeesAmount = grossAnnualPropertyIncome * lettingFees;
        const maintenanceCostsAmount = grossAnnualPropertyIncome * repairsMaintenance;
        const serviceCharge = safeParse(propData.serviceCharge);
        const groundRent = safeParse(propData.groundRent);
        const otherCosts = safeParse(propData.otherCosts);
        const totalOperatingCosts = lettingFeesAmount + maintenanceCostsAmount + serviceCharge + groundRent + otherCosts;
        const outstandingMortgage = safeParse(propData.outstandingMortgage);
        const mortgageInterestRate = safeParse(propData.mortgageInterestRate) / 100;
        const mortgageYearsRemaining = safeParse(propData.mortgageYearsRemaining);
        let mortgageCost;
        if ((propData.mortgageType || "").toLowerCase().includes("interest only")) {
            mortgageCost = outstandingMortgage * mortgageInterestRate;
        } else {
            const monthlyRate = mortgageInterestRate / 12;
            const numberOfPayments = mortgageYearsRemaining * 12;
            if (monthlyRate === 0 || numberOfPayments === 0) return 0;
            const monthlyPayment = (outstandingMortgage * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
            mortgageCost = monthlyPayment * 12;
        }
        const mortgageInterestAmount = outstandingMortgage * mortgageInterestRate;
        const netIncomeBeforeTax = grossAnnualPropertyIncome - totalOperatingCosts - mortgageCost;
        const yourCurrentIncome = safeParse(propData.yourCurrentIncome);
        const taxPayableWithoutPropertyIncome = calculateIncomeTax(yourCurrentIncome);
        const totalTaxableIncomeWithProperty = yourCurrentIncome + grossAnnualPropertyIncome - totalOperatingCosts;
        const grossTaxDueToProperty = calculateIncomeTax(totalTaxableIncomeWithProperty);
        const interestRebate = mortgageInterestAmount * 0.2;
        const taxDueToProperty = grossTaxDueToProperty - interestRebate;
        const taxPayable = taxDueToProperty - taxPayableWithoutPropertyIncome;
        const netIncomeAfterTax = grossAnnualPropertyIncome - totalOperatingCosts - mortgageCost - taxPayable;
        const nrat = (netIncomeAfterTax / totalCash) * 100;
        return nrat.toFixed(2);
    } catch (error) {
        throw error;
    }
}
