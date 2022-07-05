import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import WelcomeBack from "./../../../assets/images/welcome-back.png";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import {restartMembership } from "../../../actions";
import { useParams } from "react-router";

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

const RestartMembership = ({ open, handleClose }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const communityId = params.id;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { communityDetails } = useSelector((state) => state.community);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="p-3">
            <Heading className="">Welcome back</Heading>
          </HeaderFooter>

          <DialogContent
            className="pt-4 d-flex flex-column align-items-center"
            style={{}}
          >
            {/* Here write main content */}

            <Image className="mb-4" src={WelcomeBack} />

            <div className="mb-3">
              <FormLabel className="mb-2">
                This will restart your membership and you will continue to have all features after {dateFormat(
                  communityDetails.planExpiresAt,
                  "ddd, mmm dS, yyyy"
                )} (current billing period). Your credit card will be charged accordingly as your current plan price at the end of this billing period. Please confirm to continue.{" "}
                
                
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
                dispatch(restartMembership(communityId, handleClose));
              }}
              className="btn btn-outline-text btn-success"
            >
              Confirm
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RestartMembership;
