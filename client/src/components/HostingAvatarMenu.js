/* eslint-disable no-unused-vars */
import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./../index.css";
import "./../assets/css/style.css";
import "./../assets/css/UserAccountStyle.css";
import "./../assets/css/CardStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { navigationIndex, signOut } from "../actions/index";
import history from "../history";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    // marginRight: theme.spacing(2),
    minWidth: "180px"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const HostingAvatarMenu = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const onClickLoggedOut = async () => {
    const allKeys = Object.keys(localStorage);

    allKeys.forEach((value) => {
      localStorage.removeItem(value);
    });

    dispatch(signOut());
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const image = user.userDetails.image;
  const userName = user.userDetails.firstName;

  let imgURL;

  if (image) {
    if (image.startsWith("https://")) {
      imgURL = image;
    } else {
      imgURL = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${image}`;
    }
  }

  return (
    <div
      style={{ zIndex: "1000000000000000000" }}
      className={`${classes.root} me-3`}
    >
      <div>
        <Button
          style={{ padding: "0" }}
          ref={anchorRef}
          disableRipple={true}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="false"
          onClick={handleToggle}
          disableElevation={true}
        >
          <div className="avatar-menu-h-wrapper d-flex flex-row align-items-center p-0">
            <Avatar variant="rounded" alt={userName} src={imgURL} />
          </div>
        </Button>

        <Popper
          style={{
            zIndex: 10000,
            textAlign: "center",
            marginTop: "20px",
            minWidth: "170px",
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
                    <MenuItem
                      onClick={(event) => {
                        dispatch(navigationIndex(0));
                        history.push("/user/home");
                        handleClose(event);
                      }}
                    >
                      <div className="avatar-menu-account-section-btns mb-2" style={{textAlign: "center"}}>
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
        </Popper>
      </div>
    </div>
  );
};

export default HostingAvatarMenu;
