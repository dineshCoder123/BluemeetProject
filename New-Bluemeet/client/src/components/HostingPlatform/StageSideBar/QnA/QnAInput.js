import { IconButton } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import socket from "./../../service/socket";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {showSnackbar} from "./../../../../actions";

const StyledInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 0.5fr;
  grid-gap: 16px;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #152d3f;
  padding: 2px 12px;
`;

const StyledInput = styled.input`
  border: none;
  height: 100%;
  background-color: #ffffff00;
  outline: none;
  color: #ffffff;
`;

const QnAInput = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [ques, setQues] = React.useState(null);

  const { id } = useSelector((state) => state.eventAccessToken);

  const sessionId = params.sessionId;
  const eventId = params.eventId;

  return (
    <>
      <StyledInputWrapper>
        <StyledInput
          type="text"
          placeholder="Ask your question here..."
          value={ques}
          onChange={(e) => {
            setQues(e.target.value);
          }}
        ></StyledInput>
        <IconButton
          onClick={() => {
            if (!ques) {
              dispatch(showSnackbar("info", "Please ask a valid question."))
              return;
            } 

            socket.emit(
              "transmitSessionQnA",
              {
                question: ques,
                askedBy: id,
                createdAt: Date.now(),
                sessionId,
                eventId,
              },
              (error) => {
                if (error) {
                  alert(error);
                }
              }
            );

            setQues(null);
          }}
          className="icon-btn"
        >
          <SendRoundedIcon />
        </IconButton>
      </StyledInputWrapper>
    </>
  );
};

export default QnAInput;
