import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./../../../../../../Dashboard/EditEvent/Style/uploadEventImage.scss";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { connect, useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import Loader from "../../../../../../Loader";
import {
  uploadBoothPromoImage,
  showSnackbar,
  resetPromoImageUploadPercent,
} from "../../../../../../../actions";

const ProgressContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: #dadada;
  border-radius: 10px;
`;

const ProgressFill = styled.div`
  height: 40px;
  background-color: #47d188;
  border-radius: 10px;
`;

const ProgressText = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #000000;
  padding-left: 32px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(50),
    height: theme.spacing(30),
  },
}));

const UploadBoothPromoImageForm = (props) => {
  const { handleSubmit } = props;

  const { isLoading, boothDetails } = useSelector((state) => state.booth);

  const { currentBoothId, uploadPromoImagePercent } = useSelector(
    (state) => state.booth
  );

  const classes = useStyles();

  let imgKey;
  let imgUrl = "#";
  if (boothDetails) {
    imgKey = boothDetails.promoImage;
    if (imgKey) {
      imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
    }
  }

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(imgUrl);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPromoImageUploadPercent());
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ width: "100%", height: "100%" }}
      >
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  return (
    <>
      <div className="event-image-form-wrapper px-4 py-4">
        <label for="eventName" className="form-label form-label-customized">
          Promo image
        </label>
        <div className="my-2">
          <Avatar
            alt="Remy Sharp"
            src={fileToPreview}
            variant="rounded"
            className={classes.large}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "15px",
            fontWeight: "regular",
            color: "#5C5C5C",
          }}
        >
          <small>Optimal ratio (400/240px)</small>
        </div>
        <input
          name="imgUpload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="form-control my-3"
          style={{ fontSize: "14px", fontWeight: "bold", color: "#5C5C5C" }}
          required
        />

        {uploadPromoImagePercent !== 0 ? (
          <ProgressContainer>
            <ProgressFill
              style={{
                width: `${
                  uploadPromoImagePercent ? `${uploadPromoImagePercent}%` : "0%"
                }`,
              }}
              className="d-flex flex-row align-items-center py-2"
            >
              <ProgressText>
                {uploadPromoImagePercent &&
                uploadPromoImagePercent * 1 > 1.2 ? (
                  `${(uploadPromoImagePercent * 1).toFixed(2)}%`
                ) : (
                  <div className="py-2">
                    <div class="spinner-border text-dark" role="status"></div>
                  </div>
                )}
              </ProgressText>
            </ProgressFill>
          </ProgressContainer>
        ) : (
          <button
            onClick={() => {
              if (file) {
                dispatch(uploadBoothPromoImage(file, currentBoothId));
              } else {
                dispatch(
                  showSnackbar("warning", "Please select an image to update")
                );
              }
            }}
            className="btn btn-outline-primary btn-outline-text"
            style={{ width: "100%" }}
          >
            Upload
          </button>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    imgUrl:
      state.booth.boothDetails && state.booth.boothDetails.promoImage
        ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${state.booth.boothDetails.promoImage}`
        : " #",
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "uploadBoothPromoImage",
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(UploadBoothPromoImageForm)
);
