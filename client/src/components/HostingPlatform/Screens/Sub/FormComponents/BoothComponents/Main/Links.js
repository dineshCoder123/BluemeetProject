import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NoContentFound from "../../../../../../NoContent";
import Divider from "@material-ui/core/Divider";
import LinkLibraryListFields from "../GridComponents/Links/ListFields";
import LinkLibraryDetailsCard from "./../GridComponents/Links/DetailsCard";
import NoLink from "./../../../../../../../assets/images/NoLink.png";
import AddLink from "../FormComponents/Links/AddLink.js";
import { useParams } from "react-router-dom";
import { fetchLinks } from "./../../../../../../../actions";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const renderLinks = (links) => {
  if (!links) return;
  return links.map((link) => {
    if (!link) return <></>;
    return (
      <LinkLibraryDetailsCard
        id={link._id}
        key={link._id}
        name={link.name}
        url={link.url}
        clicks={link.clicks}
      />
    );
  });
};

const Links = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params.eventId;
  const { links, currentBoothId } = useSelector((state) => state.booth);

  const [openAddLink, setOpenAddLink] = useState(false);

  const handleCloseAddLink = () => {
    setOpenAddLink(false);
  };

  useEffect(() => {
    dispatch(fetchLinks(currentBoothId, eventId));
  }, []);

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 py-4">
          <SectionHeading className="">Links</SectionHeading>
          <div>
            <button
              onClick={() => {
                setOpenAddLink(true);
              }}
              className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
            >
              <span className="">Add Links</span>
            </button>
          </div>
        </div>

        {typeof links !== "undefined" && links.length > 0 ? (
          <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
            <LinkLibraryListFields />
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {renderLinks(links)}
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "83vh", width: "100%" }}
          >
            {" "}
            <NoContentFound msgText="No Links Found" img={NoLink} />{" "}
          </div>
        )}
      </div>
      <AddLink open={openAddLink} handleClose={handleCloseAddLink} />
    </>
  );
};

export default Links;
