import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function PositionedSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = () => () => {
    setState({ open: true, vertical: "top", horizontal: "center" });
  };

  const handleClose = () => {
    setState({ vertical: "top", horizontal: "center", open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </div>
  );
}
