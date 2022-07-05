/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";

import "./../Styles/networking.scss";
import { useDispatch, useSelector } from "react-redux";
import socket from "./../service/socket";
import {
  setOpenMatching,
  fetchNetworkingRoomDetails,
} from "./../../../actions";
import { useParams } from "react-router-dom";
import Matching from "../HelperComponents/Matching";

const Networking = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const eventId = params.eventId;

  const { image, id, firstName, lastName } = useSelector(
    (state) => state.user.userDetails
  );

  useEffect(() => {
    socket.on("updatedNetworkingRoom", ({ updatedNetworkingRoom }) => {
      dispatch(fetchNetworkingRoomDetails(updatedNetworkingRoom));
    });
    return () => {
      socket.emit(
        "leaveNetworking",
        { eventId: eventId, userId: id },
        (error) => {
          if (error) {
            alert(error);
          }
        }
      );
    };
  }, []);

  // ! PLACE USER IN AVAILABLE FOR NETWORKING LIST ONLY WHEN HE OR SHE CLICKS ON START SPEED NETWORKING

  return (
    <>
      <div className="sessions-and-networking-body-heading mb-5">
        Start Connecting the dots
      </div>
      {/* <FloatingAvatars /> */}
      <div>
        <div>
          <div className="sonar-wrapper">
            <div className="sonar-emitter" style={{ position: "relative" }}>
              <Avatar
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
        </div>
      </div>

      <div className="d-flex flex-row justify-content-center networking-options-btn">
        <div
          className="btn-filled-h px-5 py-3 start-networking-btn"
          onClick={() => {
            setTimeout(() => {
              socket.emit("startNetworking", {
                eventId,
                userId: id,
                userName: firstName + " " + lastName,
                image,
                socketId: socket.id,
              });
            }, 2000);
            dispatch(setOpenMatching(true));
            // TODO   Emit a message to put this user in available for networking and start matching him/her to others who are also avialable.
          }}
        >
          Start Speed Networking
        </div>
      </div>

      <Matching />
    </>
  );
};

export default Networking;
