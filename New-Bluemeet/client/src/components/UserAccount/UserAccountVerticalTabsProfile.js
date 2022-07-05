import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./../../index.css";

import EditProfileForm from "./Forms/EditProfileForm";
import EditNotificationSettings from "./Forms/EditNotificationSettings";
import UserBookedTickets from "./Forms/UserBookedTickets";
import ResetPasswordAndDeactivation from "./Forms/ResetPasswordAndDeactivation";

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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    display: "flex",
    minHeight: "76.5vh",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabsProfile() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={`${classes.root} profile-tabs-container`} style={{minHeight: "700px", maxHeight: "700px", height: "auto", minWidth: "998px"}}>
      <Tabs
        style={{ height: "auto" }}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Edit Profile" style={{fontWeight: "500", textTransform: "capitalize"}} {...a11yProps(0)} />
        <Tab label="Notifications" style={{fontWeight: "500", textTransform: "capitalize"}} {...a11yProps(1)} />
        <Tab label="Booked Ticket" style={{fontWeight: "500", textTransform: "capitalize"}} {...a11yProps(2)} />
        <Tab label="Password & Security" style={{fontWeight: "500", textTransform: "capitalize"}} {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EditProfileForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditNotificationSettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserBookedTickets />
      </TabPanel>
      <TabPanel value={value} index={3}>
        {" "}
        <ResetPasswordAndDeactivation />{" "}
      </TabPanel>
    </div>
  );
}
