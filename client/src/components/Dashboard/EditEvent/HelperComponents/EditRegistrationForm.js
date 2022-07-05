import React from "react";
import styled from "styled-components";
import { SwipeableDrawer, IconButton, Divider } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {editRegistrationForm} from "./../../../../actions";

const Paper = styled.div`
  width: 568px;
  background-color: #ffffff;
`;

const Heading = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  font-family: "Ubuntu";
  color: #212121;
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.77rem;
  color: #646464;
`;

const InfoTableGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 6fr 1fr 1fr;
  grid-gap: 16px;
  align-items: center;
`;

const InfoLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.85rem;
  color: #424242;
`;

const EventRegistrationFormListFields = () => {
  return (
    <>
      <InfoTableGrid>
        <div></div>
        <Heading>Include</Heading>
        <Heading>Require</Heading>
      </InfoTableGrid>
    </>
  );
};

const EventRegistrationFormFieldValues = ({
  InputLabel,
  isEnabled,
  isRequired,
  handleEnabled,
  handleRequired,
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <InfoTableGrid>
        <InfoLabel>{InputLabel}</InfoLabel>
        <Heading>
          <Switch
            {...label}
            checked={isEnabled}
            onChange={(event) => {
              handleEnabled(event.target.checked);
              if (!event.target.checked) {
                handleRequired(event.target.checked);
              }
            }}
          />
        </Heading>
        <Heading>
          <Switch
            {...label}
            checked={isRequired}
            onChange={(event) => {
              handleRequired(event.target.checked);
            }}
          />
        </Heading>
      </InfoTableGrid>

      <Divider className="my-2"></Divider>
    </>
  );
};

const EditRegistraionForm = ({ open, handleClose }) => {

  const dispatch = useDispatch();

  const params = useParams();

  const eventId = params.id;

  const { registrationFormId } = useSelector(
    (state) => state.event.eventDetails
  );

  const [isPrefixEnabled, setIsPrefixEnabled] = React.useState(
    registrationFormId.prefix_enabled
  );
  const [isPrefixRequired, setIsPrefixRequired] = React.useState(
    registrationFormId.prefix_required
  );

  const [isHome_PhoneEnabled, setIsHome_PhoneEnabled] = React.useState(
    registrationFormId.home_phone_enabled
  );
  const [isHome_PhoneRequired, setIsHome_PhoneRequired] = React.useState(
    registrationFormId.home_phone_required
  );

  const [isCell_PhoneEnabled, setIsCell_PhoneEnabled] = React.useState(
    registrationFormId.cell_phone_enabled
  );
  const [isCell_PhoneRequired, setIsCell_PhoneRequired] = React.useState(
    registrationFormId.cell_phone_required
  );

  const [isHome_AddressEnabled, setIsHome_AddressEnabled] = React.useState(
    registrationFormId.home_address_enabled
  );
  const [isHome_AddressRequired, setIsHome_AddressRequired] = React.useState(
    registrationFormId.home_address_required
  );

  const [isWork_AddressEnabled, setIsWork_AddressEnabled] = React.useState(
    registrationFormId.work_address_enabled
  );
  const [isWork_AddressRequired, setIsWork_AddressRequired] = React.useState(
    registrationFormId.work_address_required
  );

  const [isShipping_AddressEnabled, setIsShipping_AddressEnabled] =
    React.useState(registrationFormId.shipping_address_enabled);
  const [isShipping_AddressRequired, setIsShipping_AddressRequired] =
    React.useState(registrationFormId.shipping_address_required);

  const [isWork_PhoneEnabled, setIsWork_PhoneEnabled] = React.useState(
    registrationFormId.work_phone_enabled
  );
  const [isWork_PhoneRequired, setIsWork_PhoneRequired] = React.useState(
    registrationFormId.work_phone_required
  );

  const [isWebsiteEnabled, setIsWebsiteEnabled] = React.useState(
    registrationFormId.website_enabled
  );
  const [isWebsiteRequired, setIsWebsiteRequired] = React.useState(
    registrationFormId.website_required
  );

  const [isGenderEnabled, setIsGenderEnabled] = React.useState(
    registrationFormId.gender_enabled
  );
  const [isGenderRequired, setIsGenderRequired] = React.useState(
    registrationFormId.gender_required
  );

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
          <Paper className="p-4">
            <div className="form-heading-and-close-button mb-4 d-flex flex-row align-items-center justify-content-between">
              <div>
                <div className="coupon-overlay-form-headline mb-2">
                  Set information to collect
                </div>

                <TextSmall>
                  {" "}
                  We collect name, email address, city, country, organisation
                  and designation by default.
                </TextSmall>
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

            <EventRegistrationFormListFields className="mb-5"></EventRegistrationFormListFields>
            <EventRegistrationFormFieldValues
              isEnabled={isPrefixEnabled || isPrefixRequired}
              isRequired={isPrefixRequired}
              handleEnabled={setIsPrefixEnabled}
              handleRequired={setIsPrefixRequired}
              InputLabel={"Prefix (Mr, Mrs, etc.,)"}
            />
            <EventRegistrationFormFieldValues
              InputLabel={"Home Phone"}
              isEnabled={isHome_PhoneEnabled || isHome_PhoneRequired}
              isRequired={isHome_PhoneRequired}
              handleEnabled={setIsHome_PhoneEnabled}
              handleRequired={setIsHome_PhoneRequired}
            />
            <EventRegistrationFormFieldValues
              InputLabel={"Cell Phone"}
              isEnabled={isCell_PhoneEnabled || isCell_PhoneRequired}
              isRequired={isCell_PhoneRequired}
              handleEnabled={setIsCell_PhoneEnabled}
              handleRequired={setIsCell_PhoneRequired}
            />
            <EventRegistrationFormFieldValues
              InputLabel={"Work Phone"}
              isEnabled={isWork_PhoneEnabled || isWork_PhoneRequired}
              isRequired={isWork_PhoneRequired}
              handleEnabled={setIsWork_PhoneEnabled}
              handleRequired={setIsWork_PhoneRequired}
            />
            <EventRegistrationFormFieldValues
              InputLabel={"Home Address"}
              isEnabled={isHome_AddressEnabled || isHome_AddressRequired}
              isRequired={isHome_AddressRequired}
              handleEnabled={setIsHome_AddressEnabled}
              handleRequired={setIsHome_AddressRequired}
            />
            <EventRegistrationFormFieldValues
              InputLabel={"Shipping Address"}
              isEnabled={
                isShipping_AddressEnabled || isShipping_AddressRequired
              }
              isRequired={isShipping_AddressRequired}
              handleEnabled={setIsShipping_AddressEnabled}
              handleRequired={setIsShipping_AddressRequired}
            />
            <EventRegistrationFormFieldValues
              InputLabel={"Work Address"}
              isEnabled={isWork_AddressEnabled || isWork_AddressRequired}
              isRequired={isWork_AddressRequired}
              handleEnabled={setIsWork_AddressEnabled}
              handleRequired={setIsWork_AddressRequired}
            />

            <EventRegistrationFormFieldValues
              InputLabel={"Website"}
              isEnabled={isWebsiteEnabled || isWebsiteRequired}
              isRequired={isWebsiteRequired}
              handleEnabled={setIsWebsiteEnabled}
              handleRequired={setIsWebsiteRequired}
            />

            <EventRegistrationFormFieldValues
              InputLabel={"Gender"}
              isEnabled={isGenderEnabled || isGenderRequired}
              isRequired={isGenderRequired}
              handleEnabled={setIsGenderEnabled}
              handleRequired={setIsGenderRequired}
            />

            <button
              onClick={() => {

                dispatch(editRegistrationForm({
                  prefix_enabled: isPrefixEnabled,
                  prefix_required: isPrefixRequired,

                  home_phone_enabled: isHome_PhoneEnabled,
                  home_phone_required: isHome_PhoneRequired,

                  cell_phone_enabled: isCell_PhoneEnabled,
                  cell_phone_required: isCell_PhoneRequired,

                  woek_phone_enabled: isWork_PhoneEnabled,
                  work_phone_required: isWork_PhoneRequired,

                  work_address_enabled: isWork_AddressEnabled,
                  work_address_required: isWork_AddressRequired,

                  shipping_address_enabled: isShipping_AddressEnabled,
                  shipping_address_required: isShipping_AddressRequired,

                  home_address_enabled: isHome_AddressEnabled,
                  home_address_required: isHome_AddressRequired,

                  website_enabled: isWebsiteEnabled,
                  website_required: isWebsiteRequired,

                  gender_enabled: isGenderEnabled,
                  gender_required: isGenderRequired,
                }, eventId))


               
              }}
              className="btn btn-primary btn-outline-text mt-5"
              style={{ width: "100%" }}
            >
              Save
            </button>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default EditRegistraionForm;
