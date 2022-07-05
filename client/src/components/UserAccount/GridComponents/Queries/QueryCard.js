import React from "react";

import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import "./../../../../assets/Sass/Reviews.scss";
import { useDispatch, useSelector } from "react-redux";
import Faker from 'faker';
import styled from "styled-components";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Chip from "@mui/material/Chip";


const QueryRaisingPersonName = styled.div`
  font-weight: 500 !important;
  font-family: "Ubuntu" !important;
  color: #212121 !important;
  font-size: 0.85rem !important;
`;

const QueryTextStyled = styled.div`
  font-weight: 500 !important;
  font-family: "Ubuntu" !important;
  color: #2f2f2f !important;
  font-size: 0.88rem !important;
`;



const QueryCard = ({
  id,
  userImgUrl,
  userName,
  forEvent,
  queryIs,
  userIs,
  questionText,
  answer,
  handleOpenEditQuery
}) => {
  const dispatch = useDispatch();

//   const {error, isLoading} = useSelector((state) => state.query);

  const [answerText, setAnswerText] = React.useState(answer);

  const [state, setState] = React.useState({
    openSuccess: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openSuccess } = state;

  const handleCloseSuccess = () => {
    setState({ vertical: "top", horizontal: "center", openSuccess: false });
  };

//   if(isLoading) {
//     return (<div className="d-flex flex-row align-items-center justify-content-center" style={{width: "100%", height: "80vh"}}> <Loader /> </div>);
//   }

//   if(error) {
//     dispatch(errorTrackerForAnswerQuery());
//     alert(error);
//     return;
//   }

  return (
    <div className="review-card-wrapper px-4 py-3 mb-3" style={{minHeight: "125px"}}>
      <div className="user-name-event-and-star-rating-row d-flex flex-row justify-content-between mb-3">
        <div className=" d-flex flex-row align-items-center">
          <Avatar alt={userName} src={Faker.image.avatar()} variant="rounded" />
          <QueryRaisingPersonName className="ms-3 px-2 registration-name-styled">{Faker.name.findName()}</QueryRaisingPersonName>
        </div>

        <div className="d-flex flex-row align-items-center">
        <Chip
        onClick={handleOpenEditQuery}
            icon={<ModeEditOutlineRoundedIcon style={{ fontSize: "17px" }} />}
            label="edit"
            variant="outlined"
            className="me-3"
            clickable
          />
          <div className="me-3 px-3 py-2 event-name-chip-review">
            {"Blue Event 21"}
          </div>
          {queryIs === "Unresolved" ? (
            <div
              className="me-3 px-3 py-2 answered-status-chip"
              style={{ color: "#F6455D", backgroundColor: "#F7536983" }}
            >
              Unresolved
            </div>
          ) : (
            <div className="me-3 px-3 py-2 answered-status-chip">Resolved</div>
          )}

          <div className="me-3 px-3 py-2 user-registration-status-chip">
            {"Registered"}
          </div>
        </div>
      </div>

      <QueryTextStyled
        className="query-text-dashboard mb-2"
        style={{ fontWeight: "500", color: "#212121", fontFamily: "Inter" }}
      >
        {"Can I attend this event with my friends or share my ticket with them?"}
      </QueryTextStyled>

    </div>
  );
};

export default QueryCard;
