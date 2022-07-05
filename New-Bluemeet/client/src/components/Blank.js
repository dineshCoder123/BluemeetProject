import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import history from "./../history";
import { connectMailchimp } from "../actions";

const Blank = () => {
  const dispatch = useDispatch();

  const { communityDetails } = useSelector((state) => state.community);
  const { userDetails } = useSelector((state) => state.user);

  const urlSearchParams = new URLSearchParams(window.location.search);

  const query = Object.fromEntries(urlSearchParams.entries());

  console.log(query.code, communityDetails._id, userDetails._id);

  useEffect(() => {
    dispatch(connectMailchimp(query.code, communityDetails._id, userDetails._id));
  }, []);

  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex flex-row align-items-center justify-content-center"
      >
        <div class="spinner-border text-primary" role="status">
        </div>
      </div>
    </>
  );
};

export default Blank;
