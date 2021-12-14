import { BaseTextFieldProps, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { MutableRefObject, SetStateAction, useRef, useState } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from "recharts";
import { generateMonthlyDataPoints } from "./InvestmentCalculatorHelper";

export interface IDataPoint {
  name: string;
  withInvestment: number;
  withoutInvestment: number;
}

interface IState {
  dataPointsMonthly: IDataPoint[];
}

function convertToInt(
  compRef: MutableRefObject<BaseTextFieldProps | undefined>
): number {
  const value = compRef!.current!.value as string;

  if (value === "") {
    return 0;
  }
  return parseInt(value);
}

function getCalculateButton(
  originalSumRef: MutableRefObject<BaseTextFieldProps | undefined>,
  monthlyInvestmentRef: MutableRefObject<BaseTextFieldProps | undefined>,
  yearlyPerformanceRef: MutableRefObject<BaseTextFieldProps | undefined>,
  periodRef: MutableRefObject<BaseTextFieldProps | undefined>,
  setState: {
    (value: SetStateAction<IState>): void;
    (arg0: { dataPointsMonthly: IDataPoint[] }): void;
  }
) {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        const originalSum = convertToInt(originalSumRef);
        const monthlyInvestment = convertToInt(monthlyInvestmentRef);
        const yearlyPerformance = convertToInt(yearlyPerformanceRef);
        const period = convertToInt(periodRef);

        const dataPoints = generateMonthlyDataPoints(
          originalSum,
          monthlyInvestment,
          yearlyPerformance,
          period
        );
        setState({ dataPointsMonthly: dataPoints });
      }}
    >
      Calculate
    </Button>
  );
}

function getCharts(state: IState) {
  if (state.dataPointsMonthly.length === 0) {
    return null;
  } else {
    return (
      <LineChart
        width={730}
        height={250}
        data={state.dataPointsMonthly}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="withInvestment" stroke="#8884d8" />
        <Line type="monotone" dataKey="withoutInvestment" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

export function InvestmentCalculator() {
  const [state, setState] = useState<IState>({
    dataPointsMonthly: [] as IDataPoint[],
  });

  const originalSumRef = useRef<BaseTextFieldProps>();
  const monthlyInvestmentRef = useRef<BaseTextFieldProps>();
  const yearlyPerformanceRef = useRef<BaseTextFieldProps>();
  const periodRef = useRef();

  return (
    <div>
      <TextField
        inputRef={originalSumRef}
        label="Original cash"
        variant="outlined"
        required
      />
      <br />
      <TextField
        inputRef={monthlyInvestmentRef}
        label="Monthly cash investment"
        variant="outlined"
        required
      />
      <br />
      <TextField
        inputRef={yearlyPerformanceRef}
        label="yearly performance (%)"
        variant="outlined"
        required
      />
      <br />
      <TextField
        inputRef={periodRef}
        label="Period (in years)"
        variant="outlined"
        required
      />
      <br />
      <br />
      {getCalculateButton(
        originalSumRef,
        monthlyInvestmentRef,
        yearlyPerformanceRef,
        periodRef,
        setState
      )}
      {getCharts(state)}
    </div>
  );
}
