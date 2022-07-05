import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function SchedulerTabs({activeIndex, handleChange}) {
  const num = activeIndex * 1;
  const classes = useStyles();
  
  return (
    <Paper className={classes.root}>
      <Tabs
        value={num}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
      >
        <Tab label="Attendee" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}} />
        <Tab label="Speakers" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}}/>
        <Tab label="Booths" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}}/>
        <Tab label="Sponsors" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}}/>
        <Tab label="Leads" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}}/>
        <Tab label="Interested" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}}/>
      </Tabs>
    </Paper>
  );
}
