import React from "react";
import styled from "styled-components";
import { SwipeableDrawer, IconButton, Avatar } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";

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

const countryOptions = [];

const genderOptions = [];

const prefixOptions = [
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
  { value: "Ms", label: "Ms" },
];

const Paper = styled.div`
  width: 868px;
  background-color: #ffffff;
`;

const AddressTitle = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.84rem;
  text-decoration: underline;
  color: #525252;
`;

const CheckboxLabel = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;

const FormLabel = styled.label`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.78rem;
  color: #363636;
`;

const StyledInput = styled.input`
  font-family: "Ubuntu" !important;
  font-weight: 500 !important;
  font-size: 0.82rem !important;
  color: #4b4b4b !important;

  &:hover {
    border: 1px solid #538bf7;
  }
`;

const AttendeeCard = styled.div`
  border-radius: 10px;
  padding: 20px;
  background-color: #e2e2e2;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AttendeeName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.87rem;
  color: #505050;
`;

const PreviewRegistrationForm = ({ open, handleClose }) => {
  const {
    prefix_enabled,
    home_phone_enabled,
    cell_phone_enabled,
    work_phone_enabled,
    home_address_enabled,
    work_address_enabled,
    shipping_address_enabled,
    website_enabled,
    gender_enabled,
  } = useSelector((state) => state.event.eventDetails.registrationFormId);

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
            <div className="form-heading-and-close-button mb-4 d-flex flex-row  justify-content-between">
              <div>
                <div className="coupon-overlay-form-headline mb-2">Preview</div>

                <TextSmall className="mb-3">
                  {" "}
                  Note: Email address of the participant is collected by
                  default.
                </TextSmall>
                <TextSmall>
                  {" "}
                  Participant will have to fill up the following form.
                </TextSmall>
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

            <Grid>
              <form>
                {prefix_enabled ? (
                  <div className="form-group mb-3">
                    <FormLabel for="exampleInputEmail1" className="mb-1">
                      Prefix
                    </FormLabel>
                    <Select
                      options={prefixOptions}
                      styles={styles}
                      isDisabled
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="form-group mb-4">
                  <FormLabel for="exampleInputEmail1" className="mb-1">
                    Name
                  </FormLabel>
                  <StyledInput
                    disabled={true}
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group mb-4">
                  <FormLabel for="exampleInputEmail1" className="mb-1">
                    Organisation
                  </FormLabel>
                  <StyledInput
                    disabled={true}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter organisation"
                  />
                </div>
                <div class="form-group mb-4">
                  <FormLabel for="exampleInputEmail1" className="mb-1">
                    Designation
                  </FormLabel>
                  <StyledInput
                    disabled={true}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter designation"
                  />
                </div>
                {home_phone_enabled ? (
                  <div class="form-group mb-4">
                    <FormLabel for="exampleInputEmail1" className="mb-1">
                      Home phone
                    </FormLabel>
                    <PhoneInput
                      inputStyle={{
                        paddingLeft: "50px",
                      }}
                      inputProps={{
                        enableSearch: true,
                      }}
                      country={"us"}
                      disabled
                    />
                  </div>
                ) : (
                  <></>
                )}

                {work_phone_enabled ? (
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked
                      disabled
                    />
                    <CheckboxLabel
                      className="form-check-label"
                      for="flexCheckChecked"
                    >
                      Work phone is same as home phone
                    </CheckboxLabel>
                  </div>
                ) : (
                  <></>
                )}

                {cell_phone_enabled ? (
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked
                      disabled
                    />
                    <CheckboxLabel
                      className="form-check-label"
                      for="flexCheckChecked"
                    >
                      Cell phone is same as home phone
                    </CheckboxLabel>
                  </div>
                ) : (
                  <></>
                )}

                {gender_enabled ? (
                  <div className="form-group mb-3">
                    <FormLabel for="exampleInputEmail1" className="mb-1">
                      Gender
                    </FormLabel>
                    <Select
                      options={genderOptions}
                      styles={styles}
                      isDisabled
                    />
                  </div>
                ) : (
                  <></>
                )}

                {website_enabled ? (
                  <div className="form-group mb-4">
                    <FormLabel for="exampleInputEmail1" className="mb-1">
                      Website
                    </FormLabel>
                    <StyledInput
                      disabled={true}
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter website (if any)"
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="form-group mb-4">
                  <FormLabel for="exampleInputEmail1" className="mb-1">
                    City
                  </FormLabel>
                  <StyledInput
                    disabled={true}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter city"
                  />
                </div>
                <div className="form-group mb-4">
                  <FormLabel for="exampleInputEmail1" className="mb-1">
                    Country
                  </FormLabel>
                  <Select options={countryOptions} styles={styles} isDisabled />
                </div>

                {home_address_enabled ? (
                  <>
                    <AddressTitle className="mb-2">Home address</AddressTitle>

                    <div className="form-group mb-4">
                      <FormLabel for="exampleInputEmail1" className="mb-1">
                        Line 1
                      </FormLabel>
                      <StyledInput
                        disabled={true}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter street line 1"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <FormLabel for="exampleInputEmail1" className="mb-1">
                        Line 2
                      </FormLabel>
                      <StyledInput
                        disabled={true}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter street line 2"
                      />
                    </div>

                    <div
                      className=""
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                      }}
                    >
                      <div className="form-group mb-4 me-3">
                        <FormLabel for="exampleInputEmail1" className="mb-1">
                          Postal
                        </FormLabel>
                        <StyledInput
                          disabled={true}
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter postal code"
                        />
                      </div>

                      <div className="form-group mb-4">
                        <FormLabel for="exampleInputEmail1" className="mb-1">
                          Landmark
                        </FormLabel>
                        <StyledInput
                          disabled={true}
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter landmark"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {shipping_address_enabled ? (
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked
                      disabled
                    />
                    <CheckboxLabel
                      className="form-check-label"
                      for="flexCheckChecked"
                    >
                      Shipping address is same as home address
                    </CheckboxLabel>
                  </div>
                ) : (
                  <></>
                )}

                {work_address_enabled ? (
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked
                      disabled
                    />
                    <CheckboxLabel
                      className="form-check-label"
                      for="flexCheckChecked"
                    >
                      Work address is same as home address
                    </CheckboxLabel>
                  </div>
                ) : (
                  <></>
                )}

                <button
                  className="btn btn-primary btn-outline-text disabled"
                  style={{ width: "100%" }}
                >
                  Proceed to checkout
                </button>
              </form>

              <div className="p-5">
                <div className="coupon-overlay-form-headline mb-3">
                  Attendee Card
                </div>
                <TextSmall className="mb-4">
                  People in the event will see <br /> attendee info as below.
                </TextSmall>

                <AttendeeCard>
                  <Avatar src={null} variant="rounded" className="me-3" />
                  <div>
                    <AttendeeName className="mb-1">Attendee Name</AttendeeName>
                    <TextSmall className="mb-1">
                      Designation, Organisation
                    </TextSmall>
                    <TextSmall>City, Country</TextSmall>
                  </div>
                </AttendeeCard>
              </div>
            </Grid>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default PreviewRegistrationForm;
