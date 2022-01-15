import { BaseTextFieldProps, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { AnnualCashFlowItem, fetchAnnualFreeCashFlow } from "../../jsHelpers/financeApis";
// import { convertToInt } from "../../jsHelpers/uiHelpers";

interface IState {
    symbol: string | undefined;
    annualFreeCashFlow: AnnualCashFlowItem[];
}

export function StockCalculator() {
  const symbolRef = useRef<BaseTextFieldProps>();

  const [state, setState] = useState<IState>({ symbol: undefined, annualFreeCashFlow: [] });


  function GetStockSymbolButton() {
    return (
      <Button
        variant="outlined"
        onClick={async () => {
          const symbolRefValue = symbolRef?.current?.value as string;
          const result = await fetchAnnualFreeCashFlow(symbolRefValue);
          setState({ ...state, symbol: symbolRefValue, annualFreeCashFlow: result.timeseries.result[0].annualFreeCashFlow });
          console.log(result);
        }}
      >
        Calculate
      </Button>
    );
  }

  return (
    <div>
      <TextField
        inputRef={symbolRef}
        label="Stock Symbol (e.g. AAPL)"
        variant="outlined"
        required
      />
      <br />
      {GetStockSymbolButton()}
    
    </div>
  );
}

