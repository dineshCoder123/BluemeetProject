import React, { useState } from "react";
import "./../../Styles/videoCallOptions.css";
import Faker from "faker";
import { Avatar, Dialog, IconButton } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Ripple from "../../../../ActiveStatusRipple";
import ScheduleOneToOneCallForm from "./ScheduleOneToOneCallForm";

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
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const VideoCallOptions = ({ open, handleClose }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="video-call-options-container p-3">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.05rem",
                color: "#212121",
              }}
            >
              Start or schedule meet
            </span>
            <IconButton
              onClick={() => {
                handleCloseDrawer();
                handleClose();
              }}
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </div>

          <div>
            <hr />
          </div>

          <div
            className="mb-4"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div className="d-flex flex-column align-items-center">
              <Avatar
                alt={Faker.name.findName()}
                src={Faker.image.avatar()}
                className={`${classes.large} mb-3`}
                variant="rounded"
              />
              <div className="btn-outline-text mb-3">
                {Faker.name.findName()}
              </div>
              <div
                className="d-flex flex-row align-items-center event-field-label field-label-value"
                style={{
                  color: "#75BF72",
                  fontFamily: "Ubuntu",
                  fontSize: "0.8rem",
                }}
              >
                <Ripple /> Active{" "}
              </div>
            </div>
            <div>
              <AddCircleRoundedIcon style={{ fill: "#538BF7" }} />
            </div>
            <div className="d-flex flex-column align-items-center">
              <Avatar
                alt={Faker.name.findName()}
                src={Faker.image.avatar()}
                className={`${classes.large} mb-3`}
                variant="rounded"
              />
              <div className="btn-outline-text mb-3">{"You"}</div>
            </div>
          </div>

            <div>
              <div
                className=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "20px",
                }}
              >
                {/* Start instant meet */}
                <div className="mb-3">
                  <button
                    style={{ width: "100%" }}
                    className="btn btn-primary btn-outline-text"
                  >
                    Start instant meet
                  </button>
                </div>

                {/* Schedule for later */}
                <div className="mb-3">
                  <button
                    onClick={() => {
                      handleOpenDrawer();
                    }}
                    style={{ width: "100%" }}
                    className="btn btn-outline-primary btn-outline-text"
                  >
                    Schedule for later
                  </button>
                </div>
              </div>
            </div>
         

              <ScheduleOneToOneCallForm
                handleCloseDrawer={handleCloseDrawer}
                openDrawer={openDrawer}
              />
            
        </div>
        {/* dialog for choosing between instant meet or schedule for later */}
      </Dialog>
    </>
  );
};

export default VideoCallOptions;
