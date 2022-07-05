import React from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import SettingsEthernetRoundedIcon from "@material-ui/icons/SettingsEthernetRounded";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import { useDispatch } from "react-redux";
import { createCommunityFeedback } from "./../../../actions";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SideNav = ({
  activeIndex,
  handleGettingStartedClick,
  handleEventsClick,
  handleTeamClick,
  handleVideoLibraryClick,
  handleIntegrationsClick,
  handleAddOnsAndPlanClick,
  handleTrackingClick,
  handleBillingClick,
}) => {
  const dispatch = useDispatch();

  const [feedbackText, setFeedbackText] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    openSuccess: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openSuccess } = state;

  const handleCloseSuccess = () => {
    setState({ vertical: "top", horizontal: "center", openSuccess: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="side-nav-wrapper py-4" style={{height: "93vh", overflow: "auto", backgroundColor: "#ffffff"}}>
        <div
          onClick={() => {
            handleGettingStartedClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "0" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "0" ? "btn-icon-active-d" : " ")
            }
          >
            <HomeOutlinedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "0" ? "btn-text-active-d" : " ")
            }
          >
            Get started
          </div>
        </div>

        <div className="sidenav-group-headline ps-4 pe-4 my-4">Management</div>

        <div
          onClick={() => {
            handleEventsClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "1" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "1" ? "btn-icon-active-d" : " ")
            }
          >
            <PieChartOutlinedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "1" ? "btn-text-active-d" : " ")
            }
          >
            Events
          </div>
        </div>

        <div
          onClick={() => {
            handleTeamClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "2" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "2" ? "btn-icon-active-d" : " ")
            }
          >
            <PeopleOutlineIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "2" ? "btn-text-active-d" : " ")
            }
          >
            Team
          </div>
        </div>

        <div
          onClick={() => {
            handleVideoLibraryClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "3" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "3" ? "btn-icon-active-d" : " ")
            }
          >
            <VideocamOutlinedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "3" ? "btn-text-active-d" : " ")
            }
          >
            Video library
          </div>
        </div>

        <div
          onClick={() => {
            handleIntegrationsClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "4" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "4" ? "btn-icon-active-d" : " ")
            }
          >
            <SettingsEthernetRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "4" ? "btn-text-active-d" : " ")
            }
          >
            Integrations
          </div>
        </div>

        <div
          onClick={() => {
            handleAddOnsAndPlanClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "5" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "5" ? "btn-icon-active-d" : " ")
            }
          >
            <ShoppingBasketRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "5" ? "btn-text-active-d" : " ")
            }
          >
            Add ons & plan
          </div>
        </div>

        {/* <div
          onClick={() => {
            handleTrackingClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "6" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "6" ? "btn-icon-active-d" : " ")
            }
          >
            <AccountTreeRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "6" ? "btn-text-active-d" : " ")
            }
          >
           Tracking
          </div>
        </div> */}
        <div
          onClick={() => {
            handleBillingClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "7" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "7" ? "btn-icon-active-d" : " ")
            }
          >
            <PaymentOutlinedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "7" ? "btn-text-active-d" : " ")
            }
          >
            Billing
          </div>
        </div>

        <div className="sidenav-group-headline ps-4 pe-4 my-4">Others</div>

        <div
          onClick={() => {
            handleClickOpen();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "12" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "12" ? "btn-icon-active-d" : " ")
            }
          >
            <FeedbackOutlinedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "12" ? "btn-text-active-d" : " ")
            }
          >
            Feedback
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We would love to hear from you. Help us in making this product more
            useful by providing your valuable feedback.
          </DialogContentText>
          <TextField
            multiline="true"
            autoFocus
            margin="dense"
            id="name"
            label="Your feedback"
            type="email"
            fullWidth
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (feedbackText !== null) {
                dispatch(
                  createCommunityFeedback({ feedbackText: feedbackText })
                );
                setState({
                  vertical: "top",
                  horizontal: "center",
                  openSuccess: true,
                });
              }
              handleClose();
            }}
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSuccess}
        onClose={handleCloseSuccess}
        autoHideDuration={4000}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Thanks for providing your valuable feedback! We have recieved it.
        </Alert>
      </Snackbar>
    </>
  );
};

export default SideNav;
