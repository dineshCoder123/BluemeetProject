import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { withStyles } from "@material-ui/core/styles";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { IconButton } from "@material-ui/core";
import ShowKeys from "../ShowKeysPopup";
import DeleteAPIKey from "../Forms/DeleteApiKey";
import { updateAPIKey } from "../../../../actions";

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

const ApiKeysDetailsCard = ({
  isEnabled,
  createdAt,
  label,
  APIKey,
  APISecret,
  createdBy,
  communityId,
  id,
}) => {
  const dispatch = useDispatch();

  const [showKeys, setShowKeys] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseShowKeys = () => {
    setShowKeys(false);
  };

  const [checked, setChecked] = React.useState(isEnabled);
  const handleChange = () => {
    dispatch(updateAPIKey(id, !checked));
    setChecked(!checked);
  };

  return (
    <>
      <div
        className="events-list-fields-container"
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "1.5fr 2fr 2fr 1fr 0.3fr",
        }}
      >
        <div className="event-card-field">
          <div className="event-field-label">{label}</div>
        </div>
        <div className="">
          <div className="event-field-label registrations-field-value-modified">
            {APIKey}
          </div>
        </div>
        <div className="event-visibility-field">
          <div className="event-field-label registrations-field-value-modified">
            <button
              onClick={() => {
                setShowKeys(true);
              }}
              className="btn btn-outline-primary btn-outline-text"
            >
              Show
            </button>
          </div>
        </div>
        <div className="event-status-field">
          <div className="event-field-label registrations-field-value-modified">
            {" "}
            <FormGroup row>
              <FormControlLabel
                control={
                  <RoyalBlueSwitch
                    checked={checked}
                    onChange={handleChange}
                    name="mailchimpSwitch"
                  />
                }
              />
            </FormGroup>
          </div>
        </div>
        <div className="event-views-field">
          <div className="event-field-label">
            <IconButton
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <ShowKeys
        open={showKeys}
        handleClose={handleCloseShowKeys}
        APISecret={APISecret}
        APIKey={APIKey}
      />
      <DeleteAPIKey
      id={id}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
    </>
  );
};

export default ApiKeysDetailsCard;
