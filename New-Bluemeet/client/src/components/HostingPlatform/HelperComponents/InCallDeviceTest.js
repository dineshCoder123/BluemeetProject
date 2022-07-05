/* eslint-disable no-unused-vars */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DeviceTest from "./DeviceTest";
import { IconButton } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { makeStyles } from "@material-ui/core";
import SettingsVerticalTabs from "../SubComponents/SettingsVerticalTabs";

const InCallDeviceTest = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const useStyles = makeStyles(() => ({
    paper: { minWidth: "998px" },
  }));

  const classes = useStyles();

  return (
    <>
      <Dialog
        classes={{ paper: classes.paper }}
        style={{ height: "auto" }}
        // fullScreen={fullScreen}
        // open={true}
        open={props.open}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <div  className="">
          <div className="d-flex flex-row align-items-center justify-content-end p-3">
            <IconButton>
              <HighlightOffRoundedIcon />
            </IconButton>
          </div>
          <div height="100%" className=" d-flex flex-row align-items-center justify-content-center mb-5">
          <DeviceTest />

          </div>
        </div> */}

        <div
          className="d-flex flex-row align-items-center justify-content-between p-3 px-5"
          style={{ borderBottom: "1px solid #B6B6B6" }}
        >
          <div
            style={{ fontWeight: "500", color: "#212121", fontFamily: "Inter" }}
          >
            Settings
          </div>
          <div style={{ justifySelf: "end" }}>
            <IconButton
              onClick={props.handleCloseSettings}
              style={{ width: "fit-content" }}
              aria-label="delete"
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </div>
        </div>

        <SettingsVerticalTabs uplinkStat={props.uplinkStat} downlinkStat={props.downlinkStat} />
      </Dialog>
    </>
  );
};

export default InCallDeviceTest;
