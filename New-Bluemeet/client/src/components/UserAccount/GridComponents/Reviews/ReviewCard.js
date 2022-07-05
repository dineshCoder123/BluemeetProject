import React from "react";
import Faker from "faker";
import Box from "@material-ui/core/Box";
import Rating from "react-star-rating-lite";
import Avatar from "@material-ui/core/Avatar";
import "./../../../../assets/Sass/Reviews.scss";
import styled from "styled-components";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Chip from "@mui/material/Chip";

const ReviewerName = styled.div`
  font-weight: 500 !important;
  font-family: "Ubuntu" !important;
  color: #212121 !important;
  font-size: 0.85rem !important;
`;

const ReviewTextStyled = styled.div`
  font-weight: 500 !important;
  font-family: "Ubuntu" !important;
  color: #2f2f2f !important;
  font-size: 0.88rem !important;
`;

const ReviewCard = ({handleOpenReview}) => {
  return (
    <div
      className="review-card-wrapper px-4 py-3 mb-3"
      style={{ minHeight: "125px" }}
    >
      <div className="user-name-event-and-star-rating-row d-flex flex-row justify-content-between mb-3">
        <div className=" d-flex flex-row align-items-center">
          <Avatar
            alt="Travis Howard"
            src={Faker.image.avatar()}
            variant="rounded"
          />
          <ReviewerName className="ms-3 px-2 registration-name-styled">
            {Faker.name.findName()}
          </ReviewerName>
        </div>

        <div className="d-flex flex-row align-items-center">
          <Chip
          onClick={handleOpenReview}
            icon={<ModeEditOutlineRoundedIcon style={{ fontSize: "17px" }} />}
            label="edit"
            variant="outlined"
            className="me-3"
            clickable
          />
          <div className="me-3 px-3 py-2 event-name-chip-review">E-Summit</div>
          <Box component="fieldset" mb={1} borderColor="transparent">
            <Rating value="4.2" color="#1499fa" weight="19" readonly />
          </Box>
        </div>
      </div>

      <ReviewTextStyled className="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac neque ac
        eros luctus lacinia vel vitae lectus. Morbi porta est eros, eu venenatis
        nisi vestibulum vel.
      </ReviewTextStyled>
    </div>
  );
};

export default ReviewCard;
