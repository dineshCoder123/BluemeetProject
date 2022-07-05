import React, { useState } from "react";
import SessionChatsComponent from "./IndividualComponents/SessionChatsComponent";
import SessionPollsComponent from "./IndividualComponents/SessionPolls/SessionPollsComponent";
import SessionQnAComponent from "./IndividualComponents/SessionQnAComponent";
import RaisedHandMainComponent from "./IndividualComponents/SessionRaisedHands/RaisedHandsMainComponent";
import SessionVideosComponent from "./IndividualComponents/SessionVideos/SessionVideosComponent";

const SessionHappeningRoot = () => {
  const [selectedTab, setSelectedTab] = useState("chats");

  return (
    <>
      <div className="session-stage-side-main-body">
        <div className="session-happenings-sec-nav">
          <div className="slider-nav-event-platform session-stage-sec-nav-wrapper d-flex flex-row justify-content-between align-items-center py-1 px-2 mb-3 my-2">
            <div
              onClick={() => {
                setSelectedTab("chats");
              }}
              className={`slider-nav-btn silde-nav-btn-stage ${
                selectedTab === "chats" ? "slider-btn-active-stage" : " "
              } d-flex flex-row align-items-center justify-content-center`}
            >
              Chats
            </div>
            <div
              onClick={() => {
                setSelectedTab("q&a");
              }}
              className={`slider-nav-btn silde-nav-btn-stage mx-2 ${
                selectedTab === "q&a" ? "slider-btn-active-stage" : " "
              } d-flex flex-row align-items-center justify-content-center`}
            >
              Q & A
            </div>
            <div
              onClick={() => {
                setSelectedTab("polls");
              }}
              className={`slider-nav-btn silde-nav-btn-stage ${
                selectedTab === "polls" ? "slider-btn-active-stage" : " "
              } d-flex flex-row align-items-center justify-content-center`}
            >
              Polls
            </div>
            <div
              onClick={() => {
                setSelectedTab("raisedhands");
              }}
              className={`slider-nav-btn silde-nav-btn-stage mx-2 ${
                selectedTab === "raisedhands" ? "slider-btn-active-stage" : " "
              } d-flex flex-row align-items-center justify-content-center`}
            >
              Hands
            </div>
            {/* <div
              onClick={() => {
                setSelectedTab("video");
              }}
              className={`slider-nav-btn silde-nav-btn-stage ${
                selectedTab === "video" ? "slider-btn-active" : " "
              } d-flex flex-row align-items-center justify-content-center`}
            >
              Video
            </div> */}
          </div>

          <div style={{ height: "73vh", width: "90%", margin: "0 auto" }}>
            {(() => {
              switch (selectedTab) {
                case "chats":
                  return <SessionChatsComponent />;

                case "q&a":
                  return <SessionQnAComponent />;

                case "polls":
                  return <SessionPollsComponent />;

                case "raisedhands":
                  return <RaisedHandMainComponent />;

                // case "video":
                //   return <SessionVideosComponent />;

                default:
                  return <div>You are a User visting hosting platform.</div>;
              }
            })()}
          </div>
        </div>

        <div className="session-stage-main-content-section">
          {/* <MainChatComponent /> */}
        </div>
      </div>
    </>
  );
};

export default SessionHappeningRoot;
