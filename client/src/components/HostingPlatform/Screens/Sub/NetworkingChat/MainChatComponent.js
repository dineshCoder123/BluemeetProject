/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styled from "styled-components";
import IncomingChatMsgElement from "./Helper/IncomingChatMsgElement";
import OutgoingChatElement from "./Helper/OutgoingChatElement";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MsgInput from "./Helper/MsgInput";
import "./../../../Styles/chatComponent.scss";

import SelfReplyElement from "./Helper/SelfReplyElement";
import OthersReplyElement from "./Helper/OthersReplyElement";
import DeletedOwnMsg from "./Helper/DeletedOwnMsg";
import DeletedOthersMsg from "./Helper/DeletedOthersMsg";

const ChatContainer = styled.div`
  background: rgba(255, 255, 255, 0.05) !important;
  box-shadow: 0 8px 32px 0 #1d1d1d !important;
  backdrop-filter: blur(4px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
  border-radius: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
`;

const MainChatComponent = () => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [organisation, setOrganisation] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [chatMsgId, setChatMsgId] = useState(null);

  const createReplyWidget = (
    name,
    img,
    msg,
    organisation,
    designation,
    timestamp,
    chatMsgId
  ) => {
    setName(name);
    setImage(img);
    setMsg(msg);
    setOrganisation(organisation);
    setDesignation(designation);
    setTimestamp(timestamp);
    setChatMsgId(chatMsgId);
  };

  const destroyReplyWidget = () => {
    setName(null);
    setImage(null);
    setMsg(null);
    setOrganisation(null);
    setDesignation(null);
    setTimestamp(null);
    setChatMsgId(null);
  };

  // Also create function to set name image and msg back to null so that reply widgets disappears.

  // create and pass a function as props to Chat Msg Element which can set value of name, image and msg when clicked on reply icon.

  const dispatch = useDispatch();

  const params = useParams();

  const eventId = params.eventId;

  const { networkingChats } = useSelector((state) => state.networking);
  const userDetails = useSelector((state) => state.user);

  const userId = userDetails._id;

  const renderChats = (chats) => {
    return chats
      .slice(0)
      .reverse()
      .map((chat) => {
        const senderId = chat.userId;

        // Check if its my own msg then show outgoing chat otherwise incoming

        // 1st step => check if its a reply or not
        // 2nd step => check if sender of this msg is me or someone else

        if (chat.isReply) {
          // Its a reply confirmed

          if (senderId === userId) {
            // I have replied to my own msg
            // * render selfRelpyElement
            // Check if its deleted => if yes then return
            if (chat.deleted === true)
              return <DeletedOwnMsg timestamp={chat.createdAt} />;
            return (
              <SelfReplyElement
                key={chat._id}
                createReplyWidget={createReplyWidget}
                replierMsg={chat.textMessage}
                replierImage={
                  chat.userImage.startsWith("https://")
                    ? chat.userImage
                    : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                }
                replierName={chat.userName}
                replierOrganisation={chat.userOrganisation}
                replierDesignation={chat.userDesignation}
                replierTimestamp={chat.createdAt}
                replierMsgId={chat._id}
                originalName={chat.replyTo.userName}
                originalImage={
                  chat.replyTo.userImage.startsWith("https://")
                    ? chat.replyTo.userImage
                    : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.replyTo.userImage}`
                }
                originalOrganisation={chat.replyTo.userOrganisation}
                originalDesignation={chat.replyTo.userDesignation}
                originalMsg={chat.replyTo.textMessage}
                orignialMsgId={chat.replyTo._id}
                orignialMsgTimestamp={chat.replyTo.createdAt}
                // Also deliver orignial msg props
              />
            );
          } else {
            // Someone else has replied to my msg
            // * Render others reply element
            // check if its deleted => if yes then return
            if (chat.deleted === true)
              return (
                <DeletedOthersMsg
                  name={chat.userName}
                  image={
                    chat.userImage.startsWith("https://")
                      ? chat.userImage
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                  }
                  organisation={chat.userOrganisation}
                  designation={chat.userDesignation}
                  timestamp={chat.createdAt}
                />
              );
            return (
              <OthersReplyElement
                key={chat._id}
                createReplyWidget={createReplyWidget}
                replierMsg={chat.textMessage}
                replierImage={
                  chat.userImage.startsWith("https://")
                    ? chat.userImage
                    : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                }
                replierName={chat.userName}
                replierOrganisation={chat.userOrganisation}
                replierDesignation={chat.userDesignation}
                replierTimestamp={chat.createdAt}
                replierMsgId={chat._id}
                originalName={chat.replyTo.userName}
                originalImage={
                  chat.replyTo.userImage.startsWith("https://")
                    ? chat.replyTo.userImage
                    : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.replyTo.userImage}`
                }
                originalOrganisation={chat.replyTo.userOrganisation}
                originalDesignation={chat.replyTo.userDesignation}
                originalMsg={chat.replyTo.textMessage}
                orignialMsgId={chat.replyTo._id}
                orignialMsgTimestamp={chat.replyTo.createdAt}
                // Also deliver orignial msg props
              />
            );
          }
        } else {
          // It's not a reply

          if (senderId === userId) {
            // Its an outgoing msg
            // check if its deleted => if yes then don't return but show that it has been deleted like whatsapp
            if (chat.deleted === true)
              return <DeletedOwnMsg timestamp={chat.createdAt} />;

            return (
              <OutgoingChatElement
                key={chat._id}
                createReplyWidget={createReplyWidget}
                msgText={chat.textMessage}
                image={
                  chat.userImage.startsWith("https://")
                    ? chat.userImage
                    : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                }
                name={chat.userName}
                organisation={chat.userOrganisation}
                designation={chat.userDesignation}
                timestamp={chat.createdAt}
                chatMsgId={chat._id}
              />
            );
          } else {
            // Its an incoming msg
            // check if its deleted => if yes then return
            if (chat.deleted === true)
              return (
                <DeletedOthersMsg
                  name={chat.userName}
                  image={
                    chat.userImage.startsWith("https://")
                      ? chat.userImage
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                  }
                  organisation={chat.userOrganisation}
                  designation={chat.userDesignation}
                  timestamp={chat.createdAt}
                />
              );
            return (
              <IncomingChatMsgElement
                key={chat._id}
                createReplyWidget={createReplyWidget}
                msgText={chat.textMessage}
                image={
                  chat.userImage.startsWith("https://")
                    ? chat.userImage
                    : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                }
                name={chat.userName}
                organisation={chat.userOrganisation}
                designation={chat.userDesignation}
                timestamp={chat.createdAt}
                chatMsgId={chat._id}
              />
            );
          }
        }
      });
  };

  return (
    <>
      <ChatContainer className="chat-msg-container pt-2 px-2 d-flex flex-column justify-content-between">
        <div
          className="scrollable-chat-element-container"
          id="all-chat-msg-container"
        >
          {renderChats(networkingChats)}
        </div>
        <MsgInput
          name={name}
          image={image}
          msg={msg}
          chatMsgId={chatMsgId}
          destroyReplyWidget={destroyReplyWidget}
          organisation={organisation}
          designation={designation}
          timestamp={timestamp}
        />
      </ChatContainer>
    </>
  );
};

export default MainChatComponent;
