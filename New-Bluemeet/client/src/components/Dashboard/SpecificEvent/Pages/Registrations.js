/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./../../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../../assets/Sass/EventManagement.scss";
import "./../../../../assets/Sass/SideNav.scss";
import "./../../../../assets/Sass/TopNav.scss";
import "./../../../../assets/Sass/DataGrid.scss";
import Divider from "@material-ui/core/Divider";
import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RegistrationsListFields from "../../HelperComponent/RegistrationsListFields";
import RegistrationDetailsCard from "../../HelperComponent/RegistrationDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  fetchRegistrationsOfParticularEvent,
} from "../../../../actions";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader";
import NoContentFound from "../../../NoContent";

import NoRegistartions from "./../../../../assets/images/registrations.png";

const options = [
  { value: "All Tickets", label: "All Tickets" },
  { value: "Early Bird", label: "Early Bird" },
  { value: "All Access Pass", label: "All Access Pass" },
  { value: "VIP Ticket", label: "VIP Ticket" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
  const classes = useStyles();

  const dispatch = useDispatch();

  const params = useParams();

  const eventId = params.eventId;

  const { isLoading, error, registrations } = useSelector(
    (state) => state.registration
  );

  useEffect(() => {
    dispatch(fetchRegistrationsOfParticularEvent(eventId));
  }, []);

  const renderRegistrationsList = (registrations) => {
    return registrations
      .slice(0)
      .reverse()
      .map((registration) => {
        return (
          <RegistrationDetailsCard
            // TODO handleSeeMoreDetails={handleSeeMoreDetails} make dialog screen here to contain more info about particular event registration
            id={registration._id}
            key={registration._id}
            userImgURL={
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

  const processRegistrationData = (eventRegistrations) => {
    const processedArray = [];

    eventRegistrations.map((communityRegistration) => {
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

  if (error) {
    throw new Error(error);
    // dispatch(errorTrackerForFetchRegistrationsOfParticularEvent());
    // alert(error);
    // return null;
  }

  return (
    <>
      <div>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Registrations</div>
          <div className="sec-heading-action-button d-flex flex-row">
            <div
              className={`${classes.search}`}
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
            <div className="ms-3 me-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="top"
                options={options}
                defaultValue={options[0]}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<GetAppIcon />}
              style={{ backgroundColor: "#538BF7" }}
              onClick={() => {
                CreateAndDownloadCSV(processRegistrationData(registrations));
                console.log(processRegistrationData(registrations));
              }}
            >
              Export
            </Button>
          </div>
        </div>
        <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
          <RegistrationsListFields />
          <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
            <Divider />
          </div>
          {isLoading ? (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ height: "70vh", width: "100%" }}
            >
              <Loader />
            </div>
          ) : typeof registrations !== "undefined" &&
            registrations.length > 0 ? (
            renderRegistrationsList(registrations)
          ) : (
            <NoContentFound
              msgText="Looks like this event has not got any registrations yet."
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
