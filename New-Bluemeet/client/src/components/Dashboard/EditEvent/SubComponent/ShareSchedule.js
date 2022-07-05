import React from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "react-select";

const shareWithOptions = [{label: "Attendee", value: "Attendee"}, {label: "Speaker", value: "Speaker"}, {label: "Booth Exhibitors", value: "Booth Exhibitors"} ]

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
};

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
  font-size: 0.76rem;
  color: #494949;
`;

const OptionText = styled.span`
font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.82rem;
  color: #3A3939;
`

const ShareSchedule = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="p-3">
            <Heading className="">Share schedule</Heading>
          </HeaderFooter>

          <DialogContent className="py-4">
            {/* Here write main content */}

            <div className="mb-3">
              <FormLabel className="mb-2">Share schedule with</FormLabel>
              <div className="row-3-in-1 d-flex flex-row align-items-center justify-content-between">
                  <div>
              <FormControlLabel control={<Checkbox defaultChecked />} label="" /> <OptionText>Attendees</OptionText>
              </div>
              <div>
              <FormControlLabel control={<Checkbox defaultChecked />} label="" /><OptionText>Speakers</OptionText>
              </div>
              <div>
              <FormControlLabel control={<Checkbox defaultChecked />} label="" /><OptionText>Booth exhibitors</OptionText>
              </div>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label=""
              />
              <FormLabel className="mb-2">
                Include add to calander Button
              </FormLabel>
            </div>
          </DialogContent>
          <HeaderFooter className="p-3">
            <DialogActions>
              <button
                className="btn btn-outline-dark btn-outline-text me-3"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-outline-text">
                Share
              </button>
            </DialogActions>
          </HeaderFooter>
        </div>
      </Dialog>
    </>
  );
};

export default ShareSchedule;
