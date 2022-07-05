/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import socket from "./../service/socket";
import { useParams } from "react-router-dom";
import Faker from "faker";
import { useDispatch, useSelector } from "react-redux";
import "./../Styles/booth.scss";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { Avatar, makeStyles } from "@material-ui/core";
import Rooms from "./BoothTable/Rooms";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { IconButton } from "@material-ui/core";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { SetCurrentBoothId, shareBusinessCard } from "./../../../actions";
import Loader from "./../../Loader";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EditBoothDrawer from "./Sub/FormComponents/EditBoothDrawer";
import { PopupButton } from "@typeform/embed-react";

import BoothVideos from "./BoothComponents/BoothVideos";
import BoothProducts from "./BoothComponents/BoothProducts";
import BoothFiles from "./BoothComponents/BoothFiles";
import BoothOffers from "./BoothComponents/BoothPromoCodes";
import BoothForms from "./BoothComponents/BoothForms";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import { SwipeableDrawer } from "@material-ui/core";

import MainChatComponent from "./BoothAreaChat/MainChatComponent";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import {
  fetchBooth,
  fetchBusinessCards,
  fetchBoothChairs,
} from "./../../../actions";

const ChatContainer = styled.div`
  width: 450px;
`;

const ThemedBackgroundButtonOutlined = styled.div`
  background-color: #152d35 !important;
  text-decoration: none !important;
  color: #ffffff !important;
  border: 1px solid transparent;
  outline: none !important;

  &:hover {
    background-color: transparent !important;
    color: #152d35 !important;
    border: 1px solid #152d35 !important;
    cursor: pointer !important;
  }
`;
const ThemedBackgroundButtonFilled = styled.div`
  outline: none !important;
  background-color: #152d35 !important;
  border: 1px solid #152d35 !important;
  color: #ffffff;

  &:hover {
    color: #152d35 !important;
    background-color: transparent !important;
    text-decoration: none !important;
    cursor: pointer;
  }
`;

const BasicGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 24px;
`;

const GetInTouchCard = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  width: 100%;
  height: auto;
`;

const SocialButton = styled.div`
  border: 1px solid #ffffff !important;

  &:hover {
    background-color: #ffffff !important;
    border: 1px solid #152d35 !important;
    cursor: pointer;
  }
`;

const ContactInfo = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

// <LobbyAgenda socket={socket} />

const renderTags = (tags) => {
  if (!tags) {
    return;
  } else {
    return tags.map((tag) => {
      return (
        <Chip
          label={tag}
          variant="outlined"
          className="me-2"
          style={{ color: "#152d35", border: "1px solid #152d35" }}
        />
      );
    });
  }
};

