import React from "react";
import Divider from "@material-ui/core/Divider";
import "./../../../../../assets/Sass/DataGrid.scss";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";

import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded"; // Download report
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded"; // Update report
import CircleRoundedIcon from "@mui/icons-material/CircleRounded"; // Dot indicator
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded"; // Analytics Icon

import dateFormat from "dateformat";

import Faker from "faker";

const ListFieldText = styled.div`
  font-family: "Ubuntu";
  font-size: 0.8rem;
  font-weight: 500;
  color: #535353;
`;

const EventReportIconBox = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) =>
    props && props.color ? props.color : "#538BF7"};
  color: #ffffff;
`;

const now = Date.now();

const ReportsDownloadHistoryDetailsCard = () => {
  return (
    <>
      <div
        className="session-list-fields-container"
        style={{
          gridTemplateColumns: "2.5fr 2fr 1fr 1fr 1fr 1fr 1fr",
          gridGap: "16px",
          alignItems: "center",
        }}
      >
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {/* Title */}
            <div className="d-flex flex-row align-items-center">
              <EventReportIconBox className="me-3">
                <PieChartRoundedIcon />
              </EventReportIconBox>
              Event Chat Report
            </div>
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            Summary report
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {/* Time stamp */}
            {dateFormat(now)}
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {/* Last updated */}
            {dateFormat(now)}
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {/* Status */}
            <div className="d-flex flex-row align-items-center">
              <CircleRoundedIcon
                style={{ fontSize: "10px", color: "#21C760" }}
                className="me-2"
              />
              <span>Completed</span>
            </div>
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {Faker.name.findName()}
          </ListFieldText>
        </div>

        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            <div className="d-flex flex-row align-items-center">
              <IconButton className="me-3">
                <CloudDownloadRoundedIcon
                  style={{ fontSize: "24px", color: "#538BF7" }}
                />
              </IconButton>
              <IconButton className="">
                <AutorenewRoundedIcon
                  style={{ fontSize: "24px", color: "#2ACA38" }}
                />
              </IconButton>
            </div>
          </ListFieldText>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default ReportsDownloadHistoryDetailsCard;
