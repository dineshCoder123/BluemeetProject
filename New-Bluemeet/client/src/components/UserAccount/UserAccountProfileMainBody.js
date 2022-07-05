/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  CustomHorizontalTabWarpper,
  CustomTabButton,
  EventCardsGrid,
} from "./Elements";

import EditProfileForm from "./Forms/EditProfileForm";
import EditNotificationSettings from "./Forms/EditNotificationSettings";
import ResetPasswordAndDeactivation from "./Forms/ResetPasswordAndDeactivation";

import { fetchMyFavouriteEvents } from "./../../actions";

import EventCard from "./../EventCard";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";

import Loader from "./../Loader";
import AccountDeactivationForm from "./Forms/AccountDeactivationForm";

const renderFavouriteEvents = (events) => {
  return events.map((event) => {
    const now = new Date(event.startDate);
    const end = new Date(event.endDate);
    const formatedDate = dateFormat(now, "ddd mmm dS, h:MM TT");
    // console.log(x);

    const formatedEndDate = dateFormat(end, "ddd mmm dS, h:MM TT");

    const startTime = dateFormat(event.startTime, "ddd mmm dS, h:MM TT");
    const endTime = dateFormat(event.endTime, "ddd mmm dS, h:MM TT");
    return (
      <EventCard
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
        communityId={event.createdBy}
      />
    );
  });
};

const UserAccountProfileMainBody = () => {
  const [selectedTab, setSelectedTab] = useState("myprofile");

  const { favouriteEvents, isLoading, error } = useSelector(
    (state) => state.event
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyFavouriteEvents());
  }, []);

  if (isLoading) {
    <div
      className="d-flex flex-row align-items-center justify-content-center"
      style={{ height: "72vh", width: "100%" }}
    >
      <Loader />
    </div>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <>
      <div
        className="user-account-main-body-home-content pt-3 px-4"
        style={{ overflow: "auto", height: "85vh", width: "100% !important" }}
      >
        <CustomHorizontalTabWarpper
          className=" mb-4"
          style={{ maxWidth: "500px", gridTemplateColumns: "1fr 1fr" }}
        >
          <CustomTabButton
            active={selectedTab === "myprofile" ? true : false}
            onClick={() => {
              setSelectedTab("myprofile");
            }}
          >
            My profile
          </CustomTabButton>
          <CustomTabButton
            active={selectedTab === "settings" ? true : false}
            onClick={() => {
              setSelectedTab("settings");
            }}
          >
            Settings
          </CustomTabButton>
        </CustomHorizontalTabWarpper>

        <div className="my-3 pt-3">
          {(() => {
            switch (selectedTab) {
              case "myprofile":
                return (
                  <div
                    className="d-flex flex-row align-items-center justify-content-center"
                    style={{ width: "100%", margin: "0 auto !important" }}
                  >
                    {" "}
                    <EditProfileForm />{" "}
                  </div>
                );

              case "settings":
                return (
                  <>
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{ width: "100%", margin: "0 auto !important" }}
                    >
                      <EditNotificationSettings />
                      <ResetPasswordAndDeactivation />
                      <AccountDeactivationForm />
                    </div>
                  </>
                );

              case "favourites":
                return (
                  <>
                    <EventCardsGrid>
                      {renderFavouriteEvents(favouriteEvents)}
                    </EventCardsGrid>
                  </>
                );

              default:
                break;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default UserAccountProfileMainBody;
