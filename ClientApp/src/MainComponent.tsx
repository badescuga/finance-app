import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { InvestmentCalculator } from './Components/InvestmentCalculator';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IState {
  currentTab: number;
  weatherData: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

async function populateWeatherData() {
  const response = await fetch('weatherforecast');
  const data = await response.json();
  
  return data;
}

export function MainComponent() {
  const [state, setState] = React.useState<IState>({currentTab: 0, weatherData: undefined});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setState({...state, currentTab: newValue});

    if(newValue === 1) {
      populateWeatherData().then(data => {
     //   setState({...state, weatherData: data});
     console.dir(data);
      });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={state.currentTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Investment Calculator" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={state.currentTab} index={0}>
      <InvestmentCalculator />
      </TabPanel>
      <TabPanel value={state.currentTab} index={1}>
        Item Two
        {state.weatherData}
      </TabPanel>
      <TabPanel value={state.currentTab} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}