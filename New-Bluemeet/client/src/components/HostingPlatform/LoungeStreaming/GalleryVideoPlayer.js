import React from "react";
import "./../Styles/sessionStreaming.scss";
import { useSelector } from "react-redux";

import { VideoStreamContainer } from "../../SessionStage/Elements";

import Avatar from "@mui/material/Avatar";

const GalleryVideoPlayer = ({
  videoStreamStat, // Its an array of objects {uid: uid, videoIsEnabled: Boolean (true | false)}
  localPlayerId,
  userName,
  userImage,
}) => {
  let videoIsEnabled = true;

  if (videoStreamStat) {
    const videoStreamData = videoStreamStat.find(
      (element) => element.uid === localPlayerId
    );

    if (videoStreamData) {
      videoIsEnabled = videoStreamData.videoIsEnabled;
    }
  }

  // Now show muted icon if !audioIsEnabled & avatar if !videoIsEnabled

  const { id } = useSelector((state) => state.eventAccessToken);

  const roleSuffix = id === localPlayerId ? "(You)" : "";

  return (
    <>
      <VideoStreamContainer>
        <div id={localPlayerId} className="session-local-video-player">
          <div id={`avatar_box_${localPlayerId}`} className="avatar_box">
            {!videoIsEnabled ? (
              <Avatar
                variant="rounded"
                src={userImage}
                alt={userName}
                style={{ backgroundColor: "#538BF7" }}
              />
            ) : (
              <></>
            )}
          </div>
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

export default GalleryVideoPlayer;
