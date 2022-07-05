import React from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import "./../../../assets/Sass/DataGrid.scss";
import "./../../../assets/Sass/EditEvent/Basics.scss";
import "./../../../index.css";
import UploadEventImageForm from "./FormComponents/uploadEventImageForm";
import EditBasicDetailsForm from "./FormComponents/EditBasicDetailsForm";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useParams } from "react-router";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Basics = () => {
  const params = useParams();
  const id = params.id;

  console.log(params);

  console.log(id);

  const [saveChangesStatus, setSaveChangesStatus] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [discardChangesStatus, setDiscardChangesStatus] = React.useState({
    openDiscardSnack: false,
    ver: "top",
    hor: "center",
  });

  const { ver, hor, openDiscardSnack } = discardChangesStatus;

  const { vertical, horizontal, open } = saveChangesStatus;

  const handleCloseDiscard = () => {
    setDiscardChangesStatus({
      ver: "top",
      hor: "center",
      openDiscardSnack: false,
    });
  };

  const openDiscardChangesSnack = () => {
    setSaveChangesStatus({ ver: "top", hor: "center", openDiscardSnack: true });
  };

  const handleClose = () => {
    setSaveChangesStatus({
      vertical: "top",
      horizontal: "center",
      open: false,
    });
  };

  const openSavedChangesSnack = () => {
    setSaveChangesStatus({ vertical: "top", horizontal: "center", open: true });
  };
  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Basics</div>
        </div>
        <div className="basic-content-grid px-3 mb-4">
          <div className="basic-form-left px-4 py-4">
            <EditBasicDetailsForm
              hideFormHeading="1"
              showBlockButton="false"
              openSavedChangesSnack={openSavedChangesSnack}
              openDiscardChangesSnack={openDiscardChangesSnack}
              id={id}
            />
          </div>
          <div>
            <div className="basic-form-right">
              <UploadEventImageForm />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={6000}
        >
          <Alert onClose={handleClose} severity="success">
            Basic details updated successfully!
          </Alert>
        </Snackbar>
      </div>

      <div>
        <Snackbar
          anchorOrigin={{ ver, hor }}
          open={openDiscardSnack}
          onClose={handleCloseDiscard}
          key={ver + hor}
          autoHideDuration={6000}
        >
          <Alert onClose={handleCloseDiscard} severity="information">
            Basic details updated successfully!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Basics;
