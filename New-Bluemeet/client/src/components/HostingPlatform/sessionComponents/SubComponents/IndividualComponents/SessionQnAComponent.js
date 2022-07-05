/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./../../../Styles/chatComponent.scss";
import "./../../../Styles/qnaComponent.scss";
import socket from "../../../service/socket";
import {
  fetchPreviousSessionChatMessages,
  fetchSessionChats,
} from "../../../../../actions";
import QnAInput from "./QnAInput";
import { Avatar } from "@material-ui/core";
import Faker from "faker";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";

const SessionQnAComponent = () => {
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

  //   const sessionChats = useSelector((state) => state.sessionChats.sessionChats);

  //   const renderChats = (chats) => {
  //     return chats.map((chat) => {
  //       return (
  //         <ChatMsgElement
  //           msgText={chat.textMessage}
  //           image={
  //             chat.userImage.startsWith("https://")
  //               ? chat.userImage
  //               : `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${chat.userImage}`
  //           }
  //           name={chat.userName}
  //         />
  //       );
  //     });
  //   };

  const renderQnAs = (QnAs) => {
    return <div>This is QnA component</div>;
  };

  return (
    <>
      <div
        className="chat-msg-container pt-2 px-2"
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <div
          className="scrollable-chat-element-container"
          id="all-chat-msg-container"
        >
          {/* {renderQnAs} */}
          <div className="QnA-container p-3">
            <div
              className=""
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 6fr",
              }}
            >
              <Avatar src={Faker.image.avatar()} variant="rounded" />
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "5fr 1fr",
                }}
              >
                <div className="ms-3">
                  <div className=" stage-card-name">
                    {Faker.name.findName()}
                  </div>
                  <div className="stage-card-company-and-profession">
                    Software Engg at Google
                  </div>
                </div>
                <div className="upvote-btn d-flex flex-column align-items-center justify-content-center">
                  <div
                    className="btn-outline-text"
                    style={{ fontSize: "0.7rem", color: "#1D1D1D" }}
                  >
                    48 
                    {/* this represents number of upvotes on this question */}
                  </div>
                  <ExpandLessRoundedIcon style={{ fill: "#ffffff" }} />
                </div>
              </div>
              <div></div>

              <div className="qnaQuesText mx-3 my-3">
                How to go about investing in crypto ? I mean can you please tell
                us how you started off?
              </div>
            </div>

            <textarea className="answer-container form-control" />

            {/* <div className="qnaQuesText">
                How to go about investing in crypto ? 
                I mean can you please tell us how you started off?
            </div> */}
          </div>
        </div>
        {/* <QnAInput /> */}
      </div>
    </>
  );
};

export default SessionQnAComponent;
