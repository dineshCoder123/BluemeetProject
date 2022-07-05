import React from "react";
import styled from "styled-components";
import Faker from "faker";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";

import { IconButton } from "@material-ui/core";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import dateFormat, { masks } from "dateformat";
import { showSnackbar } from "./../../actions";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  height: 100%;
  height: 280px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const CardShadowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 16px;

  width: 100%;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const EventStartMonth = styled.div`
  font-weight: 400;
  color: #212121;
  font-size: 0.9rem;
`;

const EventStartDate = styled.div`
  font-weight: 600;
  color: #212121;
  font-size: 1.4rem;
`;

const EventStartTime = styled.div`
  font-weight: 400;
  color: #212121;
  font-size: 0.9rem;
`;

const EventPromoImage = styled.img`
  background-color: #ebebeb;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const EventName = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #212121;
`;

const EventRunningStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-weight: 500;
  font-size: 0.95rem;
  color: #207909;
`;

const LatestEventCard = ({
  startTime,
  visibility,
  publishedStatus,
  name,
  image,
  runningStatus,
  id,
  communityId,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <CardContainer className="px-4 py-3">
        <CardShadowContainer>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <EventStartMonth className="mb-3">
              {dateFormat(new Date(startTime), "mmm")}
            </EventStartMonth>
            <EventStartDate className="mb-3">
              {dateFormat(new Date(startTime), "dd")}
            </EventStartDate>
            <EventStartTime>
              {dateFormat(new Date(startTime), "h:MM TT")}
            </EventStartTime>
          </div>
          <EventPromoImage src={image}></EventPromoImage>
        </CardShadowContainer>

        <div className="d-flex flex-column justify-content-between py-3">
          <div
            // className="mb-5"
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              gridGap: "12px",
              alignItems: "center",
            }}
          >
            <div>
              {/* Event Name */}
              <EventName className="mb-4">{name}</EventName>
              {/* Running Status */}
              <EventRunningStatus>
                <Chip
                  label={runningStatus}
                  color="secondary"
                  variant="outlined"
                  style={{ fontWeight: "500" }}
                  className=""
                />
                <Chip
                  label={publishedStatus}
                  color="primary"
                  variant="outlined"
                  style={{ fontWeight: "500" }}
                  className="mx-3"
                />
                <Chip
                  label={visibility}
                  color="warning"
                  variant="outlined"
                  style={{ fontWeight: "500" }}
                  className=""
                />
              </EventRunningStatus>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-end">
              <IconButton
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `https://www.bluemeet.in/event-landing-page/${id}/${communityId}`
                    )
                    .then(
                      function () {
                        console.log(
                          "Async: Copying to clipboard was successful!"
                        );
                        dispatch(
                          showSnackbar(
                            "success",
                            "Event link copied to clipboard!"
                          )
                        );
                      },
                      function (err) {
                        console.error("Async: Could not copy text: ", err);
                        dispatch(
                          showSnackbar(
                            "error",
                            "Failed to copy event link to clipboard!"
                          )
                        );
                      }
                    );
                }}
              >
                <ContentCopyRoundedIcon />
              </IconButton>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center">
            <Link
              to={`/community/${communityId}/edit-event/${id}/event-overview`}
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-primary btn-outline-text">
                <ModeEditIcon style={{ fontSize: "18px" }} className="me-1" />
                <span> Edit event </span>
              </button>
            </Link>

            <a
              href={`https://www.bluemeet.in/event-landing-page/${id}/${communityId}`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-outline-primary btn-outline-text ms-4">
                <RemoveRedEyeIcon
                  style={{ fontSize: "18px" }}
                  className="me-1"
                />
                <span> Preview </span>
              </button>
            </a>
          </div>
        </div>
      </CardContainer>
    </>
  );
};

export default LatestEventCard;
