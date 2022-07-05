import React from "react";
import Faker from "faker";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@mui/material/Chip";

import "./../../../assets/Sass/TeamManagement.scss";
import "./../../../assets/Sass/DataGrid.scss";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { reduxForm } from "redux-form";
import Select from "react-select";
import { Field } from "redux-form";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import styled from "styled-components";
import { AvatarGroup } from "@mui/material";
import dateFormat from "dateformat";
import EditRole from "./../FormComponents/EditRole";

const EventReportIconBox = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) =>
    props && props.color ? props.color : "#538BF7"};
  color: #ffffff;
`;

const options = [
  { value: "MP000", label: "Assign all permissons" },
  { value: "MP001", label: "Add another member" },
  { value: "MP002", label: "View Transactions" },
  { value: "MP003", label: "Create Payout Link" },
  { value: "MP004", label: "Add Speakers" },
  { value: "MP005", label: "Add Booths" },
  { value: "MP006", label: "Add Sessions" },
  { value: "MP007", label: "Add New Ticket" },
  { value: "MP008", label: "View attendees details" },
  { value: "MP009", label: "Setup RTMP & Live Streaming" },
  { value: "MP0010", label: "View analytics data" },
  { value: "MP0011", label: "Export analytics data" },
  { value: "MP0012", label: "Customize and send attendee emails" },
  { value: "MP0013", label: "Customize and send booth emails" },
  { value: "MP0014", label: "Customize and send speaker emails" },
  { value: "MP0015", label: "change networking settings" },
  { value: "MP0016", label: "Setup Integrations" },
  { value: "MP0017", label: "add sponsors" },
  { value: "MP0018", label: "Publish events" },
  { value: "MP0019", label: "Create new event" },
  { value: "MP0020", label: "Change Billing Plan" },
  { value: "MP0021", label: "Reply to users queries" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
};

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderInput = ({
  input,
  meta,
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {renderError(meta)}
    </div>
  );
};

const renderEventPreferences = ({
  input,
  meta: { touched, error, warning },
  name,
}) => (
  <div>
    <div>
      <Select
        isMulti
        styles={styles}
        className="basic-multi-select"
        classNamePrefix="select"
        name={name}
        options={options}
        value={input.value}
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur()}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const showResults = (formValues) => {
  // await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(formValues, null, 2)}`);
};
const onSubmit = (formValues) => {
  console.log(formValues);

  // dispatch(editUser(ModifiedFormValues, file));
  showResults(formValues);
  alert(`You submitted:\n\n${JSON.stringify(formValues, null, 2)}`);
};

const renderAssignedToGroupAvatar = (members) => {
  return members.map((member) => {
    return (
      <Avatar
        alt={member.firstName + " " + member.lastName}
        src={
          member.image.startsWith("https://")
            ? member.image
            : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${member.image}`
        }
      />
    );
  });
};

const RolesDetailsCard = ({
  id,
  assignedTo,
  title,
  lastUpdatedByName,
  lastUpdatedByImage,
  lastUpdatedAt,
  handleSubmit,
  pristine,
  submitting,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpenDrawer = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  }

  const handleDeleteSession = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <div
        className="team-members-field-value-container"
        style={{ gridTemplateColumns: "1.8fr 2fr 1fr 1fr 1fr" }}
      >
        <div className="mx-5">
          <div className="d-flex flex-row  align-items-center">
            <EventReportIconBox className="me-3">
              <LabelRoundedIcon />
            </EventReportIconBox>
            {title}
          </div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label registrations-field-value-modified">
            <AvatarGroup max={4}>
              {typeof assignedTo !== "undefined" && assignedTo.length > 0 ? (
                renderAssignedToGroupAvatar(assignedTo)
              ) : (
                <Chip
                  label="Not assigned to anyone"
                  variant="outlined"
                  color="error"
                />
              )}
            </AvatarGroup>
          </div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {dateFormat(lastUpdatedAt)}
          </div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label registrations-field-value-modified">
            <Chip
              avatar={
                <Avatar src={lastUpdatedByImage} alt={lastUpdatedByName} />
              }
              label={lastUpdatedByName}
              variant="outlined"
            />
          </div>
        </div>

        <div className="event-registrations-field">
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            <div onClick={handleOpenDrawer}>
              <IconButton color="primary" aria-label="add to shopping cart">
                <EditRoundedIcon />
              </IconButton>
            </div>
            <div onClick={handleDeleteSession}>
              <IconButton color="secondary" aria-label="add to shopping cart">
                <DeleteRoundedIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Remove this Member."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to remove John Doe from your community team. Are you
            sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleCloseDeleteDialog}
            style={{ color: "#538BF7" }}
            autoFocus
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

     

      <EditRole open={openEdit} handleClose={handleCloseEdit} />
    </>
  );
};

export default reduxForm({
  form: "editTeamMemberPermissions",
})(RolesDetailsCard);
