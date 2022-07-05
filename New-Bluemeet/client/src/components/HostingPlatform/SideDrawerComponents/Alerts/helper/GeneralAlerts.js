/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import "./../Styles/alerts.scss";

import "./../../../Styles/root.scss";
import GroupMeetAlert from "../Sub/GroupMeetAlert";
import OneOnOneMeetAlert from "../Sub/OneOnOneMeetAlert";
import SessionReminder from "../Sub/SessionReminder";
import TableInvitationAlert from "../Sub/TableInvitationAlert";
import MeetingUpdateAlert from "../Sub/MeetingUpdateAlert";


const GeneralAlerts = (props) => {

  return (
    <>
      <div>
        <div className="people-container pt-2 px-2" style={{ height: "73vh" }}>
          {/* <div className="search-box-and-view-switch-container d-flex flex-row justify-content-between mb-3"></div> */}

          <div
            className="scrollable-chat-element-container mb-3"
            style={{ height: "69vh" }}
          >
            {/* {isLoading ? :} */}
            {/* {renderAlertsList(eventAlerts)} */}

            <GroupMeetAlert />

            <OneOnOneMeetAlert />

            <SessionReminder />

            <TableInvitationAlert />

            <MeetingUpdateAlert />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralAlerts;
