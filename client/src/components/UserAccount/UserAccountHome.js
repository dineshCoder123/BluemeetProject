/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import "./../../assets/css/hiddenScroll.css";
import { CssBaseline, IconButton } from "@material-ui/core";
import "./../../assets/css/UserAccountStyle.css";
import CenteredTabs from "./UserAccountCenteredTabBar";
import UserAccountSideNav from "./UserAccountSideNav";
import UserAccountHomeMainBody from "./UserAccountHomeMainBodyComponent";
import UserAccountEventsMainBody from "./UserAccountEventsMainBody";
import UserAccountConnections from "./UserAccountConnections";
import UserAccountProfileMainBody from "./UserAccountProfileMainBody";
import { fetchUserAllPersonalData } from "../../actions/index";
import { navigationIndex } from "../../actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../history";
import Loader from "../Loader";
import AvatarMenu from "./../AvatarMenu";
import HelpSideDrawer from "../HelpSideDrawer";
import WhatsNew from "../WhatsNew";
import ConfirmCommunityMail from "./Helper/ConfirmCommunityMail";
import UserAccountBriefcase from "./UserAccountBriefcase";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationSideDrawer from "./Helper/NotificationSideDrawer";
import Wishlist from "./Helper/Wishlist";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Following from "./Following";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";

import { styled as MUIStyled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";

const CustomButton = styled.div`
  color: #212121;
  border-radius: 25px;
  &:hover {
    cursor: pointer;
    background-color: #ececec;
  }
`;

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

const UserAccountHome = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenHelpDropUp((prev) => !prev);
  };

  const [openHelpDropUp, setOpenHelpDropUp] = React.useState(false);

  const handleCloseHelpDropUp = () => {
    setOpenHelpDropUp(false);
  };

  const dispatch = useDispatch();

  const [openNotifications, setOpenNotifications] = useState(false);

  const [openWishlist, setOpenWishlist] = React.useState(false);

  const handleCloseWishlist = () => {
    setOpenWishlist(false);
  };

  const handleCloseNotifications = () => {
    setOpenNotifications(false);
  };

  const { openCommunityVerificationNotice } = useSelector(
    (state) => state.user
  );

  const { isLoading } = useSelector((state) => state.user);

  const [openHelp, setOpenHelp] = useState(false);

  const [openWhatsNew, setOpenWhatsNew] = useState(false);

  const handleCloseWhatsNew = () => {
    setOpenWhatsNew(false);
  };

  const handleCloseHelp = () => {
    setOpenHelp(false);
  };

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  useEffect(() => {
    console.log(params.code);
    dispatch(fetchUserAllPersonalData());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(navigationIndex(0));
    };
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    dispatch(navigationIndex(newValue));
    switch (newValue) {
      case 0: {
        history.push("/user/home/");
        break;
      }
      case 1: {
        history.push("/user/events");
        break;
      }
      case 2: {
        history.push("/user/connections");
        break;
      }
      case 3: {
        history.push("/user/profile");
        break;
      }
      case 4: {
        history.push("/user/following");
        break;
      }

      default: {
        break;
      }
    }
  };

  const { currentIndex } = useSelector((state) => state.navigation);

  return (
    <>
      <CssBaseline />
      {isLoading ? (
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Loader />
        </div>
      ) : (
        <div
          className="first-step-user-section container-fluid page-user-account"
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            overflow: "auto",
            width: "auto",
          }}
        >
          <div className="user-account-body">
            <UserAccountSideNav className="first-step-user-section" />
            <div
              className="user-account-main-body"
              style={{
                minWidth: "1024px",
                overflow: "visible",
                position: "relative",
              }}
            >
              <div className="opaque-layer" style={{ height: "100%" }}></div>
              <div className="d-flex flex-row align-items-center justify-content-end py-2 px-2">
                <IconButton
                  onClick={() => {
                    setOpenWishlist(true);
                  }}
                >
                  <FavoriteBorderRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setOpenNotifications(true);
                  }}
                >
                  <NotificationsNoneRoundedIcon />
                </IconButton>
                <CustomButton
                  id="demo-customized-button"
                  aria-controls="demo-customized-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="outlined"
                  disableElevation
                  onClick={handleClickMore}
                  className="btn-outline-text ms-2 d-flex flex-row align-items-center p-2"
                >
                  <span className="mx-2"> Help </span>
                </CustomButton>
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
                    onClick={() => {
                      handleClose();
                    }}
                    className="mb-1"
                    disableRipple
                  >
                    <a
                      href={`https://bluemeetinc.zendesk.com/hc/en-us`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <ArticleRoundedIcon />
                      <MenuText>Knowledge Base</MenuText>
                    </a>
                  </MenuItem>

                  <MenuItem
                    className="mb-1"
                    onClick={() => {
                      history.push("/learn");
                      handleClose();
                    }}
                    disableRipple
                  >
                    <a
                      href={`/learn`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <VideoLibraryRoundedIcon />
                      <MenuText>Tutorial videos</MenuText>
                    </a>
                  </MenuItem>
                  <MenuItem
                    className="mb-1"
                    onClick={() => {
                      handleClose();
                    }}
                    disableRipple
                  >
                    <a
                      href={`https://bluemeetinc.zendesk.com/hc/en-us/community/topics`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <ForumRoundedIcon />
                      <MenuText>Ask in community</MenuText>
                    </a>
                  </MenuItem>
                </StyledMenu>
                <div className="ms-3">
                  <AvatarMenu />
                </div>
              </div>
              <div className="user-account-centered-tab-navigation mb-4">
                <CenteredTabs
                  activeIndex={currentIndex}
                  handleChange={handleChange}
                />
              </div>
              {(() => {
                switch (currentIndex) {
                  case 0:
                    return <UserAccountHomeMainBody />;
                  case 1:
                    return <UserAccountEventsMainBody />;

                  case 2:
                    return <UserAccountConnections />;

                  case 3:
                    return <UserAccountProfileMainBody />;

                  case 4:
                    return <Following />;

                  default:
                    return <div>You are a User.</div>;
                }
              })()}
            </div>
          </div>
        </div>
      )}
      <HelpSideDrawer openHelp={openHelp} handleCloseHelp={handleCloseHelp} />
      <WhatsNew
        openWhatsNew={openWhatsNew}
        handleCloseWhatsNew={handleCloseWhatsNew}
      />
      <ConfirmCommunityMail open={openCommunityVerificationNotice} />
      <NotificationSideDrawer
        open={openNotifications}
        handleClose={handleCloseNotifications}
      />
      <Wishlist open={openWishlist} handleClose={handleCloseWishlist} />
    </>
  );
};

export default UserAccountHome;
