import React from "react";
import styled from "styled-components";
import NoSession from "./../../assets/images/NoSession.svg";

const Paper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: #FFFFFF;
`;

const MsgText = styled.div`
font-weight: 500;
font-family: "Ubuntu";
font-size: 0.85rem;
color: #212121;
`

const NoContent = ({Image, Msg}) => {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Paper className="mb-3">
            <img src={Image} alt={Msg}/>
        </Paper>
        <MsgText>{Msg}</MsgText>
      </div>
    </>
  );
};

export default NoContent;
