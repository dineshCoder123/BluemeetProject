import React from "react";
import {
  EventCardWrapper,
  EventCardImg,
  EventCardEventName,
  EventCardEventTimeLine,
  EventCardEventPriceRange,
} from "./UserAccount/Elements";

import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";

const EventCardNew = ({
  image,
  eventName,
  minPrice,
  maxPrice,
  id,
  communityId,
  startDate,
  endDate,
}) => {
  return (
    <>
      <EventCardWrapper>
        <div className="favourite-icon">
          <Fab
            aria-label="like"
            style={{
              position: "absolute",
              right: "10px",
              top: "90px",
              zIndex: "90",
            }}
            size="small"
          >
            <FavoriteIcon className="favourite-icon" />
          </Fab>
        </div>
        <div className="favourite-icon">
          <Fab
            aria-label="like"
            style={{
              position: "absolute",
              right: "10px",
              top: "90px",
              zIndex: "90",
            }}
            size="small"
          >
            <FavoriteIcon className="favourite-icon" />
          </Fab>
        </div>
        <EventCardImg src={image}></EventCardImg>
        <div className="px-3 py-3">
          <EventCardEventName className="mb-4">{eventName}</EventCardEventName>
          <EventCardEventTimeLine className="mb-4">
            {startDate} - {endDate}
          </EventCardEventTimeLine>
          <EventCardEventPriceRange>
            ${minPrice} to ${maxPrice}
          </EventCardEventPriceRange>
        </div>
      </EventCardWrapper>
    </>
  );
};

export default EventCardNew;
