import React, { useState } from "react";
import Faker from "faker";
import { Avatar } from "@material-ui/core";

import "./../../../Styles/root.scss";
import { makeStyles } from "@material-ui/core";
import ReportActions from "../Sub/ReportActions";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

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
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const ModerationPeopleList = () => {
  const [openActions, setOpenActions] = useState(false);

  const handleOpenActions = () => {
    setOpenActions(true);
  };
  const handleCloseActions = () => {
    setOpenActions(false);
  };

  const classes = useStyles();
  return (
    <>
      <div className="people-container pt-2 px-2" style={{ height: "75vh" }}>
        <div className="ui icon input mb-3" style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Search people..."
            className="form-control"
          />
          <SearchRoundedIcon
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              color: "#757575",
            }}
          />
        </div>
        {/* <div className="search-box-and-view-switch-container d-flex flex-row justify-content-between mb-3"></div> */}

        <div className="scrollable-chat-element-container">
          <div className="alert-element-container px-2 py-2 mb-3">
            <div className="p-2 d-flex flex-row  align-items-center mb-2">
              <Avatar
                src={Faker.image.avatar()}
                alt="host-name"
                variant="rounded"
                className={classes.large}
              />
              <div className="ms-3">
                <div className="d-flex flex-row align-items-center">
                  <div></div>
                  <div className="alert-from-text me-1">
                    {Faker.name.findName()}
                  </div>
                </div>
                <div className="alert-text">CEO at App Brewery</div>
              </div>
            </div>

            <button
              onClick={() => {
                handleOpenActions();
              }}
              className="btn btn-outline-text btn-outline-primary"
              style={{ width: "100%" }}
            >
              Take action
            </button>
          </div>
        </div>
      </div>

      <ReportActions open={openActions} handleClose={handleCloseActions} />
    </>
  );
};

export default ModerationPeopleList;
