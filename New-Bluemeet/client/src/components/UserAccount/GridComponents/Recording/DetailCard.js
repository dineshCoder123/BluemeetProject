import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";

import styled from "styled-components";

import Divider from "@material-ui/core/Divider";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import FourKIcon from "@material-ui/icons/FourK";
import FourK from "@material-ui/icons/FourK";

const ListFieldsStyled = styled.div`
  font-weight: 500;
  font-size: 0.88rem;
  font-family: "Ubuntu";
  color: #152d35;
`;

const RecordingsDetailsCard = ({ handleOpenVideo }) => {
  return (
    <>
      <div className="registrations-list-fields-container">
        <div
          className="registrations-name-field"
          style={{ justifySelf: "start" }}
        >
          <ListFieldsStyled className=" mx-5">
            Protecting your digital assets
          </ListFieldsStyled>
        </div>
        <div className="registrations-email-field">
          <ListFieldsStyled className="">
            Cybersecurity Conference 21
          </ListFieldsStyled>
        </div>
        <div className="registrations-phone-field">
          <ListFieldsStyled className="">2hr 24min</ListFieldsStyled>
        </div>
        <div className="registrations-amount-field">
          <ListFieldsStyled className="">
            <FourKIcon style={{ fill: "#152d35", fontSize: "32" }} />
          </ListFieldsStyled>
        </div>
        
        <div className="registrations-invoice-field">
          <ListFieldsStyled className="">
            <CloudDownloadIcon style={{ fill: "#152d35", fontSize: "32" }} />
          </ListFieldsStyled>
        </div>
      </div>
      <div className="my-3">
        <Divider />
      </div>
    </>
  );
};

export default RecordingsDetailsCard;
