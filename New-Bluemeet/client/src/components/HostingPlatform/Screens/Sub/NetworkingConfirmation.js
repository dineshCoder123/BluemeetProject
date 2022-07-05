import React from "react";
import styled from "styled-components";
import { Avatar, Dialog, IconButton } from "@material-ui/core";
import socket from "./../../service/socket";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  setOpenConfirmation,
  setOpenNetworkingTable,
  setNetworkingRoom,
  setMatchedWith,
  getRTCTokenForNetworking,
} from "../../../../actions";
import Chip from "@mui/material/Chip";
import Loader from "./../../../Loader";
import NetworkingScreen from "./../NetworkingScreen";

const PersonProfileBody = styled.div`
  width: 360px;
  max-height: 80vh;
  padding: 32px 24px;
  background-color: #ffffff;
  position: relative;

  -webkit-border-radius: 50px;
  border-radius: 50px;
  background: #ededed;
  -webkit-box-shadow: 12px 12px 24px #c9c9c9, -12px -12px 24px #ffffff;
  box-shadow: 12px 12px 24px #c9c9c9, -12px -12px 24px #ffffff;
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

const NetworkingConfirmation = () => {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { openConfirmation, matchedWith, networkingRoom } = useSelector(
    (state) => state.networking
  );

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { id, role } = useSelector((state) => state.eventAccessToken);
  const eventId = params.eventId;

  let userName;
  let userImage;
  let userOrganisation;
  let userDesignation;
  let userHeadline;
  let userInterests;

  if (matchedWith) {
    const {
      firstName,
      lastName,
      image,
      organisation,
      designation,
      headline,
      interests,
    } = matchedWith;
    userName = firstName + " " + lastName;
    userImage = image
      ? image.startsWith("https://")
        ? image
        : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${image}`
      : "#";
    userOrganisation = organisation;
    userDesignation = designation;
    userHeadline = headline;
    userInterests = interests;
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openConfirmation}
        aria-labelledby="responsive-dialog-title"
        style={{ minHeight: "550px", marginLeft: "4vw" }}
      >
        <div className="speed-networking-matching-container p-4 pt-5">
          <div className="finding-your-match mb-5">
            We've found a match for you.
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <PersonProfileBody>
              <IconButton
                className="icon-btn"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  zIndex: "1",
                }}
              ></IconButton>
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

              <div className="mb-3">
                {userHeadline ? (
                  <>
                    {" "}
                    <ProfileSmallText className="mb-1">
                      Headline
                    </ProfileSmallText>
                    <ProfileMediumText>{userHeadline}</ProfileMediumText>{" "}
                  </>
                ) : (
                  <></>
                )}
              </div>

              {userInterests ? (
                <div className="mb-4">
                  <ProfileSmallText className="mb-2">
                    Interests
                  </ProfileSmallText>

                  <div>{renderInterests(userInterests)}</div>
                </div>
              ) : (
                <></>
              )}

              <div className="d-flex flex-row align-items-center justify-content-between">
                <ButtonFilledDark
                  onClick={() => {
                    // dispatch
                    // emit using socket to join this room
                    // setOpenNetworkingConfirmation => false
                    // setOpenNetworkingRoom => true
                    socket.emit(
                      "joinNetworking",
                      {
                        room: networkingRoom,
                        userId: id,
                        eventId: eventId,
                        userRole: role,
                      },
                      (error) => {
                        if (error) {
                          alert(error);
                        }
                      }
                    );

                    dispatch(getRTCTokenForNetworking(handleOpen));

                    // set open networking table only after token has been arrived
                  }}
                  style={{ width: "48%" }}
                >
                  Join
                </ButtonFilledDark>
                <ButtonOutlinedDark
                  onClick={() => {
                    // dispatch

                    dispatch(setOpenConfirmation(false));
                    dispatch(setNetworkingRoom(null));
                    dispatch(setMatchedWith(null));
                    handleClose();
                    // setOpenConfirmation => false
                    // set networkingRoom to null
                    // set matchedWith null
                  }}
                  style={{ width: "48%" }}
                >
                  Cancel
                </ButtonOutlinedDark>
              </div>
            </PersonProfileBody>
          </div>
        </div>
      </Dialog>

      {open && (
        <NetworkingScreen
          open={open}
          handleClose={handleClose}
          networkingRoom={networkingRoom}
        />
      )}
    </>
  );
};

export default NetworkingConfirmation;
