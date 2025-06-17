export function calculateIncomeTax(income) {
    const personalAllowanceThreshold = 100000;
    let personalAllowance = 12570;
    if (income > personalAllowanceThreshold) {
        personalAllowance = Math.max(0, 12570 - Math.floor((income - personalAllowanceThreshold) / 2));
    }
    const taxableIncome = Math.max(0, income - personalAllowance);
    let taxPayable = 0;
    const basicRateLimit = 37700;
    const higherRateLimit = 125140;
    const basicTaxable = Math.min(taxableIncome, basicRateLimit);
    taxPayable += basicTaxable * 0.20;
    const higherTaxable = Math.max(0, Math.min(taxableIncome - basicRateLimit, (higherRateLimit - basicRateLimit)));
    taxPayable += higherTaxable * 0.40;
    const additionalTaxable = Math.max(0, taxableIncome - higherRateLimit);
    taxPayable += additionalTaxable * 0.45;
    return taxPayable;
}