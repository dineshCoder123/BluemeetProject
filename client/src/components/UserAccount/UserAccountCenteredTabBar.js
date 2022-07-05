import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs(props) {
  const num = props.activeIndex * 1;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Tabs
        value={num}
        onChange={props.handleChange}
        indicatorColor="#152d35"
        textColor="#152d35"
        centered
        variant="fullWidth"
        inkBarStyle={{ background: "blue" }}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#152d35",
            color: "#152d35",
          },
        }}
      >
        <Tab
          label="Home"
          style={{ fontWeight: "500", textTransform: "capitalize" }}
        />
        <Tab
          label="Events"
          style={{ fontWeight: "500", textTransform: "capitalize" }}
        />
        <Tab
          label="Connections"
          style={{ fontWeight: "500", textTransform: "capitalize" }}
        />
        <Tab
          label="Profile"
          style={{ fontWeight: "500", textTransform: "capitalize" }}
        />
        {/* <Tab
          label="Briefcase"
          style={{ fontWeight: "500", textTransform: "capitalize" }}
        /> */}
        <Tab
          label="Following"
          style={{ fontWeight: "500", textTransform: "capitalize" }}
        />
      </Tabs>
    </Paper>
  );
}
