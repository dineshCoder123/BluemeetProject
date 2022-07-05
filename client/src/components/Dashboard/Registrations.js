/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import "./../../assets/Sass/Registrations.scss";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RegistrationsListFields from "./HelperComponent/RegistrationsListFields";
import RegistrationDetailsCard from "./HelperComponent/RegistrationDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { fetchRegistrationsOfParticularCommunity } from "../../actions";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { alpha, Avatar, Button, IconButton } from "@material-ui/core";
import dateFormat from "dateformat";
import Loader from "../Loader";
import NoContentFound from "../NoContent";
import NoRegistartions from "./../../assets/images/registrations.png";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Registrations = () => {
  // const [openDrawer, setOpenDrawer] = React.useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const params = useParams();
  const communityId = params.communityId;

  const communityRegistrations = useSelector(
    (state) => state.registration.registrations
  );

  console.log(communityId);

  useEffect(() => {
    dispatch(fetchRegistrationsOfParticularCommunity(communityId));
  }, [dispatch, communityId]);

  const { registrationDetails, isLoading, error } = useSelector(
    (state) => state.registration
  );

  // const handleSeeMoreDetails = () => {
  //   setOpenDrawer(true);
  // };

  const processRegistrationData = () => {
    const processedArray = [];

    communityRegistrations.map((communityRegistration) => {
      const array = Object.entries(communityRegistration);

      const filtered = array.filter(
        ([key, value]) =>
          key === "userName" ||
          key === "userEmail" ||
          key === "ticketType" ||
          key === "eventName" ||
          key === "userName" ||
          key === "created_by_contact" ||
          key === "razorpayPayId" ||
          key === "createdAt"
      );

      const asObject = Object.fromEntries(filtered);

      processedArray.push(asObject);
    });

    const finalArray = processedArray.map((obj) => Object.values(obj));

    return finalArray;
  };

  const CreateAndDownloadCSV = (data) => {
    var csv =
      "Event Name,User Name, Email,Contact,Ticket Type,Transaction Id, Date & Time of Registration \n";
    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    console.log(csv);
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "registrations.csv";
    hiddenElement.click();
  };

  const renderRegistrationsList = (registrations) => {
    return registrations
      .slice(0)
      .reverse()
      .map((registration) => {
        console.log(registration);
        return (
          <RegistrationDetailsCard
           
            id={registration._id}
            key={registration._id}
            userImgURL={
              registration.userImage &&
              registration.userImage.startsWith("https:")
                ? registration.userImage
                : `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${registration.userImage}`
            }
            userName={registration.userName}
            userEmail={registration.userEmail}
            eventName={registration.eventName}
            userContact={registration.created_by_contact}
            amount={(registration.totalAmountPaid * 1) / 100}
            currency={registration.currency}
            ticketType={registration.ticketType}
            preOrPostEventSale={registration.registrationType}
            transactionId={registration.eventTransactionId}
            razorpayPayId={registration.razorpayPayId}
            orderId={registration.orderId}
          />
        );
      });
  };

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Registrations</div>
          <div className="sec-heading-action-button d-flex flex-row">
            <div
              className={`${classes.search} me-3`}
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<GetAppIcon />}
              style={{ backgroundColor: "#538BF7" }}
              onClick={() => {
                CreateAndDownloadCSV(processRegistrationData());
                console.log(processRegistrationData());
              }}
            >
              Export
            </Button>

            {/* <div className="ms-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="top"
                options={options}
                defaultValue={options[0]}
              />
            </div>

            <div className="ms-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="top"
                options={timelineOptions}
                defaultValue={timelineOptions[0]}
              />
            </div> */}
          </div>
        </div>
        <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
          {/* <EventListFields /> */}
          <RegistrationsListFields />
          <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
            <Divider />
          </div>
          {isLoading ? (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ height: "60vh" }}
            >
              <Loader />
            </div>
          ) : typeof communityRegistrations !== "undefined" &&
            communityRegistrations.length > 0 ? (
            renderRegistrationsList(communityRegistrations)
          ) : (
            <NoContentFound
              msgText="Your event registrations will appear here."
              img={NoRegistartions}
            />
          )}
        </div>
        {/* Here I have to use pagination */}
        {/* <CustomPagination /> */}
      </div>
      
    </>
  );
};

export default Registrations;
