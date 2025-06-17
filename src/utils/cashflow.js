import { calculateIncomeTax } from "./taxUtils";

// Example static data (can be removed if not needed)
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

// Utility to safely parse numbers from strings or numbers
function safeParse(value) {
    return parseFloat(String(value ?? "").replace(/[^0-9.-]+/g, ""));
}

// Function to calculate the monthly payment (PMT) for a loan
function calculatePMT(interestRate, numberOfPayments, loanAmount) {
    const monthlyRate = interestRate / 12;
    return (
        (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments))
    );
}

// Main cashflow calculation function
export function calculateCashflowData(propData) {
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
    const inflation = 0.028; // 2.8% annual inflation
    const rentalGrowth = 0.0371; // 3.71% annual rental growth
    const vacancyRate = 0.0385; // 3.85% vacancy rate
    const repairsMaintenanceRate = 0.035; // 3.5% repairs and maintenance rate

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

        // Push data for the year
        data.push({
            year,
            grossRentalIncome,
            totalOperatingExpenses,
            mortgageExpense,
            taxPayable: taxDuetoProperty,
            netIncomeAfterTax,
        });
    }

    // Calculate the total net income after tax for all 10 years
    const totalNetIncomeAfterTax = data.reduce((sum, row) => sum + (row.netIncomeAfterTax || 0), 0);

    // Add a summary object to the data array
    data.push({
        year: "Total",
        grossRentalIncome: null,
        totalOperatingExpenses: null,
        mortgageExpense: null,
        taxPayable: null,
        netIncomeAfterTax: totalNetIncomeAfterTax,
    });

    return data;
}