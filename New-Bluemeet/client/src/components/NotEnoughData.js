import React from "react";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import './../index.css';

const NotEnoughData = () => {
  return (
    <>
      <div className="not-enough-data p-4" style={{ textAlign: "center" }}>
        <ReportProblemRoundedIcon style={{ fill: "#A2BBEE", fontSize: "60" }} />
        <div className="not-enough-data-text ">Not enough data</div>
      </div>
    </>
  );
};

export default NotEnoughData;
