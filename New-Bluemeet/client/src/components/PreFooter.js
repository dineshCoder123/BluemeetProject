import React from 'react';
import { Link } from 'react-router-dom';

import './../index.css';

const PreFooter = () => {
    return (
        <>
        <div className="row pre-footer">
        <div className="col-12 col-lg-6 d-flex flex-row justify-content-center align-items-center pre-footer-left-wrapper">
          <div className="col-1 col-xl-2"></div>
          <div className="col-10 col-xl-8">
            <div className="pre-footer-hero-text" style={{fontFamily: "Ubuntu", lineHeight: "2.5rem"}}>
              Amaze Your Audience with Your Next-Gen Virtual Event.
            </div>
            <div className="pre-footer-sub-hero-text my-4" style={{fontFamily: "Ubuntu"}}>
              Memorable events don’t just happen. They happen to be our
              business.
            </div>
            <div className="pre-footer-hero-btn d-flex flex-row">
            <button
                  type="button"
                  className="btn btn-light btn-outline-text px-5 py-3 me-3"
                  style={{
                    boxShadow:
                      "inset 0px 3px 19px #00000029, 0px 0px 10px #4C4E52",
                     borderRadius: "15px",
                  }}
                >
                 <Link to="/signup" style={{textDecoration: "none", color: "#000000"}}>Host a free event</Link> 
                </button>
            </div>
          </div>
          <div className="col-1 col-xl-2"></div>
        </div>
        <div
          className="col-12 col-lg-6 d-flex justify-content-center pre-footer-img-wrapper"
          style={{ maxHeight: "50vh" }}
        ></div>
      </div>
        
         </>
    );
}

export default PreFooter;