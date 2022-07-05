import React from "react";
import { Link } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import './../index.css';

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div className="offer-strip py-2 px-4" style={{ fontSize: "1rem" }}>
       <span className="sale-text">Get Lifetime ticketing for free. Offer ends in </span> 
        <span className="mx-2">{days}</span>day<span className="mx-2">{hours}</span> hr<span className="mx-2">{minutes}</span>{" "}
        min<span className="mx-2">{seconds}</span>sec

<Link to="/pricing/ticketing">
        <button className="btn btn-light btn-outline-text ms-4 grab-deal-btn">Grab Now</button>

</Link>
      </div>
    </div>
  );
}

const Timer = () => {
  const time = 1629656999000; // DATE TIME IN MILLI SECONDS

  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
};

export default Timer;
