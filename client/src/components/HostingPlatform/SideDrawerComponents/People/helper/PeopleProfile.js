import React, { useState } from "react";
import { Avatar, Dialog, IconButton } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";

import "./../../../Styles/peopleProfile.scss";
import Faker from "faker";
import Ripple from "../../../../ActiveStatusRipple";
import ScheduleOneToOneCallForm from "../../Chat/Sub/ScheduleOneToOneCallForm";

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

const PeopleProfile = ({ open, handleClose }) => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenScheduleForm = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

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
        <div className="people-profile-container p-3" style={{minWidth: "480px"}}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.05rem",
                color: "#212121",
              }}
            >
              Profile
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

          <div className="" style={{ width: "100%" }}>
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 5fr 1fr",
                  gridGap: "24px",
                }}
                className="mb-3"
              >
                <Avatar
                  alt={Faker.name.findName()}
                  src={Faker.image.avatar()}
                  className={`${classes.large} mb-3`}
                  variant="rounded"
                  // style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <div>
                  <div className="btn-outline-text mb-2">
                    {Faker.name.findName()}
                  </div>

                  <div
                    style={{
                      fontWeight: "500",
                      color: "#3B3B3B",
                      fontSize: "0.8rem",
                      // textAlign: "center",
                    }}
                    className="mb-3"
                  >
                    Product Manager, Evenz
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

                <div
                  style={{
                    backgroundColor: "#94949436",
                    width: "fit-content",
                    borderRadius: "5px",
                    alignSelf: "center",
                  }}
                  className="px-2 py-2"
                >
                  <ChatBubbleRoundedIcon className="chat-msg-hover-icon" />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 5fr 1fr",
                  gridGap: "24px",
                }}
              >
                <div></div>

                <div>
                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Ubuntu",
                      color: "#212121",
                      fontSize: "0.95rem",
                    }}
                    className={"mb-3"}
                  >
                    Headline
                  </div>

                  <div
                    style={{
                      fontWeight: "400",
                      fontFamily: "Ubuntu",
                      color: "#4D4D4D",
                      fontSize: "0.9rem",
                    }}
                  >
                    Hi there! I am attending evenz event.
                  </div>
                </div>

                <div></div>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                <div className="shareon-icon p-3 me-3">
                  <a
                    href="https://www.facebook.com/pages/?category=your_pages&ref=bookmarks"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton>
                      <FacebookIcon
                        style={{ fontSize: "20", fill: "#1760A8" }}
                      />
                    </IconButton>
                  </a>
                </div>
                <div className="shareon-icon p-3 me-3">
                  <a
                    href="https://www.linkedin.com/company/evenz-in"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton>
                      <LinkedInIcon
                        style={{ fontSize: "20", fill: "#2565A5" }}
                      />
                    </IconButton>
                  </a>
                </div>

                <div className="shareon-icon p-3 me-3">
                  <a
                    href="https://twitter.com/EvenzOfficial"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton>
                      <TwitterIcon
                        style={{ fontSize: "20", fill: "#539FF7" }}
                      />
                    </IconButton>
                  </a>
                </div>

                <div className="shareon-icon p-3 me-3">
                  <a
                    href="https://www.instagram.com/evenzofficial/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton>
                      <Instagram style={{ fontSize: "20", fill: "#841E8D" }} />
                    </IconButton>
                  </a>
                </div>
              </div>

              {/* <div>
                <button className="btn btn-outline-primary btn-outline-text me-3">
                  Schedule a meet
                </button>
                <button className="btn btn-primary btn-outline-text">
                  Start conversation
                </button>
              </div> */}

              
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
                          handleOpenScheduleForm();
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
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PeopleProfile;
