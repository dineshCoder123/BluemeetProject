import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import "./../../../../assets/Sass/DataGrid.scss";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "@material-ui/core/MenuItem";

import { styled as MUIStyled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { unfollowCommunity } from "./../../../../actions";

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

const FollowingDetailsCard = ({ id, name, email, image }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  return (
    <>
      <div
        className="session-list-fields-container"
        style={{
          gridTemplateColumns: "4fr 4fr 2.5fr 1fr",
          gridGap: "24px",
          alignItems: "center",
        }}
      >
        <div className="">
          <div
            className=" d-flex flex-row align-items-center"
            style={{ width: "100%", fontWeight: "500", fontSize: "0.8rem" }}
          >
            <Avatar src={image} variant="rounded" />
            <span className="ms-3"> {name} </span>
          </div>
        </div>
        <div className="">
          <div
            className=""
            style={{ width: "100%", fontWeight: "500", fontSize: "0.8rem" }}
          >
            {email}
          </div>
        </div>
        <div className="">
          <a
            href={`/community/${id}`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button className="btn btn-outline-text btn-outline-primary">
              Community
            </button>
          </a>
        </div>
        <div className="">
          <button
            id="demo-customized-button"
            aria-controls="demo-customized-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="outlined"
            disableElevation
            onClick={handleClickMore}
            className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
          >
            {" "}
            <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />{" "}
            <span className="ms-2"> Following </span>{" "}
          </button>
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
              className="mb-1"
              onClick={() => {
                dispatch(unfollowCommunity(userId, id));
                handleClose();
              }}
              disableRipple
            >
              <MenuText>Unfollow</MenuText>
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default FollowingDetailsCard;
