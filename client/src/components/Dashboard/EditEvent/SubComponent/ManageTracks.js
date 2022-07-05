import React, { useEffect } from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddTrack from "../FormComponents/EditTrackForms/AddTrack";
import TrackListFields from "../GridComponents/Track/ListFields";
import TrackDetailsCard from "../GridComponents/Track/DetailsCard";
import { fetchTracks } from "./../../../../actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoContentFound from "../../../NoContent";

import NoTrack from "./../../../../assets/images/NoTrack.png";

const Container = styled.div`
  height: 600px;
  width: 1200px;
`;

const Heading = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: #212121;
`;

const ManageTracks = ({ open, handleClose }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  const eventId = params.id;

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openAddTrack, setOpenAddTrack] = React.useState(false);

  const handleCloseAddTrack = () => {
    setOpenAddTrack(false);
  };

  useEffect(() => {
    dispatch(fetchTracks(eventId));
  }, []);

  const { tracks } = useSelector((state) => state.event);

  const renderTracks = (tracks) => {
    return tracks.map((track) => {
      return (
        <TrackDetailsCard
          name={track.name}
          description={track.description}
          sessions={track.sessions}
          id={track._id}
          key={track._id}
        />
      );
    });
  };

  return (
    <>
      <Dialog
        maxWidth="600px"
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={handleClose}
      >
        <Container className="px-4">
          <div
            style={{ borderBottom: "1px solid #B3B3B3" }}
            className="d-flex flex-row align-items-center justify-content-between py-3"
          >
            <Heading>Manage tracks</Heading>
            <div className="d-flex flex-row align-items-center">
              <button
                onClick={() => {
                  setOpenAddTrack(true);
                }}
                className="btn btn-outline-text btn-outline-primary me-3"
              >
                Add track
              </button>
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </div>
          {typeof tracks !== "undefined" && tracks.length > 0 ? (
            <>
              <TrackListFields />
              {renderTracks(tracks)}
            </>
          ) : (
            <div
              className="d-flex flex-row align-items-center justify-content-center my-4"
              style={{ height: "50vh", width: "100%" }}
            >
              <NoContentFound msgText="No tracks found." img={NoTrack} />
            </div>
          )}
        </Container>
      </Dialog>
      <AddTrack open={openAddTrack} handleClose={handleCloseAddTrack} />
    </>
  );
};

export default ManageTracks;