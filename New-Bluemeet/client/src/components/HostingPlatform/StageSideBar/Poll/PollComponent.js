import React from "react";
import styled from "styled-components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Avatar, IconButton } from "@material-ui/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useTimer } from "react-timer-hook";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import socket from "./../../service/socket";
import DeletePoll from "./DeletePoll";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const PollBody = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;

  background: #152d3509;
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const PollQues = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  font-family: "Ubuntu";
  color: #152d35;
  letter-spacing: 0.1px;
`;

const PollOption = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 6fr 1fr;
  align-items: center;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #ffffff;

  border: 1px solid #152d35;
  border-radius: 5px;
  padding: 5px 10px;
  position: relative;
`;

const IndividualPollCount = styled.div`
  color: #152d35;
  justify-self: end;
`;

const TotalPollVotes = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #ffffff;
`;

const TimeLeft = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #ffffff;
`;

const PersonName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #212121;
  display: block;
`;

const UserRoleTag = styled.div`
  background-color: #152d35;
  height: max-content;
  border-radius: 5px;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.7rem;
  color: #ffffff;

  padding: 4px 8px;
`;

const PollFill = styled.div`
  height: 100%;
  width: ${(props) => props.width && props.width};
  position: absolute;
  background-color: #152d3528;
  border-radius: 5px;
`;

const BtnOutlined = styled.div`
  padding: 5px 8px;
  background-color: transparent;
  border: 1px solid #ffffff00;

  color: #ffffff;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #152d35;

  &:hover {
    border: 1px solid #345b63;
    background-color: #ffffff00;
    cursor: pointer;
  }
`;
const BtnSubmitted = styled.div`
  padding: 5px 8px;
  background-color: transparent;
  border: 1px solid #345b63;

  color: #ffffff;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

function MyTimer({ expiryTimestamp, setExpired }) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.warn("onExpire called");
      setExpired(true);
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div
        className=" py-2 px-2"
        style={{ fontSize: "0.8rem", fontFamily: "Ubuntu" }}
      >
        <span className="mx-1">{minutes}</span> m
        <span className="mx-1">{seconds}</span>s
      </div>
    </div>
  );
}

const renderPollOptions = (
  options,
  totalVotes,
  expired,
  votedByMe,
  votedOption,
  currentUserIsAHost,
  currentUserIsASpeaker,
  whoCanSeeAnswers
) => {
  return options.map((element) => {
    let percent = 0;

    if (!totalVotes * 1 === 0) {
      percent = ((element.votedBy.length * 1) / totalVotes) * 1 * 100;
    }

    return (
      <PollOption className="mb-3">
        {(() => {
          switch (whoCanSeeAnswers) {
            case "Organiser only":
              if (currentUserIsAHost) {
                return (
                  <PollFill
                    width={
                      totalVotes * 1 === 0 ? "0%" : `${percent.toFixed(1)}%`
                    }
                  />
                );
              }
              break;

            case "Everyone":
              return (
                <PollFill
                  width={totalVotes * 1 === 0 ? "0%" : `${percent.toFixed(1)}%`}
                />
              );

            case "Organiser and speakers":
              if (currentUserIsAHost || currentUserIsASpeaker) {
                return (
                  <PollFill
                    width={
                      totalVotes * 1 === 0 ? "0%" : `${percent.toFixed(1)}%`
                    }
                  />
                );
              }
              return;

            default:
              break;
          }
        })()}

        <div>
          <FormControlLabel
            value={element._id}
            control={
              <Radio
                // checked={votedOption.toString() === element._id.toString()}
                disabled={expired || votedByMe ? true : false}
              />
            }
          />
        </div>
        {element.option}
        {(() => {
          switch (whoCanSeeAnswers) {
            case "Organiser only":
              if (currentUserIsAHost) {
                return (
                  <IndividualPollCount className="ms-2">
                    {element.votedBy.length * 1 === 0 ? (
                      <></>
                    ) : (
                      element.votedBy.length
                    )}{" "}
                  </IndividualPollCount>
                );
              }
              break;

            case "Everyone":
              return (
                <IndividualPollCount className="ms-2">
                  {element.votedBy.length * 1 === 0 ? (
                    <></>
                  ) : (
                    element.votedBy.length
                  )}{" "}
                </IndividualPollCount>
              );

            case "Organiser and speakers":
              if (currentUserIsAHost || currentUserIsASpeaker) {
                return (
                  <IndividualPollCount className="ms-2">
                    {element.votedBy.length * 1 === 0 ? (
                      <></>
                    ) : (
                      element.votedBy.length
                    )}{" "}
                  </IndividualPollCount>
                );
              }
              return;

            default:
              break;
          }
        })()}
      </PollOption>
    );
  });
};

