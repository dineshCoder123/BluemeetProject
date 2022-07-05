import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Dialog, IconButton } from "@material-ui/core";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import socket from "./service/socket";
import ScheduleMeeting from "./Screens/Sub/ScheduleMeeting";
import { fetchMyConnections, setOpenScheduleMeeting, setScheduleMeetingUserId } from "./../../actions";

const PersonProfileBody = styled.div`
  width: 360px;
  max-height: 80vh;
  padding: 32px 24px;
  background-color: #ffffff;
  position: relative;
`;

const ProfileName = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  color: #152d35;
  font-family: "Ubuntu";
  text-transform: capitalize;
  text-align: center;
`;

const ProfileSmallText = styled.div`
  font-weight: 500;
  font-size: 0.72rem;
  color: #152d35;
  font-family: "Ubuntu";
  text-transform: capitalize;
`;

const ProfileMediumText = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  color: #222222;
  font-family: "Ubuntu";
  text-transform: capitalize;
`;

const ProfileDesignationOrg = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
  color: #152d35;
  font-family: "Ubuntu";
  text-transform: capitalize;
  text-align: center;
`;

const ButtonFilledDark = styled.div`
  padding: 6px 10px;
  text-align: center;
  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";
  background-color: #152d35;
  border: 1px solid #152d35;
  border-radius: 5px;

  &:hover {
    color: #152d35;
    background-color: transparent;
    cursor: pointer;
  }
`;

const ButtonOutlinedDark = styled.div`
  padding: 6px 10px;
  text-align: center;

  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";

  color: #152d35;
  background-color: transparent;

  border: 1px solid #152d35;
  border-radius: 5px;

  &:hover {
    background-color: #152d35;

    color: #ffffff;

    cursor: pointer;
  }
