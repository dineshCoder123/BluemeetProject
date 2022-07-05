import React from "react";
import styled from "styled-components";
import { DashboardSectionHeading } from "./Elements";
import YouHaveNoEventComing from "./YouHaveNoEventsComing";
import NoConnections from "./Images/NoConnections.png";
import ConnectionListLabels from "./GridComponents/Connections/ListLabels";
import ListDetailsCard from "./GridComponents/Connections/ListDetailsCard";

const UserAccountConnections = () => {
  return (
    <>
      <div className="user-account-main-body-home-content">
        <div
          className="user-account-main-body-home-content-left ps-2"
          style={{ overflow: "auto", height: "100%" }}
        >
          <DashboardSectionHeading className="pb-4 ps-4">
            Your Connections
          </DashboardSectionHeading>
          <div className="px-4">
            <ConnectionListLabels />
            <ListDetailsCard />
          </div>

          {/* <div
            style={{ width: "100%", height: "70vh" }}
            className="d-flex flex-row align-items-center justify-content-center"
          >
            <YouHaveNoEventComing
              hideBtn={true}
              img={NoConnections}
              msgText={"You have not made any connections yet."}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserAccountConnections;
