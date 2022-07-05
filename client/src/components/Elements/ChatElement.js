import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import Faker from "faker";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";

const PersonName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #212121;
  display: block;
`;

const UserRoleTag = styled.div`
  text-align: center;
  background-color: #152d35;
  height: max-content;
  border-radius: 5px;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.7rem;
  color: #ffffff;

  padding: 4px 8px;
`;

const TimeAgo = styled.div`
  font-weight: 500;
  font-size: 0.7rem;
  font-family: "Ubuntu";
  color: #152d35;
`;

const ChatMsgText = styled.div`
  margin-left: 4rem;
  justify-self: end;
  background-color: #e9e9e9;
  width: 84%;
  border-radius: 5px;

  font-weight: 500;
  font-size: 0.86rem;
  font-family: "Ubuntu";
  color: #152d35;

  padding: 12px 12px;
`;

const ChatActions = styled.div`
position: absolute;
right: 0px;
top: -10px;
z-index: 10;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: max-content;

  display: ${props => props.visibility && props.visibility};
`;

const ChatElement = () => {
  const [visibility, setVisibility] = useState("none");

  return (
    <>
      <div
        onMouseEnter={() => {
          //   if (!forReply) {

          //   }
          setVisibility("inline-block");

          console.log("mouse enter detected");
        }}
        onMouseLeave={() => {
          //   if (!forReply) {

          //   }

          setVisibility("none");
          console.log("mouse leave detected");
        }}
      >
        <div className="d-flex flex-row mb-4 justify-content-between">
          <div className="d-flex flex-row">
            <Avatar
              src={Faker.image.avatar()}
              alt={Faker.name.findName()}
              variant="rounded"
              className="me-3"
            />
            <div>
              <PersonName>{Faker.name.findName()}</PersonName>
              <PersonName>{"Product manager, Bluemeet"}</PersonName>
            </div>
          </div>

          <div>
            <UserRoleTag className="mb-2">Host</UserRoleTag>
            <TimeAgo>3 min ago</TimeAgo>
          </div>
        </div>

        <div>
          <ChatActions visibility={visibility}>
            <ReplyRoundedIcon
              // onClick={() => {
              //   createReplyWidget(name, image, msgText);
              // }}
              className="chat-msg-hover-icon me-2"
              style={{ display: visibility, fontSize: "18px" }}
            />
            <ReportOutlinedIcon
              // onClick={() => {
              //   setOpen(true);
              // }}
              className="chat-msg-hover-icon me-2"
              style={{ display: visibility, fontSize: "18px" }}
            />
            <DeleteOutlineRoundedIcon
              // onClick={() => {
              //   setOpenDelete(true);
              // }}
              className="chat-msg-hover-icon"
              style={{ display: visibility, fontSize: "18px" }}
            />
          </ChatActions>
          <ChatMsgText>Hi there</ChatMsgText>
        </div>
      </div>
    </>
  );
};

export default ChatElement;

// import React, { useState } from "react";
// import { Avatar, IconButton } from "@material-ui/core";
// import "./../../../Styles/root.scss";
// import "./../../../Styles/chatComponent.scss";

// import SentimentSatisfiedRoundedIcon from "@material-ui/icons/SentimentSatisfiedRounded";
// import ReportRoundedIcon from "@material-ui/icons/ReportRounded";
// import Emoji1 from "./../../../../../assets/images/emoji1.png";
// import Emoji2 from "./../../../../../assets/images/emoji2.png";
// import Emoji3 from "./../../../../../assets/images/emoji3.png";
// import Emoji4 from "./../../../../../assets/images/emoji4.png";
// import Emoji5 from "./../../../../../assets/images/emoji5.png";
// import Emoji6 from "./../../../../../assets/images/emoji6.png";
// import Emoji7 from "./../../../../../assets/images/emoji7.png";
// import Emoji8 from "./../../../../../assets/images/emoji8.png";
// import ReportMsg from "./ReportMsg";
// import DeleteMsg from "./DeleteMsg";

// const ChatMsgElement = ({
//   name,
//   image,
//   msgText,
//   forReply,
//   createReplyWidget,
//   showOptions,
// }) => {
//   const [open, setOpen] = useState(false);

//   const [visibility, setVisibility] = useState("none");

//   const [openDelete, setOpenDelete] = useState(false);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//   };

//   // if(!showOptions) {
//   //   setVisibility("none");
//   // }

//   return (
//     <>
//       <div
//         className="chat-msg-element py-2"

//       >
//         <div style={{ position: "relative" }}>
//           <div
//             className=" mb-2"
//             style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
//           >
//             <Avatar src={image} alt={name} variant="rounded" />
//             <div
//               className="chat-box-name ms-3"
//               style={{ textTransform: "capitalize", fontFamily: "Ubuntu", color: "#fff" }}
//             >
//               <div>
//                 {name}
//                 {/* <span>Host</span> */}
//                 </div>

//               <div
//                 style={{
//                   fontWeight: "500",
//                   color: "#FFFFFF",
//                   fontSize: "0.7rem",
//                 }}
//                 className="d-flex flex-row align-items-center justify-content-between"
//               >
//                 <div>Product Manager, Evenz</div>

//                 <div>3m ago</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className=" mb-2"
//           style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
//         >
//           <div></div>
//           <div style={{ position: "relative" }}>
//             <div
//               className="chat-msg-hover-elm flex-row align-items-center justify-content-between px-2 py-1"
//               style={{ display: visibility }}
//             >
//
//             </div>
//             <div
//               className="chat-msg-text ms-3 p-3"
//               style={{ borderTopLeftRadius: "0", color: "#212121" }}
//             >
//               <div >{msgText}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/*  */}
//       <ReportMsg
//         name={name}
//         image={image}
//         msgText={msgText}
//         open={open}
//         handleClose={handleClose}
//       />

//       <DeleteMsg
//         name={name}
//         image={image}
//         msgText={msgText}
//         open={openDelete}
//         handleClose={handleCloseDelete}
//       />
//     </>
//   );
// };

// export default ChatMsgElement;
