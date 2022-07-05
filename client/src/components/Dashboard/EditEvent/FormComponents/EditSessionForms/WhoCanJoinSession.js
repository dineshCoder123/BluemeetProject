import React, { useEffect, useState } from "react";
import { SwipeableDrawer, IconButton, Avatar } from "@material-ui/core";
import styled from "styled-components";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import LanguageIcon from '@mui/icons-material/Language';
import {
  fetchTickets,
  fetchRegistrationsOfParticularEvent,
  setEntryRestriction,
  setPermittedTickets,
  setPermittedPeople,
} from "./../../../../../actions";

const Grid = styled.div`
  width: 840px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  grid-gap: 24px;
  align-items: center;
`;

const TextMsg = styled.div`
  text-align: center;
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.84rem;
  color: #212121;
`;

const ToggleCard = styled.div`
  background-color: ${(props) =>
    props && props.active ? "#c7c7c7" : "#f5f5f5"};
  border-radius: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 4fr 1fr;
  grid-gap: 16px;
  align-items: center;
  height: 135px;

  &:hover {
    background-color: #c7c7c7;
    cursor: pointer;
  }
`;

const DisplayIcon = styled.div`
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TextHeading = styled.div`
  font-size: 1rem;
  font-weight: 600;
  font-family: "Ubuntu";
  color: #212121;
`;

const TextSmall = styled.div`
  font-size: 0.78rem;
  font-weight: 400;
  font-family: "Ubuntu";
  color: #212121;
`;

const TicketContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  height: 70vh;
`;

const PeopleContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  height: 70vh;
`;

const TicketSelector = styled.div`
  background-color: #ffffff;
  font-size: 0.87rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #585858;

  border-radius: 10px;
  padding: 10px;
`;

const PeopleSelector = styled.div`
  background-color: #ffffff;
  font-size: 0.87rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #585858;

  border-radius: 10px;
  padding: 10px;
`;

const renderTickets = (tickets, setSelectedTickets, selectedTickets) => {
  return tickets
    .slice(0)
    .reverse()
    .map((ticket) => {
      return (
        <TicketSelector className="d-flex flex-row align-items-center justify-content-between mb-3">
          {ticket.name}
          <input
            defaultChecked={selectedTickets.includes(ticket.id)}
            onChange={(e) => {
              setSelectedTickets((prevTickets) => {
                if (e.target.checked) {
                  const newArr = prevTickets.map((el) => el);
                  newArr.push(e.target.value);
                  return newArr;
                } else {
                  return prevTickets.filter((el) => el !== e.target.value);
                }
              });
            }}
            value={ticket.id}
            type="checkbox"
            className="form-check-input"
            style={{ height: "20px", width: "20px" }}
          ></input>
        </TicketSelector>
      );
    });
};

const renderPeopleList = (registrations, setSelectedPeople, selectedPeople) => {
  return registrations
    .slice(0)
    .reverse()
    .map((registration) => {
      return (
        <PeopleSelector className="d-flex flex-row align-items-center justify-content-between mb-3">
          <Avatar
            src={
              registration.userImage.startsWith("https://")
                ? registration.userImage
                : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${registration.userImage}`
            }
          />
          {registration.userName}
          <input
            defaultChecked={selectedPeople.includes(registration.bookedByUser)}
            value={registration.bookedByUser}
            onChange={(e) => {
              setSelectedPeople((prevPeople) => {
                if (e.target.checked) {
                  const newArr = prevPeople.map((el) => el);
                  newArr.push(e.target.value);
                  return newArr;
                } else {
                  return prevPeople.filter((el) => el !== e.target.value);
                }
              });
            }}
            type="checkbox"
            className="form-check-input"
            style={{ height: "20px", width: "20px" }}
          ></input>
        </PeopleSelector>
      );
    });
};

