// import React from "react";
// import { Field, reduxForm } from "redux-form";
// import { connect } from "react-redux";
// import Select from "react-select";

// import UploadEventDefaultImage from "./FormComponents/UploadEventDefaultImage";

// const timeZoneOptions = [
//   { value: "(GMT + 00:00) UTC", label: "(GMT + 00:00) UTC" },
//   { value: "(GMT + 00:00) Edinburgh", label: "(GMT + 00:00) Edinburgh" },
//   { value: "(GMT + 00:00) Lisbon", label: "(GMT + 00:00) Lisbon" },
//   { value: "(GMT + 00:00) London", label: "(GMT + 00:00) London" },
//   { value: "(GMT-10:00) Hawaii", label: "(GMT-10:00) Hawaii" },
//   {
//     value: "(GMT+5:30) Chennai, Kolkata, New delhi, Mumbai",
//     label: "(GMT+5:30) Chennai, Kolkata, New delhi, Mumbai",
//   },
//   { value: "(GMT+5:45) Kathmandu", label: "(GMT+5:45) Kathmandu" },
// ];
// const eventTypeOptions = [
//   { value: "Conference or Convention", label: "Conference or Convention" },
//   { value: "Concert", label: "Concert" },
//   { value: "Seminar or Talk", label: "Seminar or Talk" },
//   {
//     value: "Tradeshow, Consumer show or expo",
//     label: "Tradeshow, Consumer show or expo",
//   },
//   { value: "Festival or Fair", label: "Festival or Fair" },
//   { value: "Performance or live show", label: "Performance or live show" },
//   { value: "Screening", label: "Screening" },
//   { value: "Gala or Dinner", label: "Gala or Dinner" },
//   {
//     value: "Class, Training or Workshop",
//     label: "Class, Training or Workshop",
//   },
//   {
//     value: "Meeting or Networking Event",
//     label: "Meeting or Networking Event",
//   },
//   { value: "Party or social gathering", label: "Party or social gathering" },
//   { value: "Rally", label: "Rally" },
//   { value: "Tournament or competition", label: "Tournament or competition" },
//   { value: "Race or Endurance event", label: "Race or Endurance event" },
//   { value: "Tours & Walks", label: "Tours & Walks" },
//   { value: "Attraction", label: "Attraction" },
//   { value: "Camp, Trip or Retreat", label: "Camp, Trip or Retreat" },
//   { value: "Appearance or singing", label: "Appearance or singing" },
//   { value: "Exhibition", label: "Exhibition" },
//   { value: "Market Awards", label: "Market Awards" },
// ];
// const eventCategoryOptions = [
//   { value: "Business", label: "Business" },
//   { value: "Parties", label: "Parties" },
//   { value: "Performances", label: "Performances" },
//   { value: "Sports", label: "Sports" },
//   { value: "Festivals", label: "Festivals" },
//   { value: "Workshops", label: "Workshops" },
//   { value: "Music", label: "Music" },
//   { value: "Exhibitions", label: "Exhibitions" },
//   { value: "Food & Drinks", label: "Food & Drinks" },
//   { value: "Health & Wellness", label: "Health & Wellness" },
//   { value: "Dance", label: "Dance" },
//   { value: "Fashion", label: "Fashion" },
//   { value: "Art", label: "Art" },
//   { value: "Fine arts", label: "Fine arts" },
//   { value: "Theatre", label: "Theatre" },
//   { value: "Literary Art", label: "Literary Art" },
//   { value: "Crafts", label: "Crafts" },
//   { value: "Photography", label: "Photography" },
//   { value: "Cooking", label: "Cooking" },
//   { value: "Comedy", label: "Comedy" },
//   { value: "Trips & Adventures", label: "Trips & Adventures" },
//   { value: "Entertainment", label: "Entertainment" },
//   { value: "Christmas", label: "Christmas" },
//   { value: "Kids", label: "Kids" },
//   { value: "Conferences", label: "conferences" },
//   { value: "Yoga", label: "Yoga" },
//   { value: "Hackathons", label: "Hackathons" },
//   { value: "Virtual Events", label: "Virtual Events" },
//   { value: "Webinar", label: "Webinar" },
// ];

// const currencyOptions = [
//   { value: "USD", label: "US Dollars" },
//   { value: "AED", label: "United Arab Emirates Dirham" },
//   { value: "INR", label: "Indian Rupees" },
//   { value: "BMD", label: "Bermudan Dollar equals" },
//   { value: "CAD", label: "Canadian Dollar" },
// ];

// const styles = {
//   control: (base) => ({
//     ...base,
//     fontFamily: "Inter",
//     fontWeight: "600",
//     color: "#757575",
//   }),
//   menu: (base) => ({
//     ...base,
//     fontFamily: "Inter",
//     fontWeight: "600",
//     color: "#757575",
//   }),
// };

