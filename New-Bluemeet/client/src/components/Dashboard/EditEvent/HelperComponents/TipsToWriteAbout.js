import React from "react";
import "./../Style/uploadEventImage.scss";
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Zoom from '@material-ui/core/Zoom';

const TipsToWriteAbout = () => {
  return (
    <>
      <div className="social-lounge-heading d-flex flex-row align-items-center">
                    <div className="chart-heading-registrations mb-3  pe-3 pt-3">
                     Tips
                    </div>
                    <Tooltip
                      title="Here are some tips to write an event description thats proven to drive more audience than average descriptions."
                      TransitionComponent={Zoom}
                    >
                      <InfoOutlinedIcon style={{fontSize: 17}} />
                    </Tooltip>
                  </div>

      <div className="mb-3 about-tip">1. Breif overview of this event.</div>
      <div className="mb-3 about-tip">2. Write something about your community.</div>
      <div className="mb-3 about-tip">3. Agenda of this event.</div>
      <div className="mb-3 about-tip">4. What benefits can attendees expect?</div>
      <div className="mb-3 about-tip">
        5. Highlight some prominent speakers. (if applicable)
      </div>
      <div className="mb-3 about-tip">6. Who are your major partners and guests?</div>
    </>
  );
};

export default TipsToWriteAbout;
