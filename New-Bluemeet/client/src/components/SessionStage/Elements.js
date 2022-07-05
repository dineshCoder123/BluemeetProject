import styled from "styled-components";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";

const Button = styled.div`
  font-family: "Ubuntu";
  font-weight: 500;
  border: none;
  background-color: #0b4f6c;
  color: #dcc7be;
  padding: 7px 12px;
  width: max-content;
  border-radius: 3px;
  font-size: 0.9rem;
`;

const StageNav = styled.div`
  height: 7vh;
  background-color: #152d35;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  align-items: center;
  justify-content: space-between;
`;

const StageBody = styled.div`
  min-height: 86vh;
  height: 92%;
  background-color: #345b63;
  width: 100%;

  position: relative;

  display: grid;
  grid-template-columns: ${(props) =>
    props.openSideDrawer && props.openSideDrawer ? "5fr 1.55fr" : "1fr"};
  align-items: center;
  /* grid-gap: 8px; */
`;

const GalleryView = styled.div`
  min-height: 85vh;
  height: 90%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.col && props.col ? props.col : "1fr 1fr 1fr 1fr"};
  grid-template-rows: ${(props) =>
    props.row && props.row ? props.row : "1fr 1fr"};
  grid-gap: 24px;
  /* justify-content: center; */

  padding: 8vh 3vw;
`;

const GridView = styled.div`
  min-height: 85vh;
  height: 90%;
  display: grid;
  grid-template-columns: 4fr 1.3fr;
  grid-gap: 24px;

  padding: 8vh 3vw;
`;

const SpotlightView = styled.div`
  min-height: 85vh;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;

  padding: 8vh 3vw;
`;

const GridViewMini = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 16px;

  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const StageControl = styled.div`
  min-height: 7vh;
  height: 8%;
  background-color: #152d35;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  align-items: center;
`;

const BrandLogo = styled.div`
  height: 36px;
  width: 36px;
  background-color: #ffffff;
  border-radius: 5px;
`;

const SessionName = styled.div`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.82rem;
  color: #ffffff;
`;

const ChipModified = styled.div`
  color: #ffffff;
  background-color: #f05050;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.82rem;
  padding: 5px 15px;
  border-radius: 15px;
`;

const BtnFilled = styled.div`
  background-color: #345b63;
  padding: 5px 8px;

  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 3px;
  color: #dcc7be;
  max-width: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #1f545e;
    color: #ffffff;
  }
`;

const BtnOutlined = styled.div`
  padding: 5px 8px;
  background-color: transparent;
  border: 1px solid #345b63;

  color: #dcc7be;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PeopleWatching = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: #ffffff;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 3px;
`;

const BtnDanger = styled.div`
  background-color: #dd352f;
  padding: 10px 16px;

  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.82rem;
  border-radius: 3px;
  color: #ffffff;
  max-width: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #ce2d2d;
    color: #ffffff;
  }
`;

const IconButton = styled.div`
  max-width: fit-content;
  padding: 7px;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1px solid #1f545e;
  color: #ffffff;
  background-color: transparent;

  &:hover {
    cursor: pointer;

    border: 1px solid #ffffffa9;
    background-color: #ffffffa9;
    color: #1f545e;
  }
`;

const VideoStreamContainer = styled.div`
  background-color: #83838383;
  border-radius: 20px;
  height: "180px";

  overflow: hidden;
  border-radius: 10px;
  width: 100%;

  /* video {
    object-fit: contain !important;
  } */
`;

const SessionSideDrawer = styled.div`
  padding: 6px 6px;
  width: 100%;
  height: 100%;
  background-color: #212121;

  background: rgba(220, 225, 225, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  /* border-radius: 10px; */
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const SessionSideIconBtnNav = styled.div`
  width: 100%;
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  grid-gap: 12px;

  padding: 12px 7px;
`;

const TabButton = styled.div`
  font-weight: "Ubuntu";
  font-weight: 500;
  font-size: 0.7rem;

  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  background-color: ${(props) => (props.active ? "#152d35" : "#264049")};

  padding: 5px 15px;
  border-radius: 5px;
  text-align: center;

  &:hover {
    background-color: #152d35;
    cursor: pointer;
  }
`;
const Divider = styled.div`
  background-color: #ffffff46;
  height: 1px;
  width: 100%;

  padding: 0px 7px;
  margin-bottom: 10px;
`;

const SessionLinkNav = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  border-bottom: 1px solid #152d35;
`;

const LinkTab = styled.div`
  font-weight: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;

  color: ${(props) => (props.active ? "#152d35" : "#ffffff")};

  border-bottom: ${(props) => props.active && "1px solid #152d35"};

  padding: 6px 10px;
  text-align: center;

  &:hover {
    color: #152d35;
    /* border-bottom: 1px solid #152d35; */
    cursor: pointer;
  }
`;

const PeopleListWidget = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;

  background: #152d3509;
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const PersonName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #212121;
  display: block;
  text-transform: capitalize;
`;

const PersonOrgDesignation = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.7rem;
  color: #3f3f3f;
  display: block;
  text-transform: capitalize;
`;

const UserRoleTag = styled.div`
  text-align: center;
  background-color: #152d35 !important;
  height: max-content;
  border-radius: 5px;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.7rem;
  color: #ffffff;

  padding: 4px 8px;
`;

const ViewCompleteProfileBtn = styled.div`
  border: 1px solid #152d35;
  background-color: transparent;
  color: #152d35;
  font-weight: 500;
  font-size: 0.7rem;
  font-family: "Ubuntu";

  width: 100%;
  text-align: center;
  padding: 3px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #152d35;
    color: #ffff;
    cursor: pointer;
  }
`;

const SessionVideoContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;

  background: #152d3509;
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const CollapseIcon = styled(FirstPageRoundedIcon)`
  position: absolute;
  top: 10px;
  right: 16px;
  color: #ffffff;

  &:hover {
    color: #212121;
  }
`;

const ExpandIcon = styled(LastPageRoundedIcon)`
  position: absolute;
  top: 10px;
  right: 16px;
  color: #ffffff;

  &:hover {
    color: #212121;
  }
`;

const PersonInfoPopUp = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  min-height: 60px;
  width: 300px;
`;

export {
  Button,
  StageNav,
  StageBody,
  StageControl,
  ExpandIcon,
  CollapseIcon,
  SessionName,
  SessionLinkNav,
  SessionVideoContainer,
  SessionSideDrawer,
  SessionSideIconBtnNav,
  ViewCompleteProfileBtn,
  UserRoleTag,
  PersonName,
  PeopleListWidget,
  PeopleWatching,
  LinkTab,
  Divider,
  IconButton,
  TabButton,
  VideoStreamContainer,
  BtnDanger,
  BtnOutlined,
  BtnFilled,
  BrandLogo,
  ChipModified,
  GalleryView,
  GridView,
  GridViewMini,
  SpotlightView,
  PersonInfoPopUp,
  PersonOrgDesignation,
};
