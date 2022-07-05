/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "@material-ui/core";
import React from "react";
import "./../Styles/sessionStreaming.scss";
import { useSelector } from "react-redux";

const RemotePlayer = ({
  uid,
  role,
  remotePlayerId,
  userName,
  userImage,
  userOrganisation,
  userDesignation,
  swapMainAndMiniView,
}) => {
  const {id} = useSelector((state) => state.eventAccessToken);

const roleSuffix = id === uid ? "(You)" : "";
  return (
    <>
      <div id={remotePlayerId} className="session-remote-video-player">
        <div className="session-role px-3 py-1">{role}</div>
        {/* <div
          className="player-overlay-pin d-flex flex-row align-items-center justify-content-center"
          onMouseEnter={() => {
            setOpacity(1);
          }}
          onMouseLeave={() => {
            setOpacity(0);
          }}
          style={{ opacity: opacity }}
        >
          <IconButton onClick={() => {
            console.log("swap button was clicked")
            swapMainAndMiniView(uid)
          }}>
            <img
              src={PushPin}
              alt="pin stream button"
              className="pin-stream-btn"
              style={{
                maxHeight: "30px",
                zIndex: "14244266288991909290817718919",
                opacity: opacity,
              }}
              onMouseEnter={() => {
                setOpacity(1);
              }}
              onMouseLeave={() => {
                setOpacity(0);
              }}
            />
          </IconButton>
        </div> */}
        <div id={`avatar_box_${remotePlayerId}`} className="avatar_box">
          <Avatar
            variant="rounded"
            src={userImage}
            alt={userName}
            style={{ backgroundColor: "#538BF7" }}
          />
        </div>
        <div id={`user_identity_${remotePlayerId}`} className="user-identity">
          <div style={{ color: "#D9F753" }}>{userName + " " + roleSuffix}</div>

          <div className="d-flex flex-row align-items-center">
            <div className="me-2">{`${userDesignation} ${userOrganisation}`}</div>
            {/* <MicIcon id={`remote_mic_on_${uid}`} style={{fill: "#53F77C"}} /> */}
            {/* <MicOffIcon id={`remote_mic_off_${uid}`} style={{fill: "#F76C53"}} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RemotePlayer;
