import React from "react";
import "./../../../index.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const UplinkAndDownlink = ({ uplinkStat, downlinkStat }) => {
  let uplinkColor;
  let uplinkText;
  let downlinkColor;
  let downlinkText;

  (() => {
    switch (uplinkStat * 1) {
      case 0:
        uplinkColor = "#F7B853";
        uplinkText = "Uplink quality is unkown.";
        break;
      case 1:
        uplinkColor = "#46C713";
        uplinkText = "Uplink quality is excellent.";
        break;
      case 2:
        uplinkColor = "#53F797";
        uplinkText = "Uplink quality is good, but bitrate is low.";
        break;
      case 3:
        uplinkColor = "#53E4F7";
        uplinkText = "Slightly impaired communication.";
        break;
      case 4:
        uplinkColor = "#DEF753";
        uplinkText = "Cannot communicate smoothly";
        break;
      case 5:
        uplinkColor = "#F75361";
        uplinkText = "Network is poor, can barely communicate.";
        break;
      case 6:
        uplinkColor = "#F75353";
        uplinkText = "Network is down, cannot communicate at all.";
        break;

      default:
        uplinkText = "Uplink quality is unkown.";
        uplinkColor = "#F7B853";
    }
  })();

  (() => {
    switch (downlinkStat * 1) {
      case 0:
        downlinkColor = "#F7B853";
        downlinkText = "Downlink quality is unkown.";
        break;
      case 1:
        downlinkColor = "#46C713";
        downlinkText = "Downlink quality is excellent.";
        break;
      case 2:
        downlinkColor = "#53F797";
        downlinkText = "Downlink quality is good, but bitrate is low.";
        break;
      case 3:
        downlinkColor = "#53E4F7";
        downlinkText = "Slightly impaired communication.";
        break;
      case 4:
        downlinkColor = "#DEF753";
        downlinkText = "Cannot communicate smoothly";
        break;
      case 5:
        downlinkColor = "#F75361";
        downlinkText = "Network is poor, can barely communicate.";
        break;
      case 6:
        downlinkColor = "#F75353";
        downlinkText = "Network is down, cannot communicate at all.";
        break;

      default:
        downlinkText = "Downlink quality is unkown.";
        downlinkColor = "#F7B853";
    }
  })();

  return (
    <>
      <div
        className="uplink-and-downlink-box d-flex flex-row align-items-center justify-content-around"
        style={{ height: "360px", width: "668px" }}
      >
        <div
          style={{ height: "300px", width: "300px", textAlign: "center" }}
          className="network-connection-card p-5"
        >
          <div>Uplink</div>

          <ArrowUpwardIcon
            style={{ fontSize: "72px", fill: uplinkColor }}
            className="my-4"
          />

          <div>{uplinkText} </div>
        </div>

        <div
          style={{ height: "300px", width: "300px", textAlign: "center" }}
          className="network-connection-card p-5"
        >
          <div>Downlink</div>

          <ArrowDownwardIcon
            style={{ fontSize: "72px", fill: downlinkColor }}
            className="my-4"
          />

          <div>{downlinkText}</div>
        </div>
      </div>
    </>
  );
};

export default UplinkAndDownlink;
