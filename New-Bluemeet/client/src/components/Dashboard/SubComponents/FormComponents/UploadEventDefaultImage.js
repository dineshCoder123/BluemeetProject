import React, { useState } from "react";
import "./../../EditEvent/Style/uploadEventImage.scss";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { connect, useDispatch, useSelector } from "react-redux";
// import { errorTrackerForUploadEventImage, uploadEventImage } from "../../../../actions";
import { reduxForm } from "redux-form";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader";

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



const UploadEventDefaultImageForm = (props) => {
  const { handleSubmit } = props;

  const {error, isLoading} = useSelector((state) => state.event);

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
  if(event) {
    imgKey = event.image;
    if (imgKey) {
      imgUrl = `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${imgKey}`;
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

    // dispatch(uploadEventImage(file, id));

    console.log(file);
  };

  if(isLoading) {
    return (<div className="d-flex flex-row align-items-center justify-content-center" style={{width: "100%", height: "80vh"}}> <Loader/> </div>);
  }

  if(error) {
    // dispatch(errorTrackerForUploadEventImage());
    alert(error);
    return;
  }

  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="event-image-form-wrapper py-4" style={{maxWidth: "400px"}}>
          <label for="eventName" className="form-label form-label-customized">
            Event image
          </label>
          <div className="my-2">
            <Avatar
              alt={"Event Banner"}
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
            <small>Optimal aspect ratio 4:3 (320/240px)</small>
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
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    imgUrl:
     state.event.eventDetails && state.event.eventDetails.image
        ? `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${state.event.eventDetails.image}`
        : " #",
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "uploadEventDefaultImage",

    enableReinitialize: true,
    destroyOnUnmount: false,
  })(UploadEventDefaultImageForm)
);
