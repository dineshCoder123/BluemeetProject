import React from "react";
import Divider from "@material-ui/core/Divider";
import "./../../../../../assets/Sass/DataGrid.scss";
import styled from "styled-components";

const ListFieldText = styled.div`
  font-family: "Ubuntu";
  font-size: 0.9rem;
  font-weight: 500;
  color: #313131;
`;

const ReportsDownloadHistoryListFields = () => {
  return (
    <>
      <div
        className="session-list-fields-container"
        style={{
          gridTemplateColumns: "2.5fr 2fr 1fr 1fr 1fr 1fr 1fr",
          gridGap: "16px",
        }}
      >
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            Title
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            Type
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            Time stamp
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            Last updated
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            Status
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            Queried by
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            Actions
          </ListFieldText>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default ReportsDownloadHistoryListFields;
