/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import "./../Styles/boothLiveStream.scss";

const BoothLiveStream = ({ open, handleClose }) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        aria-labelledby="customized-dialog-title"
        style={{
          height: "100vh",
          margin: "0 auto 0 auto",
        }}
      >
        <div className="booth-live-stream-container"></div>
      </Dialog>
    </>
  );
};

export default BoothLiveStream;
