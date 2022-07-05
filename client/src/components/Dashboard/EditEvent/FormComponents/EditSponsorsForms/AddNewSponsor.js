import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Select from "react-select";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  createSponsor,
  errorTrackerForCreateSponsor,
} from "../../../../../actions";
import Loader from "../../../../Loader";
import { SwipeableDrawer } from "@material-ui/core";

import styled from 'styled-components';

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
`;


const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #727272 !important;
  margin-bottom: 5px;
`;
const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormError = styled.div`
  font-family: "Ubuntu";
  color: red;
  font-weight: 400;
  font-size: 0.8rem;
`;

const FormWarning = styled.div`
  font-family: "Ubuntu";
  color: orange;
  font-weight: 400;
  font-size: 0.8rem;
`;

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    display: "flex",
    minHeight: "76.5vh",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const renderInput = ({
  input,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <StyledInput
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {touched &&
        ((error && (
          <FormError className="my-1">
            {error}
          </FormError>
        )) ||
          (warning && (
            <FormWarning
              className="my-1"
            >
              {warning}
            </FormWarning>
          )))}
    </div>
  );
};

const renderReactSelect = ({
  isMulti,
  input,
  meta: { touched, error, warning },
  styles,
  menuPlacement,
  options,
  defaultValue,

  name,
}) => (
  <div>
    <div>
      <Select
        isMulti={isMulti}
        defaultValue={defaultValue}
        styles={styles}
        menuPlacement={menuPlacement}
        name={name}
        options={options}
        value={input.value}
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur()}
      />
      {touched &&
        ((error && (
          <FormError className="my-1">
            {error}
          </FormError>
        )) ||
          (warning && (
            <FormWarning
              className="my-1"
            >
              {warning}
            </FormWarning>
          )))}
    </div>
  </div>
);
const AddNewSponsor = ({open, handleClose, handleSubmit}) => {
  const { error, isLoading } = useSelector((state) => state.sponsor);
  const params = useParams();
  const id = params.id;

  const sponsorCategoryOptions = [
    { value: "Diamond", label: "Diamond" },
    { value: "Platinum", label: "Platinum" },
    { value: "Gold", label: "Gold" },
    { value: "Bronze", label: "Bronze" },
  ];

  const classes = useStyles();

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(null);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.organisationName = formValues.organisationName;
    ModifiedFormValues.website = formValues.website;
    ModifiedFormValues.status = formValues.status.value;

    dispatch(createSponsor(ModifiedFormValues, file, id));

    // showResults(ModifiedFormValues);
  //  handleClose();
  };

  if (isLoading) {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ width: "100%", height: "80vh" }}
      >
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  if (error) {
    dispatch(errorTrackerForCreateSponsor());
    alert(error);
    return;
  }

  return (
    <>
     

<React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >

          <>

          <HeaderFooter className="form-heading-and-close-button mb-4 pt-3 px-4">
              <div></div>
              <div className="coupon-overlay-form-headline">
                Add New Sponsor
              </div>
              <div
                className="overlay-form-close-button"
                onClick={handleClose}
              >
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>

        <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
          <div className="create-new-coupon-form px-4 py-4">
            

            <div className="p-0 d-flex flex-row justify-content-center">
              <Avatar
                children=""
                alt="Travis Howard"
                src={fileToPreview}
                className={classes.large}
                variant="rounded"
              />
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="communityHeadline"
              >
                Logo
              </FormLabel>
              <input
                name="imgUpload"
                type="file"
                accept="image/*"
                className="form-control"
                onChange={onFileChange}
                required
              />
            </div>

            <div className="mb-3 overlay-form-input-row ">
              <div>
                <FormLabel
                  Forhtml="eventStartDate"
                 
                >
                  Organisation Name
                </FormLabel>
                <Field
                  name="organisationName"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="Google Inc."
                  component={renderInput}
                />
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="communityName"
                
              >
                Select Category
              </FormLabel>
              <Field
                name="status"
                placeholder="category"
                styles={styles}
                menuPlacement="top"
                options={sponsorCategoryOptions}
                component={renderReactSelect}
              />
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="communityName"
                className="form-label form-label-customized"
              >
                Website
              </FormLabel>
              <div className="form-group">
                <Field
                  name="website"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="www.myDomain.com"
                  component={renderInput}
                />
              </div>
            </div>

            <div style={{ width: "100%" }} className="pb-3">
              <button
                type="submit"
                className="btn btn-primary btn-outline-text"
                style={{ width: "100%" }}
              >
                Add New Sponsor
              </button>
            </div>
          </div>
        </form>


        </>
        </SwipeableDrawer>
        </React.Fragment>
      
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.organisationName) {
    errors.organisationName = "Organisation name is required";
  }

  if (!formValues.status) {
    errors.status = "Sponsor status is required";
  }
  if (!formValues.website) {
    errors.website = "website or any social link is required";
  }

  return errors;
};

export default reduxForm({
  form: "newSponsorAddForm",
  validate,
})(AddNewSponsor);
