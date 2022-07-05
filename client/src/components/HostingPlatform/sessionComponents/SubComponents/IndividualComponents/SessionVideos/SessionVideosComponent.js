/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./../../../../Styles/chatComponent.scss";
import "./../../../../Styles/qnaComponent.scss";
import "./../../../../Styles/raisedHands.scss";
import socket from "../../../../service/socket";
import {
  fetchPreviousSessionChatMessages,
  fetchSessionChats,
} from "../../../../../../actions";
import { Avatar } from "@material-ui/core";
import Faker from "faker";

const SessionVideosComponent = () => {
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
          {/* {renderQnAs} */}

          <div className="mb-4">
            <div className="onstage-or-waiting-headline mb-3 mt-1">Playing</div>
            <div className="QnA-container p-3">
              <iframe
                width="100%"
                height="250"
                src="https://www.youtube-nocookie.com/embed/xga2-H5OxOY"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              <button
                className="btn btn-outline-primary btn-outline-text mt-3"
                style={{ width: "100%" }}
              >
                Put off stage
              </button>
            </div>
          </div>

          <div>
            <div className="onstage-or-waiting-headline mb-3 mt-1">
              Others (1)
            </div>
            <div className="QnA-container p-3">
              <div
                className=""
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                }}
              >
                <iframe
                  width="100%"
                  height="250"
                  src="https://www.youtube-nocookie.com/embed/yhpVAki47RI"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>

              <div
                className=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr ",
                  gridGap: "20px",
                }}
              >
                <button
                  className="btn btn-outline-primary btn-outline-text mt-3"
                  style={{ width: "100%" }}
                >
                  Put on stage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionVideosComponent;
