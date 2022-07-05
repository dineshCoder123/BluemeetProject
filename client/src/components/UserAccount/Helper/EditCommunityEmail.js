import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import validator from "validator";
import {
  showSnackbar,
  changeCommunityAccountRequestEmail,
} from "./../../../actions";

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #494949;
`;

const Heading = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const EditCommunityEmail = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { communityVerificationEmail, communityVerificationId } = useSelector(
    (state) => state.user
  );

  const { communityRequests, communities } = useSelector(
    (state) => state.community
  );

  let thisCommunity;

  if(communityRequests) {
    thisCommunity = communityRequests.filter(
      (element) => element._id === communityVerificationId
    );
  }

  const [email, setEmail] = React.useState(
    thisCommunity ? thisCommunity.email : ""
  );

  let thisUsersCommunityEmails = [];

  for (let element of communities) {
    thisUsersCommunityEmails.push(element.email);
  }

  if(communityRequests) {
    for (let element of communityRequests) {
      thisUsersCommunityEmails.push(element.email);
    }
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
            <Heading className="">Edit community email</Heading>

            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <CancelRoundedIcon />
            </IconButton>
          </HeaderFooter>

          <DialogContent className="pt-4 d-flex flex-column align-items-center px-4 py-3">
            <div className="" style={{width: "100%"}}>
              <FormLabel className="mb-2" style={{width: "100%"}}>Email</FormLabel>
              <input
              style={{width: "100%"}}
                type="text"
                value={email}
                placeholder=""
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
          </DialogContent>
        </div>
        <HeaderFooter className="p-3">
          <DialogActions>
            <button
              onClick={() => {
                //Validate email and make sure its not same as other emails of this users communities
                if (!validator.isEmail(email)) {
                  // Not a valid email
                  dispatch(
                    showSnackbar("error", "Please enter a valid email.")
                  );
                } else {
                  // Dispatch action creator
                  dispatch(
                    changeCommunityAccountRequestEmail(
                      communityVerificationId,
                      email
                    )
                  );
                }
              }}
              className="btn btn-primary btn-outline-text"
            >
              Save changes
            </button>
          </DialogActions>
        </HeaderFooter>
      </Dialog>
    </>
  );
};

export default EditCommunityEmail;