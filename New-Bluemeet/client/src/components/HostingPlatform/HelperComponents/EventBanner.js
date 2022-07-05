import React, { useState } from "react";
import styled from "styled-components";
import "./../Styles/root.scss";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import UploadEventBanner from "./../ComplimentaryParts/UploadEventBanner";
import { useSelector } from "react-redux";

const Banner = styled.img`
  object-fit: cover;
  max-height: 300px;
`;

const StyledIconButton = styled.div`
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: #212121;
  color: #ffffff;
  padding: 12px;

  &:hover {
    border: 1px solid #212121;
    background-color: #ffffff;
    color: #212121;
    cursor: pointer;
  }
`;

const EventBanner = ({ eventName, shortDescription, createdBy }) => {
  const [openUploadBanner, setOpenUploadBanner] = useState(false);

  const { eventDetails } = useSelector((state) => state.event);

  const handleCloseUploadBanner = () => {
    setOpenUploadBanner(false);
  };

  return (
    <>
      <div>
        <Banner
          className="event-banner-card d-flex flex-row align-items-center mb-5"
          src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${eventDetails.banner}`}
        ></Banner>
        <StyledIconButton
          onClick={() => {
            setOpenUploadBanner(true);
          }}
          style={{
            height: "fit-content",
            position: "absolute",
            bottom: "12px",
            right: "12px",
            zIndex: "100",
          }}
        >
          <EditRoundedIcon style={{ fontSize: "22px" }} />
        </StyledIconButton>
      </div>

      <UploadEventBanner
        open={openUploadBanner}
        handleClose={handleCloseUploadBanner}
      />
    </>
  );
};

export default EventBanner;
