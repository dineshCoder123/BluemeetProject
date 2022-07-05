/* eslint-disable no-unused-vars */
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";

import "./../index.css";
import "./../assets/css/style.css";
import "./../assets/css/UserAccountStyle.css";
import "./../assets/css/CardStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  errorTrackerForEditUser,
  signOut,
  showSnackbar,
  navigationIndex,
} from "../actions/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { Dialog, IconButton, useMediaQuery } from "@material-ui/core";
import { useTheme, Divider } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { styled as MUIStyled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";

import history from "./../history";

const MenuText = styled.span`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
`;

const MenuButton = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #dddddd;
  }
`;

const StyledMenu = MUIStyled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const referralCode = useSelector((state) => state.auth.referralCode);

  const [openReferral, setOpenReferral] = React.useState(false);

  const userDetails = useSelector((state) => state.user);

  let signupUsingReferral = 0;
  let upgrades = 0;
  let credit = 0;

  if (userDetails) {
    signupUsingReferral = userDetails.signupUsingReferral
      ? userDetails.signupUsingReferral
      : 0;
    upgrades = userDetails.upgrades ? userDetails.upgrades : 0;
    credit = userDetails.credit ? userDetails.credit : 0;
  }

  const dispatch = useDispatch();

  const handleClickOpenReferral = () => {
    setOpenReferral(true);
  };

  const handleCloseReferral = () => {
    setOpenReferral(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = React.useState("lg");

  const user = useSelector((state) => state.user);
  const isLoading = user.isLoading;
  const error = user.error;

  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef(null);

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // function handleListKeyDown(event) {
  //   if (event.key === "Tab") {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
  // }

  const onClickLoggedOut = async () => {
    const allKeys = Object.keys(localStorage);

    allKeys.forEach((value) => {
      localStorage.removeItem(value);
    });

    dispatch(signOut());
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }
  //   prevOpen.current = open;
  // }, [open]);

  if (isLoading) {
    return <div className="spinner-border" role="status"></div>;
  }
  if (error) {
    return dispatch(errorTrackerForEditUser());
  }

  let image;
  let userName;

  if (user.userDetails) {
    image = user.userDetails.image;
    userName = user.userDetails.firstName;
  }

  let imgURL;

  if (image) {
    if (image.startsWith("https://")) {
      imgURL = image;
    } else {
      imgURL = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${image}`;
    }
  }

  const referralLink = `https://www.bluemeet.in/signup?ref=${referralCode}`;

  return (
    <div className={`${classes.root}`}>
      <div>
        <MenuButton
          id="demo-customized-button"
          aria-controls="demo-customized-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClickMore}
          className="avatar-menu-h-wrapper d-flex flex-row align-items-center ps-3 py-2"
          style={{ borderRadius: "35px" }}
        >
          <Avatar
            alt={userName}
            src={imgURL}
            style={{ height: "2rem", width: "2rem" }}
          />
          {open ? (
            <ExpandLessRoundedIcon
              className="mx-2"
              style={{ fontSize: "20px" }}
            />
          ) : (
            <ExpandMoreIcon className="mx-2" style={{ fontSize: "20px" }} />
          )}
        </MenuButton>

        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(event) => {
              dispatch(navigationIndex(0));
              history.push("/user/home");
              handleClose();
            }}
            className="mb-1"
            disableRipple
          >
            <AccountCircleRoundedIcon />
            <MenuText>Home</MenuText>
          </MenuItem>

          <MenuItem
            className="mb-1"
            onClick={(event) => {
              history.push("/search-events");
              handleClose();
            }}
            disableRipple
          >
            <ExploreRoundedIcon />
            <MenuText>Explore Events</MenuText>
          </MenuItem>
          <MenuItem
            className="mb-1"
            onClick={(event) => {
              handleClickOpenReferral();
              handleClose();
            }}
            disableRipple
          >
            <MonetizationOnRoundedIcon />
            <MenuText>Referral & Credit</MenuText>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={() => {
              onClickLoggedOut();
              handleClose();
            }}
            className="mb-1"
            disableRipple
          >
            <LogoutRoundedIcon />
            <MenuText>Sign out</MenuText>
          </MenuItem>
        </StyledMenu>

        {/* <Popper
          style={{
            zIndex: 10000,
            textAlign: "center",
            marginTop: "20px",
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    style={{ alignItems: "center", justifyItems: "center" }}
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <div className="avatar-menu-group-heading px-3 pb-3 mt-2">
                      Account
                    </div>
                    <MenuItem
                      onClick={(event) => {
                        dispatch(navigationIndex(0));
                        history.push("/user/home");
                        handleClose(event);
                      }}
                    >
                      <div className="avatar-menu-account-section-btns mb-2">
                        Home
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={(event) => {
                        dispatch(navigationIndex(3));
                        history.push("/user/profile");
                        handleClose(event);
                      }}
                    >
                      <div className="avatar-menu-account-section-btns mb-2">
                        Profile
                      </div>
                    </MenuItem>

                    <MenuItem
                      onClick={(event) => {
                        history.push("/search-events");
                        handleClose(event);
                      }}
                    >
                      <div className="avatar-menu-account-section-btns mb-2">
                        Explore Events
                      </div>
                    </MenuItem>

                    <MenuItem
                      onClick={(event) => {
                        handleClickOpenReferral();
                        handleClose(event);
                      }}
                    >
                      <div className="avatar-menu-account-section-btns mb-2">
                        Referrals & Credit
                      </div>
                    </MenuItem>

                    <hr className="px-2" />
                    <button
                      onClick={onClickLoggedOut}
                      className="btn btn-outline-primary btn-outline-text"
                    >
                      Sign Out
                    </button>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper> */}

        <Dialog
          maxWidth={maxWidth}
          fullScreen={fullScreen}
          open={openReferral}
          aria-labelledby="responsive-dialog-title"
        >
          <div className="user-referral-container p-4">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr 1fr",
                alignItems: "center",
              }}
              className="px-4"
            >
              <div></div>
              <div
                style={{ textAlign: "center", fontSize: "1.1rem" }}
                className="btn-outline-text"
              >
                Referral & Credits
              </div>
              <div style={{ justifySelf: "end" }}>
                <IconButton
                  onClick={handleCloseReferral}
                  style={{ width: "fit-content" }}
                  aria-label="delete"
                >
                  <HighlightOffRoundedIcon />
                </IconButton>
              </div>
            </div>

            <div className="refer-and-earn-banner px-3 py-2 mt-3">
              Refer your network to Bluemeet — give $10, get $10.
            </div>
            <div className="referral-3-cards-row my-5">
              <div className="referral-display-card p-4 d-flex flex-column align-item-center justify-content-center">
                <div className="mb-2" style={{ fontFamily: "Ubuntu" }}>
                  Credits
                </div>
                <div className="bold-big-number">${credit}</div>
              </div>
              <div className="referral-display-card p-4 d-flex flex-column align-item-center justify-content-center">
                <div className="mb-2" style={{ fontFamily: "Ubuntu" }}>
                  Signup
                </div>
                <div className="bold-big-number d-flex flex-column align-item-center justify-content-center">
                  {signupUsingReferral}
                </div>
              </div>
              <div className="referral-display-card p-4 d-flex flex-column align-item-center justify-content-center">
                <div className="mb-2" style={{ fontFamily: "Ubuntu" }}>
                  Upgrades
                </div>
                <div className="bold-big-number">{upgrades}</div>
              </div>
            </div>

            <div
              className="referral-link-and-copy-to-clipboard"
              style={{ textAlign: "center" }}
            >
              <div className="ui action input" style={{ minWidth: "400px" }}>
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  placeholder="Search..."
                />
                <button
                  className="ui icon button"
                  onClick={() => {
                    navigator.clipboard.writeText(referralLink).then(
                      function () {
                        console.log(
                          "Async: Copying to clipboard was successful!"
                        );
                        dispatch(
                          showSnackbar(
                            "success",
                            "Referral Link copied to clipboard!"
                          )
                        );
                      },
                      function (err) {
                        console.error("Async: Could not copy text: ", err);
                        dispatch(
                          showSnackbar("error", "Failed to copy referral link.")
                        );
                      }
                    );
                  }}
                >
                  <ContentCopyRoundedIcon />
                </button>
              </div>
            </div>

            <div
              className="social-media-share-your-link mt-5"
              style={{ textAlign: "center" }}
            >
              <div className="btn-outline-text">Share your link</div>
              <div
                className=" d-flex flex-row align-items-center justify-content-center"
                style={{ width: "100%" }}
              >
                <div className="Demo__some-network me-4">
                  <WhatsappShareButton
                    url={referralLink}
                    title={"Claim your $10 on Bluemeet.in for Free!"}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <IconButton
                      style={{ height: "fit-content", width: "fit-content" }}
                    >
                      <WhatsAppIcon
                        style={{ fontSize: "24", fill: "#0C881D" }}
                      />
                    </IconButton>
                  </WhatsappShareButton>
                </div>
                <div className="Demo__some-network me-4">
                  <FacebookShareButton
                    url={referralLink}
                    quote={"Claim your $10 on Bluemeet.in for Free!"}
                    className="Demo__some-network__share-button"
                  >
                    <IconButton>
                      <FacebookIcon
                        style={{ fontSize: "24", fill: "#1760A8" }}
                      />
                    </IconButton>
                  </FacebookShareButton>
                </div>
                <div className="Demo__some-network me-4">
                  <LinkedinShareButton
                    url={referralLink}
                    title={"Claim your $10 on Bluemeet.in for Free!"}
                    className="Demo__some-network__share-button"
                  >
                    <IconButton>
                      <LinkedInIcon
                        style={{ fontSize: "24", fill: "#2565A5" }}
                      />
                    </IconButton>
                  </LinkedinShareButton>
                </div>
                <div className="Demo__some-network me-4">
                  <TwitterShareButton
                    url={referralLink}
                    title={"Claim your $10 on Bluemeet.in for Free!"}
                    className="Demo__some-network__share-button"
                  >
                    <IconButton>
                      <TwitterIcon
                        style={{ fontSize: "24", fill: "#539FF7" }}
                      />
                    </IconButton>
                  </TwitterShareButton>
                </div>

                <div className="Demo__some-network me-4">
                  <RedditShareButton
                    url={referralLink}
                    title={"Claim your $10 on Bluemeet.in for Free!"}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <IconButton>
                      <RedditIcon style={{ fontSize: "24", fill: "#ff4500" }} />
                    </IconButton>
                  </RedditShareButton>
                </div>
                <div className="Demo__some-network me-4">
                  <TelegramShareButton
                    url={referralLink}
                    title={"Claim your $10 on Bluemeet.in for Free!"}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <IconButton>
                      <TelegramIcon
                        style={{ fontSize: "24", fill: "#0088cc" }}
                      />
                    </IconButton>
                  </TelegramShareButton>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default AvatarMenu;
