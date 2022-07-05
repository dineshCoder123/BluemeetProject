import React, { useEffect } from "react";
import Loader from "./../../Loader";
import { fetchBooths } from "../../../actions";
import "./../Styles/booth.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import BoothTagsFilterAndSearch from "../HelperComponents/boothTagsFilterAndSearch";
import BoothCard from "../HelperComponents/BoothCard";
import NoContentFound from "./../../NoContent";
import NoBooth from "./../../../assets/images/NoBooth.png";

const renderBoothCards = (booths) => {
  return booths.map((booth) => {
    return (
      <BoothCard
        promoImage={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${booth.promoImage}`}
        logo={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${booth.image}`}
        name={booth.name}
        tagline={booth.tagline}
        tags={booth.tags}
        id={booth._id}
        key={booth._id}
      />
    );
  });
};

const Booths = () => {
  const params = useParams();
  const eventId = params.eventId;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooths(eventId));
  }, []);

  const { booths } = useSelector((state) => state.booth);

  const { eventDetails } = useSelector((state) => state.event);

  if (!eventDetails) {
    return <Loader />;
  }

  return (
    <>
      <BoothTagsFilterAndSearch tags={eventDetails.boothTags} />

      {typeof booths !== "undefined" && booths.length > 0 ? (
        <div className="normal-booths-list-grid-layout">
          {renderBoothCards(booths)}
        </div>
      ) : (
        <div
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ height: "68vh", width: "100%" }}
        >
          <NoContentFound msgText="No Booths found" img={NoBooth} />
        </div>
      )}
    </>
  );
};

export default Booths;
