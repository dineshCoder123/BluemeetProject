/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import "./../../assets/Sass/Registrations.scss";
import {  Divider } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReactTooltip from "react-tooltip";
import SchedulerTabs from "./HelperComponent/SchedulerTabs";
import ScheduleListFields from "./SubComponents/SchedulerComponents/ScheduleListFields";
import ScheduleDetailsCard from "./SubComponents/SchedulerComponents/ScheduleDetailsCard";


const Scheduler = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveIndex(newValue);
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">
            <span> Scheduler </span>
            <a
              data-tip="Manage all your email campaigns and notification schedule here."
              className="ms-3"
            >
              <InfoOutlinedIcon style={{ fill: "#6E6E6E", fontSize: "22px" }} />
            </a>

            <ReactTooltip place="bottom" type="dark" effect="float" />
          </div>
          <div className="sec-heading-action-button d-flex flex-row">
            {/* Here goes right side search, filter and sort components */}
          </div>
        </div>
        <div className="px-4 py-4">
          <SchedulerTabs
            activeIndex={activeIndex}
            handleChange={handleChange}
          />

<div className="event-management-content-grid px-3 my-3 py-4">
<ScheduleListFields />

<div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
            <Divider />
          </div>
          <ScheduleDetailsCard />
</div>
          
        </div>
      </div>
    </>
  );
};

export default Scheduler;
