import React from "react";
import Select from "react-select";
import "./../../../../index.css";
import { requestIntegration } from "./../../../../actions";
import { reduxForm, Field } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import MultiTagInput from "../../MultiTagInput";
import { useParams } from "react-router";

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

const FormSubHeading = styled.div`
  font-size: 0.87rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: #424242;
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
        isMulti
        maxMenuHeight={150}
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
        ((error && <FormError>{error}</FormError>) ||
          (warning && <FormWarning>{warning}</FormWarning>))}
    </div>
  </div>
);

const renderMultiTags = ({ input, meta: { touched, error, warning } }) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <MultiTagInput input={input} value={input.value} />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const integrationOptions = [
  { value: "Miro", label: "Miro" },
  { value: "Figma", label: "Figma" },
  { value: "Google slides", label: "Google slides" },
  { value: "Kahoot", label: "Kahoot" },
  { value: "GoFundMe", label: "GoFundMe" },
  { value: "Slack", label: "Slack" },
  { value: "Intercom", label: "Intercom" },
  {
    value: "Buffer",
    label: "Buffer",
  },
  { value: "Zoho CRM", label: "Zoho CRM" },
  { value: "Pipedrive", label: "Pipedrive" },
  { value: "Bitrix24", label: "Bitrix24" },
  { value: "Youtube", label: "Youtube" },
  { value: "Facebook", label: "Facebook" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.85rem",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.85rem",
    color: "#757575",
  }),
};

const RequestIntegrationForm = ({ handleSubmit, handleClose, open }) => {
  const dispatch = useDispatch();

  const params = useParams();

  const { userDetails } = useSelector((state) => state.user);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = (formValues) => {
    let requestedIntegrations = [];

    for (let element of formValues.selectIntegrations) {
      requestedIntegrations.push(element.value);
    }

    const ModifiedFormValues = {};
    ModifiedFormValues.requestedIntegrations = requestedIntegrations;
    ModifiedFormValues.name = userDetails.firstName + userDetails.lastName;
    ModifiedFormValues.email = userDetails.email;
    ModifiedFormValues.communityId = params.id;
    ModifiedFormValues.otherIntegrations = formValues.otherIntegrations;

    dispatch(requestIntegration(ModifiedFormValues));
    handleClose();
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
          <HeaderFooter className="px-4 pt-3 pb-4">
            <div
              className="form-heading-and-close-button"
              style={{ width: "100%" }}
            >
              <div></div>
              <FormHeading
                className=""
                style={{ fontFamily: "Ubuntu", textAlign: "center" }}
              >
                Request integration
              </FormHeading>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton
                  type="button"
                  aria-label="delete"
                  onClick={handleClose}
                >
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>
            <FormSubHeading
              className={`overlay-sub-form-heading`}
              style={{ fontFamily: "Ubuntu", textAlign: "center", fontSize: "0.8rem" }}
            >
              Just fill in these two and we will deliver it at lightning fast
              speed.
            </FormSubHeading>
          </HeaderFooter>
          <div
            className=" px-4 py-4 d-flex flex-column align-items-center"
            style={{ minWidth: "500px", maxWidth: "520px" }}
          >
            <div className="mb-4 overlay-form-input-row">
              <FormLabel
                Forhtml="selectIntegrations"
                className="form-label form-label-customized"
              >
                Select integrations
              </FormLabel>
              <Field
                name="selectIntegrations"
                styles={styles}
                menuPlacement="auto"
                options={integrationOptions}
                defaultValue={integrationOptions[0]}
                id="selectIntegrations"
                component={renderReactSelect}
              />
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="tags"
                className="form-label form-label-customized"
              >
                Other product you want to be integrated with Bluemeet.
              </FormLabel>
              <div className="form-group">
                <Field name="otherIntegrations" component={renderMultiTags} />
              </div>
            </div>

            <div style={{ width: "100%" }}>
              <button
                type="submit"
                className={`btn btn-primary btn-outline-text `}
                style={{ width: "100%", textAlign: "center" }}
              >
                Submit request
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.selectIntegrations) {
    errors.selectIntegrations = "Integrations is required.";
  }

  return errors;
};

export default reduxForm({
  form: "requestIntegrationForm",
  validate,
})(RequestIntegrationForm);
