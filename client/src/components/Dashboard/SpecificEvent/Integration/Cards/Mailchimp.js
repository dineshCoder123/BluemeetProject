import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./../../../Integrations/Styles/IntegrationCard.scss";
import MailchimpConfigure from "../Forms/MailchimpConfigure";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { makeStyles } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchMailChimpAudiences } from "../../../../../actions/index";
import DisableMailchimp from "./../DisableConfirmation/DisableMailchimp";

import { useParams } from "react-router-dom";
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

const RoyalBlueSwitch = withStyles({
  switchBase: {
    color: "#538BF7",
    "&$checked": {
      color: "#3474F3",
    },
    "&$checked + $track": {
      backgroundColor: "#145DF0",
    },
  },
  checked: {},
  track: {},
})(Switch);

const Mailchimp = () => {
  const params = useParams();
  const eventId = params.id;

  const {eventDetails} = useSelector((state) => state.event);

  // isMailchimpEnabled

  console.log(eventId, "I am counting on you eventId");
  const [open, setOpen] = useState(false);
  const [openDisable, setOpenDisable] = React.useState(false);

  const handleCloseDisable = () => {
    setOpenDisable(false);
  }

  const dispatch = useDispatch();
  const handleChange = () => {
    if (!eventDetails.isMailchimpEnabled) {
      dispatch(fetchMailChimpAudiences(eventId));
      setOpen(true);
    }
    else {
      setOpenDisable(true);
      // show a confirmation to ask if user wants to disconnect mailchimp for this event.
    }
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
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 8fr 3.5fr",
            gridGap: "24px",
          }}
        >
          <Avatar
            src={"https://www.drupal.org/files/project-images/MC_Logo.jpg"}
            alt={"Mailchimp"}
            className={classes.large}
            variant="rounded"
          />

          <div>
            <div className="integration-name mb-2">Mailchimp</div>
            <div className="integration-short-description">
              It allows to push Bluemeet registrants to your mailchimp account.
            </div>
          </div>

          <div
            className="d-flex flex-row align-items-center"
            style={{ justifySelf: "end" }}
          >
            <React.Fragment>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <RoyalBlueSwitch
                      checked={eventDetails.isMailchimpEnabled}
                      onChange={handleChange}
                      name="mailchimpSwitch"
                    />
                  }
                />
              </FormGroup>
              <div
                style={{
                  color: "#212121",
                  fontFamily: "Ubuntu",
                  fontWeight: "500",
                }}
              >
                {eventDetails.isMailchimpEnabled ? "Disable" : "Enable"}
              </div>
            </React.Fragment>
          </div>
        </div>
      </div>
      <MailchimpConfigure
        openDrawer={open}
        handleCloseDrawer={handleCloseDrawer}
      />

      <DisableMailchimp open={openDisable} handleClose={handleCloseDisable} />
    </>
  );
};

export default Mailchimp;
