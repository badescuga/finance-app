import {
  BaseTextFieldProps,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { MutableRefObject, SetStateAction, useRef, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";
import { generateInvestmentProgression } from "./InvestmentCalculatorHelper";

export interface IDataPoint {
  name: string;
  withInvestment: number;
  withoutInvestment: number;
}

interface IState {
  dataPoints: IDataPoint[];
  chartDisplayMode: "monthly" | "yearly";
  capitalizeMonthlyInvestment: boolean;
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
  state: IState,
  setState: { (value: SetStateAction<IState>): void; (arg0: IState): void }
): JSX.Element {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        const originalSum = convertToInt(originalSumRef);
        const monthlyInvestment = convertToInt(monthlyInvestmentRef);
        const yearlyPerformance = convertToInt(yearlyPerformanceRef);
        const period = convertToInt(periodRef);

        const dataPoints = generateInvestmentProgression(
          originalSum,
          monthlyInvestment,
          yearlyPerformance,
          period,
          state.chartDisplayMode === "monthly",
          state.capitalizeMonthlyInvestment
        );
        setState({ ...state, dataPoints: dataPoints });
      }}
    >
      Calculate
    </Button>
  );
}

function getCharts(state: IState) {
  if (state.dataPoints.length === 0) {
    return null;
  }

  return (
    <LineChart
      width={730}
      height={250}
      data={state.dataPoints}
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

export function InvestmentCalculator() {
  const [state, setState] = useState<IState>({
    dataPoints: [] as IDataPoint[],
    chartDisplayMode: "monthly",
    capitalizeMonthlyInvestment: true
  });

  const chartDisplayModeChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      chartDisplayMode: event.target.value as "monthly" | "yearly",
    });
  };

  const capitalizeMonthlyInvestmentChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, capitalizeMonthlyInvestment: event.target.checked});
  };


  const originalSumRef = useRef<BaseTextFieldProps>();
  const monthlyInvestmentRef = useRef<BaseTextFieldProps>();
  const yearlyPerformanceRef = useRef<BaseTextFieldProps>();
  const periodRef = useRef<BaseTextFieldProps>();


  return (
    <div>
      <TextField
        inputRef={originalSumRef}
        label="Original cash ($)"
        variant="outlined"
        required
      />
      <br />
      <TextField
        inputRef={monthlyInvestmentRef}
        label="Monthly cash investment ($)"
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
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={state.chartDisplayMode}
        label="Data display mode"
        onChange={chartDisplayModeChange}
      >
        <MenuItem value={"monthly"}>Display Monthly Points</MenuItem>
        <MenuItem value={"yearly"}>Display Yearly Points</MenuItem>
      </Select><br/>
      Capitalize Monthly: <Checkbox checked={state.capitalizeMonthlyInvestment} onChange={capitalizeMonthlyInvestmentChanged} />
      <br />
      <br />
      {getCalculateButton(
        originalSumRef,
        monthlyInvestmentRef,
        yearlyPerformanceRef,
        periodRef,
        state,
        setState
      )}
      {getCharts(state)}
    </div>
  );
}
