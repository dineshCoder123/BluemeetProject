import React from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { reduxForm, Field } from "redux-form";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createMail, showSnackbar } from "./../../../../../actions";

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.75rem;
  color: #4e4e4e;
`;

const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #727272 !important;
`;
const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormHeading = styled.div`
  font-size: 1.2rem;
  font-family: "Ubuntu";
  font-weight: 600;
  color: #212121;
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

const Heading = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const renderInput = ({
  input,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
  open,
  handleClose,
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
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const CreateEmail = ({ open, handleClose, handleSubmit }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params.id;

  const onSubmit = (formValues) => {
    if (!formValues.name || !formValues.subject) {
      dispatch(
        showSnackbar("warning", "Template name & Subject are required.")
      );
      return;
    }

    dispatch(createMail(formValues, eventId, handleClose));
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="d-flex flex-row align-items-center justify-content-between p-3">
            <Heading className="">Create Mail Template</Heading>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <CancelRoundedIcon />
            </IconButton>
          </HeaderFooter>

          <DialogContent className="py-4">
            {/* Here write main content */}
            <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <FormLabel className="mb-2">Template Name</FormLabel>

                <Field
                  name="name"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="Speakers Annoucement"
                  component={renderInput}
                />
              </div>
              <div className=" mb-4">
                <FormLabel className="mb-2">Subject</FormLabel>

                <Field
                  type="text"
                  name="subject"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="e.g. Announcing New speaker line up"
                  component={renderInput}
                />
              </div>
              <div className="py-3">
                <DialogActions>
                  <button
                    type="submit"
                    className="btn btn-primary btn-outline-text"
                  >
                    Create Mail Template
                  </button>
                </DialogActions>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};
  console.log(formValues.name);
  if (!formValues.name) {
    errors.name = "Template Name is required";
  }

  if (!formValues.subject) {
    errors.subject = "Subject is required";
  }
  return errors;
};

export default reduxForm({
  form: "createEmailForm",
  validate,
})(CreateEmail);
