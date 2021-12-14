import { IDataPoint } from ".";

export function generateInvestmentProgression(
  originalCash: number,
  monthlyCashInvestment: number,
  yearlyPerformancePercent: number,
  periodInYears: number,
  isMonthly: boolean
): IDataPoint[] {
  const dataPoints: IDataPoint[] = [];
  let cashWithInvestment = originalCash;
  let cashWithoutInvestment = originalCash;

  let monthlyPerformancePercent = yearlyPerformancePercent / 12 / 100;

  for (var year = 0; year < periodInYears; year++) {
    for (var month = 1; month <= 12; month++) {
      cashWithoutInvestment += monthlyCashInvestment;
      cashWithInvestment =
        (cashWithInvestment + monthlyCashInvestment) *
        (1 + monthlyPerformancePercent);
      if (isMonthly === true || month === 12) {
        dataPoints.push({
          name: `${year}-${month}`,
          withInvestment: cashWithInvestment,
          withoutInvestment: cashWithoutInvestment,
        });
      }
    }
  }

  return dataPoints;
}
