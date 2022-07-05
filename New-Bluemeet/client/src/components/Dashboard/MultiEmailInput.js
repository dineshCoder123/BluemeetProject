import React, { useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import validator from "validator";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MultiEmailInput = (props) => {
  const input = props.input;
  const [tags, setTags] = React.useState([]);
  useEffect(() => {
    setTags(props.value ? props.value : []);
  }, [props.value]);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ vertical: "top", horizontal: "right", open: false });
  };

  return (
    <>
      <div>
        <ReactTagInput
          tags={tags}
          placeholder="Type and press enter"
          maxTags={5}
          editable={true}
          readOnly={false}
          removeOnBackspace={true}
          onChange={(newTags) => {
            setTags(newTags);

            input.onChange(newTags);
          }}
          onBlur={() => {
            input.onBlur();
          }}
          validator={(value) => {
            const bool = validator.isEmail(value);
            if (!bool) {
              setState({ open: true, vertical: "top", horizontal: "left" });
            }
            return bool;
          }}
        />
      </div>
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={3000}
        >
          <Alert onClose={handleClose} severity="error" autoHideDuration={3000}>
            Please enter valid email address!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default MultiEmailInput;
