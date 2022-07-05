import React from "react";
import { IconButton } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewInvitation } from "../../../actions";

const Paper = styled.div`
  width: 400px !important;
`;

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

const AddNewMember = ({
  open,
  handleClose,
  handleSubmit,
  pristine,
  submitting,
}) => {
  const params = useParams();

  const communityId = params.id;
  const userId = params.userId;

  const { invitations, communityManagers } = useSelector(
    (state) => state.community
  );

  const { superAdminEmail } = useSelector(
    (state) => state.community.communityDetails
  );

  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    const newArray = invitations
      .map((el) => el.invitedUserEmail)
      .concat(communityManagers.map((el) => el.email));

    if (
      formValues.email === superAdminEmail ||
      newArray.includes(formValues.email)
    ) {
      alert("already in this community!");
      handleClose();
    } else {
      dispatch(
        createNewInvitation({ userId: userId, email: formValues.email })
      );
      handleClose();
      window.location.reload();
    }
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
        >
          <Paper className="registration-more-details-right-drawer px-4 py-4">
            <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between">
              <div className="side-drawer-heading">Add New Member</div>
              <div
                onClick={() => {
                  handleClose();
                }}
              >
                <IconButton aria-label="close-drawer">
                  <CancelOutlinedIcon
                    style={{ fontSize: "26", color: "#4D4D4D" }}
                  />
                </IconButton>
              </div>
            </div>
            <div className="my-3">
              <hr />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
              <div className="side-drawer-more-details-content-section">
                <div className="row  mb-3">
                  <div className="">
                    <label
                      for="communityHeadline"
                      className="form-label form-label-customized"
                    >
                      E-mail
                    </label>
                    <Field
                      name="email"
                      type="email"
                      classes="form-control"
                      component={renderInput}
                      ariadescribedby="emailHelp"
                      placeholder="johndoe@gmail.com"
                      label="Email"
                    />
                  </div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-outline-text"
                  style={{ width: "100%" }}
                  disabled={pristine || submitting}
                >
                  Add New Member
                </button>
              </div>
            </form>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default reduxForm({
  form: "addNewMemberForm",
})(AddNewMember);
