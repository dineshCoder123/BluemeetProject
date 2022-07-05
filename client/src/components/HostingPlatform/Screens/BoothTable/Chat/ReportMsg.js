import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import "./../../../Styles/report.scss";
import { Avatar, IconButton } from "@material-ui/core";
import Select from "react-select";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.8rem",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.8rem",
    color: "#757575",
  }),
};

const reportOptions = [
  { value: "Harrasment or hateful", label: "Harrasment or hateful" },
  { value: "Violence or physical harm", label: "Violence or physical harm" },
  { value: "Sexual Harrasement", label: "Sexual Harrasement" },
  {
    value: "Intellectual property infringement or defamation",
    label: "Intellectual property infringement or defamation",
  },
  { value: "Suspicious or fake", label: "Suspicious or fake" },
  { value: "Other", label: "Other" },
];

const MsgElement = ({ name, image, msgText }) => {
  return (
    <>
      <div
        style={{
          maxWidth: "320px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            className=" mb-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
          >
            <Avatar src={image} alt={name} variant="rounded" />
            <div
              className="chat-box-name ms-3"
              style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
            >
              <div>{name}</div>

              <div
                style={{
                  fontWeight: "500",
                  color: "#4B4B4B",
                  fontSize: "0.7rem",
                }}
                className="d-flex flex-row align-items-center justify-content-between"
              >
                <div>Product Manager, Evenz</div>
                {/* // TODO Organisation, designation and time ago should be populated correctly */}

                <div>3m ago</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" mb-2"
          style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
        >
          <div></div>
          <div style={{ position: "relative" }}>
            <div className="chat-msg-text ms-3 p-3">
              <div>{msgText}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ReportMsg = ({ name, image, msgText, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="report-activity-container">
          <div className="d-flex flex-row align-items-center justify-content-between p-3 mb-3">
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.05rem",
                color: "#212121",
              }}
            >
              Report this message
            </span>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </div>

          {/* <ChatMsgElement /> */}
          <div className="msg-to-report-container p-3 mb-4">
            <MsgElement name={name} image={image} msgText={msgText} />
          </div>

          <div
            className="mb-4 overlay-form-input-row msg-to-report-container"
            style={{ border: "none" }}
          >
            <label
              Forhtml="eventEndDate"
              className="form-label form-label-customized"
              style={{ textTransform: "initial" }}
            >
              What's wrong with this ?
            </label>
            <Select
              name="eventName"
              // placeholder="What's wrong?"
              styles={styles}
              menuPlacement="top"
              options={reportOptions}
            />
          </div>

          <div
            className="msg-to-report-container mb-3"
            style={{ border: "none" }}
          >
            <button
              className="btn btn-primary btn-outline-text"
              style={{ width: "100%" }}
            >
              Report
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ReportMsg;
