import styled from "styled-components";

const FormLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;
  margin-bottom: 8px;
`;

const ConsentText = styled.div`
  font-size: 0.77rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;
`;

const Input = styled.input`
  &:focus {
    border: 1px solid #152d35 !important;
  }
  &:hover {
    border: 1px solid #152d35 !important;
  }
`;

const FormValidationFailed = styled.div`
  font-family: "Ubuntu";
  font-weight: 300;
  font-size: 0.74rem;
  color: #f32929;
`;

const FormValidationWarning = styled.div`
  font-family: "Ubuntu";
  font-weight: 300;
  font-size: 0.74rem;
  color: #8b780d;
`;

const DashboardSectionHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.25rem;
  color: #152d35;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const EventCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;

  padding-left: 1rem;
  padding-right: 1rem;
`;

const EventCardWrapper = styled.div`
  height: 280px;
  border: 10px;
  filter: drop-shadow(1px 1px 10px #f1f1f1);

  background: #ffffff;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const EventCardImg = styled.img`
  width: 100%;
  height: 50%;
  background-color: #212121;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const EventCardEventName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.85rem;
  color: #152d35;
`;

const EventCardEventTimeLine = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.68rem;
  color: #3a3a3a;
`;

const EventCardEventPriceRange = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.68rem;
  color: #3a3a3a;
`;

const CustomHorizontalTabWarpper = styled.div`
  min-width: 500px;
  height: auto;
  border-radius: 20px;
  border: 1px solid #345b63;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* padding-top: 6px;
  padding-bottom: 6px; */
`;

const CustomTabButton = styled.div`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.78rem;
  color: ${(props) => (props.active && props.active ? "#FFFFFF" : "#152d35")};
  align-self: center;

  text-align: center;
  padding: 6px 12px;
  background-color: ${(props) =>
    props.active && props.active ? "#152d35" : "#FFFFFF"};
  border-radius: 20px;
  border: 1px solid transparent;

  padding-top: 8px;
  padding-bottom: 8px;

  &:hover {
    /* border: 1px solid #fff; */
    background-color: ${(props) =>
      props.active && props.active ? "#152d35" : "#a0a0a057"};
    cursor: pointer;
  }
`;

const NotificationPaper = styled.div`
  width: 280px;
  min-height: 40px;

  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 12px;
  align-items: center;
`;
const NotificationHeadline = styled.div`
  font-weight: 500;
  max-width: 100px;
  font-size: 0.8rem;
  font-family: "Ubuntu";
  color: #152d35;
`;

const NotificationBody = styled.div`
  max-width: 100px;
  font-size: 0.72rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const TimeAgoText = styled.div`
  font-size: 0.7rem;
  font-weight: 400;
  color: #212121;
  font-family: "Ubuntu";
`;

const SideDrawerHeading = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #152d35;
  font-family: "Ubuntu";
`;

const ButtonFilled = styled.div`
  border-radius: 5px;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #ffffff;
  background-color: #152d35;
  border: 1px solid #152d35;
  padding: 8px 12px;

  &:hover {
    background-color: #ffffff;
    color: #152d35;
    cursor: pointer;
  }
`;

const ButtonOutlined = styled.div`
  border-radius: 5px;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #152d35;
  background-color: #ffffff;
  border: 1px solid #152d35;
  padding: 8px 12px;

  &:hover {
    background-color: #152d35;
    color: #ffffff;
    cursor: pointer;
  }
`;

const AvatarMenuListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #212121;

  border: 10px;

  font-size: 0.8rem;
  font-weight: 500;
  font-family: "Ubuntu";

  &:hover {
    /* background-color: #212121; */
    cursor: pointer;
    color: #152d35;
  }
`;

export {
  FormLabel,
  ConsentText,
  Input,
  FormValidationFailed,
  FormValidationWarning,
  DashboardSectionHeading,
  EventCardsGrid,
  EventCardWrapper,
  EventCardImg,
  EventCardEventName,
  EventCardEventTimeLine,
  EventCardEventPriceRange,
  CustomHorizontalTabWarpper,
  CustomTabButton,
  NotificationPaper,
  NotificationHeadline,
  NotificationBody,
  TimeAgoText,
  SideDrawerHeading,
  ButtonFilled,
  ButtonOutlined,
  AvatarMenuListItem,
};
