import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useDispatch, useSelector, connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  editProduct,
  fetchBoothProduct,
} from "../../../../../../../../actions";
import { SwipeableDrawer } from "@material-ui/core";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
`;

const StyledTextArea = styled.textarea`
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
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const renderTextArea = ({
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
      <StyledTextArea
        rows="2"
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

const EditProduct = ({ open, handleClose, handleSubmit, reset, id }) => {
  const classes = useStyles();
  const params = useParams();
  const eventId = params.eventId;

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  let { productDetails, currentBoothId } = useSelector((state) => state.booth);

  productDetails = useSelector((state) =>
    state.booth.products.find((el) => el._id === id)
  );

  let imgKey;

  if (productDetails) {
    imgKey = productDetails.image;
  }

  let imgUrl = "#";
  if (imgKey) {
    imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
  }
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(imgUrl);

  const onSubmit = (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.name = formValues.name;
    ModifiedFormValues.link = formValues.link;
    ModifiedFormValues.description = formValues.description;

    dispatch(
      editProduct(
        ModifiedFormValues,
        file,
        currentBoothId,
        eventId,
        id,
        handleClose
      )
    );
  };

  useEffect(() => {
    dispatch(fetchBoothProduct(id));
  }, []);

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer anchor="right" open={open}>
          <>
            <HeaderFooter className="form-heading-and-close-button mb-4 px-4 pt-3">
              <div></div>
              <div className="coupon-overlay-form-headline">
                Edit Product Details
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
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
                    alt={productDetails && productDetails.name}
                    src={fileToPreview}
                    className={classes.large}
                    variant="rounded"
                  />
                </div>

                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    for="communityHeadline"
                    className="form-label form-label-customized"
                  >
                    Image
                  </FormLabel>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3 overlay-form-input-row ">
                  <div>
                    <FormLabel
                      Forhtml="eventStartDate"
                      className="form-label form-label-customized"
                    >
                      Name
                    </FormLabel>
                    <Field
                      name="name"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="e.g. Toonly"
                      component={renderInput}
                    />
                  </div>
                </div>

                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    Forhtml="eventStartDate"
                    className="form-label form-label-customized"
                  >
                    Description
                  </FormLabel>
                  <div className="form-group">
                    <Field
                      name="description"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="Description of this booth"
                      component={renderTextArea}
                    />
                  </div>
                </div>

                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    Forhtml="eventStartDate"
                    className="form-label form-label-customized"
                  >
                    CTA Link
                  </FormLabel>
                  <div className="form-group">
                    <Field
                      name="link"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="Product / Service link"
                      component={renderInput}
                    />
                  </div>
                </div>

                <div
                  style={{ width: "100%" }}
                  className="d-flex flex-row justify-content-end"
                >
                  <button
                    className="btn btn-outline-primary btn-outline-text me-3"
                    onClick={reset}
                  >
                    Discard
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary btn-outline-text"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Save Changes
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

const mapStateToProps = (state) => ({
  initialValues: {
    image:
      state.booth.productDetails && state.booth.productDetails.image
        ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${state.booth.productDetails.image}`
        : " #",
    name:
      state.booth.productDetails && state.booth.productDetails.name
        ? state.booth.productDetails.name
        : "",
    link:
      state.booth.productDetails && state.booth.productDetails.link
        ? state.booth.productDetails.link
        : "",
    description:
      state.booth.productDetails && state.booth.productDetails.description
        ? state.booth.productDetails.description
        : "",
  },
});

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "Name is required";
  }

  if (!formValues.link) {
    errors.link = "CTA Link is required";
  }

  if (!formValues.description) {
    errors.description = "Description is required";
  }
  return errors;
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "EditProductDetails",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditProduct)
);
