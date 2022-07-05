import React, { useState } from "react";
import "./../Style/uploadEventImage.scss";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  errorTrackerForUploadEventImage,
  uploadEventImage,
} from "../../../../actions";
import { reduxForm } from "redux-form";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader";
import { useSnackbar } from "notistack";

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

const UploadEventImageForm = (props) => {
  const { handleSubmit } = props;

  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading, eventDetails } = useSelector(
    (state) => state.event
  );

  const classes = useStyles();

  const params = useParams();

  const id = params.id;
  const event = useSelector((state) => {
    return state.event.events.find((event) => {
      return event.id === id;
    });
  });
  let imgKey;
  let imgUrl = "#";
  if (event) {
    imgKey = event.image;
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
  const onSubmit = (formValues) => {
    console.log(formValues);

    dispatch(uploadEventImage(file, id));

    console.log(file);
  };

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

  if (error) {
    enqueueSnackbar(error, {
      variant: "error",
    });
    return dispatch(errorTrackerForUploadEventImage());
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <button
            disabled={eventDetails.status === "Ended" ? true : false}
            type="submit"
            className="btn btn-outline-primary btn-outline-text"
            style={{ width: "100%" }}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    imgUrl:
      state.event.eventDetails && state.event.eventDetails.image
        ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${state.event.eventDetails.image}`
        : " #",
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "uploadEventImage",

    enableReinitialize: true,
    destroyOnUnmount: false,
  })(UploadEventImageForm)
);
