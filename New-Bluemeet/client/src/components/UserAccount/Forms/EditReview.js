import React from "react";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Faker from "faker";

import { ButtonFilled, ButtonOutlined } from "../Elements";

const OverlayFormHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.1rem;
  color: #212121;
`;

const EditReviewContainer = styled.div`
  height: 400px;
  width: 668px;
`;

const ReviewOrQueryEventPreview = styled.div`
  height: 120px;
  width: 100%;
  /* background-color: #212121; */
`;
const EventImage = styled.img`
  height: 100%;
  width: 40%;
  object-fit: cover;
  border-radius: 10px;
`;
const EventName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 1.1rem;
`;

const HostedByText = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #152d35;
`;

const CommunityName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.78rem;
  color: #152d35;
`;

const TextArea = styled.textarea`
  &:focus {
    border: 1px solid #152d35 !important;
    outline: none;

  }
  &:hover {
    border: 1px solid #152d35 !important;
  }
`;

const EditReview = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="768px"
      >
        <EditReviewContainer className="px-4 py-3">
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <div></div>

            <OverlayFormHeading>Edit Review</OverlayFormHeading>

            <IconButton onClick={handleClose}>
              <CancelRoundedIcon />
            </IconButton>
          </div>
          <ReviewOrQueryEventPreview className="d-flex flex-row align-items-center mb-4">
            <EventImage
              className="me-3"
              src="https://media-exp1.licdn.com/dms/image/C4D1BAQGk-9s2mXawOw/company-background_10000/0/1557739594383?e=2159024400&v=beta&t=Q9uU1MulK50ZIo8i2D-OmlJQYVncyWOvLqHsvGRQl4o"
            />
            <div>
              <EventName className="mb-4">Tech Job's Fair 2021</EventName>
              <div className="d-flex flex-row align-items-center">
                <Avatar
                  className="me-3"
                  src={
                    "https://static.wixstatic.com/media/72c0b2_9417bad731e543578911f6110f4e9a2d~mv2.jpg/v1/fill/w_924,h_476,al_c,q_90/72c0b2_9417bad731e543578911f6110f4e9a2d~mv2.jpg"
                  }
                  variant="rounded"
                />
                <div>
                  <HostedByText>Hosted by</HostedByText>
                  <CommunityName>Ception Technologies</CommunityName>
                </div>
              </div>
            </div>
          </ReviewOrQueryEventPreview>
          <TextArea rows="3" placeholder="Your review" className="form-control mb-3">

          </TextArea>
          <div className="d-flex flex-row align-items-center justify-content-end">
              <ButtonOutlined className="me-3">Cancel</ButtonOutlined>
              <ButtonFilled>Update</ButtonFilled>
          </div>
        </EditReviewContainer>
      </Dialog>
    </>
  );
};

export default EditReview;
