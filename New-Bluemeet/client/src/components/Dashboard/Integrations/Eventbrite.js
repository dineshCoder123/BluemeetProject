import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Styles/IntegrationCard.scss";
import Eventbrite_logo from "./../../../assets/images/Eventbrite_integration.png";

import { makeStyles } from "@material-ui/core/styles";
import EventbritePrivateToken from "./Forms/EventbritePrivateToken";

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
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const Eventbrite = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <div className="integration-card-container px-4 py-3 mb-4">
        <div
          className=""
          style={{ display: "grid", gridTemplateColumns: "0.7fr 8fr 0.7fr" }}
        >
          <Avatar
            src={Eventbrite_logo}
            alt={"Eventbrite"}
            className={classes.large}
            variant="rounded"
          />
          <div>
            <div className="integration-name mb-2">Eventbrite</div>
            <div className="integration-short-description">
              Easily sync all of your eventbrite registrations to evenz and
              automate mailing link to participants for joining event.
            </div>
          </div>
          <div className="d-flex flex-row align-items-center" style={{ justifySelf: "end" }}>
          <button type="button" className="btn btn-primary btn-outline-text me-3" >Upgrade</button>
            <button
              onClick={() => {
                handleOpen();
              }}
              className="btn btn-outline-primary btn-outline-text"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <EventbritePrivateToken
        openDrawer={open}
        handleCloseDrawer={handleCloseDrawer}
      />
    </>
  );
};

export default Eventbrite;