// const renderError = ({ error, touched }) => {
//   if (touched && error) {
//     return (
//       <div className="ui error message">
//         <div className="header">{error}</div>
//       </div>
//     );
//   }
// };

// const renderInput = ({
//   input,
//   meta,
//   type,
//   ariadescribedby,
//   classes,
//   placeholder,
// }) => {
//   const className = `field ${meta.error && meta.touched ? "error" : ""}`;
//   return (
//     <div className={className}>
//       <input
//         type={type}
//         {...input}
//         aria-describedby={ariadescribedby}
//         className={classes}
//         placeholder={placeholder}
//       />
//       {renderError(meta)}
//     </div>
//   );
// };

// const renderTextArea = ({
//   input,
//   meta,
//   type,
//   ariadescribedby,
//   classes,
//   placeholder,
// }) => {
//   const className = `field ${meta.error && meta.touched ? "error" : ""}`;
//   return (
//     <div className={className}>
//       <textarea
//         rows="3"
//         type={type}
//         {...input}
//         aria-describedby={ariadescribedby}
//         className={classes}
//         placeholder={placeholder}
//       />

//       {renderError(meta)}
//     </div>
//   );
// };

// const renderMultiReactSelect = ({
//   isMulti,
//   input,
//   meta: { touched, error, warning },
//   styles,
//   menuPlacement,
//   options,
//   defaultValue,

//   name,
// }) => (
//   <div>
//     <div>
//       <Select
//         isMulti={isMulti}
//         defaultValue={defaultValue}
//         styles={styles}
//         menuPlacement={menuPlacement}
//         name={name}
//         options={options}
//         value={input.value}
//         onChange={(value) => input.onChange(value)}
//         onBlur={() => input.onBlur()}
//       />
//       {touched &&
//         ((error && <span>{error}</span>) ||
//           (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// );

// const renderReactSelect = ({
//   isMulti,
//   input,
//   meta: { touched, error, warning },
//   styles,
//   menuPlacement,
//   options,
//   defaultValue,

//   name,
// }) => (
//   <div>
//     <div>
//       <Select
//         defaultValue={defaultValue}
//         styles={styles}
//         menuPlacement={menuPlacement}
//         name={name}
//         options={options}
//         value={input.value}
//         onChange={(value) => input.onChange(value)}
//         onBlur={() => input.onBlur()}
//       />
//       {touched &&
//         ((error && <span>{error}</span>) ||
//           (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// );

// const CommunityDefaults = ({ handleSubmit, pristine, reset, submitting }) => {
//   const onSubmit = (formValues) => {
//     // setEditProfileClicked(true);
//     // console.log(formValues);
//     // const ModifiedFormValues = {};
//     // ModifiedFormValues.firstName = formValues.firstName;
//     // ModifiedFormValues.lastName = formValues.lastName;
//     // ModifiedFormValues.headline = formValues.headline;
//     // ModifiedFormValues.phoneNumber = formValues.phoneNumber;
//     // ModifiedFormValues.email = formValues.email;
//     // const groupedSocialHandles = {
//     //   facebook: formValues.facebook,
//     //   twitter: formValues.twitter,
//     //   linkedin: formValues.linkedin,
//     // };
//     // ModifiedFormValues.socialMediaHandles = groupedSocialHandles;
//     // const modifiedInterests = [];
//     // if (formValues.interests) {
//     //   for (let element of formValues.interests) {
//     //     modifiedInterests.push(element.value);
//     //   }
//     // }
//     // ModifiedFormValues.interests = modifiedInterests;
//     // console.log(ModifiedFormValues);
//     // console.log(file);
//     // dispatch(editUser(ModifiedFormValues, file));
//   };

//   return (
//     <>
//       <div className="user-account-edit-profile px-4 py-4">
//         <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
//           <div className="mb-4 overlay-form-input-row">
//             <label
//               Forhtml="selectTimeZone"
//               className="form-label form-label-customized"
//             >
//               Timezone
//             </label>
//             <Field
//               name="selectTimeZone"
//               styles={styles}
//               menuPlacement="auto"
//               options={timeZoneOptions}
//               defaultValue={timeZoneOptions[0]}
//               id="selectTimeZone"
//               component={renderReactSelect}
//             />
//           </div>

