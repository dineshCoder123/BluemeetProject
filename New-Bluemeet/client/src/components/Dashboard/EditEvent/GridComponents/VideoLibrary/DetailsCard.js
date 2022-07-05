import React from "react";
import "./../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../assets/Sass/TeamManagement.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Divider from "@material-ui/core/Divider";
import DeleteEventVideo from "./../../SubComponent/DeleteEventVideo";
import UnlinkVideo from "./../../SubComponent/UnlinkVideo";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import { useDispatch } from "react-redux";
import { deleteEventVideo } from "./../../../../../actions";
import { useParams } from "react-router-dom";

const EventVideoLibraryDetailsCard = ({ name, id, time, date, isLinked }) => {
  
  const params = useParams();
  const dispatch = useDispatch();
  const eventId = params.id;

 

  const [openDeleteVideo, setOpenDeleteVideo] = React.useState(false);
  const [openUnlinkVideo, setOpenUnlinkVideo] = React.useState(false);

  const handleDeleteVideo = () => {
    dispatch(deleteEventVideo(id));
  };

  const handleCloseDeleteVideo = () => {
    setOpenDeleteVideo(false);
  };

  const handleCloseUnlinkVideo = () => {
    setOpenUnlinkVideo(false);
  };

  return (
    <>
      <div className="team-members-list-fields-container">
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5">{name}</div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">{date}</div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label">{time}</div>
        </div>
        <div className="registrations-invoice-field">
          <div className="registrations-field-label">
            <div>
              {isLinked ? (
                <IconButton
                  onClick={() => {
                    setOpenUnlinkVideo(true);
                  }}
                  color="primary"
                  aria-label="Unlink video"
                >
                  {" "}
                  <IndeterminateCheckBoxRoundedIcon />{" "}
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setOpenDeleteVideo(true);
                  }}
                  color="secondary"
                  aria-label="delete video"
                >
                  <DeleteRoundedIcon />
                </IconButton>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>

      <UnlinkVideo
        eventId={eventId}
        open={openUnlinkVideo}
        handleClose={handleCloseUnlinkVideo}
        id={id}
      />

      <DeleteEventVideo
        open={openDeleteVideo}
        handleClose={handleCloseDeleteVideo}
        handleDeleteVideo={handleDeleteVideo}
        id={id}
      />
    </>
  );
};

export default EventVideoLibraryDetailsCard;
