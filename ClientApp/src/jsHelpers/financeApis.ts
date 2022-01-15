// annual free cash flow
// https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/MSFT?lang=en-US&region=US&symbol=MSFT&padTimeSeries=true&type=annualFreeCashFlow&merge=false&period1=493590046&period2=1639753511

export type CurrencyCodeType = "USD";
export type PeriodType = "12M";
export type DateType = `${string}-${string}-${string}`;

export interface AnnualCashFlowItem {
  dataId: number; // e.g. 26185
  asOfDate: DateType; // e.g. "2018-06-30";
  periodType: PeriodType; // e.g. "12M";
  currencyCode: CurrencyCodeType; // e.g. "USD";
  reportedValue: {
    raw: number; // e.g. 3.22520003e10;
    fmt: string; // e.g. "32.25B";
  };
}

export interface ITimeseries {
  timeseries: {
    result: [
      {
        meta: {
          symbol: string[];
          type: string[];
        };
        timestamp: string[];
        annualFreeCashFlow: AnnualCashFlowItem[];
      }
    ];
    error: unknown;
  };
}

export async function fetchAnnualFreeCashFlow(
  stockSymbol: string
): Promise<ITimeseries> {
  const fetchOptions: RequestInit = {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  try {
  const response = await fetch(
    `https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/MSFT?lang=en-US&region=US&symbol=${stockSymbol}&padTimeSeries=true&type=annualFreeCashFlow&merge=false&period1=493590046&period2=1639753511&corsDomain=finance.yahoo.com`,
    fetchOptions
  );

  const data = (await response.json()) as ITimeseries;
  console.dir(data);

  return data;

  } catch(exception) {
      console.dir(exception);
      throw exception;
  }

}
