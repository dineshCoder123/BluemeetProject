import React from "react";
import NoTicket from "./../../../assets/images/clip-bad-gateaway.png";
const CreateNewTicketAndConnectToStripe = (props) => {
  return (
    <div className="d-flex flex-row justify-content-center">

    <div className="you-have-no-event-coming-card d-flex flex-column justify-content-between align-items-center px-3 py-5" style={{ maxWidth: "500px" }}>
      <img
        src={NoTicket}
        alt="Bored"
        className="mb-4"
        style={{ maxHeight: "300px", maxWidth: "400px" }}
      />
      <div className="you-have-no-event-coming-text mb-4">
        Your event dosen't have any tickets.
      </div>
      {/* <button className="btn btn-text-customised btn-color-customised btn-primary btn-outline-text">
        Add New Ticket
      </button> */}
    </div>
    </div>
  );
};

export default CreateNewTicketAndConnectToStripe;
