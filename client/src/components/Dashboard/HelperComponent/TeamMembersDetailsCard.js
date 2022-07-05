import React from "react";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import "./../../../assets/Sass/TeamManagement.scss";
import "./../../../assets/Sass/DataGrid.scss";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { reduxForm } from "redux-form";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { removeFromTeam } from "./../../../actions";

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormHeading = styled.div`
  font-size: 1.1rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: #212121;
`;

const TeamManagementDetailsCard = ({
  image,
  name,
  position,
  email,
  status,
  handleSubmit,
  pristine,
  submitting,
}) => {
  const dispatch = useDispatch();

  const params = useParams();

  const communityId = params.id;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Determine if currently logged in user is the community super admin

  const { superAdmin } = useSelector(
    (state) => state.community.communityDetails
  );

  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  const isSuperAdmin =
    superAdmin.toString() === userId.toString() ? true : false;

  return (
    <>
      <div
        className="team-members-field-value-container"
        style={{ gridTemplateColumns: "2fr 2fr 2fr 1fr 1fr" }}
      >
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5 d-flex flex-row ">
            {/* attendee avatar and name */}
            <Avatar alt={name} src={image} variant="rounded" />
            <div className="ms-3 px-2 registration-name-styled">{name}</div>
          </div>
        </div>
        <div className="registrations-name-field">
          <div className="registrations-field-label  ">
            <Chip label={position} variant="outlined" />
          </div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {email}
            {/* attendee email */}
          </div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {position === "Super admin" ? (
              "-----"
            ) : status === "Pending" ? (
              <Chip label={status} color="primary" />
            ) : (
              <Chip label={status} color="success" />
            )}
          </div>
        </div>
        <div className="event-registrations-field">
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            <div>
              {position === "Super admin" ? (
                <></>
              ) : (
                <IconButton
                  disabled={!isSuperAdmin}
                  onClick={() => {
                    setOpenDeleteDialog(true);
                  }}
                  color="secondary"
                  aria-label="add to shopping cart"
                >
                  <DeleteRoundedIcon />
                </IconButton>
              )}
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
        <HeaderFooter className="px-4 py-3">
          <FormHeading>Remove this member.</FormHeading>
        </HeaderFooter>

        <DialogContent>
          <DialogContentText>
            You are about to remove {name ? name : email} from your community
            team. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <button
            className="btn btn-outline-dark btn-outline-text me-3"
            onClick={handleCloseDeleteDialog}
          >
            Cancel
          </button>
          <button
            className="btn btn-outline-text btn-primary"
            onClick={() => {
              handleCloseDeleteDialog();
              dispatch(removeFromTeam(email, communityId, status));
            }}
          >
            Proceed
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default reduxForm({
  form: "editTeamMemberPermissions",
})(TeamManagementDetailsCard);
