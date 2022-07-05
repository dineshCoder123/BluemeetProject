/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ChatMsgElement from "./ChatMsgElement";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MsgInput from "./MsgInput";
import "./../../../Styles/chatComponent.scss";
import socket from "../../../service/socket";
import {
  fetchPreviousSessionChatMessages,
  fetchSessionChats,
} from "../../../../../actions";

const SessionChatsComponent = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const sessionId = params.sessionId;

  useEffect(() => {
    dispatch(fetchPreviousSessionChatMessages(sessionId));

    socket.on("previousSessionMessages", ({ chats }) => {
      console.log(chats);
      dispatch(fetchSessionChats(chats));
    });
  }, [dispatch, sessionId]);

  const sessionChats = useSelector((state) => state.sessionChats.sessionChats);

  const renderChats = (chats) => {
    return chats.map((chat) => {
      return (
        <ChatMsgElement
          msgText={chat.textMessage}
          image={
            chat.userImage.startsWith("https://")
              ? chat.userImage
              : `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${chat.userImage}`
          }
          name={chat.userName}
        />
      );
    });
  };

  return (
    <>
      <div
        className="chat-msg-container pt-2 px-2"
        style={{ backgroundColor: "#A1A1A175" }}
      >
        <div
          className="scrollable-chat-element-container"
          id="all-chat-msg-container"
        >
          {renderChats(sessionChats)}
        </div>
        <MsgInput />
      </div>
    </>
  );
};

export default SessionChatsComponent;
