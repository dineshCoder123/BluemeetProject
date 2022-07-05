import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import "./../../../Styles/root.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// import "semantic-ui-css/semantic.min.css";
import { Popup } from "semantic-ui-react";

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

const PeopleGridAvatar = ({
  image,
  name,
  designation,
  organisation,
  city,
  country,
}) => {
  const classes = useStyles();

  return (
    <>
      <div>
        <Popup
          hoverable={true}
          trigger={
            <div style={{ display: "inline-block" }}>
              <Avatar
                alt={name}
                src={image}
                variant="rounded"
                className={classes.large}
              />
            </div>
          }
          position="bottom left"
          content={
            <span>
              <div className="d-flex flex-row align-items-center">
                <Avatar
                  alt={name}
                  src={image}
                  variant="rounded"
                  className={classes.large}
                />
                <div className="ms-3">
                  <div
                    className="btn-outline-text"
                    style={{ fontSize: "14px" }}
                  >
                    {name}
                  </div>
                  <div className="people-headline">
                    {designation} at {organisation}
                  </div>
                  <div className="people-location">
                    {city}, {country}
                  </div>
                </div>
              </div>
            </span>
          }
        />
      </div>
    </>
  );
};

export default PeopleGridAvatar;
