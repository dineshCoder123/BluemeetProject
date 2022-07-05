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

const RaisedHandMainComponent = () => {
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
        className="chat-msg-container raised-hands-container pt-2 px-2"
        style={{ backgroundColor: "#A1A1A175" }}
      >
        <div
          className="scrollable-chat-element-container raised-hands-scrollable-container"
          id="all-chat-msg-container"
        >
          {/* {renderQnAs} */}

          <div className="mb-4">
            <div className="onstage-or-waiting-headline mb-3 mt-1">
              Currently on stage (1)
            </div>
            <div className="QnA-container p-3">
              <div
                className=""
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 6fr",
                }}
              >
                <Avatar
                  src="https://i1.wp.com/www.themobileindian.com/wp-content/uploads/2021/06/facebook-avatar-main.jpg"
                  variant="rounded"
                />
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
                </div>
              </div>

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
              Waiting (1)
            </div>
            <div className="QnA-container p-3">
              <div
                className=""
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 6fr",
                }}
              >
                <Avatar
                  src="https://e7.pngegg.com/pngimages/931/256/png-clipart-bitstrips-avatar-emoji-graphy-emoticon-avatar-face-heroes.png"
                  variant="rounded"
                />
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
                </div>
              </div>

              <div
                className=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "20px",
                }}
              >
                <button
                  className="btn btn-outline-primary btn-outline-text mt-3"
                  style={{ width: "100%" }}
                >
                  Put on stage
                </button>
                <button
                  className="btn btn-outline-primary btn-outline-text mt-3"
                  style={{ width: "100%" }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaisedHandMainComponent;
