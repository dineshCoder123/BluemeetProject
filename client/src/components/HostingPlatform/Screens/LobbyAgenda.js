/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import EventBanner from "../HelperComponents/EventBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, fetchSessionsForUser } from "../../../actions";
import { useParams } from "react-router-dom";
import About from "./About";
import styled from "styled-components";
import Speakers from "./Sub/Speakers";
import Hosts from "./Sub/Hosts";
import MyMeetings from "./Sub/MyMeetings";
import MyConnections from "./Sub/MyConnections";

const CustomHorizontalTabWarpper = styled.div`
  min-width: 500px;
  height: auto;
  border-radius: 10px;
  background-color: #345b63;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
    background-color: #a0a0a057;
    cursor: pointer;
  }
`;

const LobbyAgenda = () => {
  const [selectedTab, setSelectedTab] = useState("about");

  const dispatch = useDispatch();

  const params = useParams();

  const eventId = params.eventId;

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    dispatch(fetchSessionsForUser(eventId));
  }, [dispatch, eventId]);

  const sessions = useSelector((state) => state.session.sessions);

  const { eventName, shortDescription, createdBy } = useSelector(
    (state) => state.event.eventDetails
  );

  return (
    <>
      <EventBanner
        eventName={eventName}
        shortDescription={shortDescription}
        createdBy={createdBy}
      />

      <CustomHorizontalTabWarpper className="px-3 mb-4">
        <CustomTabButton
          active={selectedTab === "about" ? true : false}
          onClick={() => {
            setSelectedTab("about");
          }}
        >
          About
        </CustomTabButton>
        <CustomTabButton
          active={selectedTab === "myMeetings" ? true : false}
          onClick={() => {
            setSelectedTab("myMeetings");
          }}
        >
          My meetings
        </CustomTabButton>
        <CustomTabButton
          active={selectedTab === "connections" ? true : false}
          onClick={() => {
            setSelectedTab("connections");
          }}
        >
          Connections
        </CustomTabButton>

        <CustomTabButton
          active={selectedTab === "speakers" ? true : false}
          onClick={() => {
            setSelectedTab("speakers");
          }}
        >
          Speakers
        </CustomTabButton>
        <CustomTabButton
          active={selectedTab === "hosts" ? true : false}
          onClick={() => {
            setSelectedTab("hosts");
          }}
        >
          Hosts
        </CustomTabButton>
      </CustomHorizontalTabWarpper>
      {(() => {
        switch (selectedTab) {
          case "about":
            return <About />;
          case "myMeetings":
            return <MyMeetings />;
          case "connections":
            return <MyConnections />;
          case "speakers":
            return <Speakers />;
          case "hosts":
            return <Hosts />;

          default:
            return <div>You are inside lobby.</div>;
        }
      })()}
    </>
  );
};

export default LobbyAgenda;
