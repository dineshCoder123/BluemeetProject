import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteQnA from "./DeleteQnA";
import socket from "./../../service/socket";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showSnackbar } from "./../../../../actions";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const QnABody = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;

  background: #152d3509;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const PersonName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #212121;
  display: block;
`;

const UserRoleTag = styled.div`
  /* background-color: #152d35; */
  height: max-content;
  border-radius: 5px;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.7rem;
  color: #ffffff;

  padding: 4px 8px;
`;

const QuesText = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.85rem;
  color: #ffffff;
`;

const UpvoteWidget = styled.div`
  padding: 4px 10px;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 5px;

  background-color: transparent;
  color: #152d35;
  border: 1px solid #152d35;

  &:hover {
    cursor: pointer;
  }
`;

const TextAreaWidget = styled.textarea`
  padding: 5px 10px;
  border-radius: 5px;
  width: 100%;
  /* background-color: #345b63; */
  background-color: transparent;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;

  color: #212121;

  &:focus {
    border: 1px solid #152d35;
    outline: none;
  }
`;

const StyledOutlineButton = styled.button`
  border: 1px solid #152d35 !important;
  color: #152d35 !important;

  &:hover {
    background-color: #152d35 !important;
    color: #ffffff !important;
  }
`;

const UnansweredQnA = ({
  id,
  question,
  upvotes,
  upvotedBy,
  askedByName,
  askedByImage,
  askedByOrganisation,
  askedByDesignation,
  createdAt,
  showOnStage,
  runningStatus,
  currentUserIsAHost,
}) => {
  const dispatch = useDispatch();

  let upvotedByMe = false;

  const [answer, setAnswer] = React.useState(null);

  const params = useParams();
  const [openDelete, setOpenDelete] = React.useState(false);

  const sessionId = params.sessionId;
  const eventId = params.eventId;
  const userId = useSelector((state) => state.eventAccessToken.id);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Check if this user has upvoted this question

  if (upvotedBy.includes(userId)) {
    upvotedByMe = true;
  }

  return (
    <>
      <QnABody className="mb-3">
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

          <UserRoleTag>
            {timeAgo.format(new Date(createdAt), "round")}
          </UserRoleTag>
        </div>

        <div className="d-flex flex-row align-items-center mb-3">
          {upvotedByMe ? (
            <UpvoteWidget
              style={{ backgroundColor: "#152d35", color: "#ffffff" }}
              onClick={() => {
                runningStatus === "Ended"
                  ? dispatch(
                      showSnackbar(
                        "info",
                        "You can only upvote a question when session is live."
                      )
                    )
                  : socket.emit(
                      "downvoteQnA",
                      {
                        qnaId: id,
                        sessionId,
                        userId,
                      },
                      (error) => {
                        if (error) {
                          alert(error);
                        }
                      }
                    );
              }}
              className="me-3"
            >
              <ExpandLessRoundedIcon />
              <div>{upvotes}</div>
            </UpvoteWidget>
          ) : (
            <UpvoteWidget
              onClick={() => {
                socket.emit(
                  "upvoteQnA",
                  {
                    qnaId: id,
                    sessionId,
                    userId,
                  },
                  (error) => {
                    if (error) {
                      alert(error);
                    }
                  }
                );
              }}
              className="me-3"
            >
              <ExpandLessRoundedIcon />
              <div>{upvotes}</div>
            </UpvoteWidget>
          )}

          <QuesText>{question}</QuesText>
        </div>
        <TextAreaWidget
          disabled={
            runningStatus === "In Progress"
              ? false
              : true
          }
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          className="mb-2"
        ></TextAreaWidget>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <StyledOutlineButton
            onClick={() => {
              if (!answer) {
                dispatch(
                  showSnackbar("info", "Please reply with a valid answer.")
                );
                return;
              }

              socket.emit(
                "answerQnA",
                {
                  answer,
                  qnaId: id,
                  answeredAt: Date.now(),
                  sessionId,
                  answeredBy: userId,
                },
                (error) => {
                  if (error) {
                    alert(error);
                  }
                }
              );

              setAnswer(null);
            }}
            className="btn btn-outline-text btn-outline-primary"
          >
            Submit
          </StyledOutlineButton>

          {currentUserIsAHost ? (
            <div className="d-flex flex-row align-items-center justify-content-end">
              {runningStatus === "In Progress" ? (
                showOnStage ? (
                  <button
                    onClick={() => {
                      socket.emit(
                        "hideQnAFromStage",
                        { qnaId: id, sessionId, eventId },
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
                        "showQnAOnStage",
                        { qnaId: id, sessionId, eventId },
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

              <IconButton
                onClick={() => {
                  handleOpenDelete();
                }}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
        </div>
      </QnABody>
      <DeleteQnA
        id={id}
        question={question}
        askedByName={askedByName}
        askedByImage={askedByImage}
        askedByOrganisation={askedByOrganisation}
        askedByDesignation={askedByDesignation}
        createdAt={createdAt}
        open={openDelete}
        handleClose={handleCloseDelete}
      />
    </>
  );
};

export default UnansweredQnA;
