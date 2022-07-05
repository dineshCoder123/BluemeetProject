import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Bored from "./../../assets/images/Bored.png";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";

const Text = styled.div`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
`;

const YouHaveNoEventComing = (props) => {
  return (
    <div
      className="you-have-no-event-coming-card d-flex flex-column justify-content-between align-items-center px-3 py-5"
      style={{ maxWidth: "400px" }}
    >
      <img
        src={props.img ? props.img : Bored}
        alt="Bored"
        className="mb-4"
        style={{ maxHeight: "250px", maxWidth: "340px", borderRadius: "20px" }}
      />
      <Text className="mb-4">{props.msgText}</Text>

      {props.hideBtn ? (
        <></>
      ) : (
        <Link
          to={"/search-events"}
          className="btn btn-text-customised btn-color-customised btn-primary btn-outline-text"
        >
          <ExploreRoundedIcon style={{ fontSize: "22px" }} />
          <span className="ms-2"> Explore Events </span>
        </Link>
      )}
    </div>
  );
};

export default YouHaveNoEventComing;
