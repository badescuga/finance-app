import { BaseTextFieldProps, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { convertToInt } from "../../jsHelpers/uiHelpers";
import { discountCashflowStockValuation } from "./DiscountedCashFlowHelper";

interface IState {
    discountedCashflowValuation: number;
}

export function DiscountedCashflowStockAnalysis() {
  const avgFreeCashflow = useRef<BaseTextFieldProps>();
  const yearsInvesting = useRef<BaseTextFieldProps>();
  const expectedGrowthRate = useRef<BaseTextFieldProps>();
  const discountReturnRate = useRef<BaseTextFieldProps>();
  

  const [state, setState] = useState<IState>({ discountedCashflowValuation: 0 });


  function getCalculateButton() {
    return (
      <Button
        variant="outlined"
        onClick={() => {
          const avgFreeCashflowValue = convertToInt(avgFreeCashflow);
          const yearsInvestingValue = convertToInt(yearsInvesting);
          const expectedGrowthRateValue = convertToInt(expectedGrowthRate);
          const discountReturnRateValue = convertToInt(discountReturnRate);

          const result = discountCashflowStockValuation(
            avgFreeCashflowValue,
            yearsInvestingValue,
            expectedGrowthRateValue,
            discountReturnRateValue
          );

          setState({ ...state, discountedCashflowValuation: result });
        }}
      >
        Calculate
      </Button>
    );
  }

  return (
    <div>
      <TextField
        inputRef={avgFreeCashflow}
        label="5 Avg free cashflow ($)"
        variant="outlined"
        required
      />
      <br />
      <TextField
        inputRef={yearsInvesting}
        label="Years to invest (years)"
        variant="outlined"
        required
      />
      <br />
      <TextField
        inputRef={expectedGrowthRate}
        label="Expected yearly growth (%)"
        variant="outlined"
        required
      />< br />
      <TextField
        inputRef={discountReturnRate}
        label="Discount rate (%)"
        variant="outlined"
        required
      />< br />
        {getCalculateButton()} 
        <br />
        Calculated Value: {state.discountedCashflowValuation}
      <br />
      <br />
      <br />
      <a href="https://pitchbook.com/blog/how-discounted-cashflow-analysis-works">
        {" "}
        Inspiration
      </a>
    </div>
  );
}

