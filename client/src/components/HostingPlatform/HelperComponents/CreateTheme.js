import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { IconButton } from "@material-ui/core";
import { TwitterPicker } from "react-color";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateEventCustomisation, showSnackbar } from "./../../../actions";

const CreateTheme = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const params = useParams();
  const dispatch = useDispatch();

  const eventId = params.eventId;

  const { eventDetails } = useSelector((state) => state.event);

  const [color, setColor] = useState(eventDetails.color);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="px-4 py-3" style={{ width: "420px" }}>
          <div className="form-heading-and-close-button mb-4">
            <div></div>
            <div className="coupon-overlay-form-headline">Customize theme</div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label form-label-customized">Color</label>
            <div
              className="theme-color-preview mb-3"
              style={{ backgroundColor: color }}
            ></div>
            <TwitterPicker
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          </div>

          <button
            onClick={() => {
              if (!color)
                dispatch(showSnackbar("warning", "Invalid theme color."));
              dispatch(updateEventCustomisation({ color: color }, eventId));
            }}
            className="btn btn-outline-primary btn-outline-text"
            style={{ width: "100%" }}
          >
            Create theme
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default CreateTheme;
