import React, { useState, useEffect } from "react";
import socket from "./../../service/socket";
import MsgInput from "./Chat/MsgInput";
import { useDispatch, useSelector } from "react-redux";
import "./../../Styles/chatComponent.scss";
import { fetchBoothTableChats, updateBoothTableChats } from "./../../../../actions"; // This will fetch all previous chats of this booth table

import IncomingChatMsgElement from "./Chat/IncomingChatMsgElement";
import OutgoingChatElement from "./Chat/OutgoingChatElement";
import SelfReplyElement from "./Chat/SelfReplyElement";
import OthersReplyElement from "./Chat/OthersReplyElement";
import DeletedOwnMsg from "./Chat/DeletedOwnMsg";
import DeletedOthersMsg from "./Chat/DeletedOthersMsg";

const ChatComponent = ({ tableId }) => {
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

  useEffect(() => {
    dispatch(fetchBoothTableChats(tableId));

    socket.on("newBoothTableMsg", ({ chats }) => {
      dispatch(updateBoothTableChats(chats));
      console.log(chats);
      //   dispatch(fetchEventChats(chats)); // TODO Here we have to dispatch all chats using action creator
    });

    socket.on("updateBoothTableChats", ({ chats }) => {
      dispatch(updateBoothTableChats(chats));
    });
  }, [dispatch, tableId]);

  const tableChats = useSelector((state) => state.boothChairs.tableChats);
  const { role } = useSelector((state) => state.eventAccessToken);
  const {userDetails} = useSelector((state) => state.user);

  const userId = userDetails._id;

  const renderChats = (tableChats, userRole) => {
    if(!tableChats) return;
    return tableChats
      .slice(0)
      .reverse()
      .map((chat) => {
        const senderId = chat.userId;

        let ModeratorOrHost = false;

        if (userRole === "moderator" || userRole === "host") {
          ModeratorOrHost = true;
        }

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
                tableId={tableId}
                key={chat._id}
                createReplyWidget={createReplyWidget}
                replierMsg={chat.textMessage}
                replierImage={
                  chat.userImage
                    ? chat.userImage.startsWith("https://")
                      ? chat.userImage
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                    : ""
                }
                replierName={chat.userName}
                replierOrganisation={chat.userOrganisation}
                replierDesignation={chat.userDesignation}
                replierTimestamp={chat.createdAt}
                replierMsgId={chat._id}
                originalName={chat.replyTo.userName}
                originalImage={
                  chat.replyTo.userImage
                    ? chat.replyTo.userImage.startsWith("https://")
                      ? chat.replyTo.userImage
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.replyTo.userImage}`
                    : ""
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
                  tableId={tableId}
                  name={chat.userName}
                  image={
                    chat.userImage
                      ? chat.userImage.startsWith("https://")
                        ? chat.userImage
                        : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                      : ""
                  }
                  organisation={chat.userOrganisation}
                  designation={chat.userDesignation}
                  timestamp={chat.createdAt}
                />
              );

            return (
              <OthersReplyElement
                tableId={tableId}
                showDelete={ModeratorOrHost ? true : false} // ! Show delete btn or not => only if role === "host" || role === "moderator"
                key={chat._id}
                createReplyWidget={createReplyWidget}
                replierMsg={chat.textMessage}
                replierImage={
                  chat.userImage
                    ? chat.userImage.startsWith("https://")
                      ? chat.userImage
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                    : ""
                }
                replierName={chat.userName}
                replierOrganisation={chat.userOrganisation}
                replierDesignation={chat.userDesignation}
                replierTimestamp={chat.createdAt}
                replierMsgId={chat._id}
                originalName={chat.replyTo.userName}
                originalImage={
                  chat.replyTo.userImage
                    ? chat.replyTo.userImage.startsWith("https://")
                      ? chat.replyTo.userImage
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.replyTo.userImage}`
                    : ""
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
                tableId={tableId}
                key={chat._id}
                createReplyWidget={createReplyWidget}
                msgText={chat.textMessage}
                image={
                  chat.userImage
                    ? chat.userImage.startsWith("https://")
                      ? chat.userImage
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                    : ""
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
                  tableId={tableId}
                  name={chat.userName}
                  image={
                    chat.userImage
                      ? chat.userImage.startsWith("https://")
                        ? chat.userImage
                        : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                      : ""
                  }
                  organisation={chat.userOrganisation}
                  designation={chat.userDesignation}
                  timestamp={chat.createdAt}
                />
              );
            return (
              <IncomingChatMsgElement
                tableId={tableId}
                showDelete={ModeratorOrHost ? true : false} // ! show delete btn or not => only if role === "moderator" || role === "host"
                key={chat._id}
                createReplyWidget={createReplyWidget}
                msgText={chat.textMessage}
                image={
                  chat.userImage
                    ? chat.userImage.startsWith("https://")
                      ? chat.userImage
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chat.userImage}`
                    : ""
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
      <div
        className="pt-2 px-2 d-flex flex-column justify-content-between"
        style={{ maxHeight: "68vh !important", height: "68vh" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "scroll",
            height: "auto",
            maxHeight: "68vh !important",
          }}
          id="all-chat-msg-container"
        >
          {renderChats(tableChats, role)}
        </div>
        <MsgInput
          tableId={tableId}
          name={name}
          image={image}
          msg={msg}
          chatMsgId={chatMsgId}
          destroyReplyWidget={destroyReplyWidget}
          organisation={organisation}
          designation={designation}
          timestamp={timestamp}
        />
      </div>
    </>
  );
};

export default ChatComponent;
