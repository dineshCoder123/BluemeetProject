import React, { useEffect } from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import "./../../../assets/Sass/DataGrid.scss";
import "./../../../assets/Sass/EditEvent/Basics.scss";
import "./../../../assets/Sass/EditEvent/About.scss";
import "./../../../index.css";

import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import BoothsListFields from "./BoothListFields";
import BoothDetailsCard from "./BoothDetailsCard";
import AddNewBooth from "./FormComponents/EditBoothsForms/AddNewBooth";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  errorTrackerForCreateBooth,
  errorTrackerForFetchBooths,
  fetchBooths,
} from "../../../actions";
import Loader from "../../Loader";
import NoContentFound from "../../NoContent";
import BoothPNG from "./../../../assets/images/fogg-come-back-later-2.png";
import styled from "styled-components";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded"; // Icon
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded"; // Description
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded"; // Banner
import CameraEnhanceRoundedIcon from "@mui/icons-material/CameraEnhanceRounded"; // Photo booth
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded"; // Table
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded"; // Video
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded"; // Link
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded"; // Resources
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded"; // Special offers

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 7.5fr 2.5fr;
`;

const BoothCustomizationPaper = styled.div`
  background-color: #e4e4e4b6;
  border-radius: 10px;
  height: fit-content;
`;

const Heading = styled.div`
  text-align: center;
  font-family: "Ubuntu";
  font-size: 0.95rem;
  font-weight: 600;
  color: #353535;
`;

const PropertyName = styled.div`
  font-family: "Ubuntu";
  font-size: 0.84rem;
  font-weight: 600;
  color: #4d4d4d;
`;

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

const renderBoothList = (booths) => {
  return booths
    .slice(0)
    .reverse()
    .map((booth) => {
      if (!booth) return <div></div>;
      return (
        <BoothDetailsCard
          url={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${booth.image}`}
          key={booth._id}
          id={booth._id}
          name={booth.name}
          tagline={booth.tagline}
          emails={booth.emails}
          invitationLink={booth.invitationLink}
          boothTags={booth.tags}
        />
      );
    });
};

const Booths = () => {
  const params = useParams();

  let options = [{ value: "all", label: "All tags" }];

  const availableTags = useSelector(
    (state) => state.event.eventDetails.boothTags
  );

  if (availableTags) {
    const tagsOptions = availableTags.map((tag) => {
      return { value: tag, label: tag };
    });

    options = options.concat(tagsOptions);
    console.log(tagsOptions);
  }

  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [tagText, setTagText] = React.useState("");

  const dispatch = useDispatch();
  const id = params.id;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchBooths(id, term, tagText));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, term, tagText, id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewBooth = () => {
    setOpen(true);
  };

  const { booths, isLoading, error } = useSelector((state) => state.booth);

  const classes = useStyles();

  if (error) {
    dispatch(errorTrackerForFetchBooths());
    return dispatch(errorTrackerForCreateBooth());
  }

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <SectionHeading className="">All Booths</SectionHeading>
          <div className="drop-selector d-flex flex-row justify-content-end">
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
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>
            <div className="mx-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="bottom"
                options={options}
                defaultValue={options[0]}
                onChange={(value) => setTagText(value.value)}
              />
            </div>

            <div
              onClick={() => {
                handleNewBooth();
              }}
            >
              <button className="btn btn-primary btn-outline-text">
                Add New Booth
              </button>
            </div>
          </div>
        </div>
        <Grid>
          {typeof booths !== "undefined" && booths.length > 0 ? (
            <div className="session-content-grid px-3 mb-4">
              <div className="basic-form-left-white px-4 py-4">
                <BoothsListFields />
                {isLoading ? (
                  <div
                    className="d-flex flex-row align-items-center justify-content-center"
                    style={{ height: "65vh" }}
                  >
                    <Loader />
                  </div>
                ) : (
                  renderBoothList(booths)
                )}
              </div>
            </div>
          ) : (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ height: "63vh", width: "100%" }}
            >
              <NoContentFound
                msgText="You can manage booth exhibitors here"
                img={BoothPNG}
              />
            </div>
          )}
          <BoothCustomizationPaper className="p-3">
            <Heading className="mb-3">Customize booths</Heading>
            <PropertyName className="mb-3">
              {" "}
              <FacebookRoundedIcon /> <span className="ms-3">Logo</span>
            </PropertyName>
            <PropertyName className="mb-3">
              {" "}
              <DescriptionRoundedIcon />{" "}
              <span className="ms-3">Exhibit description</span>
            </PropertyName>
            <PropertyName className="mb-3">
              {" "}
              <ViewCarouselRoundedIcon />{" "}
              <span className="ms-3">Exhibit banner</span>
            </PropertyName>
            <PropertyName className="mb-3">
              {" "}
              <CameraEnhanceRoundedIcon />{" "}
              <span className="ms-3">Photo booth</span>
            </PropertyName>
            <PropertyName className="mb-3">
              {" "}
              <EventSeatRoundedIcon />{" "}
              <span className="ms-3">Discussion rooms</span>
            </PropertyName>
            <PropertyName className="mb-3">
              {" "}
              <VideoLibraryRoundedIcon /> <span className="ms-3">Videos</span>
            </PropertyName>
            <PropertyName className="mb-3">
              {" "}
              <InsertLinkRoundedIcon />{" "}
              <span className="ms-3">External links</span>
            </PropertyName>
            <PropertyName className="mb-3">
              {" "}
              <FilePresentRoundedIcon /> <span className="ms-3">Resources</span>
            </PropertyName>
            <PropertyName className="mb-4">
              {" "}
              <CardGiftcardRoundedIcon />{" "}
              <span className="ms-3">Special offers</span>
            </PropertyName>

            <button
              className="btn btn-outline-dark btn-outline-text"
              style={{ width: "100%" }}
            >
              Customize now!
            </button>
          </BoothCustomizationPaper>
        </Grid>
      </div>
      <AddNewBooth open={open} handleClose={handleClose} />
    </>
  );
};

export default Booths;
