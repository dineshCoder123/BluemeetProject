import React from "react";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./../../../assets/Sass/DataGrid.scss";
import Avatar from "@material-ui/core/Avatar";
import EditSpeaker from "./FormComponents/EditSpeakersForms/EditSpeaker";
import DeleteSpeaker from "./FormComponents/EditSpeakersForms/DeleteSpeaker";
import { fetchParticularSpeakerOfEvent } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import MailIcon from "@mui/icons-material/Mail";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SpeakerPreview from "./FormComponents/EditSpeakersForms/SpeakerPerview";
import Chip from "@mui/material/Chip";
import { sendSpeakerInvitation, showSnackbar } from "./../../../actions";

const SpeakersDetailsCard = ({
  name,
  email,
  sessions,
  id,
  bio,
  url,
  invitationLink,
  dashboardLink,
  invitationStatus,
}) => {
  console.log(sessions);
  console.log(id);

  const { isLoading } = useSelector((state) => state.speaker);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [openPreview, setOpenPreview] = React.useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDeleteSpeaker = () => {
    setOpenDeleteDialog(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleCloseDeleteSpeaker = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditSpeaker = () => {
    setOpen(true);
    dispatch(fetchParticularSpeakerOfEvent(id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const truncateText = (str, n) => {
    if (!str) return;
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div>
        <div
          className="session-field-value-container"
          style={{
            gridTemplateColumns: "2fr 2.5fr 3fr 1.5fr 2.5fr ",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="event-card-field "
            style={{
              width: "100%",
            }}
          >
            <div className="registrations-name-field">
              <div className="registrations-field-label d-flex flex-row justify-content-start">
                {/* attendee avatar and name */}
                <Avatar alt={name} src={url} variant="rounded" />
                <div
                  className="ms-3 px-2 registration-name-styled"
                  style={{ fontFamily: "Inter", fontSize: "0.85rem" }}
                >
                  {truncateText(name, 20)}
                </div>
              </div>
            </div>
          </div>

          <div
            className="event-status-field"
            style={{
              width: "100%",
            }}
          >
            <div
              className="event-field-label registrations-field-label"
              style={{ width: "100%" }}
            >
              <div
                className="chip-text"
                style={{
                  fontFamily: "Inter",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                {truncateText(email, 20)}
              </div>
            </div>
          </div>
          <div
            className="event-views-field"
            style={{
              width: "100%",
            }}
          >
            <div className="event-field-label registrations-field-label">
              <div
                className="speaker-card-session-grid"
                style={{ gridTemplateColumns: "1fr" }}
              >
                {typeof sessions !== "undefined" && sessions.length > 0 ? (
                  sessions.map((session) => {
                    console.log(session);
                    return (
                      <Chip
                        style={{ width: "fit-content" }}
                        label={truncateText(session.name, 35)}
                        color="primary"
                        variant="outlined"
                      />
                    );
                  })
                ) : (
                  <Chip
                    style={{ width: "fit-content" }}
                    label="Not assigned any sessions yet"
                    color="warning"
                    variant="outlined"
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="event-visibility-field"
            style={{
              width: "100%",
            }}
          >
            <div
              className="event-field-label registrations-field-label"
              style={{
                width: "100%",
                fontFamily: "Inter",
                fontSize: "0.85rem",
                fontWeight: "500",
              }}
            >
              {(() => {
                console.log(invitationStatus, 215555555);
                switch (invitationStatus) {
                  case "Sent":
                    return (
                      <Chip label="Sent" color="success" variant="outlined" />
                    );

                  case "Not sent":
                    return (
                      <Chip label="Not sent" color="error" variant="outlined" />
                    );

                  default:
                    return (
                      <Chip label="Not sent" color="error" variant="outlined" />
                    );
                }
              })()}
            </div>
          </div>
          <div className="event-registrations-field">
            <div
              className="event-field-label registrations-field-label"
              style={{ width: "100%" }}
            >
              <div onClick={handleEditSpeaker}>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <EditRoundedIcon />
                </IconButton>
              </div>
              <div onClick={handleDeleteSpeaker}>
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <DeleteRoundedIcon />
                </IconButton>
              </div>

              <div
                onClick={() => {
                  dispatch(
                    sendSpeakerInvitation(
                      name,
                      email,
                      id,
                      invitationLink,
                      sessions
                    )
                  );
                }}
              >
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <MailIcon style={{ color: "#1351C5" }} />
                </IconButton>
              </div>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(invitationLink).then(
                    function () {
                      console.log(
                        "Async: Copying to clipboard was successful!"
                      );
                      dispatch(showSnackbar("success", "Copied to clipboard!"));
                    },
                    function (err) {
                      console.error("Async: Could not copy text: ", err);
                      dispatch(
                        showSnackbar("error", "Failed to copy to clipboard!")
                      );
                    }
                  );
                }}
              >
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <ContentCopyIcon style={{ color: "#A113C5" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
          <Divider />
        </div>
      </div>

      <EditSpeaker open={open} handleClose={handleClose} id={id} />
      <DeleteSpeaker
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteSpeaker={handleCloseDeleteSpeaker}
        id={id}
      />
      <SpeakerPreview open={openPreview} handleClose={handleClosePreview} />
    </>
  );
};

export default SpeakersDetailsCard;
