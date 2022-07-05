import React from "react";

const NoContentFound = ({msgText, img}) => {
  return (
    <div className="you-have-no-event-coming-card d-flex flex-column justify-content-between align-items-center px-3 py-5" style={{ maxHeight: "400px", maxWidth: "fit-content"}}>
      <img src={img} alt="Bored" className="mb-4" style={{maxWidth: "250px", maxHeight: "250px"}}/>
      <div className="you-have-no-event-coming-text mb-4">{msgText}</div>
    </div>
  );
};

export default NoContentFound;
