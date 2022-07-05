/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import "./../../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../../assets/Sass/EventManagement.scss";
import "./../../../../assets/Sass/SideNav.scss";
import "./../../../../assets/Sass/TopNav.scss";
import "./../../../../assets/Sass/DataGrid.scss";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import InterestedPeopleListFields from "../Data/InterestedPeopleListFields";
import { useParams } from "react-router-dom";
import { fetchInterestedPeopleList } from "../../../../actions";
import InterestedPeopleDetailsCard from "../Data/InterestedPeopleDetailsCard";
import NoContentFound from "../../../NoContent";
import NoRegistartions from "./../../../../assets/images/working.png";

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

const InterestedPeople = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const params = useParams();

  const eventId = params.eventId;

  const { interestedPeople } = useSelector((state) => state.interestedPeople);

  useEffect(() => {
    dispatch(fetchInterestedPeopleList(eventId));
  }, []);

  const renderInterestedPeopleList = (interestedPeople) => {
    return interestedPeople
      .slice(0)
      .reverse()
      .map((person) => {
        return (
          <InterestedPeopleDetailsCard
            id={person._id}
            key={person._id}
            fullName={`${person.firstName} ${person.lastName}`}
            email={person.email}
            capturedAt={person.capturedAt}
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

  return (
    <>
      <div>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Interested</div>
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
          </div>
        </div>
        <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
          {/* <EventListFields /> */}
          <InterestedPeopleListFields />
          <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
            <Divider />
          </div>
          {/* Here Goes Interested People Deatils Card */}
          {typeof interestedPeople !== "undefined" &&
          interestedPeople.length > 0 ? (
            renderInterestedPeopleList(interestedPeople)
          ) : (
            <NoContentFound
              msgText="People who show interest in your event will be dispalyed here."
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

export default InterestedPeople;
