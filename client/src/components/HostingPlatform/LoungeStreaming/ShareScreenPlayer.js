import React from "react";
import "./../Styles/sessionStreaming.scss";
import { useSelector } from "react-redux";

import { VideoStreamContainer } from "../../SessionStage/Elements";

const ShareScreenPlayer = ({ role, localPlayerId, userName }) => {
  let uid = localPlayerId.slice(7);

  const { id } = useSelector((state) => state.eventAccessToken);

  const roleSuffix = id === uid ? "(You)" : "";

  return (
    <>
      <VideoStreamContainer style={{ objectFit: "contain" }}>
        <div
          id={localPlayerId}
          className="session-local-video-player screen-share-container"
        >
          <div id={`user_identity_${localPlayerId}`} className="user-identity">
            <div
              className="d-flex flex-row align-items-center"
              style={{ color: "#F7F453" }}
            >
              <div className="me-2"> {userName + " " + roleSuffix} </div>
            </div>
          </div>
        </div>
      </VideoStreamContainer>
    </>
  );
};

export default ShareScreenPlayer;
