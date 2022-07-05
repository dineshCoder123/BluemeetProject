import React from "react";
import styled from "styled-components";
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Divider from "@material-ui/core/Divider";
import DeleteVideo from "../../FormComponents/Video/DeleteVideo";
import { useDispatch } from "react-redux";
import { deleteBoothVideo } from "./../../../../../../../../actions";

const VideoPreview = styled.video`
  border-radius: 15px;
  height: 140px;
  width: 100%;
  background-color: #212121;
`;

const VideoLibraryDetailsCard = ({ name, id, time, date, url }) => {
  const [openDeleteVideo, setOpenDeleteVideo] = React.useState(false);

  const dispatch = useDispatch();

  const handleDeleteVideo = () => {
    dispatch(deleteBoothVideo(id));
  };

  const handleCloseDeleteVideo = () => {
    setOpenDeleteVideo(false);
  };
  return (
    <>
      <div
        className="team-members-list-fields-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.5fr",
          gridGap: "24px",
        }}
      >
        <div className="registrations-name-field mx-5">
          <VideoPreview src={url}></VideoPreview>
        </div>
        <div className="registrations-name-field">
          <div className="registrations-field-label">{name}</div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">{date}</div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label">{time}</div>
        </div>
        <div className="registrations-invoice-field">
          <div className="registrations-field-label">
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

      <DeleteVideo
        open={openDeleteVideo}
        handleClose={handleCloseDeleteVideo}
        handleDeleteVideo={handleDeleteVideo}
        id={id}
      />
    </>
  );
};

export default VideoLibraryDetailsCard;
