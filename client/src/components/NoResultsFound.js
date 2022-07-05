import React from "react";
import "./../assets/Sass/Husky.scss";
import "./../index.css";

const Husky = () => {
  return (
    <>
      <div className="husky">
        <div className="mane">
          <div className="coat"></div>
        </div>
        <div className="body">
          <div className="head">
            <div className="ear"></div>
            <div className="ear"></div>
            <div className="face">
              <div className="eye"></div>
              <div className="eye"></div>
              <div className="nose"></div>
              <div className="mouth">
                <div className="lips"></div>
                <div className="tongue"></div>
              </div>
            </div>
          </div>
          <div className="torso"></div>
        </div>
        <div className="legs">
          <div className="front-legs">
            <div className="leg"></div>
            <div className="leg"></div>
          </div>
          <div className="hind-leg"></div>
        </div>
        <div className="tail">
          <div className="tail">
            <div className="tail">
              <div className="tail">
                <div className="tail">
                  <div className="tail">
                    <div className="tail"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ position: "absolute" }}
      >
        <defs>
          <filter id="squiggly-0">
            <feTurbulence
              id="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              result="noise"
              seed="0"
            />
            <feDisplacementMap
              id="displacement"
              in="SourceGraphic"
              in2="noise"
              scale="2"
            />
          </filter>
          <filter id="squiggly-1">
            <feTurbulence
              id="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              result="noise"
              seed="1"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>

          <filter id="squiggly-2">
            <feTurbulence
              id="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              result="noise"
              seed="2"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
          <filter id="squiggly-3">
            <feTurbulence
              id="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              result="noise"
              seed="3"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>

          <filter id="squiggly-4">
            <feTurbulence
              id="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              result="noise"
              seed="4"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

const NoResultsFound = () => {
  return (
    <>
      <div className="husky-container">
        <Husky />

        <div
          className="mt-5"
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontFamily: "Inter",
            fontSize: "1rem",
          }}
        >
          No search results found
        </div>
      </div>
    </>
  );
};

export default NoResultsFound;