const PollComponent = ({
  question,
  options,
  askedByName,
  askedByImage,
  askedByOrganisation,
  askedByDesignation,
  id,
  createdAt,
  expiresAt,
  showOnStage,
  votedBy,
  currentUserIsAHost,
  currentUserIsASpeaker,
  runningStatus,
  whoCanSeeAnswers,
}) => {
  let totalVotes = 0;
  let neverExpires = false;
  let votedByMe = false;
  let votedOption;

  const params = useParams();

  const sessionId = params.sessionId;
  const eventId = params.eventId;

  const userId = useSelector((state) => state.eventAccessToken.id);

  const [value, setValue] = React.useState(votedByMe ? votedOption : null); // This needs to be initialised with the selected options id and if no option is selected then just show no option as selected

  const [expired, setExpired] = React.useState(false);

  const [openDeletePoll, setOpenDeletePoll] = React.useState(false);

  const handleCloseDeletePoll = () => {
    setOpenDeletePoll(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value, "This is the selected options Id");
  };

  if (!expiresAt) {
    neverExpires = true;
  }

  for (let element of options) {
    totalVotes = totalVotes + element.votedBy.length;
  }

  if (votedBy.includes(userId)) {
    votedByMe = true;
  }

  if (votedByMe) {
    for (let element of options) {
      if (element.votedBy.includes(userId)) {
        votedOption = element._id;
        console.log(votedOption);
      }
    }
  }

  const handleSubmit = () => {
    socket.emit(
      "submitSessionPollAns",
      { pollId: id, optionId: value, voter: userId, sessionId: sessionId },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <PollBody className="mb-3">
        <div className="d-flex flex-row mb-4 justify-content-between">
          <div className="d-flex flex-row">
            <Avatar
              src={askedByImage}
              alt={askedByName}
              variant="rounded"
              className="me-3"
            />
            <div>
              <PersonName>{askedByName}</PersonName>
              <PersonName>
                {(askedByDesignation, askedByOrganisation)}
              </PersonName>
            </div>
          </div>

          {/* <UserRoleTag>Host</UserRoleTag> */}
          <UserRoleTag>
            {timeAgo.format(new Date(createdAt), "round")}
          </UserRoleTag>
        </div>

        <PollQues className="mb-3">{question}</PollQues>

        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            defaultValue={votedOption} //
            onChange={handleChange}
          >
            {renderPollOptions(
              options,
              totalVotes,
              expired,
              votedByMe,
              votedOption,
              currentUserIsAHost,
              currentUserIsASpeaker,
              whoCanSeeAnswers
            )}
          </RadioGroup>
        </FormControl>

        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          {totalVotes * 1 === 0 ? (
            <Chip
              label="No votes yet"
              variant="outlined"
              style={{ fontWeight: "500" }}
            />
          ) : (
            <TotalPollVotes>{totalVotes} votes total</TotalPollVotes>
          )}

          {/* */}
          {neverExpires ? (
            <></>
          ) : expired ? (
            <Chip label="Expired" color="error" style={{ fontWeight: "500" }} />
          ) : (
            <Chip
              label={
                <MyTimer
                  expiryTimestamp={expiresAt * 1}
                  setExpired={setExpired}
                />
              }
              color="success"
              style={{ fontWeight: "500" }}
            />
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gridGap: "24px",
            alignItems: "center",
          }}
        >
          {currentUserIsAHost ? (
            <div className="d-flex flex-row align-items-center">
              <IconButton
                className="me-1"
                onClick={() => {
                  setOpenDeletePoll(true);
                }}
              >
                <DeleteRoundedIcon />
              </IconButton>
              {runningStatus === "In Progress" ? (
                showOnStage ? (
                  <button
                    onClick={() => {
                      socket.emit(
                        "hideSessionPollFromStage",
                        { pollId: id, sessionId, eventId },
                        (error) => {
                          if (error) {
                            alert(error);
                          }
                        }
                      );
                    }}
                    className="btn btn-outline-text btn-dark me-3"
                  >
                    Hide from stage
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      socket.emit(
                        "showSessionPollOnStage",
                        { pollId: id, sessionId, eventId },
                        (error) => {
                          if (error) {
                            alert(error);
                          }
                        }
                      );
                    }}
                    className="btn btn-outline-text btn-outline-dark me-3"
                  >
                    Show on stage
                  </button>
                )
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div></div>
          )}

          <div className="d-flex flex-row align-items-center justify-content-end">
            {votedByMe ? (
              <BtnSubmitted>Submitted</BtnSubmitted>
            ) : expired ? (
              <></>
            ) : (
              <BtnOutlined onClick={handleSubmit}>Submit</BtnOutlined>
            )}
          </div>
        </div>
      </PollBody>
      <DeletePoll
        open={openDeletePoll}
        handleClose={handleCloseDeletePoll}
        id={id}
        question={question}
        askedByName={askedByName}
        askedByImage={askedByImage}
        askedByOrganisation={askedByOrganisation}
        askedByDesignation={askedByDesignation}
        createdAt={createdAt}
      />
    </>
  );
};

export default PollComponent;
