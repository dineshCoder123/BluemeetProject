/* eslint-disable no-lone-blocks */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CameraAndMicSettings from './CameraAndMicSettings';
import DeviceTest from './DeviceTest';
import UplinkAndDownlink from './UplinkAndDownlink';
// import CommunityProfileTab from './CommunityProfileTab';
// import CommunityDefaults from './CommunityDefaults';
// import PayOutInfoForm from './FormComponents/PayOutInfoForm';
// import CommunityAgreements from './Helper/CommunityAgreements';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function SettingsVerticalTabs({uplinkStat, downlinkStat}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={`${classes.root} p-4`} style={{minHeight: "700px", maxHeight: "700px"}}>
      <Tabs
      style={{minHeight: "700px", maxHeight: "700px", height: "auto"}}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Camera & Mic" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}} {...a11yProps(0)} />
        <Tab label="Device tests" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}} {...a11yProps(1)} />
        <Tab label="Call Stats" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}} {...a11yProps(2)} />
        {/* <Tab label="Agreements" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}} {...a11yProps(3)} /> */}
        {/* <Tab label="Deactivation" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}} {...a11yProps(4)} /> */} 
      </Tabs>
      <TabPanel value={value} index={0}>
        <CameraAndMicSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <DeviceTest />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <UplinkAndDownlink uplinkStat={uplinkStat} downlinkStat={downlinkStat} />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <CommunityAgreements />
      </TabPanel> */}
      {/* <TabPanel value={value} index={4}>
        Item Five
      </TabPanel> */}
    </div>
  );
}










