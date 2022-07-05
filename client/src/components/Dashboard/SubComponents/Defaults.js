/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CommunityDefaultsTabBar from "./CommunityDefaultsTabBar";
import EventDefaultsForm from "./EventDefaultsForm";

const Defaults = () => {
  // activeIndex={currentIndex}
  // handleChange={handleChange}

  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveIndex(newValue);
  };

  return (
    <>
      {/* <div style={{ width: "100%" }}>
        <CommunityDefaultsTabBar
          activeIndex={activeIndex}
          handleChange={handleChange}
          style={{ width: "100%" }}
        />
      </div> */}

      <div>
        <EventDefaultsForm />
        {/* {(() => {
                switch (activeIndex) {
                  case 0:
                    return <EventDefaultsForm />;
                  case 1:
                    return <div>Here goes event customisation</div>;
                  default:
                    return <div>You are a User.</div>;
                }
              })()} */}
      </div>
    </>
  );
};

export default Defaults;
