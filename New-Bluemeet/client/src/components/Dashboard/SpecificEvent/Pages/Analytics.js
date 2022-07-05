import React from "react";
import "./../../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../../assets/Sass/EventManagement.scss";
import "./../../../../assets/Sass/SideNav.scss";
import "./../../../../assets/Sass/TopNav.scss";
import "./../../../../assets/Sass/DataGrid.scss";
import Select from "react-select";
import ApexChart from "../Helper/ApexSplineChart";

const timelineOptions = [
  { value: "Today", label: "Today" },
  { value: "This Week", label: "This Week" },
  { value: "This Month", label: "This Month" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
};

const EventAnalytics = () => {
  return (
    <>
      <div>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Analytics</div>
          <div className="sec-heading-action-button d-flex flex-row">
            <div className="ms-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="top"
                options={timelineOptions}
                defaultValue={timelineOptions[0]}
              />
            </div>

            {/* <button className="btn btn-primary btn-outline-text">
                  Create New event
                </button> */}
          </div>
        </div>
        {/* Here event analytics number cards will go */}

        {/* Number Card Row */}
        <div
          className="number-card-row mb-4 px-4"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
        >
          {/* Number Card 1 */}
          <div className="number-card px-5 py-4 d-flex align-items-center">
            <div>
              <div className="number-card-heading mb-2">Impressions</div>
              <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                <div className="num-text me-3">{10284}</div>
                <div className="num-percent increment">
                  {10284 >= 1 ? "+100%" : "+0%"}
                </div>
              </div>
            </div>
          </div>
          {/* Number Card 2 */}
          <div className="number-card px-5 py-4 d-flex align-items-center">
            <div>
              <div className="number-card-heading mb-2">Interested</div>
              <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                <div className="num-text me-3">{171882}</div>
                <div className="num-percent increment">
                  {171882 > 10 ? "+100%" : "+0%"}
                </div>
              </div>
            </div>
          </div>
          {/* Number Card 3 */}
          <div className="number-card px-5 py-4 d-flex align-items-center">
            <div>
              <div className="number-card-heading mb-2">Visits</div>
              <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                <div className="num-text me-3">0</div>
                <div className="num-percent decrement">+0%</div>
              </div>
            </div>
          </div>
          <div className="number-card px-5 py-4 d-flex align-items-center">
            <div>
              <div className="number-card-heading mb-2">Page Views</div>
              <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                <div className="num-text me-3">0</div>
                <div className="num-percent decrement">+0%</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="px-4"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "32px",
          }}
        >
          <div style={{ height: "350px" }}>
            <ApexChart titletext="Impressions" />
          </div>
          <div style={{ height: "350px" }}>
            <ApexChart titletext="Interested" />
          </div>
          <div style={{ height: "350px" }}>
            <ApexChart titletext="Visits" />
          </div>
          <div style={{ height: "350px" }}>
            <ApexChart titletext="Page views" />
          </div>
        </div>

        {/* Here analytics graphs will go */}
      </div>
    </>
  );
};

export default EventAnalytics;
