import React from 'react';
import styled from 'styled-components';
import {Avatar} from "@material-ui/core";

import { SwipeableDrawer, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Select from "react-select";

const TicketTypeOptions = [];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.9rem",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.8rem",
  }),
};


const Paper = styled.div`
  width: 460px;
  background-color: #ffffff;
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.77rem;
  color: #D6D6D6;
`;

const AttendeeCard = styled.div`
  border-radius: 10px;
  padding: 20px;
  background-color: #2C2C2C;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AttendeeName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.87rem;
  color: #ffffff;
`;

const SubHeading = styled.label`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.83rem;
  color: #363636;
`;



const PreviewParticipant = ({open, handleClose}) => {
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
                <div className="coupon-overlay-form-headline mb-2">Preview participant</div>
                <TextSmall className="mb-3" style={{color: "#747474"}}>
                  {" "}
                  Note: You can only specify ticket type here for participants added via third party integrations.
                </TextSmall>
                {/* <TextSmall>
                  {" "}
                  Participant will have to fill up the following form.
                </TextSmall> */}
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

<div className="d-flex flex-row align-items-center justify-content-center">
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
                <hr />
                <SubHeading className="mb-2">Email</SubHeading>
                <TextSmall style={{color: "#666666"}}>f20190858@pilani.bits-pilani.ac.in</TextSmall>
                <hr />
                <SubHeading className="mb-2">Added via</SubHeading>
                <TextSmall style={{color: "#666666"}}>Eventbrite</TextSmall>
                <hr />
                <SubHeading className="mb-1">
              Select ticket type to assign{" "}
              <span className="mandatory-field">*</span>
            </SubHeading>
            <Select
              className="mb-4"
              isMulti
              defaultValue={TicketTypeOptions[0]}
              styles={styles}
              menuPlacement={"bottom"}
              options={TicketTypeOptions}
            />

            <button
              className="btn btn-primary btn-outline-text "
              style={{ width: "100%" }}
            >
              Save
            </button>
    </Paper>




            </SwipeableDrawer>
            </React.Fragment>



        </>
    )
}

export default PreviewParticipant;



