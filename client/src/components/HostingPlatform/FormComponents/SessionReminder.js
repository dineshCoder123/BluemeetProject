import React from 'react';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import "./Styles/SessionReminder.scss";

const SessionReminder = ({openDrawer, handleCloseDrawer}) => {
    return (
        <>



<React.Fragment key="right">
        <SwipeableDrawer
        onOpen={() => {
          console.log("Side nav was opended")
        }}
        onClose={() => {
          console.log("Side nav was closed")
        }}
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
        >

<div className="session-reminder-form px-4 py-3">



</div>

        </SwipeableDrawer>
        </React.Fragment>

        </>
    )
}

export default SessionReminder;