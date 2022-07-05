import React, {useState} from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import MailSent from "./../Images/MailSent.png";
import { useDispatch, useSelector } from "react-redux";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  setOpenCommunityVerificationNotice,
  resendCommunityVerificationMail,
} from "./../../../actions";

import EditCommunityEmail from "./EditCommunityEmail";

const Heading = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const Image = styled.img`
  height: 360px;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #494949;
`;

const ConfirmCommunityMail = ({ open }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { communityVerificationEmail, communityVerificationId } = useSelector(
    (state) => state.user
  );

  const [openEditMail, setOpenEditMail] = useState(false);

  const handleCloseEditMail = () => {
    setOpenEditMail(false);
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="d-flex flex-row align-items-center justify-content-between p-3">
            <Heading className="">Confirm community email</Heading>

            <IconButton
              onClick={() => {
                dispatch(setOpenCommunityVerificationNotice(false));
              }}
            >
              <CancelRoundedIcon />
            </IconButton>
          </HeaderFooter>

          <DialogContent className="pt-4 d-flex flex-column align-items-center">
            <Image className="mb-4" src={MailSent} />

            <div className="mb-3">
              <FormLabel className="mb-2">
                <span>
                  Please check your mail{" "}
                  <span>
                    {" "}
                    <strong>{communityVerificationEmail}</strong>{" "}
                  </span>{" "}
                  and click on the verify button to verify your new community.
                </span>
              </FormLabel>
            </div>
          </DialogContent>

          <div className="d-flex flex-row align-items-center justify-content-end px-4 pb-4">
            <button
              onClick={() => {
                dispatch(
                  resendCommunityVerificationMail(communityVerificationId)
                );
                // dispatch(setOpenCommunityVerificationNotice(false));
              }}
              className="btn btn-outline-text btn-primary me-3"
            >
              Resend mail
            </button>
            <button
              onClick={() => {
                dispatch(setOpenCommunityVerificationNotice(false));
                setOpenEditMail(true);
              }}
              className="btn btn-outline-text btn-outline-dark d-flex flex-row align-items-center"
            >
              <EditRoundedIcon style={{ fontSize: "17px" }} />{" "}
              <span className="ms-2"> Edit email </span>
            </button>
          </div>
        </div>
      </Dialog>
      <EditCommunityEmail open={openEditMail} handleClose={handleCloseEditMail} />
    </>
  );
};

export default ConfirmCommunityMail;
