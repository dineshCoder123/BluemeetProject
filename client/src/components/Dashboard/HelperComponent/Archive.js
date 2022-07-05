import React, { useEffect } from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import NoItem from "./../../../assets/images/NoWish.png";

import { fetchArchivedEvents } from "./../../../actions";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import ArchiveListFields from "./Archive/ListFields";
import ArchiveDetailCard from "./Archive/DetailsCard";

const Container = styled.div`
  height: 600px;
  width: 1200px;
`;

const Heading = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: #212121;
`;

const IllustrationContainer = styled.div`
  height: 550px;
  width: 100%;
`;

const Image = styled.img`
  border-radius: 15px;
  height: 200px;
  width: "100%";
  object-fit: contain;
`;

const NoWishText = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  color: #212121;
`;

const ScrollableContainer = styled.div`
  overflow: auto;
  height: 530px;
`;

const Archive = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const communityId = params.id;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(fetchArchivedEvents(communityId));
  }, []);

  const { archivedEvents } = useSelector((state) => state.event);

  const renderArchivedEvents = (events) => {
    return events.map((event) => {
      const {
        id,
        eventName,
        shortDescription,
        visibility,
        publishedStatus,
        registrationsRecieved,
      } = event;

      let imgUrl = " #";
      const imgKey = event.image;
      if (imgKey) {
        imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
      }

      return (
        <ArchiveDetailCard
          key={id}
          id={id}
          imgUrl={imgUrl}
          shortDescription={shortDescription}
          publishedStatus={publishedStatus}
          registrations={registrationsRecieved}
          visibility={visibility}
          eventName={eventName}
          communityId={communityId}
        />
      );
    });
  };

  return (
    <>
      <Dialog
        maxWidth="1200px"
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <Container className="px-4">
          <div
            style={{ borderBottom: "1px solid #B3B3B3" }}
            className="d-flex flex-row align-items-center justify-content-between py-3 mb-3"
          >
            <Heading>Archive</Heading>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <CancelOutlinedIcon />
            </IconButton>
          </div>

          {/* Scrollable container */}
          {/* <ArchiveListFields />
              <ArchiveDetailCard /> */}
          {/* // TODO Wrap list inside a scrollable div */}

          {typeof archivedEvents !== "undefined" &&
          archivedEvents.length > 0 ? (
            <>
              <ArchiveListFields />
              <ScrollableContainer>
                {renderArchivedEvents(archivedEvents)}
              </ScrollableContainer>
            </>
          ) : (
            <IllustrationContainer className="d-flex flex-column align-items-center justify-content-center">
              <Image src={NoItem} />
              <NoWishText className="my-3">
                There're no events in your archive
              </NoWishText>
            </IllustrationContainer>
          )}
        </Container>
      </Dialog>
    </>
  );
};

export default Archive;
