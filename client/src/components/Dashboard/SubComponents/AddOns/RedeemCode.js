import React from "react";
import styled from "styled-components";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import AppSumo from "./../../../../assets/images/clip-1.svg";
import AlreadyRedeemed from "./../../../../assets/images/Food.svg";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar, redeemCodes } from "./../../../../actions";

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

const RedeemCode = ({ open, handleClose }) => {
  const [tags, setTags] = React.useState([]);

  const { communityDetails } = useSelector((state) => state.community);
  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  const communityId = communityDetails._id;

  const codesApplied = communityDetails.codesApplied.length;

  const remainingMaxCodes = 3 - codesApplied * 1;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="p-3">
            <Heading className="">Redeem AppSumo code</Heading>
          </HeaderFooter>

          <DialogContent
            className="pt-4 d-flex flex-column align-items-center"
            style={{}}
          >
            {/* Here write main content */}

            <Image
              className="mb-4"
              src={remainingMaxCodes === 0 ? AlreadyRedeemed : AppSumo}
            />

            <div className="mb-3">
              <FormLabel className="mb-2">
                {remainingMaxCodes === 0
                  ? "You have already stacked 3 codes. Now you can enjoy all premium features for lifetime."
                  : "You are just a step away from enjoying lifetime benefits."}
              </FormLabel>
            </div>

            {remainingMaxCodes === 0 ? (
              <></>
            ) : (
              <div className="mb-3 overlay-form-input-row">
                <FormLabel
                  for="tags"
                  className="form-label form-label-customized"
                >
                  Enter codes (Remaining {remainingMaxCodes})
                </FormLabel>
                <div className="form-group">
                  <ReactTagInput
                    tags={tags}
                    placeholder="Type code and press enter. You can stack codes."
                    maxTags={remainingMaxCodes}
                    editable={true}
                    readOnly={false}
                    removeOnBackspace={true}
                    onChange={(newTags) => {
                      setTags(newTags);
                    }}
                  />
                </div>
              </div>
            )}
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

            {remainingMaxCodes === 0 ? (
              <></>
            ) : (
              <button
                onClick={() => {
                  console.log(tags.length * 1 === 0);
                  if (tags.length * 1 === 0) {
                    dispatch(
                      showSnackbar("info", "Please enter a code to apply.")
                    );
                  } else {
                    dispatch(redeemCodes(communityId, userId, tags)); // send a request to backend for redemption process.
                  }
                }}
                className="btn btn-outline-text btn-primary"
              >
                Apply codes
              </button>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RedeemCode;
