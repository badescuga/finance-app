export function discountCashflowStockValuation(
  avgFreeCashflowValue: number,
  yearsInvestingValue: number,
  expectedGrowthRateValue: number,
  desiredReturnValueInPercentile: number
): number {
  let currentFreeCashFlow = avgFreeCashflowValue;
  let totalValue = 0;

  for (let year = 1; year <= yearsInvestingValue; year++) {
    currentFreeCashFlow *= 1 + expectedGrowthRateValue / 100;
    const discountedCashFlow =
      currentFreeCashFlow /
      Math.pow(1 + desiredReturnValueInPercentile / 100, year);
    totalValue += discountedCashFlow;
  }

  return Math.floor(totalValue);
}
