import React from "react";
import Divider from "@material-ui/core/Divider";
import "./../../../../assets/Sass/DataGrid.scss";

const FollowingListFields = () => {
  return (
    <>
      <div
        className="session-list-fields-container"
        style={{
          gridTemplateColumns: "4fr 4fr 2.5fr 1fr",
          gridGap: "24px",
          alignItems: "center",
        }}
      >
        <div className="">
          <div className="event-field-label" style={{ width: "100%" }}>
            Community Name
          </div>
        </div>
        <div className="">
          <div className="event-field-label" style={{ width: "100%" }}>
            Email
          </div>
        </div>
        <div className="">
          <div className="event-field-label" style={{ width: "100%" }}>
            Visit community
          </div>
        </div>
        <div className="event-registrations-field">
          <div className="event-field-label" style={{ width: "100%" }}>
            Action
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default FollowingListFields;
