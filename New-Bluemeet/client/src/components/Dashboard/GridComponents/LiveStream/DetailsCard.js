import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";
import "./../../../../assets/Sass/TeamManagement.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Divider from "@material-ui/core/Divider";
import Chip from "@mui/material/Chip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import DeleteStreamDestination from "../../FormComponents/StreamDestinations.js/DeleteDestination";
import EditRTMPDestination from "../../FormComponents/StreamDestinations.js/EditRTMPDestination";
import { fetchOneStreamDestination, showSnackbar } from "./../../../../actions";
import { useDispatch } from "react-redux";

const renderSessions = (sessions) => {
  return sessions.map((session) => {
    return (
      <Chip
        label={session.name}
        color="primary"
        variant="outlined"
        className="me-2"
      />
    );
  });
};

const LiveStreamDetailsCard = ({ type, name, sessions, id, url }) => {
  const dispatch = useDispatch();

  const [openDeleteVideo, setOpenDeleteVideo] = React.useState(false);
  const [openEditRTMP, setOpenEditRTMP] = React.useState(false);

  const handleCloseDeleteVideo = () => {
    setOpenDeleteVideo(false);
  };

  const handleCloseEditRTMP = () => {
    setOpenEditRTMP(false);
  };

  return (
    <>
      <div className="team-members-list-fields-container">
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5">
            <VideocamRoundedIcon
              style={{ color: "#538BF7" }}
              className="me-2"
            />
            {name}
          </div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">
            <Chip label={type} color="warning" />
          </div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label">
            {typeof sessions !== "undefined" && sessions.length > 0 ? (
              renderSessions(sessions)
            ) : (
              <Chip
                label={"Not mapped to any session yet"}
                color="error"
                variant="outlined"
                style={{ width: "100%" }}
              />
            )}
          </div>
        </div>
        <div className="registrations-invoice-field">
          <div className="registrations-field-label">
            <div
              onClick={() => {
                setOpenEditRTMP(true);

                dispatch(fetchOneStreamDestination(id));
              }}
            >
              <IconButton color="primary" aria-label="add to shopping cart">
                <ModeEditOutlineRoundedIcon />
              </IconButton>
            </div>
            {/* <div>
              <IconButton onClick={() => {
                  navigator.clipboard.writeText(url).then(function() {
                    console.log('Async: Copying to clipboard was successful!');
                    dispatch(showSnackbar("success", "URL Copied to clipboard!"));
                  }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                    dispatch(showSnackbar("error", "Failed to copy to clipboard!"));
                  });

                  
                }} aria-label="add to shopping cart">
                <ContentCopyIcon style={{ color: "#DA580D" }} />
              </IconButton>
            </div> */}
            <div
              onClick={() => {
                setOpenDeleteVideo(true);
              }}
            >
              <IconButton color="secondary" aria-label="add to shopping cart">
                <DeleteRoundedIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>

      <EditRTMPDestination
        open={openEditRTMP}
        handleClose={handleCloseEditRTMP}
        destinationId={id}
      />

      <DeleteStreamDestination
        open={openDeleteVideo}
        handleClose={handleCloseDeleteVideo}
        destinationId={id}
      />
    </>
  );
};

export default LiveStreamDetailsCard;
