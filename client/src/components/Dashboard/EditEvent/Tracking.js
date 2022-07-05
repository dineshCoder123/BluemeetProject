import React from "react";
import styled from "styled-components";

// const Paper

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const FormLabel = styled.label`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.78rem;
  color: #363636;
`;

const StyledInput = styled.input`
  font-family: "Ubuntu" !important;
  font-weight: 500 !important;
  font-size: 0.82rem !important;
  color: #4b4b4b !important;

  &:hover {
    border: 1px solid #538bf7;
  }
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-size: 0.76rem;
  font-family: "Ubuntu";
  color: #4b4b4b;
`;

const StyledTextArea = styled.textarea`
font-family: "Ubuntu" !important;
  font-weight: 500 !important;
  font-size: 0.82rem !important;
  color: #4b4b4b !important;

  &:hover {
    border: 1px solid #538bf7;
  }
`

const Tracking = () => {
  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 pb-4 pt-4">
          <SectionHeading className="">Advanced Tracking</SectionHeading>
          <div className="drop-selector d-flex flex-row justify-content-end">
            <button
              className="btn btn-primary btn-outline-text"
              //   onClick={handleNewTicket}
            >
              Save settings
            </button>
          </div>
        </div>
        <div className="px-4" style={{width: "668px"}}>
        <FormLabel className="mb-1">Google Analytics Tracking ID</FormLabel>
        <StyledInput type="text" className="form-control mb-3"></StyledInput>
        <FormLabel className="mb-1">Facebook Pixel code</FormLabel>
        <StyledTextArea className="form-control" rows="7"></StyledTextArea>
        </div>
      </div>
    </>
  );
};

export default Tracking;
