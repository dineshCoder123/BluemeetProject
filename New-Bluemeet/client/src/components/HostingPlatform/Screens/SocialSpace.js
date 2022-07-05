import React, { useState } from "react";
import styled from "styled-components";

const CustomHorizontalTabWarpper = styled.div`
  min-width: 500px;
  height: auto;
  border-radius: 10px;
  background-color: #345b63;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const CustomTabButton = styled.div`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  color: #fff;
  align-self: center;

  text-align: center;
  padding: 6px 12px;
  background-color: ${(props) =>
    props.active && props.active ? "#152d35" : "#345b63"};
  border-radius: 10px;
  border: 1px solid transparent;

  &:hover {
    /* border: 1px solid #fff; */
    background-color: #a0a0a057;
    cursor: pointer;
  }
`;

const SocialSpace = () => {
  const [selectedTab, setSelectedTab] = useState("eventwall");

  return (
    <>
      <div>
        <CustomHorizontalTabWarpper className="px-3 mb-4">
          <CustomTabButton
            active={selectedTab === "eventwall" ? true : false}
            onClick={() => {
              setSelectedTab("eventwall");
            }}
          >
            Event wall
          </CustomTabButton>
          <CustomTabButton
            active={selectedTab === "twitterwall" ? true : false}
            onClick={() => {
              setSelectedTab("twitterwall");
            }}
          >
            What's happening
          </CustomTabButton>
          
          
          <CustomTabButton
            active={selectedTab === "leaderboard" ? true : false}
            onClick={() => {
              setSelectedTab("leaderboard");
            }}
          >
            Leaderboard
          </CustomTabButton>
        </CustomHorizontalTabWarpper>

        {(() => {
          switch (selectedTab) {
            case "eventwall":
              break;

            default:
              break;
          }
        })()}
      </div>
    </>
  );
};

export default SocialSpace;