const BoothArea = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (boothDetails) {
      if (boothDetails.googleTag) {
        loadGoogleAnalytics();
      }
    }
    socket.on("boothChairData", ({ roomChairs }) => {
      dispatch(fetchBoothChairs(roomChairs));
    });
  }, []);

  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  const eventId = params.eventId;
  const [openEdit, setOpenEdit] = useState(false);

  const [openChats, setOpenChats] = useState(false);

  const handleCloseChats = () => {
    setOpenChats(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const { currentBoothId, boothDetails, businessCards } = useSelector(
    (state) => state.booth
  );

  useEffect(() => {
    dispatch(fetchBooth(currentBoothId));
    dispatch(fetchBusinessCards(currentBoothId, eventId));
  }, []);

  const classes = useStyles();

  const truncateText = (str, n) => {
    if (!str) return;
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  if (!boothDetails) {
    return null;
  }

  const loadGoogleAnalytics = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${boothDetails.googleTag}`;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", boothDetails.googleTag);
    });
  };

  let businessCardShared = false;

  let sharedEmail = [];

  if (businessCards) {
    sharedEmail = businessCards.map((el) => {
      return el.userId._id;
    });
  }

  if (sharedEmail.includes(userId)) {
    businessCardShared = true;
  }

  return (
    <>
      <div
        style={{ maxWidth: "1360px", margin: "0 auto" }}
        className="py-4 px-5"
      >
        <div className="d-flex flex-row align-items-center justify-content-between mb-4">
          <div className="d-flex flex-row align-items-center">
            <IconButton
              onClick={() => {
                if (currentBoothId) {
                  socket.emit(
                    "leaveBooth",
                    { boothId: currentBoothId },
                    (error) => {
                      alert(error);
                    }
                  );
                }

                dispatch(SetCurrentBoothId(null));
              }}
            >
              <ArrowBackIosRoundedIcon style={{ fontSize: "20px" }} />
            </IconButton>

            <div
              className="ms-3"
              style={{ color: "#212121", fontWeight: "500" }}
            >
              Back
            </div>
          </div>

          <div>
            <ThemedBackgroundButtonOutlined
              onClick={() => {
                setOpenEdit(true);
              }}
              className="btn btn-outline-text d-flex flex-row align-items-center"
            >
              <EditRoundedIcon className="me-2" style={{ fontSize: "18px" }} />
              <span>Edit</span>
            </ThemedBackgroundButtonOutlined>
          </div>
        </div>

        <div className="mb-4">
          <img
            src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${boothDetails.boothPoster}`}
            alt={boothDetails.name}
            style={{
              width: "100%",
              maxHeight: "390px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        <div
          className="mb-4"
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 1.5fr",
            alignItems: "center",
          }}
        >
          <div
            style={{ height: "100px" }}
            className="d-flex flex-row align-items-center"
          >
            <Avatar
              src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${boothDetails.image}`}
              style={{ height: "5rem", width: "5rem" }}
              variant="rounded"
              alt={boothDetails.name}
            />
            <div className="ms-3">
              <div
                style={{
                  color: "#3C3A3A",
                  fontWeight: "500",
                  fontFamily: "Ubuntu",
                  fontSize: "1.1rem",
                }}
                className="mb-3"
              >
                {boothDetails.name}
              </div>

              <div className="booth-tagline">{boothDetails.tagline}</div>
            </div>
          </div>
          <div style={{ height: "100px" }}>
            <div className="d-flex flex-row align-items-center justify-content-end mb-3">
              {boothDetails.socialMediaHandles.website && (
                <SocialButton
                  className="button-custom-bg p-2 ms-3"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <a
                    href={`//${boothDetails.socialMediaHandles.website}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LanguageRoundedIcon
                      style={{ fontSize: "24px", color: "#538BF7" }}
                    />
                  </a>
                </SocialButton>
              )}

              {boothDetails.socialMediaHandles.linkedIn && (
                <SocialButton
                  className="button-custom-bg p-2 ms-3"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <a
                    href={`//${boothDetails.socialMediaHandles.linkedIn}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon
                      style={{ fontSize: "24px", color: "#0e76a8" }}
                    />
                  </a>
                </SocialButton>
              )}

              {boothDetails.socialMediaHandles.twitter && (
                <SocialButton
                  className="button-custom-bg p-2 ms-3"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <a
                    href={`//${boothDetails.socialMediaHandles.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon
                      style={{ fontSize: "24px", color: "#1DA1F2" }}
                    />
                  </a>
                </SocialButton>
              )}

              {boothDetails.socialMediaHandles.facebook && (
                <SocialButton
                  className="button-custom-bg p-2 ms-3"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <a
                    href={`//${boothDetails.socialMediaHandles.facebook}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon
                      style={{ fontSize: "24px", color: "#3b5998" }}
                    />
                  </a>
                </SocialButton>
              )}
            </div>

            <div className="d-flex flex-row align-items-center justify-content-end mb-3">
              {businessCardShared ? (
                <Chip label="Shared business card" color="success" />
              ) : (
                <ThemedBackgroundButtonFilled
                  onClick={() => {
                    dispatch(
                      shareBusinessCard(userId, eventId, currentBoothId)
                    );
                  }}
                  className="btn btn-primary btn-outline-text"
                >
                  <span> Share Business Card </span>
                </ThemedBackgroundButtonFilled>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="booth-about-heading mb-3">About</div>
          <div className="d-flex flex-row align-items-center mb-3">
            {renderTags(boothDetails.tags)}
          </div>

          <div className="booth-description">{boothDetails.description}</div>
        </div>

        <BasicGrid className="mb-5">
          <BoothVideos />
          <GetInTouchCard className="p-4">
            <div className="d-flex flex-row align-items-center pb-3 px-2">
              <MailOutlineRoundedIcon />
              <a
                href={`mailto:${boothDetails.contactEmail}`}
                style={{ textDecoration: "none" }}
              >
                <ContactInfo className="ms-3">
                  {truncateText(boothDetails.contactEmail, 25)}
                </ContactInfo>
              </a>
            </div>

            <div className="d-flex flex-row align-items-center py-3 px-2">
              <PhoneRoundedIcon />
              <a
                href={`tel:${boothDetails.contactNumber}`}
                style={{ textDecoration: "none" }}
              >
                <ContactInfo className="ms-3">
                  {truncateText(boothDetails.contactNumber, 30)}
                </ContactInfo>
              </a>
            </div>
          </GetInTouchCard>

          <BoothProducts />
          <BoothForms />

          <BoothFiles />

          <BoothOffers />
        </BasicGrid>

        <div
          className="row d-flex flex-row"
          style={{ alignItems: "center", marginBottom: "6%" }}
        >
          <div className="col-5">
            <hr />
          </div>

          <div className="col-2 connect-with-us-booth-card d-flex flex-row align-items-center justify-content-between">
            <ExpandMoreRoundedIcon />

            <span className="join-us-here-booth">Join us here</span>
            <Avatar
              alt="Remy Sharp"
              src={Faker.image.avatar()}
              className={classes.small}
            />
          </div>
          <div className="col-5">
            <hr />
          </div>
        </div>

        <Rooms />
      </div>
      <EditBoothDrawer open={openEdit} handleClose={handleCloseEdit} />

      <Fab
        onClick={() => {
          setOpenChats(true);
        }}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          color: "#ffffff",
          backgroundColor: "#152d35",
        }}
        color="primary"
        aria-label="add"
      >
        <ChatRoundedIcon />
      </Fab>
      {/* <MainChatComponent /> */}
      {openChats && (
        <React.Fragment key="right">
          <SwipeableDrawer anchor="right" open={openChats}>
            <ChatContainer className="px-4 py-3">
              <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between mb-4">
                <div className="d-flex flex-column">
                  <div className="event-platform-side-drawer-heading">
                    Messages
                  </div>
                  <div className="setting-tab-sub-text">
                    These Messages are private to this Booth.
                  </div>
                </div>

                <IconButton
                  onClick={() => {
                    handleCloseChats();
                  }}
                  aria-label="close-drawer"
                >
                  <CancelOutlinedIcon
                    style={{ fontSize: "18", color: "#4D4D4D" }}
                  />
                </IconButton>
              </div>
              <div
                style={{
                  backgroundColor: "#FBFBFB52",
                  border: "1px solid #EBEBEB",
                  borderRadius: "15px",
                }}
              >
                <MainChatComponent />
              </div>
            </ChatContainer>
          </SwipeableDrawer>
        </React.Fragment>
      )}
    </>
  );
};

export default BoothArea;
