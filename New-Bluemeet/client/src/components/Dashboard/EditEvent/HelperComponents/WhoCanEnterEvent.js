import React from "react";
import styled from "styled-components";
import { SwipeableDrawer, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import LockIcon from "@mui/icons-material/Lock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useDispatch, useSelector } from "react-redux";
import { editEvent } from "../../../../actions";
import { useParams } from "react-router";

const Paper = styled.div`
  width: 500px;
  background-color: #ffffff;
`;

const EntryRuleGrid = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr 5fr;

  align-items: flex-start;
`;

const RuleHeading = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  font-family: "Ubuntu";
  color: #212121;
`;

const RuleBrief = styled.div`
  font-weight: 500;
  font-size: 0.76rem;
  font-family: "Ubuntu";
  color: #3a3a3a;
`;

const WhoCanEnterEvent = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { eventDetails } = useSelector((state) => state.event);

  const params = useParams();

  const eventId = params.id;

  const [entryRule, setEntryRule] = React.useState(
    eventDetails && eventDetails.whoCanEnterEvent
      ? eventDetails.whoCanEnterEvent
      : "Anyone Registered without using 2FA"
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
            <div className="form-heading-and-close-button mb-4">
              <div></div>
              <div className="coupon-overlay-form-headline">
                Set entry rules
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>
            <FormControl component="fieldset" className="mb-5">
              <RadioGroup
                aria-label="gender"
                defaultValue={entryRule}
                name="radio-buttons-group"
              >
                <EntryRuleGrid className="mb-4">
                  <FormControlLabel
                    value="without2FA"
                    control={
                      <Radio
                        value="Anyone Registered without using 2FA"
                        onChange={(event) => {
                          console.log(event.target.value);
                          setEntryRule(event.target.value);
                        }}
                      />
                    }
                    label=""
                  />
                  <MarkEmailReadIcon className="mt-2" />
                  <div>
                    <RuleHeading className="mb-2">
                      Anyone who is registered can enter without 2 factor auth
                    </RuleHeading>
                    <RuleBrief>
                      <div className="mb-3">
                        People can enter the event hassle-free without requiring
                        OTP or sign in. The unique event access link will be
                        sent to the email address provided by the registrant.
                      </div>

                      <div>
                        Use this to verify the identity of attendees and manage
                        abuse effectively.{" "}
                      </div>
                    </RuleBrief>
                  </div>
                </EntryRuleGrid>
                <EntryRuleGrid className="mb-4">
                  <FormControlLabel
                    value="onlyInvited"
                    control={
                      <Radio
                        value="Invited only without using 2FA"
                        onChange={(event) => {
                          console.log(event.target.value);
                          setEntryRule(event.target.value);
                        }}
                      />
                    }
                    label=""
                  />
                  <LockIcon className="mt-2" />
                  <div>
                    <RuleHeading className="mb-2">
                      Only invited participants can join without using 2 factor
                      auth
                    </RuleHeading>
                    <RuleBrief>
                      <div className="mb-3">
                        People on the participant list who are added by your
                        team or through third party integration can enter the
                        event after clicking on the unique link sent to their
                        email address.
                      </div>

                      <div>
                        Use this when you have prepared a list of invitees.{" "}
                      </div>
                    </RuleBrief>
                  </div>
                </EntryRuleGrid>
                <EntryRuleGrid className="mb-4">
                  <FormControlLabel
                    value="using2FA"
                    control={
                      <Radio
                        value="Anyone Registered using 2FA"
                        onChange={(event) => {
                          console.log(event.target.value);
                          setEntryRule(event.target.value);
                        }}
                      />
                    }
                    label=""
                  />
                  <VerifiedUserIcon className="mt-2" />
                  <div>
                    <RuleHeading className="mb-2">
                      Anyone can enter using 2 factor authentication
                    </RuleHeading>
                    <RuleBrief>
                      <div className="mb-3">
                        Anyone on your participants list can join using signin
                        or magic link after 2 factor authentication.
                      </div>

                      <div>Use this for added security. </div>
                    </RuleBrief>
                  </div>
                </EntryRuleGrid>
                <EntryRuleGrid>
                  <FormControlLabel
                    value="invitedUsing2FA"
                    control={
                      <Radio
                        value="Invited only using 2FA"
                        onChange={(event) => {
                          console.log(event.target.value);
                          setEntryRule(event.target.value);
                        }}
                      />
                    }
                    label=""
                  />
                  <AdminPanelSettingsIcon className="mt-2" />
                  <div>
                    <RuleHeading className="mb-2">
                      Invited only using 2 factor authentication
                    </RuleHeading>
                    <RuleBrief>
                      <div className="mb-3">
                        Anyone on your participants list can join using signin
                        or magic link after 2 factor authentication.
                      </div>
                      <div>Use this for added security. </div>
                    </RuleBrief>
                  </div>
                </EntryRuleGrid>
              </RadioGroup>
            </FormControl>
            <button
              onClick={() => {
                dispatch(editEvent({ whoCanEnterEvent: entryRule }, eventId));
              }}
              className="btn btn-primary btn-outline-text"
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

export default WhoCanEnterEvent;