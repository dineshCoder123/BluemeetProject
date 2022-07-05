/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import Select from "react-select";
import Faker from "faker";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import SplineChart from "./ChartComponents/SplineChart";
import RadialChart from "./ChartComponents/RadialChart";
import DoughnutChart from "./ChartComponents/DonutChart";
import WorldMapChart from "./ChartComponents/WorldMapChart";
import EventListFields from "./HelperComponent/EventListFields";
import EventDetailCard from "./HelperComponent/EventDetailsCard";
import history from "../../history";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  errorTrackerForFetchCommunity,
  fetchCommunity,
  fetchEventsOfParticularCommunity,
  navigationIndexForCommunityDash,
} from "../../actions/index";
import { useSelector } from "react-redux";
import AddNewMember from "./FormComponents/AddNewMember";
import Doughnut from "./ChartComponents/Doughnut";
import NotEnoughData from "../NotEnoughData";
import Loader from "../Loader";
import NoContentFound from "../NoContent";
import NoEvent from "./../../assets/images/noEvent.png";

const options = [
  { value: "Today", label: "Today" },
  { value: "This Week", label: "This Week" },
  { value: "This Month", label: "This Month" },
  { value: "This Year", label: "This Year" },
  { value: "Lifetime", label: "Lifetime" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

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

const Overview = () => {
  const [term, setTerm] = React.useState("");
  const { events, isLoading, error } = useSelector((state) => state.event);

  const communityLoading = useSelector((state) => state.community.isLoading);
  const communityError = useSelector((state) => state.community.error);

  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;

  console.log(id);

  const community = useSelector((state) => {
    return state.community.communities.find((community) => {
      return community.id === id;
    });
  });

  const userId = useSelector((state) => state.user.userDetails._id);

  const { analytics, superAdminImage, superAdminName } = community;

  const classes = useStyles();

  const [openAddToTeamDialog, setOpenAddToTeamDialog] = React.useState(false);

  useEffect(() => {
    dispatch(fetchCommunity(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(term);

    const timeoutId = setTimeout(() => {
      dispatch(fetchEventsOfParticularCommunity(term));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, term]);

  if (error) {
    throw new Error(error);
  } else if (communityError) {
    throw new Error(communityError);
  }

  const communityEvents = events
    .slice(0)
    .reverse()
    .map((event) => event);

  const length = communityEvents.length;
  let j;
  if (length >= 3) {
    j = 3;
  } else if (length >= 2) {
    j = 2;
  } else if (length >= 1) {
    j = 1;
  } else {
    j = 0;
  }

  const renderRecentEvents = (communityEvents) => {
    let recentEvents = [];

    for (let i = 0; i < j; i++) {
      const event = communityEvents[i];
      recentEvents.push(
        <EventDetailCard
          key={event.id}
          imgUrl={`https://evenz-img-234.s3.ap-south-1.amazonaws.com/${event.image}`}
          shortDescription={event.shortDescription}
          publishedStatus={event.publishedStatus}
          views={event.views}
          registrations={event.registrationsRecieved}
          status={event.status}
          visibility={event.visibility}
          eventName={event.eventName}
          communityId={event.communityId}
          id={event.id}
        />
      );
    }

    return recentEvents;
  };

  const handleAddNewMember = () => {
    setOpenAddToTeamDialog(true);
  };

  const handleCloseAddToTeamDialog = () => {
    setOpenAddToTeamDialog(false);
  };

  console.log(community);
  return (
    <>
      {isLoading ? (
        <div
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ height: "100vh", width: "80vw" }}
        >
          <Loader />
        </div>
      ) : (
        <div className="me-3">
          {/* Secondary Heading with drop selector */}
          <div
            className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4"
            style={{ minWidth: "1138px" }}
          >
            {/* Secondary Heading */}
            <div className="sec-heading-text">Overview</div>
            {/* Drop Selector */}
            <div className="drop-selector">
              <Select
                styles={styles}
                options={options}
                defaultValue={options[1]}
              />
            </div>
          </div>
          {/* Overview Content Grid */}
          <div
            className="overview-content-grid px-3 mb-4"
            style={{ minWidth: "1168px" }}
          >
            {/* Overview Left Grid */}
            <div className="overview-content-left">
              {/* Number Card Row */}
              <div className="number-card-row mb-4">
                {/* Number Card 1 */}
                <div className="number-card px-5 py-4 d-flex align-items-center">
                  <div>
                    <div className="number-card-heading mb-2">
                      Registrations
                    </div>
                    <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                      <div className="num-text me-3">
                        {analytics.totalRegistrations}
                      </div>
                      <div className="num-percent increment">{(analytics.totalRegistrations) >= 1 ? "+100%" : "+0%"}</div>
                    </div>
                  </div>
                </div>
                {/* Number Card 2 */}
                <div className="number-card px-5 py-4 d-flex align-items-center">
                  <div>
                    <div className="number-card-heading mb-2">Revenue</div>
                    <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                      <div className="num-text me-3">
                        INR {(analytics.totalRevenue/100).toFixed(2)}
                      </div>
                      <div className="num-percent increment">{(analytics.totalRevenue/100) > 10 ? "+100%" : "+0%"}</div>
                    </div>
                  </div>
                </div>
                {/* Number Card 3 */}
                <div className="number-card px-5 py-4 d-flex align-items-center">
                  <div>
                    <div className="number-card-heading mb-2">Followers</div>
                    <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                      <div className="num-text me-3">0</div>
                      <div className="num-percent decrement">+0%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="revenue-chart-container mb-4">
                <div className="chart-heading-registrations mb-3 px-4 pt-3">
                  Revenue
                </div>
                <div className="spline-container">
                  {/* // TODO Not Enough Data Available for now and then fix it <SplineChart /> */}
                  <NotEnoughData />
                </div>
              </div>

              {/* Plan Limit Radial Indicators Row */}
              <div className="plan-limit-indicator-row mb-4">
                {/* Radial Indicator 1 */}
                <div className="registrations-in-period p-0 px-4 d-flex flex-row align-items-center">
                  <div className="radial-chart-container me-3">
                    <div className="percentage-label">0%</div>
                    <RadialChart value="0" />
                  </div>

                  <div className="limit-value-and-heading-conatiner">
                    <div className="consumed-value">
                      0{" "}
                      <span className="limit-value-small-text">
                        {" "}
                        / 3k Available
                      </span>
                    </div>
                    <div className="limit-heading">Registrations in period</div>
                  </div>
                </div>

                {/* Radial Indicator 2 */}
                <div className="streaming-hours p-0 px-4 d-flex flex-row align-items-center">
                  <div className="radial-chart-container me-3">
                    <div className="percentage-label">0%</div>
                    <RadialChart value="0" />
                  </div>

                  <div className="limit-value-and-heading-conatiner">
                    <div className="consumed-value">
                      0 hrs{" "}
                      <span className="limit-value-small-text">
                        {" "}
                        / 72 Available
                      </span>
                    </div>
                    <div className="limit-heading">Streaming in period</div>
                  </div>
                </div>
              </div>

              {/* Registrations Map Container */}
              <div className="registrations-map-chart-container">
                <div className="chart-heading-registrations mb-3 px-4 pt-4">
                  Registration's Map
                </div>
                <div className="world-map-chart">
                  {/* // TODO Not enough data available (Make it properly) <WorldMapChart /> */}
                  <NotEnoughData />
                </div>
              </div>
            </div>

            {/* Overview Right Grid */}
            <div className="overview-content-right">
              {/* Team Overview Card */}

              <div className="team-overview-and-top-events-row-container mt-5">
                <div className="team-overview mb-4 py-4">
                  {/* Team Overview Card Heading and See all link */}
                  <div className="d-flex flex-row justify-content-between px-4 mb-4">
                    <div
                      className="team-overview-card-heading"
                      style={{ fontFamily: "Inter" }}
                    >
                      Your Team (1)
                    </div>
                    {/* <div
                      className="see-all-members"
                      onClick={() => {
                        dispatch(navigationIndexForCommunityDash(8));
                        history.push(
                          `/user/${userId}/community/team-management/${id}`
                        );
                      }}
                      style={{ fontFamily: "Inter" }}
                    >
                      See all
                    </div> */}
                  </div>
                  <Divider />

                  {/* Team Overview Member Card */}
                  <div
                    className="team-members-overview-list-container"
                    style={{ overflowY: "scroll", height: "84%" }}
                  >
                    <div className="team-member-card d-flex flex-row align-items-center  px-4 my-4">
                      <Avatar
                        alt={superAdminName}
                        variant="rounded"
                        src={
                          superAdminImage
                            ? superAdminImage.startsWith(
                                "https://lh3.googleusercontent.com"
                              )
                              ? superAdminImage
                              : `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${superAdminImage}`
                            : "#"
                        }
                        className={classes.large}
                      />
                      <div
                        className="team-member-name"
                        style={{ fontFamily: "Inter" }}
                      >
                        {superAdminName}
                      </div>
                      <div
                        className="team-member-permission-chip p-2"
                        style={{ fontFamily: "Inter" }}
                      >
                        Super Admin
                      </div>
                    </div>
                    <Divider />
                  </div>

                  {/* Team Overview Member Card */}
                  {/* <div className="team-member-card d-flex flex-row align-items-center  px-4 my-4">
                <Avatar
                  alt="Travis Howard"
                  src={Faker.image.avatar()}
                  className={classes.large}
                />
                <div className="team-member-name">Dean Clem</div>
              </div>
              <Divider /> */}

                  {/* Team Overview Member Card */}
                  {/* <div className="team-member-card d-flex flex-row align-items-center  px-4 my-4">
                <Avatar
                  alt="Travis Howard"
                  src={Faker.image.avatar()}
                  className={classes.large}
                />
                <div className="team-member-name">Dean Clem</div>
              </div>
              <Divider /> */}

                  {/* Add New Member Button */}

                  {/* <div className="mx-4">
                    <button
                      className="btn btn-outline-primary btn-outline-text"
                      style={{ width: "100%" }}
                      onClick={handleAddNewMember}
                    >
                      Add Member
                    </button>
                  </div> */}

                  {/* Plan Members Limit Message */}
                  {/* <div className="add-more-info mt-3 mx-4">
                You can onboard 2 more members.
              </div> */}
                </div>
                {/* Top Events in this Period card */}
                <div className="top-events-card">
                  {/* Top Events Heading */}
                  <div className="chart-heading-registrations mb-3 px-4 pt-4">
                    Top Events
                  </div>
                  <div className="py-5 my-5">
                    <NotEnoughData />
                  </div>
                  {/* // TODO Switch on this doughnut <Doughnut /> */}
                </div>
              </div>
              <div className="team-and-top-events-bg-container">
                <div className="team-overview mb-4 py-4">
                  {/* Team Overview Card Heading and See all link */}
                  <div className="d-flex flex-row justify-content-between px-4 mb-4">
                    <div
                      className="team-overview-card-heading"
                      style={{ fontFamily: "Inter" }}
                    >
                      Your Team (1)
                    </div>
                    {/* <div
                      className="see-all-members"
                      onClick={() => {
                        dispatch(navigationIndexForCommunityDash(8));
                        history.push(
                          `/user/${userId}/community/team-management/${id}`
                        );
                      }}
                      style={{ fontFamily: "Inter" }}
                    >
                      See all
                    </div> */}
                  </div>
                  <Divider />

                  {/* Team Overview Member Card */}
                  <div
                    className="team-members-overview-list-container"
                    style={{ overflowY: "scroll", height: "84%" }}
                  >
                    <div className="team-member-card d-flex flex-row align-items-center  px-4 my-4">
                      <Avatar
                        alt={superAdminName}
                        variant="rounded"
                        src={
                          superAdminImage ? 
                          (superAdminImage.startsWith(
                            "https://lh3.googleusercontent.com"
                          )
                            ? superAdminImage
                            : `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${superAdminImage}`) : "#"
                        }
                        className={classes.large}
                      />
                      <div
                        className="team-member-name"
                        style={{ fontFamily: "Inter" }}
                      >
                        {superAdminName}
                      </div>
                      <div
                        className="team-member-permission-chip p-2"
                        style={{ fontFamily: "Inter" }}
                      >
                        Super Admin
                      </div>
                    </div>
                    <Divider />
                  </div>

                  {/* Team Overview Member Card */}
                  {/* <div className="team-member-card d-flex flex-row align-items-center  px-4 my-4">
                <Avatar
                  alt="Travis Howard"
                  src={Faker.image.avatar()}
                  className={classes.large}
                />
                <div className="team-member-name">Dean Clem</div>
              </div>
              <Divider /> */}

                  {/* Team Overview Member Card */}
                  {/* <div className="team-member-card d-flex flex-row align-items-center  px-4 my-4">
                <Avatar
                  alt="Travis Howard"
                  src={Faker.image.avatar()}
                  className={classes.large}
                />
                <div className="team-member-name">Dean Clem</div>
              </div>
              <Divider /> */}

                  {/* Add New Member Button */}

                  {/* <div className="mx-4">
                    <button
                      className="btn btn-outline-primary btn-outline-text"
                      style={{ width: "100%" }}
                      onClick={handleAddNewMember}
                    >
                      Add Member
                    </button>
                  </div> */}

                  {/* Plan Members Limit Message */}
                  {/* <div className="add-more-info mt-3 mx-4">
                You can onboard 2 more members.
              </div> */}
                </div>
                {/* Top Events in this Period card */}
                <div className="top-events-card">
                  {/* Top Events Heading */}
                  <div className="chart-heading-registrations mb-3 px-4 pt-4">
                    Top Events
                  </div>
                  {/* // TODO Switch on this doughnut <Doughnut /> */}
                  <div className="py-5 my-5">
                    <NotEnoughData />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events Data Table Grid */}
          <div
            className="recent-events-data-grid mx-3 mb-4"
            style={{ minWidth: "1138px" }}
          >
            {/* Recent Events Heading */}
            <div className="chart-heading-registrations mb-3 px-4 pt-4">
              Recent Events
            </div>
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {/* Data Table Fields Label row */}
            <EventListFields />
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {/* Data Table Events Detail Cards Wrapper */}
            <div>
              {typeof communityEvents !== "undefined" &&
              communityEvents.length > 0 ? (
                renderRecentEvents(communityEvents)
              ) : (
                <NoContentFound
                  msgText="You recent events will appear here."
                  img={NoEvent}
                />
              )}
            </div>
          </div>
          {/* Add New Member Dialog Box ---- This Needs to be refactored into a single component with it's own open / close state. */}
          <AddNewMember
            openAddToTeamDialog={openAddToTeamDialog}
            handleCloseAddToTeamDialog={handleCloseAddToTeamDialog}
          />
        </div>
      )}
    </>
  );
};

export default Overview;
