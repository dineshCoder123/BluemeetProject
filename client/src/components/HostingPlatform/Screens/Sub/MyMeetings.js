import React, { useEffect } from "react";
import socket from "./../../service/socket";
import styled from "styled-components";
import MyMeetingsDetailsCard from "./Helper/MyMeetingsDetailsCard";
import MyMeetingsListFields from "./Helper/MyMeetingsListFields";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const MyMeetings = () => {
  const params = useParams();
  const eventId = params.eventId;
  const { id } = useSelector((state) => state.eventAccessToken);

  const { scheduledMeets } = useSelector((state) => state.scheduledMeets);

  const userId = id;

  useEffect(() => {
    socket.emit("getMyMeetings", { userId, eventId }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  const renderScheduledMeets = (meets) => {
    return meets
      .slice(0)
      .reverse()
      .map((meet) => {
        return (
          <MyMeetingsDetailsCard
            key={meet._id}
            id={meet._id}
            title={meet.title}
            agenda={meet.shortDescription}
            invitedByName={meet.createdBy.firstName + meet.createdBy.lastName}
            invitedByImage={
              meet.createdBy.image
                ? meet.createdBy.image.startsWith("https://")
                  ? meet.createdBy.image
                  : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${meet.createdBy.image}`
                : "#"
            }
            startsAt={meet.startsAt}
          />
        );
      });
  };

  return (
    <>
      <div className="event-management-content-grid px-3 mb-4 py-4">
        <MyMeetingsListFields />
        {renderScheduledMeets(scheduledMeets)}
      </div>
    </>
  );
};

export default MyMeetings;
