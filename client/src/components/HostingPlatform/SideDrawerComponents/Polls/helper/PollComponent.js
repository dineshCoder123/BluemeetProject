import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import "./../../../../../index.css";
import "./../../../Styles/root.scss";
import socket from "./../../../service/socket";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import Faker from 'faker';

function MyTimer({ expiryTimestamp, markPollAsExpired }) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.warn("onExpire called");
      markPollAsExpired();
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div className=" py-2 px-4" style={{ fontSize: "0.85rem" }}>
        <span className="mx-1">{minutes}</span> min
        <span className="mx-1">{seconds}</span>s
      </div>
    </div>
  );
}

const PollComponent = ({
  id,
  question,
  option_1,
  option_1_count,
  option_2,
  option_2_count,
  option_3,
  option_3_count,
  option_4,
  option_4_count,
  expiresAt,
  hostName,
  hostImage,
  organisation,
  designation,
}) => {
  console.log(expiresAt);

  let totalVotes;
  totalVotes =
    option_1_count + option_2_count + option_3_count + option_4_count;

  if (totalVotes === 0) {
    totalVotes = 1;
  }

  const per_1 = ((option_1_count * 1) / totalVotes) * 1 * 100;
  const per_2 = ((option_2_count * 1) / totalVotes) * 1 * 100;
  const per_3 = ((option_3_count * 1) / totalVotes) * 1 * 100;
  const per_4 = ((option_4_count * 1) / totalVotes) * 1 * 100;

  const [expired, setExpired] = useState(false);
  const [displayResult, setDisplayResult] = useState("none");

  const { _id } = useSelector((state) => state.user.userDetails);

  let color = "#538BF7";

  if (expired) {
    color = "#696868";
  }

  const pollOptionStyle = {
    color: color,
    border: `1px solid ${color}`,
    position: "relative",
  };

  const markPollAsExpired = () => {
    setExpired(true);
    setDisplayResult("inline-block");
  };

  return (
    <>
      <div className="poll-element-wrapper p-3 mb-3">

      <div
            className=" mb-4"
            style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
          >
            <Avatar src={Faker.image.avatar()} alt={Faker.name.findName()} variant="rounded" />
            <div
              className="chat-box-name ms-3"
              style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
            >
              <div>{Faker.name.findName()}</div>

              <div
                style={{
                  fontWeight: "500",
                  color: "#4B4B4B",
                  fontSize: "0.7rem",
                }}
                className="d-flex flex-row align-items-center justify-content-between"
              >
                <div>Product Manager, Evenz</div>

                <div>3m ago</div>
              </div>
            </div>
          </div>


        <div className="poll-question mb-4">Q. <span style={{fontSize: "0.9rem"}}> {question} </span>  </div>

        {option_1 ? (
          <div
            className="poll-option  mb-3"
            style={pollOptionStyle}
            onClick={() => {
              if (expired) return setDisplayResult("inline-block");
              console.log("selected poll", `${id}`);
              console.log("selected option", `option_1`);
              console.log("voter Id", _id);
              socket.emit(
                "updatePoll",
                {
                  userId: _id,
                  selectedPoll: `${id}`,
                  selectedOption: "option_1",
                },
                (error) => {
                  if (error) {
                    alert(error);
                  }
                }
              );
              setDisplayResult("inline-block");
            }}
          >
            <div
              style={{
                position: "absolute",
                width: `${per_1}%`,
                backgroundColor: "#4C85F03F",
                height: "35px",
                borderRadius: "5px",
                display: displayResult,
              }}
            ></div>
            <div className="p-2 d-flex flex-row align-items-center justify-content-between">
              <div>{option_1}</div>

              <div style={{ color: "#538BF7", display: displayResult }}>
                {per_1}%
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {option_2 ? (
          <div
            className="poll-option mb-3"
            style={pollOptionStyle}
            onClick={() => {
              if (expired) return setDisplayResult("inline-block");
              console.log("selected poll", `${id}`);
              console.log("selected option", `option_2`);
              console.log("voter Id", _id);
              socket.emit(
                "updatePoll",
                {
                  userId: _id,
                  selectedPoll: `${id}`,
                  selectedOption: "option_2",
                },
                (error) => {
                  if (error) {
                    alert(error);
                  }
                }
              );
              setDisplayResult("inline-block");
            }}
          >
            <div
              style={{
                position: "absolute",
                width: `${per_2}%`,
                backgroundColor: "#4C85F03F",
                height: "35px",
                borderRadius: "5px",
                display: displayResult,
              }}
            ></div>
            <div className="p-2 d-flex flex-row align-items-center justify-content-between">
              <div>{option_2}</div>

              <div style={{ color: "#538BF7", display: displayResult }}>
                {per_2}%
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {option_3 ? (
          <div
            className="poll-option  mb-3"
            style={pollOptionStyle}
            onClick={() => {
              if (expired) return setDisplayResult("inline-block");
              console.log("selected poll", `${id}`);
              console.log("selected option", `option_3`);
              console.log("voter Id", _id);
              socket.emit(
                "updatePoll",
                {
                  userId: _id,
                  selectedPoll: `${id}`,
                  selectedOption: "option_3",
                },
                (error) => {
                  if (error) {
                    alert(error);
                  }
                }
              );
              setDisplayResult("inline-block");
            }}
          >
            <div
              style={{
                position: "absolute",
                width: `${per_3}%`,
                backgroundColor: "#4C85F03F",
                height: "35px",
                borderRadius: "5px",
                display: displayResult,
              }}
            ></div>
            <div className="p-2 d-flex flex-row align-items-center justify-content-between">
              <div>{option_3}</div>

              <div style={{ color: "#538BF7", display: displayResult }}>
                {per_3}%
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {option_4 ? (
          <div
            className="poll-option mb-3"
            style={pollOptionStyle}
            onClick={() => {
              if (expired) return setDisplayResult("inline-block");
              console.log("selected poll", `${id}`);
              console.log("selected option", `option_4`);
              console.log("voter Id", _id);
              socket.emit(
                "updatePoll",
                {
                  userId: _id,
                  selectedPoll: `${id}`,
                  selectedOption: "option_4",
                },
                (error) => {
                  if (error) {
                    alert(error);
                  }
                }
              );
              setDisplayResult("inline-block");
            }}
          >
            <div
              style={{
                position: "absolute",
                width: `${per_4}%`,
                backgroundColor: "#4C85F03F",
                height: "35px",
                borderRadius: "5px",
                display: displayResult,
              }}
            ></div>
            <div className="p-2 d-flex flex-row align-items-center justify-content-between">
              <div>{option_4}</div>

              <div style={{ color: "#538BF7", display: displayResult }}>
                {per_4}%
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* <div className="poll-option px-2 py-2 mb-3">
          Through an ad on internet
        </div> */}
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="time-left-poll-text">Time Left</div>
          <div className="time-left-in-min">
            {expired ? (
              <div>Poll expired</div>
            ) : (
              <MyTimer
                expiryTimestamp={expiresAt * 1}
                markPollAsExpired={markPollAsExpired}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PollComponent;
