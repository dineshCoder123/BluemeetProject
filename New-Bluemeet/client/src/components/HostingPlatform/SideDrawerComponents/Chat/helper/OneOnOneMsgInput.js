import { IconButton } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import socket from "./../../../service/socket";
import "./../../../Styles/chatComponent.scss";
import ChatMsgElement from "./ChatMsgElement";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import SentimentSatisfiedRoundedIcon from "@material-ui/icons/SentimentSatisfiedRounded";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const OneOnOneMsgInput = (props) => {
  const [emojiMartVisbility, setEmojiMartVisbility] = useState("none");

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

  const { role, id } = useSelector((state) => state.eventAccessToken);
  const recieverId = useSelector((state) => state.personalChat.id);

  const receiverId = recieverId;

  let firstName; // Sender first name
  let lastName; // Sender last name
  let email; // Sender email
  let image; // Sender Image
  let organisation; // Sender organisation
  let designation; // Sender designation

  const userDetails = useSelector((state) => state.user.userDetails);

  firstName = userDetails.firstName;
  lastName = userDetails.lastName;
  email = userDetails.email;
  image = userDetails.image;
  organisation = userDetails.organisation;
  designation = userDetails.designation;

  const [Message, setMessage] = useState("");

  const sendChannelMessage = () => {
    socket.emit(
      "transmitPersonalMessage",
      {
        isReply: props.name && props.image && props.msg ? true : false,
        replyTo: props.chatMsgId,
        textMessage: Message,
        eventId: eventId,
        createdAt: Date.now(),
        senderRole: role,
        senderName: firstName + " " + lastName,
        senderEmail: email,
        senderImage: image,
        senderOrganisation: organisation,
        senderDesignation: designation,
        reported: false,
        visibilityStatus: "Active",
        senderId: id, // Access it from event access token in redux store
        receiverId: receiverId, // Access it from personal chat in redux store
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
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            console.log("Submit msg form.");

            if (!Message) return;
            sendChannelMessage(Message);
            setMessage("");
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
              style={{ backgroundColor: "#E7E7E7", borderRadius: "10px" }}
              className="p-2"
            >
              <ChatMsgElement
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
              marginLeft: "10px",
              display: emojiMartVisbility,
            }}
          />
          <SentimentSatisfiedRoundedIcon
            style={{ fill: "#4D4D4D" }}
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
              props.destroyReplyWidget();
            }}
          >
            <SendRoundedIcon className="chat-msg-hover-icon" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default OneOnOneMsgInput;
