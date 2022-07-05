import React from "react";
import Box from "@material-ui/core/Box";
import Rating from "react-star-rating-lite";
import Avatar from "@material-ui/core/Avatar";
import "./../../../assets/Sass/Reviews.scss";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

const ReviewCard = ({
  showVisibilityToggle,
  image,
  name,
  rating,
  reviewComment,
  id,
  hidden,
}) => {
  return (
    <div className="review-card-wrapper px-4 py-3 mb-3">
      <div className="user-name-event-and-star-rating-row d-flex flex-row justify-content-between mb-3">
        <div className=" d-flex flex-row align-items-center">
          <Avatar alt="Travis Howard" src={image} />
          <div className="ms-3 px-2 registration-name-styled">{name}</div>
        </div>

        <div className="d-flex flex-row align-items-center">
          {showVisibilityToggle ? (
            <>
              {hidden ? (
                <button className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center me-3">
                  <RemoveRedEyeRoundedIcon
                    style={{ fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  <span>Show</span>
                </button>
              ) : (
                <button className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center me-3">
                  <VisibilityOffRoundedIcon
                    style={{ fontSize: "20px" }}
                    className="me-2"
                  />{" "}
                  <span>Hide</span>
                </button>
              )}
            </>
          ) : (
            <></>
          )}

          <Box component="fieldset" mb={1} borderColor="transparent">
            <Rating value={rating} color="#1499fa" weight="19" readonly />
          </Box>
        </div>
      </div>

      <div className="review-text-dashboard">{reviewComment}</div>
    </div>
  );
};

export default ReviewCard;
