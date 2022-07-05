import React from "react";
import Divider from "@material-ui/core/Divider";
import "./../../../../assets/Sass/DataGrid.scss";
import { editEvent } from "./../../../../actions";
import { IconButton } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";

import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";

const ArchiveDetailCard = ({
  id,
  imgUrl,
  shortDescription,
  publishedStatus,
  registrations,
  communityId,
  visibility,
  eventName,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="events-field-value-container"
        style={{
          alignItems: "center",
          display: "grid",
          gridTemplateColumns: "3.5fr 1fr 1fr 1fr 0.5fr",
        }}
      >
        <div
          onClick={() => {
            window.location.href = `/community/${communityId}/edit-event/${id}/event-overview`;
          }}
          className="event-img-name-container ms-3"
        >
          <div
            className="event-field-label field-label-value event-name-short-description-card"
            style={{ width: "100%" }}
          >
            <img
              src={imgUrl}
              alt="event-poster"
              style={{ width: "41%", height: "110px", borderRadius: "3px" }}
            />
            <div className="event-name-and-description-wrapper">
              <div style={{ width: "100%", textDecoration: "none" }}>
                <div className="event-name-d" style={{ fontFamily: "Inter" }}>
                  {eventName}
                </div>
              </div>
              <div style={{ width: "100%", textDecoration: "none" }}>
                <div
                  className="event-short-description-d"
                  style={{ fontFamily: "Inter" }}
                >
                  {shortDescription}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="event-visibility-field">
          <div
            className="event-field-label field-label-value"
            style={{ fontFamily: "Inter" }}
          >
            {(() => {
              switch (visibility) {
                case "Public":
                  return (
                    <Chip
                      label={visibility}
                      color="success"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );
                case "Private":
                  return (
                    <Chip
                      label={visibility}
                      color="warning"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );
                case "Hidden":
                  return (
                    <Chip
                      label={visibility}
                      color="error"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );

                default:
                  break;
              }
            })()}
          </div>
        </div>
        <div className="event-status-field">
          <div className="event-field-label field-label-value">
            <div className="chip-container">
              <div className="chip-text" style={{ fontFamily: "Inter" }}>
                {(() => {
                  switch (publishedStatus) {
                    case "Draft":
                      return (
                        <Chip
                          label={publishedStatus}
                          color="secondary"
                          style={{ fontWeight: "500" }}
                          variant="outlined"
                        />
                      );
                    case "Published":
                      return (
                        <Chip
                          label={publishedStatus}
                          color="success"
                          style={{ fontWeight: "500" }}
                          variant="outlined"
                        />
                      );

                    default:
                      break;
                  }
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className="event-registrations-field">
          <div className="event-field-label field-label-value">
            {registrations}
          </div>
        </div>

        <div className="event-stage-field">
          <div className="event-field-label field-label-value">
            <div className="visit-stage-button">
              <IconButton
                onClick={() => {
                  dispatch(editEvent({ archived: false }, id, true)); // Third argument tells that we are unarchiving event
                }}
              >
                <IndeterminateCheckBoxRoundedIcon
                  style={{ color: "#C82727" }}
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default ArchiveDetailCard;
