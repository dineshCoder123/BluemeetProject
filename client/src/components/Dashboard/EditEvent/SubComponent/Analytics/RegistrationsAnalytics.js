import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
} from "victory";

const FourCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
`;

const TwoCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
`;

const NumCard = styled.div`
  height: 200px;
  border-radius: 10px;
  border: 1px solid #cccccc;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 16px 0 #2121212a;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const LineChartContainer = styled.div`
  height: 400px;
  border-radius: 10px;
  border: 1px solid #cccccc;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 16px 0 #2121212a;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const SalesByTicketTypeCard = styled.div`
  height: 200px;
  border-radius: 10px;
  border: 1px solid #cccccc;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 16px 0 #2121212a;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const SalesBreakdownCard = styled.div`
  height: 400px;
  border-radius: 10px;
  border: 1px solid #cccccc;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 16px 0 #2121212a;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => (
  <>
    <div className="header" style={{ height: "250px" }}>
      <Bar data={data} options={options} />
    </div>
  </>
);

const RegistrationsAnalytics = () => {
  return (
    <>
      <div className="p-4">
        <FourCardsGrid className="mb-4">
          <NumCard className="p-3"></NumCard>
          <NumCard className="p-3"></NumCard>
          <NumCard className="p-3"></NumCard>
          <NumCard className="p-3"></NumCard>
        </FourCardsGrid>
        <LineChartContainer className="mb-4">
          {/* <App /> */}
          <VerticalBar />
        </LineChartContainer>

        <TwoCardsGrid className="mb-4">
          <SalesByTicketTypeCard></SalesByTicketTypeCard>
          <SalesBreakdownCard></SalesBreakdownCard>
        </TwoCardsGrid>

        <LineChartContainer></LineChartContainer>
      </div>
    </>
  );
};

export default RegistrationsAnalytics;
