import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Avatar, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { makeStyles } from "@material-ui/core/styles";
import { editTable } from "./../../../actions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Input = styled.input`
  &:focus {
    border: 1px solid #152d35 !important;
  }
  &:hover {
    border: 1px solid #152d35 !important;
  }
`;

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

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;
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

const renderInput = ({
  input,
  value,
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
        required
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const EditTable = ({
  open,
  handleClose,
  tableId,
  handleSubmit,
  pristine,
  submitting,
  reset,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const tableDetails = useSelector((state) =>
    state.eventTables.eventTables.find((table) => table.tableId === tableId)
  );

  const TableNum = tableId.slice(31) * 1 + 1;

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = (formValues) => {
    console.log(formValues);

    dispatch(editTable(formValues.title, tableId, file, priority));
  };

  const [priority, setPriority] = React.useState(
    tableDetails ? tableDetails.priority : "Logo"
  );
  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(
    `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${
      tableDetails ? tableDetails.image : "#"
    }`
  );

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <>
          <HeaderFooter className="form-heading-and-close-button mb-4 px-4 py-3">
            <div></div>
            <div className="coupon-overlay-form-headline">
              Edit table {TableNum}
            </div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>

          <form
            style={{ width: "580px" }}
            className="ui form error px-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row  d-flex align-items-center justify-content-center mb-4 px-3">
              <div className="p-0 d-flex flex-row justify-content-center">
                <Avatar
                  variant="rounded"
                  src={fileToPreview}
                  className={classes.large}
                />
              </div>
              <FormLabel htmlFor="communityHeadline">Logo</FormLabel>
              <Input
                name="logo"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-5">
              <FormLabel htmlFor="communityHeadline">Title</FormLabel>

              <Field
                name="title"
                type="text"
                classes="form-control"
                component={renderInput}
                ariadescribedby="tableTitle"
                placeholder="Enter title for this table."
                label="Table title"
              />
            </div>
            <FormControl component="fieldset" className="mb-4">
              <FormLabel component="legend">Which one to show ?</FormLabel>
              <RadioGroup
                row
                aria-label="priority"
                defaultValue={priority}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Logo"
                  control={
                    <Radio
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPriority("Logo");
                        }
                      }}
                    />
                  }
                  label="Logo"
                />
                <FormControlLabel
                  value="Title"
                  control={
                    <Radio
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPriority("Title");
                        }
                      }}
                    />
                  }
                  label="Title"
                />
              </RadioGroup>
            </FormControl>
            <div className="row edit-profile-form-row mb-3 d-flex flex-row justify-content-end px-0 mx-0">
              <button
                type="submit"
                className="col-3 btn btn-primary btn-outline-text"
                style={{ textAlign: "center" }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    title:
      state.eventTables.tableDetails && state.eventTables.tableDetails.title
        ? state.eventTables.tableDetails.title
        : "",
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "EditTableForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditTable)
);
