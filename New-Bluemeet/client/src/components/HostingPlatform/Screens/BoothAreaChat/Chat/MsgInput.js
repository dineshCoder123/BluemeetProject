import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import socket from "./../../../service/socket";
import "../../../Styles/chatComponent.scss";
import IncomingChatMsgElement from "./IncomingChatMsgElement";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import SentimentSatisfiedRoundedIcon from "@material-ui/icons/SentimentSatisfiedRounded";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const MsgInput = (props) => {
  const [emojiMartVisbility, setEmojiMartVisbility] = useState("none");

  const { currentBoothId } = useSelector((state) => state.booth);

  const toggleEmojiMart = () => {
    if (emojiMartVisbility === "none") {
      setEmojiMartVisbility("inline-block");
    }
    if (emojiMartVisbility === "inline-block") {
      setEmojiMartVisbility("none");
    }
  };

  const params = useParams();
  const eventId = params.eventId;

  const { role } = useSelector((state) => state.eventAccessToken);
  const { userDetails } = useSelector((state) => state.user);

  let firstName;
  let lastName;
  let email;
  let image;
  let organisation;
  let designation;

  firstName = userDetails.firstName;
  lastName = userDetails.lastName;
  email = userDetails.email;
  image = userDetails.image;
  organisation = userDetails.organisation;
  designation = userDetails.designation;

  const [Message, setMessage] = useState("");

  const sendChannelMessage = () => {
    socket.emit(
      "transmitBoothMessage",
      {
        isReply: props.name && props.image && props.msg ? true : false,
        replyTo: props.chatMsgId,
        textMessage: Message,
        eventId: eventId,
        boothId: currentBoothId,
        createdAt: Date.now(),
        userRole: role,
        userName: firstName + " " + lastName,
        userEmail: email,
        userId: userDetails._id,
        userImage: image,
        userOrganisation: organisation,
        userDesignation: designation,
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
    <>
      <div
        style={{ height: "auto" }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            console.log("Submit msg form.");

            if (!Message) return;
            sendChannelMessage(Message);
            setMessage("");
            setEmojiMartVisbility("none");
            props.destroyReplyWidget();
          }
        }}
      >
        {props.name && props.image && props.msg ? (
          <div className="p-2">
            <div className="d-flex flex-row align-items-center justify-content-end mb-2">
              <CancelOutlinedIcon
                className="chat-msg-hover-icon"
                onClick={() => {
                  props.destroyReplyWidget();
                }}
              />
            </div>
            <div
              style={{ backgroundColor: "#494949", borderRadius: "10px" }}
              className="p-2"
            >
              <IncomingChatMsgElement
                name={props.name}
                image={props.image}
                msgText={props.msg}
                forReply={true}
                timestamp={props.timestamp}
                organisation={props.organisation}
                designation={props.designation}
              />
            </div>
          </div>
        ) : null}

        <div
          className="chat-msg-input-container d-flex flex-row justify-content-between align-items-center px-2"
          style={{ position: "relative" }}
        >
          <Picker
            onSelect={(emoji) => {
              console.log(emoji);

              setMessage((prev) => {
                return prev + emoji.native;
              });
            }}
            perLine={8}
            emoji=""
            showPreview={false}
            set="apple"
            style={{
              position: "absolute",
              bottom: "50px",

              display: emojiMartVisbility,
            }}
          />
          <SentimentSatisfiedRoundedIcon
            style={{ fill: "#BEBEBE" }}
            onClick={() => {
              toggleEmojiMart();
            }}
            className="chat-msg-hover-icon"
          />
          <input
            type="text"
            className="chat-input"
            placeholder="Write a message ..."
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "70%",
              border: "none",
              color: "#d3d3d3",
              backgroundColor: "transparent",
              outline: "none",
            }}
            value={Message}
          />
          <IconButton
            disabled={!Message ? true : false}
            onClick={() => {
              if (!Message) return;
              sendChannelMessage(Message);
              setMessage("");
              setEmojiMartVisbility("none");
              props.destroyReplyWidget();
            }}
          >
            <SendRoundedIcon
              style={{ color: "#d3d3d3" }}
              className="chat-msg-hover-icon"
            />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default MsgInput;
