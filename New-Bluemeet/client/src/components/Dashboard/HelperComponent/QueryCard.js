import React from "react";

import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import "./../../../assets/Sass/Reviews.scss";
import { useDispatch, useSelector } from "react-redux";
import { answerQuery, errorTrackerForAnswerQuery } from "../../../actions";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Loader from "../../Loader";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const QueryCard = ({
  id,
  userImgUrl,
  userName,
  forEvent,
  queryIs,
  userIs,
  questionText,
  answer,
}) => {
  const dispatch = useDispatch();

  const {error, isLoading} = useSelector((state) => state.query);

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

  if(isLoading) {
    return (<div className="d-flex flex-row align-items-center justify-content-center" style={{width: "100%", height: "80vh"}}> <Loader /> </div>);
  }

  if(error) {
    dispatch(errorTrackerForAnswerQuery());
    alert(error);
    return;
  }

  return (
    <div className="review-card-wrapper px-4 py-3 mb-3">
      <div className="user-name-event-and-star-rating-row d-flex flex-row justify-content-between mb-3">
        <div className=" d-flex flex-row align-items-center">
          <Avatar alt={userName} src={userImgUrl} variant="rounded" />
          <div className="ms-3 px-2 registration-name-styled">{userName}</div>
        </div>

        <div className="d-flex flex-row align-items-center">
          <div className="me-3 px-3 py-2 event-name-chip-review">
            {forEvent}
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
            {userIs}
          </div>
        </div>
      </div>

      <div
        className="query-text-dashboard mb-2"
        style={{ fontWeight: "500", color: "#212121", fontFamily: "Inter" }}
      >
        {questionText}
      </div>

      <div className="divider-wrapper" style={{ margin: "2.2% 0" }}>
        <Divider />
      </div>

      <div className="query-answer-input-d-row mb-2">
        <div>
          <textarea
            type="text"
            className="form-control query-answer-input"
            id="queryAnswer"
            placeholder="Answer this question"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
        </div>
        <div>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() => {
              if (answerText !== null) {
                dispatch(answerQuery(answerText, id));
                setState({
                  vertical: "top",
                  horizontal: "center",
                  openSuccess: true,
                });
              }
            }}
          >
            <SendRoundedIcon style={{ fill: "#538BF7" }} />
          </IconButton>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSuccess}
        onClose={handleCloseSuccess}
        autoHideDuration={4000}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Your answer is successfully recieved.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default QueryCard;
