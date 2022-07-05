import { IconButton } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import socket from "./../../../service/socket";

const MsgInput = () => {
  const params = useParams();
  const eventId = params.eventId;
  const sessionId = params.sessionId;

  const { role, id } = useSelector((state) => state.eventAccessToken);

  let firstName;
  let lastName;
  let email;
  let image;

  const userDetails = useSelector((state) => state.user.userDetails);

  const speakerDetails = useSelector((state) => state.speaker.speakerDetails);

  if (role !== "speaker") {
    firstName = userDetails.firstName;
    lastName = userDetails.lastName;
    email = userDetails.email;
    image = userDetails.image;
  } 
  else {
    firstName = speakerDetails.firstName;
    lastName = speakerDetails.lastName;
    email = speakerDetails.email;
    image = speakerDetails.image;
  }

  const [Message, setMessage] = useState("");

  const sendChannelMessage = () => {
    console.log("send channel message was triggered");
    console.log(Message);
    socket.emit(
      "transmitSessionMessage",
      {
        textMessage: Message,
        sessionId: sessionId,
        createdAt: Date.now(),
        sessionRole: role,
        userName: firstName + " " + lastName,
        userEmail: email,
        userImage: image,
        userId: id,
        reported: false,
        numOfTimesReported: 0,
        visibilityStatus: "Active",
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  };

  return (
    <div className="chat-msg-input-container d-flex flex-row justify-content-between">
      <input
        type="text"
        className="form-control chat-input"
        placeholder="Write a message ..."
        onChange={(e) => setMessage(e.target.value)}
        value={Message}
      />
      <IconButton
        onClick={() => {
          if(!Message) return;
          sendChannelMessage(Message);
          setMessage("")
        }}
      >
        <SendRoundedIcon />
      </IconButton>
    </div>
  );
};

export default MsgInput;
