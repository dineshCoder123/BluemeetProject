import React from "react";
import styled from "styled-components";
import Build from "./../../../assets/images/build-with-bluemeet.svg";
import BuildWithBluemeetForm from "./MoreIntegrations/BuildWithBluemeetForm";

const Paper = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 170px;
  background-color: #e9a0a0;

  box-shadow: 0 8px 32px 0 rgb(196 198 219 / 37%);
  backdrop-filter: blur(4px);
`;

const ImageContainer = styled.img`
  height: 170px;
  width: 170px;
  object-fit: contain;
`;

const Heading = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 1.4rem;
  color: #212121;
`;

const SubHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #5d5d5d;
`;

const StyledButton = styled.button`
  border-radius: 25px !important;
  padding: 10px 20px !important;
  font-weight: 500 !important;
  font-family: "Ubuntu" !important;
  font-size: 1rem !important;
`;

const BuildWithBluemeet = () => {

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Paper className="d-flex flex-row align-items-center justify-content-between mb-4 pe-4">
        <div className="d-flex flex-row align-items-center">
          <ImageContainer src={Build} />
          <div>
            <Heading className="mb-2">Build future with Bluemeet</Heading>
            <SubHeading>
              Have some exciting product to integrate with bluemeet? Let's talk
              then.
            </SubHeading>
          </div>
        </div>
        <StyledButton onClick={() => {setOpen(true)}} className="btn btn-primary btn-outline-text">
          Start discussing
        </StyledButton>
      </Paper>

       <BuildWithBluemeetForm open={open} handleClose={handleClose} />
    </>
  );
};

export default BuildWithBluemeet;
