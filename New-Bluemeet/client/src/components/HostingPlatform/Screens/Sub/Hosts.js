import React, { useState } from "react";
import styled from "styled-components";
import Faker from "faker";
import PersonProfile from "../../PersonProfile";
import { useSelector } from "react-redux";
import NoContent from "./../../NoContent";
import NoHost from "./../../../../assets/images/NoHost.svg";

const EventHostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
`;

const HostCardBody = styled.div`
  background-color: #2a2a2a;
  border-radius: 10px;
  height: auto;
  min-height: 300px;
`;

const HostImg = styled.img`
  height: 200px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: cover;
`;

const HostName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 0.93rem;
`;

const HostDesignationOrg = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 0.78rem;
`;

const HostCardComponent = ({ name, image, organisation, designation }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HostCardBody className="">
        <HostImg src={image}></HostImg>

        <div className="p-3">
          <HostName className="mb-3">{name}</HostName>
          <HostDesignationOrg className="mb-2">
            {designation}
          </HostDesignationOrg>
          <HostDesignationOrg>{organisation}</HostDesignationOrg>
        </div>
      </HostCardBody>

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

const renderHosts = (hosts) => {
  return hosts.map((host) => {
    return (
      <HostCardComponent
        name={host.firstName + " " + host.lastName}
        image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${host.image}`}
        organisation={host.organisation}
        designation={host.designation}
      />
    );
  });
};

const Hosts = () => {
  const { eventDetails } = useSelector((state) => state.event);

  return (
    <>
      {typeof eventDetails.hosts !== "undefined" &&
      eventDetails.hosts.length > 0 ? (
        <EventHostsGrid>{renderHosts(eventDetails.hosts)}</EventHostsGrid>
      ) : (
        <NoContent
          Msg={"There are no host assigned to this event yet."}
          Image={NoHost}
        />
      )}
    </>
  );
};

export default Hosts;
