import React from "react";
import socket from "./../service/socket";
import styled from "styled-components";
import "./../Styles/booth.scss";
import { useDispatch } from "react-redux";
import { SetCurrentBoothId } from "./../../../actions";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const BoothCardContainer = styled.div`
  background-color: #213a42 !important;
  border: 1px solid rgba(255, 255, 255, 0.18);

  &:hover {
    cursor: pointer;
    background-color: #2d434b !important;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const renderTags = (tags) => {
  if (!tags) {
    return;
  } else {
    return tags.map((tag) => {
      return <div className=" booth-tag px-3 py-1 me-2">{tag}</div>;
    });
  }
};

const BoothCard = ({ promoImage, logo, name, tagline, tags, id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <BoothCardContainer
        onClick={() => {
          socket.emit("joinBooth", { boothId: id }, (error) => {
            if (error) {
              alert(error);
            }
          });
          dispatch(SetCurrentBoothId(id));
        }}
        className="booth-card-wrapper px-4 py-3"
      >
        <img
          className="booth-card-poster mb-3"
          src={promoImage}
          alt={name}
        ></img>

        <div className="booth-logo-brand-name-and-short-description d-flex flex-row mb-3">
          <Avatar
            alt={name}
            src={logo}
            variant="rounded"
            className={classes.large}
          />

          <div className="booth-brand-name-and-short-description ms-4">
            <div className="booth-card-brand-name mb-2">{name}</div>
            <div className="booth-card-short-description">{tagline}</div>
          </div>
        </div>
        <div className="booth-card-tags d-flex flex-row align-items-center">
          {renderTags(tags)}
        </div>
      </BoothCardContainer>
    </>
  );
};

export default BoothCard;
