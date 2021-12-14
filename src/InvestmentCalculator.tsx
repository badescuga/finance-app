import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

function getCalculateButton() {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        alert("clicked");
      }}
    >
      Calculate
    </Button>
  );
}

export function InvestmentCalculator() {
  return <div>
      <TextField id="original-sum" label="Original cash" variant="outlined" required/>< br/>
      <TextField id="monthly-investment" label="Monthly cash investment" variant="outlined" required/>< br/>
      <TextField id="yearly-performance" label="yearly performance (%)" variant="outlined" required/>< br/>
      <TextField id="period" label="Period (in years)" variant="outlined" required/>< br/>
      < br/>
      {getCalculateButton()}</div>;
}
