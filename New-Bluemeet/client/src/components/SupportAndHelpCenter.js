import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import history from "../history";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
  align-items: center;
`;

const Card = styled.div`
  -webkit-border-radius: 50px;
  border-radius: 50px;
  background: #d1d8ec;
  -webkit-box-shadow: 12px 12px 24px #b2b8c9, -12px -12px 24px #f0f8ff;
  box-shadow: 12px 12px 24px #b2b8c9, -12px -12px 24px #f0f8ff;

  border-radius: 10px;

  height: 240px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SupportAndHelpCenter = () => {
  return (
    <>
      <Container className="container px-5 mb-4">
        <div style={{ backgroundColor: "#ffffff" }}>
          <Card>
            <SupportRoundedIcon
              style={{ color: "#538BF7", fontSize: "6rem" }}
            />
          </Card>
          <div
            style={{}}
            className="d-flex flex-row align-items-center justify-content-end py-3 px-2"
          >
              <Link to={"/contact-us"}>
              <button
            //   onClick={() => {
            //     history.push("/contact-us");
            //   }}
              className="btn btn-outline-text btn-outline-primary"
            >
              <span> Contact support </span>
              <ArrowForwardRoundedIcon className="ms-2" />
            </button>
              </Link>
           
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff" }}>
          <Card>
            <HelpRoundedIcon style={{ color: "#659E0A", fontSize: "6rem" }} />
          </Card>
          <div
            style={{}}
            className="d-flex flex-row align-items-center justify-content-end py-3 px-2"
          >
            <a
              href="https://bluemeetinc.zendesk.com/hc/en-us"
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-outline-text btn-outline-primary">
                <span> Visit Help center </span>
                <ArrowForwardRoundedIcon className="ms-2" />
              </button>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SupportAndHelpCenter;
