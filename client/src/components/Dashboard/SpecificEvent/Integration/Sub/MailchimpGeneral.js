import React from "react";
import Select from "react-select";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch, connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Loader from "../../../../../components/Loader";
import styled from "styled-components";
import {
  errorTrackerForFetchMailChimpAudiences,
  editEvent,
} from "../../../../../actions";
import { useParams } from "react-router-dom";
import MultiTagInput from "../../../MultiTagInput";
let audienceList = [];

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

const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #727272 !important;
  margin-bottom: 5px;
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
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
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

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "#858585",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "#757575",
  }),
};

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

const MailchimpGeneral = ({ handleSubmit, pristine, submitting }) => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();

  const params = useParams();
  const ChimpyAudienceList = useSelector(
    (state) => state.community.mailChimpAudiences
  );

  const { isLoading, error } = useSelector((state) => state.community);
  const { eventDetails } = useSelector((state) => state.event);

  const handleChange = () => {
    setChecked(!checked);
  };

  const onSubmit = (formValues) => {
    console.log(formValues, "I am counting on you formValues mailChimpGeneral");
    const ModifiedFormValues = {};

    ModifiedFormValues.mailChimpAudienceListIdForRegistrants =
      formValues.registrantsList.value;
    ModifiedFormValues.mailChimpAudienceTag = formValues.tag;
    const bool = ModifiedFormValues.mailChimpAudienceTag.includes(
      eventDetails.eventName
    );

    if (!bool) {
      ModifiedFormValues.mailChimpAudienceTag.push(eventDetails.eventName);
    }
    ModifiedFormValues.addDirectAccessLinkToMailChimp = checked;
    ModifiedFormValues.isMailchimpEnabled = true;
    
    dispatch(editEvent(ModifiedFormValues, params.id));
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
    dispatch(errorTrackerForFetchMailChimpAudiences());
    alert(error);
    return;
  }

  audienceList = ChimpyAudienceList.map((list) => {
    return {
      value: list.id,
      label: list.name,
    };
  });

  return (
    <>
      <div>
        <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column mb-4 overlay-form-input-row">
            <label
              for="communityName"
              className="form-label form-label-customized"
              style={{ color: "#212121" }}
            >
              Mailchimp audience
            </label>
            <small className="mb-3 form-small-text">
              Select audience list from your mailchimp account where you want to
              sync registrants.
            </small>

            <Field
              name="registrantsList"
              classes="mb-3"
              placeholder="Registrants list"
              styles={styles}
              
              menuPlacement="bottom"
              options={audienceList}
              component={renderReactSelect}
            />
          </div>
          <div className="d-flex flex-column mb-5 overlay-form-input-row">
            <label
              for="communityName"
              className="form-label form-label-customized"
            >
              Audience tag
            </label>
            <small className="mb-3 form-small-text">
              Tag will be added to all contact registering for this event.
            </small>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="tags"
                className="form-label form-label-customized"
              >
                Tags
              </FormLabel>
              <div className="">
                <Field name="tag" component={renderMultiTags} />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mb-4 overlay-form-input-row">
            <label
              for="communityName"
              className="form-label form-label-customized"
            >
              Note:
            </label>
            <small className="mb-3 form-small-text">
              Magic link will be synced along with name and email and will be
              shared with attendees via mail to join event at ease.
            </small>

            {/* <div className="tag">Confluenece 2021</div> */}
          </div>
          <div
            className="d-flex flex-row align-items-center justify-content-end mb-4"
            style={{ width: "100%" }}
          >
            <button type="submit" className="btn btn-primary btn-outline-text">
              Save
            </button>
          </div>
          <div>
            <div className="want-help-heading mb-3">Want help ?</div>
            <div className="integration-guide-btn px-4 py-2">
              Guid to Integrate Mailchimp with Evenz.
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    registrantsList:
      state.event.eventDetails &&
      state.event.eventDetails.mailChimpAudienceListIdForRegistrants
        ? (() => {
            for (let element of state.community.mailChimpAudiences) {
              if (
                element.id ===
                state.event.eventDetails.mailChimpAudienceListIdForRegistrants
              ) {
                return { value: element.id, label: element.name };
              }
            }
          })()
        : "",

    // mailChimpAudienceTag
    tag:
      state.event.eventDetails && state.event.eventDetails.mailChimpAudienceTag
        ? state.event.eventDetails.mailChimpAudienceTag
        : [state.event.eventDetails.eventName],
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "mailchimpGeneralPreference",
    // validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(MailchimpGeneral)
);