//           <div className="mb-4 overlay-form-input-row">
//             <p className="form-label form-label-customized">Mode of event</p>
//             <div className="form-check mb-2">
//               <Field
//                 name="mode_of_event"
//                 className="form-check-input"
//                 type="radio"
//                 // name="flexRadioDefault"
//                 id="flexRadioDefault1"
//                 value="Online"
//                 // component={renderInput}
//                 component="input"
//               />
//               <label
//                 className="form-check-label"
//                 style={{
//                   fontFamily: "Inter",
//                   fontWeight: "500",
//                   fontSize: "0.9rem",
//                 }}
//                 for="flexRadioDefault1"
//               >
//                 Online
//               </label>
//             </div>
//             <div className="form-check">
//               <Field
//                 className="form-check-input"
//                 type="radio"
//                 name="mode_of_event"
//                 id="flexRadioDefault2"
//                 // checked="true"
//                 value="Offline"
//                 // component={renderInput}
//                 component="input"
//               />
//               <label
//                 className="form-check-label"
//                 style={{
//                   fontFamily: "Inter",
//                   fontWeight: "500",
//                   fontSize: "0.9rem",
//                 }}
//                 for="flexRadioDefault2"
//               >
//                 Offline
//               </label>
//             </div>
//           </div>

//           <div className="mb-4 overlay-form-input-row">
//             <p className="form-label form-label-customized">Event visibility</p>
//             <div className="form-check mb-2">
//               <Field
//                 name="visibility"
//                 className="form-check-input"
//                 type="radio"
//                 // name="flexRadioDefault"
//                 id="flexRadioDefault1"
//                 value="Public"
//                 // component={renderInput}
//                 component="input"
//               />
//               <label
//                 className="form-check-label"
//                 style={{
//                   fontFamily: "Inter",
//                   fontWeight: "500",
//                   fontSize: "0.9rem",
//                 }}
//                 for="flexRadioDefault1"
//               >
//                 Public
//               </label>
//               <div
//                 id="emailHelp"
//                 className="form-text"
//                 style={{ fontSize: "13px" }}
//               >
//                 Upgrade to a paid plan to create public events.
//               </div>
//             </div>
//             <div className="form-check">
//               <Field
//                 className="form-check-input"
//                 type="radio"
//                 name="visibility"
//                 id="flexRadioDefault2"
//                 // checked="true"
//                 value="Private"
//                 // component={renderInput}
//                 component="input"
//               />
//               <label
//                 className="form-check-label"
//                 style={{
//                   fontFamily: "Inter",
//                   fontWeight: "500",
//                   fontSize: "0.9rem",
//                 }}
//                 for="flexRadioDefault2"
//               >
//                 Private
//               </label>
//             </div>
//           </div>

//           <div className="mb-4 overlay-form-input-row">
//             <label
//               Forhtml="selectTimeZone"
//               className="form-label form-label-customized"
//             >
//               Event Type
//             </label>
//             <Field
//               name="selectEventType"
//               styles={styles}
//               menuPlacement="top"
//               options={eventTypeOptions}
//               defaultValue={eventTypeOptions[0]}
//               id="selectTimeZone"
//               component={renderReactSelect}
//             />
//           </div>

//           <div className="mb-4 overlay-form-input-row">
//             <label
//               Forhtml="selectTimeZone"
//               className="form-label form-label-customized"
//             >
//               Event category
//             </label>
//             <Field
//               isMulti="true"
//               name="selectEventCategory"
//               styles={styles}
//               menuPlacement="auto"
//               options={eventCategoryOptions}
//               defaultValue={eventCategoryOptions[0]}
//               id="selectTimeZone"
//               component={renderMultiReactSelect}
//             />
//           </div>

//           <div className="mb-4 overlay-form-input-row">
//             <label
//               Forhtml="selectTimeZone"
//               className="form-label form-label-customized"
//             >
//               Ticketing Currency
//             </label>
//             <Field
//               name="selectEventType"
//               styles={styles}
//               menuPlacement="auto"
//               options={currencyOptions}
//               defaultValue={currencyOptions[0]}
//               id="selectTimeZone"
//               component={renderReactSelect}
//             />
//           </div>

//           <UploadEventDefaultImage />

//           <div
//             style={{ fontWeight: "600", fontFamily: "Inter" }}
//             className="mb-4"
//           >
//             Venue{" "}
//             <span style={{ fontWeight: "500", fontSize: "14px" }}>
//               (for offline events)
//             </span>
//           </div>

//           <div className="row edit-profile-form-row mb-3">
//             <div className="form-group">
//               <label
//                 for="communityHeadline"
//                 className="form-label form-label-customized"
//               >
//                 Street Address
//               </label>
//               <Field
//                 name="lastName"
//                 type="text"
//                 classes="form-control"
//                 component={renderInput}
//                 ariadescribedby="emailHelp"
//                 placeholder="Doe"
//                 label="Last Name"
//               />
//             </div>
//           </div>