const WhoCanJoinSession = ({
  open,
  handleClose,
}) => {

  const { entryRestriction, permittedTickets, permittedPeople } = useSelector(
    (state) => state.sessionRestriction
  );

  const params = useParams();
  const id = params.id;
  const eventId = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets(id));

    dispatch(fetchRegistrationsOfParticularEvent(eventId));
  }, [dispatch, eventId, id]);

  const { tickets } = useSelector((state) => state.ticket);
  const { registrations } = useSelector((state) => state.registration);

  const [selectedTab, setSelectedTab] = useState(entryRestriction);
  const [selectedTickets, setSelectedTickets] = useState(permittedTickets);
  const [selectedPeople, setSelectedPeople] = useState(permittedPeople);

  

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
          <div className="px-4 pt-4 pb-3">
            <div className="form-heading-and-close-button mb-4">
              <div></div>
              <div
                className="coupon-overlay-form-headline"
                style={{ fontSize: "0.9rem" }}
              >
                Control who can join
              </div>
              <div
                className="overlay-form-close-button"
                onClick={() => {
                  // dispatch(setEntryRestriction(null));
                  // handleClose();
                }}
              >
                {/* <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton> */}
              </div>
            </div>
          </div>

          <Grid className="px-4 pt-1 pb-4">
            {/* Ticket holders or select people */}
            <div
              className="pe-3"
              style={{ borderRight: "1px solid #D8D8D8", height: "100%" }}
            >
              <ToggleCard
                active={selectedTab === null ? true : false}
                onClick={() => {
                  setSelectedTab(null);
                  dispatch(setEntryRestriction(null));
                }}
              >
                <DisplayIcon>
                  <LanguageIcon
                    style={{ fontSize: "2.5rem" }}
                  ></LanguageIcon>
                </DisplayIcon>
                <div>
                  <TextHeading>Everyone who is registered</TextHeading>
                  <TextSmall>
                    This appplies by default and provides access to all attendees.
                  </TextSmall>
                </div>
                <KeyboardArrowRightRoundedIcon
                  style={{ justifySelf: "center" }}
                />
              </ToggleCard>
              <hr />
              <ToggleCard
                active={selectedTab === "ticketHolders" ? true : false}
                onClick={() => {
                  setSelectedTab("ticketHolders");

                  dispatch(setEntryRestriction("ticketHolders"));
                }}
              >
                <DisplayIcon>
                  <ConfirmationNumberIcon
                    style={{ fontSize: "2.5rem" }}
                  ></ConfirmationNumberIcon>
                </DisplayIcon>
                <div>
                  <TextHeading>Ticket holders</TextHeading>
                  <TextSmall>
                    Select the ticket types to be allowed access to the session
                  </TextSmall>
                </div>
                <KeyboardArrowRightRoundedIcon
                  style={{ justifySelf: "center" }}
                />
              </ToggleCard>
              <hr />

              <ToggleCard
                active={selectedTab === "specificPeople" ? true : false}
                onClick={() => {
                  setSelectedTab("specificPeople");

                  dispatch(setEntryRestriction("people"));
                }}
              >
                <DisplayIcon>
                  <PeopleOutlineRoundedIcon
                    style={{ fontSize: "2.5rem" }}
                  ></PeopleOutlineRoundedIcon>
                </DisplayIcon>
                <div>
                  <TextHeading>Choose list of people</TextHeading>
                  <TextSmall>
                    Select people to be allowed access to the session
                  </TextSmall>
                </div>
                <KeyboardArrowRightRoundedIcon
                  style={{ justifySelf: "center" }}
                />
              </ToggleCard>
            </div>

            {/* Corresponding Ui */}
            <div>
              {(() => {
                switch (selectedTab) {
                  case "ticketHolders":
                    return (
                      <TicketContainer>
                        <TextHeading
                          style={{ fontWeight: "500", fontSize: "0.9rem" }}
                          className="mb-4"
                        >
                          Select tickets
                        </TextHeading>

                        {typeof tickets !== "undefined" &&
                        tickets.length > 0 ? (
                          renderTickets(
                            tickets,
                            setSelectedTickets,
                            selectedTickets
                          )
                        ) : (
                          <div
                            className=" d-flex flex-column justify-content-between align-items-center px-3 py-5"
                            style={{
                              maxHeight: "160px",
                              maxWidth: "200px !important",
                              background: "#ffffff",
                              boxShadow: "0px 0px 30px rgb(176 195 211 / 16%)",
                              borderRadius: "20px",
                            }}
                          >
                            <TextMsg className="">
                              Please add tickets to your event to restrict by
                              ticket types.
                            </TextMsg>
                          </div>
                        )}
                      </TicketContainer>
                    );

                  case "specificPeople":
                    return (
                      <>
                        <PeopleContainer>
                          <TextHeading
                            style={{ fontWeight: "500", fontSize: "0.9rem" }}
                            className="mb-4"
                          >
                            Select people (323)
                          </TextHeading>

                          {typeof registrations !== "undefined" &&
                          registrations.length > 0 ? (
                            renderPeopleList(
                              registrations,
                              setSelectedPeople,
                              selectedPeople
                            )
                          ) : (
                            <div
                              className=" d-flex flex-column justify-content-between align-items-center px-3 py-5"
                              style={{
                                maxHeight: "160px",
                                maxWidth: "200px !important",
                                background: "#ffffff",
                                boxShadow:
                                  "0px 0px 30px rgb(176 195 211 / 16%)",
                                borderRadius: "20px",
                              }}
                            >
                              <TextMsg className="">
                                There are no attendees yet to choose from.
                                Please spread word about your event.
                              </TextMsg>
                            </div>
                          )}
                        </PeopleContainer>
                      </>
                    );

                  default:
                    break;
                }
              })()}

              { <button
                onClick={() => {
                  // setAllowedTicketTypes(selectedTickets);
                  // setAllowedPeople(selectedPeople);
                  dispatch(setPermittedTickets(selectedTickets));
                  dispatch(setPermittedPeople(selectedPeople));
                  handleClose();
                }}
                className="btn btn-primary btn-outline-text mt-5"
                style={{ width: "100%" }}
              >
                Done
              </button> }
            </div>
          </Grid>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default WhoCanJoinSession;
