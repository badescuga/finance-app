import { IDataPoint } from ".";

export function generateInvestmentProgression(
  originalCash: number,
  monthlyCashInvestment: number,
  yearlyPerformancePercent: number,
  periodInYears: number,
  generateMonthlyPoints: boolean,
  capitalizeMonthlyInvestment: boolean
): IDataPoint[] {
  const dataPoints: IDataPoint[] = [];
  let year = 0;
  let month = 0;

  let cashWithInvestment = originalCash;
  let cashWithoutInvestment = originalCash;

  if (capitalizeMonthlyInvestment) {
    const monthlyPerformancePercent = 1 + (yearlyPerformancePercent / 12 / 100);

    for (year = 0; year < periodInYears; year++) {
      for (month = 1; month <= 12; month++) {
        cashWithoutInvestment += monthlyCashInvestment;
        cashWithInvestment =
          (cashWithInvestment + monthlyCashInvestment) * monthlyPerformancePercent;
        if (generateMonthlyPoints === true || month === 12) {
          dataPoints.push({
            name: `${year}-${month}`,
            withInvestment: Math.floor( cashWithInvestment),
            withoutInvestment: Math.floor(cashWithoutInvestment),
          });
        }
      }
    }
  } else {
    for (year = 0; year < periodInYears; year++) {
      cashWithoutInvestment += monthlyCashInvestment * 12;
      cashWithInvestment += monthlyCashInvestment * 12;
      cashWithInvestment *= 1 + yearlyPerformancePercent / 100;

      dataPoints.push({
        name: `Year ${year}`,
        withInvestment: Math.floor(cashWithInvestment),
        withoutInvestment: Math.floor(cashWithoutInvestment),
      });
    }
  }

  return dataPoints;
}