//           <div className="mb-4 overlay-form-input-row form-row-2-in-1 row edit-profile-form-row">
//             <div>
//               <label
//                 Forhtml="eventStartDate"
//                 className="form-label form-label-customized"
//               >
//                 City
//               </label>
//               <Field
//                 name="city"
//                 type="text"
//                 classes="form-control"
//                 id="eventStartDate"
//                 component={renderInput}
//               />
//             </div>
//             <div>
//               <label
//                 Forhtml="eventStartTime"
//                 className="form-label form-label-customized"
//               >
//                 State
//               </label>
//               <Field
//                 name="state"
//                 type="text"
//                 classes="form-control"
//                 id="eventStartTime"
//                 component={renderInput}
//               />
//             </div>
//           </div>

//           <div className="mb-4 overlay-form-input-row form-row-2-in-1 row edit-profile-form-row">
//             <div>
//               <label
//                 Forhtml="eventStartDate"
//                 className="form-label form-label-customized"
//               >
//                 Landmark
//               </label>
//               <Field
//                 name="city"
//                 type="text"
//                 classes="form-control"
//                 id="eventStartDate"
//                 component={renderInput}
//               />
//             </div>
//             <div>
//               <label
//                 Forhtml="eventStartTime"
//                 className="form-label form-label-customized"
//               >
//                 Pincode
//               </label>
//               <Field
//                 name="state"
//                 type="number"
//                 classes="form-control"
//                 id="eventStartTime"
//                 component={renderInput}
//               />
//             </div>
//           </div>

//           <div className="row edit-profile-form-row mb-3">
//             <div className="form-group">
//               <label
//                 for="communityHeadline"
//                 className="form-label form-label-customized"
//               >
//                 Country
//               </label>
//               <Field
//                 name="lastName"
//                 type="text"
//                 classes="form-control"
//                 component={renderInput}
//                 ariadescribedby="emailHelp"
//                 placeholder="Doe"
//                 label="Last Name"
//               />
//             </div>
//           </div>

//           <div className="row edit-profile-form-row mb-3 d-flex flex-row justify-content-end">
//             <button
//               type="submit"
//               // disabled={editProfileClicked && !error}
//               // disabled={pristine}
//               className="col-3 btn btn-primary btn-outline-text me-3"
//               style={{ textAlign: "center" }}
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               // disabled={pristine || submitting}
//               // onClick={reset}
//               className="col-3 btn btn-outline-primary btn-outline-text me-3"
//               style={{ textAlign: "center" }}
//             >
//               Discard Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   // console.log(state.user.userDetails);
//   initialValues: {
//     // imgUrl: state.user.userDetails.image
//     //   ? `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${state.user.userDetails.image}`
//     //   : " #",
//     // firstName: state.user.userDetails.firstName
//     //   ? state.user.userDetails.firstName
//     //   : "",
//     // lastName: state.user.userDetails.lastName
//     //   ? state.user.userDetails.lastName
//     //   : "",
//     // email: state.user.userDetails.email ? state.user.userDetails.email : "",
//     // interests: state.user.userDetails.interests
//     //   ? state.user.userDetails.interests.map((interest) => {
//     //       return { value: interest, label: interest };
//     //     })
//     //   : "",
//     // linkedin:
//     //   state.user.userDetails.socialMediaHandles &&
//     //   state.user.userDetails.socialMediaHandles.linkedin
//     //     ? state.user.userDetails.socialMediaHandles.linkedin
//     //     : "",
//     // facebook:
//     //   state.user.userDetails.socialMediaHandles &&
//     //   state.user.userDetails.socialMediaHandles.facebook
//     //     ? state.user.userDetails.socialMediaHandles.facebook
//     //     : "",
//     // twitter:
//     //   state.user.userDetails.socialMediaHandles &&
//     //   state.user.userDetails.socialMediaHandles.twitter
//     //     ? state.user.userDetails.socialMediaHandles.twitter
//     //     : "",
//     // website:
//     //   state.user.userDetails.socialMediaHandles &&
//     //   state.user.userDetails.socialMediaHandles.website
//     //     ? state.user.userDetails.socialMediaHandles.website
//     //     : "",
//     // phoneNumber: state.user.userDetails.phoneNumber
//     //   ? state.user.userDetails.phoneNumber
//     //   : "",
//     // headline: state.user.userDetails.headline
//     //   ? state.user.userDetails.headline
//     //   : "",
//   },
// });

// export default connect(mapStateToProps)(
//   reduxForm({
//     form: "editCommunityDefaults",

//     // validate,
//     enableReinitialize: true,
//     destroyOnUnmount: false,
//   })(CommunityDefaults)
// );


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CommunityDefaultsTabBar(props) {
  const num = props.activeIndex * 1;
  const classes = useStyles();
  
  return (
    <Paper className={classes.root} style={{minWidth: "768px"}}>
      <Tabs
        value={num}
        onChange={props.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
      >
        <Tab label="Event" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}} />
        <Tab label="Customisation" style={{fontWeight: "500", fontFamily: "Inter", textTransform: "capitalize"}}/>
      </Tabs>
    </Paper>
  );
}
