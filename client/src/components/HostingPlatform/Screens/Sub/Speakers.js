import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Faker from "faker";
import PersonProfile from "../../PersonProfile";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NoContent from "./../../NoContent";
import NoSpeaker from "./../../../../assets/images/NoSpeaker.svg";
import { fetchEventSpeakers } from "./../../../../actions";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const EventSpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
`;

const SpeakerCardBody = styled.div`
  background-color: #2a2a2a;
  border-radius: 10px;
  height: auto;
  min-height: 300px;
`;

const SpeakerImg = styled.img`
  height: 200px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: cover;
`;

const SpeakerName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 0.93rem;
`;

const SpeakerDesignationOrg = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 0.78rem;
`;

const SpeakerCardComponent = ({name, image, organisation, designation}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SpeakerCardBody className="">
        <SpeakerImg
          src={
            image
          }
        ></SpeakerImg>

        <div className="p-3">
          <SpeakerName className="mb-3">{name}</SpeakerName>
          <SpeakerDesignationOrg className="mb-2">
            {designation}
          </SpeakerDesignationOrg>
          <SpeakerDesignationOrg>{organisation}</SpeakerDesignationOrg>
        </div>
      </SpeakerCardBody>

      <PersonProfile
        open={open}
        handleClose={handleClose}
        userName={Faker.name.findName()}
        userImage={Faker.image.avatar()}
        userOrganisation={"Google Inc."}
        userDesignation={"VP"}
      />
    </>
  );
};

const renderSpeakers = (speakers) => {
  return speakers.map((speaker) => {
    return (
      <SpeakerCardComponent
        name={speaker.firstName + " " + speaker.lastName}
        image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${speaker.image}`}
        organisation={speaker.organisation}
        designation={speaker.designation}
      />
    );
  });
};

const Speakers = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { eventDetails } = useSelector((state) => state.event);
  const { speakers } = useSelector((state) => state.speaker);
  const eventId = params.eventId;

  // Fetch all speakers of this event
  useEffect(() => {
    dispatch(fetchEventSpeakers(eventId));
  }, []);

  return (
    <>
      {typeof speakers !== "undefined" && speakers.length > 0 ? (
        <EventSpeakersGrid>
          {" "}
         {renderSpeakers(speakers)}{" "}
        </EventSpeakersGrid>
      ) : (
        <div
          style={{ width: "100%" }}
          className="d-flex flex-row align-items-center justify-content-center mt-4"
        >
          <NoContent
            Msg={"There are no speakers in this event yet."}
            Image={NoSpeaker}
          />
        </div>
      )}
    </>
  );
};

export default Speakers;
