import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import styled from "styled-components";
import FourKIcon from "@material-ui/icons/FourK";
import React from "react";
import dateFormat from "dateformat";
import { IconButton } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import "./../../../assets/Sass/DataGrid.scss";

const SessionName = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #212121;
`;

const RecordingsDetailsCard = ({
  sessionName,
  duration,
  id,
  url,
  timestamp,
}) => {
  const downloadRecording = () => {
    window.location.href = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${url}`;
  };

  return (
    <>
      <div
        className="registrations-field-value-container"
        style={{
          display: "grid",
          gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr",
          alignItems: "center",
        }}
      >
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5 d-flex flex-row ">
            <VideocamRoundedIcon style={{ fill: "#538BF7" }} />

            <SessionName className="ms-3 px-2">{sessionName}</SessionName>
          </div>
        </div>

        <div className="registrations-phone-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {duration}
          </div>
        </div>
        <div className="registrations-date-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {dateFormat(new Date(timestamp), "ddd, mmm dS, yy, h:MM:ss TT")}
          </div>
        </div>

        <div className="registrations-ticket-type-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {/* Ticket Type */}
            <FourKIcon style={{ fill: "#538BF7", fontSize: "32" }} />
          </div>
        </div>

        <div className="registrations-invoice-field">
          <div className="registrations-field-label registrations-field-value-modified px-3">
            <IconButton
              onClick={() => {
                downloadRecording();
              }}
            >
              <CloudDownloadIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default RecordingsDetailsCard;
