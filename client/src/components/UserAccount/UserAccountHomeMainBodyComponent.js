import React, { useEffect } from "react";
import EventCard from "../EventCard";
import { DashboardSectionHeading, EventCardsGrid } from "./Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  errorTrackerForRegisteredEvents,
  fetchUserRegisteredEvents,
  getUserRegistrations,
  fetchMyFavouriteEvents,
} from "../../actions";
import Loader from "./../Loader";
import dateFormat from "dateformat";
import YouHaveNoEventComing from "./YouHaveNoEventsComing";
import NotRegistered from "./../../assets/images/NoWish.png";

const renderRegisteredEvents = (events, registrations, favouriteEvents) => {
  return events.map((event) => {
    const startTime = dateFormat(event.startTime, "mmm dS, h:MM TT");
    let magic_link;

    for (let element of registrations) {
      if (element.bookedForEventId && event._id) {
        if (element.bookedForEventId.toString() === event._id.toString()) {
          magic_link = element.magic_link;
        }
      }
    }

    let isFavourite = false;

    if (favouriteEvents.includes(event._id)) {
      isFavourite = true;
    }

    return (
      <EventCard
        image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${event.image}`}
        key={event.id}
        eventName={event.eventName}
        minPrice={event.minTicketPrice}
        maxPrice={event.maxTicketPrice}
        id={event.id}
        communityId={event.communityId}
        startTime={startTime}
        showBtn={true}
        speakers={event.speaker}
        // TODO show commuity rating on thier events cards
        rating={4.0}
        magic_link={magic_link}
        isFavourite={isFavourite}
      />
    );
  });
};

const UserAccountHomeMainBody = () => {
  const { events, isLoading, error } = useSelector((state) => state.event);
  const { registrations } = useSelector((state) => state.registration);

  const { favouriteEvents } = useSelector((state) => state.event);

  const uniqueEventIds = []; // No duplicates allowed
  const uniqueEventRegistrations = []; // No duplicated allowed
  const formattedEvents = []; // * Each unique events document  => pass to list render
  const formattedRegistrations = []; // * Each unique events registartion document => pass to list render

  // At this point we will have array of all unique events

  if (typeof events !== "undefined" && events.length) {
    for (let element of events) {
      if (!uniqueEventIds.includes(element._id)) {
        uniqueEventIds.push(element._id);

        formattedEvents.push(element);
      }
    }
  }

  if (typeof registrations !== "undefined" && registrations.length) {
    for (let element of registrations) {
      if (!uniqueEventRegistrations.includes(element.bookedForEventId)) {
        uniqueEventRegistrations.push(element.bookedForEventId);

        formattedRegistrations.push(element);
      }
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRegisteredEvents());
    dispatch(getUserRegistrations());
    dispatch(fetchMyFavouriteEvents());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ height: "80vh", width: "100%" }}
      >
        <Loader />
      </div>
    );
  } else if (error) {
    return dispatch(errorTrackerForRegisteredEvents());
  } else if (Array.isArray(events) && events.length) {
    <div
      className="d-flex flex-row align-items-center justify-content-center"
      style={{ height: "80vh", width: "100%" }}
    >
      <Loader />
    </div>;
  }

  return (
    <div className="user-account-main-body-home-content">
      <div
        className="user-account-main-body-home-content-left ps-2"
        style={{ overflow: "auto", height: "100%" }}
      >
        <DashboardSectionHeading className="pb-4 ps-4">
          Your Upcoming Events
        </DashboardSectionHeading>

        {typeof formattedEvents !== "undefined" &&
        formattedEvents.length > 0 ? (
          <div className="user-account-events-event-card-grid px-2 py-2">
            {renderRegisteredEvents(
              formattedEvents,
              formattedRegistrations,
              favouriteEvents
            )}
          </div>
        ) : (
          <div
            style={{ width: "100%", height: "70vh" }}
            className="d-flex flex-row align-items-center justify-content-center"
          >
            <YouHaveNoEventComing
              img={NotRegistered}
              msgText={"You have not yet registered in any events yet."}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountHomeMainBody;