`;

const renderInterests = (interests) => {
  return interests.map((element) => {
    return (
      <Chip
        label={element}
        color="primary"
        variant="outlined"
        className="me-2 mb-3"
        style={{ fontWeight: "500" }}
      />
    );
  });
};

const PersonProfile = ({
  open,
  handleClose,
  userId,
  userName,
  userImage,
  userOrganisation,
  userDesignation,
}) => {
  let myConnections = [];
  let thisPersonIsInMyConnections = false;
  let connectionStatusToThisPerson;

  const dispatch = useDispatch();
  const theme = useTheme();
  const params = useParams();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { id } = useSelector((state) => state.eventAccessToken);
  const { connections } = useSelector((state) => state.connections);

  const { registrations } = useSelector((state) => state.registration);

 

  useEffect(() => {
    dispatch(fetchMyConnections());
  }, []);

  const userRegistrationDetails = registrations.find(
    (element) => element.bookedByUser === userId
  );

  const receiverId = userId;
  const senderId = id;
  const eventId = params.eventId;

  const processing = () => {
    if (connections) {
      for (let element of connections) {
        // Return if any of requestedToUser or requestedByUser is not present

        if (!element.requestedToUser || !element.requestedByUser) return;

        // Check if I sent this connection request to me or I sent this to someone

        if (element.requestedByUser._id === id) {
          // I requested to make to have this connection
          // * Collect info from requestedToUser

          if (!myConnections.includes(element.requestedToUser._id)) {
            myConnections.push({
              connectionId: element.requestedToUser._id,
              status: element.status,
            });
          }
        }
        if (element.requestedToUser._id === id) {
          // Someone else requested to connect with me
          // * Collect info from requestedByUser

          if (!myConnections.includes(element.requestedByUser._id)) {
            myConnections.push({
              connectionId: element.requestedByUser._id,
              status: element.status,
            });
          }
        }
      }
    }
  };

  processing();

  // At this point we have all of current browsing user's connection in myConnections array with their id and status

  for (let element of myConnections) {
    if (!thisPersonIsInMyConnections) {
      if (element.connectionId === userId) {
        thisPersonIsInMyConnections = true;
        connectionStatusToThisPerson = element.status;
      }
    }
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <PersonProfileBody>
          <IconButton
            className="icon-btn"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: "1",
            }}
          >
            <CancelIcon
              style={{ color: "inherit" }}
              onClick={() => {
                handleClose();
              }}
            />
          </IconButton>
          <div className="d-flex flex-row align-items-center justify-content-center mb-4">
            <Avatar
              src={userImage}
              alt={userName}
              variant="rounded"
              style={{ width: "72px", height: "72px" }}
            />
          </div>
          <ProfileName className="mb-2">{userName}</ProfileName>
          <ProfileDesignationOrg className="mb-5">{`${userOrganisation}, ${userDesignation}`}</ProfileDesignationOrg>
          {userRegistrationDetails ? (
            <div className="d-flex flex-row align-items-center justify-content-center mb-4">
              {userRegistrationDetails.socialMediaHandles ? (
                userRegistrationDetails.socialMediaHandles.facebook ? (
                  <a
                    href={`//${userRegistrationDetails.socialMediaHandles.facebook}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon
                      style={{ fontSize: "28px", color: "#4267B2" }}
                      className="me-4"
                    />
                  </a>
                ) : (
                  <FacebookIcon
                    style={{ fontSize: "28px", color: "#C3C3C3" }}
                    className="me-4"
                  />
                )
              ) : (
                <></>
              )}

              {userRegistrationDetails.socialMediaHandles ? (
                userRegistrationDetails.socialMediaHandles.linkedin ? (
                  <a
                    href={`//${userRegistrationDetails.socialMediaHandles.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon
                      style={{ fontSize: "28px", color: "#0077b5" }}
                      className="me-4"
                    />
                  </a>
                ) : (
                  <LinkedInIcon
                    style={{ fontSize: "28px", color: "#C3C3C3" }}
                    className="me-4"
                  />
                )
              ) : (
                <></>
              )}

              {userRegistrationDetails.socialMediaHandles ? (
                userRegistrationDetails.socialMediaHandles.twitter ? (
                  <a
                    href={`//${userRegistrationDetails.socialMediaHandles.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <TwitterIcon
                      style={{ fontSize: "28px", color: "#1DA1F2" }}
                      className="me-4"
                    />{" "}
                  </a>
                ) : (
                  <TwitterIcon
                    style={{ fontSize: "28px", color: "#C3C3C3" }}
                    className="me-4"
                  />
                )
              ) : (
                <></>
              )}

              {userRegistrationDetails.socialMediaHandles ? (
                userRegistrationDetails.socialMediaHandles.website ? (
                  <a
                    href={`//${userRegistrationDetails.socialMediaHandles.website}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <LanguageIcon
                      style={{ fontSize: "32px", color: "#152d35" }}
                    />{" "}
                  </a>
                ) : (
                  <LanguageIcon
                    style={{ fontSize: "32px", color: "#C3C3C3" }}
                  />
                )
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          {userRegistrationDetails ? (
            <div className="mb-3">
              {userRegistrationDetails.headline ? (
                <>
                  {" "}
                  <ProfileSmallText className="mb-1">Headline</ProfileSmallText>
                  <ProfileMediumText>
                    {userRegistrationDetails.headline}
                  </ProfileMediumText>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          {userRegistrationDetails ? (
            userRegistrationDetails.interests ? (
              <div className="mb-4">
                <ProfileSmallText className="mb-2">Interests</ProfileSmallText>

                <div>{renderInterests(userRegistrationDetails.interests)}</div>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          <div className="d-flex flex-row align-items-center justify-content-between">
            {thisPersonIsInMyConnections ? (
              (() => {
                switch (connectionStatusToThisPerson) {
                  case "Pending":
                    return (
                      <ButtonFilledDark
                        style={{ width: "48%" }}
                        onClick={() => {
                          socket.emit(
                            "submitConnectionRequest",
                            {
                              senderId,
                              receiverId,
                              eventId,
                            },
                            (error) => {
                              if (error) {
                                alert(error);
                              }
                            }
                          );
                        }}
                      >
                        Request sent
                      </ButtonFilledDark>
                    );
                  case "Accepted":
                    return (
                      <ButtonFilledDark
                        style={{ width: "48%" }}
                        onClick={() => {
                          socket.emit(
                            "submitConnectionRequest",
                            {
                              senderId,
                              receiverId,
                              eventId,
                            },
                            (error) => {
                              if (error) {
                                alert(error);
                              }
                            }
                          );
                        }}
                      >
                        Connected
                      </ButtonFilledDark>
                    );

                  default:
                    break;
                }
              })()
            ) : (
              <ButtonFilledDark
                style={{ width: "48%" }}
                onClick={() => {
                  socket.emit(
                    "submitConnectionRequest",
                    {
                      senderId,
                      receiverId,
                      eventId,
                    },
                    (error) => {
                      if (error) {
                        alert(error);
                      }
                    }
                  );
                }}
              >
                Connect
              </ButtonFilledDark>
            )}

            <ButtonOutlinedDark
              onClick={() => {
                // setOpenScheduleMeet(true);
                dispatch(setScheduleMeetingUserId(userId))
                dispatch(setOpenScheduleMeeting(true))
              }}
              style={{ width: "48%" }}
            >
              Schedule meet
            </ButtonOutlinedDark>
          </div>
        </PersonProfileBody>
      </Dialog>
      <ScheduleMeeting
       
      />
    </>
  );
};

export default PersonProfile;
