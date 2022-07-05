/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Avatar, Dialog } from "@material-ui/core";
import socket from "./../service/socket";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { setOpenMatching } from "../../../actions";
import NetworkingConfirmation from "./../Screens/Sub/NetworkingConfirmation";

const Matching = () => {
  const dispatch = useDispatch();
  const { openMatching } = useSelector((state) => state.networking);

  const params = useParams();

  const eventId = params.eventId;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { image, id, firstName, lastName } = useSelector(
    (state) => state.user.userDetails
  );

  const userId = useSelector((state) => state.eventAccessToken.id);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openMatching}
        aria-labelledby="responsive-dialog-title"
        style={{ minHeight: "550px", marginLeft: "4vw" }}
      >
        <div className="speed-networking-matching-container p-4 pt-5">
          <div className="finding-your-match mb-5">
            Finding your best match...
          </div>
          <div className="matching-card d-flex flex-row align-items-center justify-content-center mb-4">
            <div className="sonar-emitter" style={{ position: "relative" }}>
              <Avatar
                className="slider-avatar-matching"
                alt={firstName}
                src={
                  image
                    ? image.startsWith("https")
                      ? image
                      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${image}`
                    : " "
                }
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  height: "9rem",
                  width: "9rem",
                  border: "2px solid #538BF7",
                }}
              />
              <div className="sonar-wave"></div>
              <div className="sonar-wave"></div>
              <div className="sonar-wave"></div>
              <div className="sonar-wave"></div>
              <div className="sonar-wave"></div>
              <div className="sonar-wave"></div>
            </div>
          </div>
          <div>
            <div
              className="btn-filled-h  py-3 start-networking-btn "
              style={{
                maxWidth: "100px",
                textAlign: "center",
                margin: "0 auto",
                backgroundColor: "#F7536E",
              }}
              onClick={() => {
                socket.emit("leaveNetworking", {
                  eventId,
                  userId: userId,
                });

                dispatch(setOpenMatching(false));
              }}
            >
              Stop
            </div>
          </div>
        </div>
      </Dialog>
      <NetworkingConfirmation />
    </>
  );
};
export default Matching;
