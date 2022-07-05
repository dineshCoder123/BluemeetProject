import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import Deactivate from "./../../../assets/images/clip-unsubscribed.svg";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import { deactivateUser } from "./../../../actions";

const Heading = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #494949;
`;

const Image = styled.img`
  height: 360px;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
`;

const ConfirmAccountDeactivation = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails ? userDetails._id : null;

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="p-3">
            <Heading className="">Deactivate my account</Heading>
          </HeaderFooter>

          <DialogContent
            className="pt-4 d-flex flex-column align-items-center"
            style={{}}
          >
            {/* Here write main content */}

            <Image className="mb-4" src={Deactivate} />

            <div className="mb-3">
              <FormLabel className="mb-2">
                <span>
                  We are sad to see you go. <br /> But you can always log in
                  again till{" "}
                </span>
                <span className="my-2">
                  <strong className="my-2">
                    {" "}
                    {dateFormat(
                      Date.now() + 30 * 24 * 60 * 60 * 1000,
                      "ddd, mmm dS, yyyy"
                    )}{" "}
                  </strong>{" "}
                  to get your account back.{" "}
                </span>{" "}
                <br />{" "}
                <span>
                  {" "}
                  Your data will not be available after that. Are you sure to
                  proceed ?
                </span>
              </FormLabel>
            </div>
          </DialogContent>
          <div className="d-flex flex-row align-items-center justify-content-end px-4 pb-4">
            <button
              onClick={() => {
                handleClose();
              }}
              className="btn btn-outline-text btn-outline-dark me-3"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(deactivateUser(userId));
                // dispatch(downgradeToFree(communityId, handleClose)); // ! Here we need to dispatch an action to deactivate this account.
              }}
              className="btn btn-outline-text btn-danger"
            >
              Yes, deactivate my account.
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmAccountDeactivation;
