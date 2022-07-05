import React from "react";
import DoughnutChart from "./DonutChart";

const Doughnut = () => {
  return (
    <>
      {/* Donughnut Chart */}

      <div className="d-flex flex-row justify-content-center ">
        <div className="center-label-and-doughnut-wrapper ">
          <div className="center-label-wrapper">
            12 <br />{" "}
            <span
              style={{
                color: "#7D9EB5",
                fontSize: "18px",
                lineHeight: "17px",
                letterSpacing: "0.6px",
              }}
            >
              {" "}
              Events <br /> Hosted
            </span>
          </div>
          <div className="donut-chart-wrapper">
            <DoughnutChart />
          </div>
        </div>
      </div>

      {/* Doughnut Chart Legends */}

      <div className="custom-doughnut-datalabels-wrapper">
        {/* Doughnut Chart Datalabel Row 1 */}
        <div className="custom-doughnut-datalabel-row">
          <div className="color-label" style={{ background: "#11A1FD" }}></div>
          <div className="text-label">E - Summit 21'</div>
          <div
            className="percentage-label-doughnut"
            style={{ color: "#11A1FD" }}
          >
            55%
          </div>
        </div>

        {/* Doughnut Chart Datalabel Row 2 */}
        <div className="custom-doughnut-datalabel-row">
          <div className="color-label" style={{ background: "#A6CEE3" }}></div>
          <div className="text-label">Eureka Road to enterprise</div>
          <div
            className="percentage-label-doughnut"
            style={{ color: "#A6CEE3" }}
          >
            25%
          </div>
        </div>
        {/* Doughnut Chart Datalabel Row 3 */}
        <div className="custom-doughnut-datalabel-row">
          <div className="color-label" style={{ background: "#B2DF8A" }}></div>
          <div className="text-label">ACT - A creative TechFest</div>
          <div
            className="percentage-label-doughnut"
            style={{ color: "#B2DF8A" }}
          >
            15%
          </div>
        </div>
        {/* Doughnut Chart Datalabel Row 4 */}
        <div className="custom-doughnut-datalabel-row">
          <div className="color-label" style={{ background: "#33A02C" }}></div>
          <div className="text-label">Others</div>
          <div
            className="percentage-label-doughnut"
            style={{ color: "#33A02C" }}
          >
            5%
          </div>
        </div>
      </div>
    </>
  );
};

export default Doughnut;
