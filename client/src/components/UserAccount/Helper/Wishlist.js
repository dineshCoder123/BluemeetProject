import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import { useLocation } from "react-router";

import NoWish from "./../../../assets/images/NoWish.png";

import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";

import dateFormat from "dateformat";

import EventCard from "./../../EventCard";

import {
  fetchEvents,
  fetchMyPopulatedFavouriteEvents,
} from "./../../../actions";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
`;

const renderWishlist = (events) => {
  return events.map((event) => {
    const now = new Date(event.startDate);
    const end = new Date(event.endDate);
    const formatedDate = dateFormat(now, "ddd mmm dS, h:MM TT");
    const formatedEndDate = dateFormat(end, "ddd mmm dS, h:MM TT");

    const startTime = dateFormat(event.startTime, "ddd mmm dS, h:MM TT");
    const endTime = dateFormat(event.endTime, "ddd mmm dS, h:MM TT");

    return (
      <EventCard
        showSpeakers={false}
        image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${event.image}`}
        date={formatedDate}
        endDate={formatedEndDate}
        id={event.id}
        eventName={event.eventName}
        minPrice={event.minTicketPrice}
        maxPrice={event.maxTicketPrice}
        key={event.id}
        rating={(event.communityRating * 1.0).toFixed(1)}
        startTime={startTime}
        endTime={endTime}
        communityId={event.communityId}
        isFavourite={true}
        speakers={event.speaker}
      />
    );
  });
};

const Wishlist = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchEvents(location.search));
    dispatch(fetchMyPopulatedFavouriteEvents());
  }, []);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { populatedFavouriteEvents, events } = useSelector(
    (state) => state.event
  );

  let filteredEvents = populatedFavouriteEvents;

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
            className="d-flex flex-row align-items-center justify-content-between py-3"
          >
            <Heading>Wishlist</Heading>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <CancelOutlinedIcon />
            </IconButton>
          </div>

          {typeof filteredEvents !== "undefined" &&
          filteredEvents.length > 0 ? (
            <Grid className="py-3">{renderWishlist(filteredEvents)}</Grid>
          ) : (
            <IllustrationContainer className="d-flex flex-column align-items-center justify-content-center">
              <Image src={NoWish} />
              <NoWishText className="my-3">
                There's nothing in your wishlist
              </NoWishText>
              <a href="/search-events" style={{ textDecoration: "none" }}>
                <button className="btn btn-outline-text btn-primary">
                  <ExploreRoundedIcon style={{ fontSize: "22px" }} />
                  <span className="ms-2">Explore events</span>
                </button>
              </a>
            </IllustrationContainer>
          )}
        </Container>
      </Dialog>
    </>
  );
};

export default Wishlist;
