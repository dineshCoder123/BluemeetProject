import React from "react";
import styled from "styled-components";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Select from "react-select";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.8rem",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.8rem",
  }),
};

const trackOptions = [];

const MyMeetingsFilterBody = styled.div`
  background-color: #ffffff;
  width: 568px;
  height: auto;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  font-family: "Ubuntu";
  color: #152d35;

  margin-bottom: 6px;
`;

const ButtonFilledDark = styled.div`
  padding: 6px 10px;
  text-align: center;

  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";

  background-color: #152d35;

  border: 1px solid #152d35;
  border-radius: 5px;

  &:hover {
    color: #152d35;
    background-color: transparent;
    cursor: pointer;
  }
`;

const ButtonOutlinedDark = styled.div`
  padding: 6px 10px;
  text-align: center;

  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";

  color: #152d35;
  background-color: transparent;

  border: 1px solid #152d35;
  border-radius: 5px;

  &:hover {
    background-color: #152d35;

    color: #ffffff;

    cursor: pointer;
  }
`;

const WidgetHeadlineWithClose = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-size: 1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;

  border-bottom: 1px solid #152d35;
`;

const SessionsFilter = ({ open, handleClose }) => {
  const [statusAlignment, setStatusAlignment] = React.useState("all");

  const handleChangeStatus = (event, newAlignment) => {
    setStatusAlignment(newAlignment);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"668px"}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <MyMeetingsFilterBody className="px-4 py-3">
          <WidgetHeadlineWithClose className="pb-1 mb-4">
            <div>Filter meetings</div>
            <div style={{ textAlign: "end" }}>
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </WidgetHeadlineWithClose>

          <FormLabel>Track</FormLabel>
          <Select
            className="mb-4"
            defaultValue={trackOptions[0]}
            styles={styles}
            menuPlacement={"bottom"}
            name={"session track"}
            options={trackOptions}
            // onChange={(value) => input.onChange(value)}
          />

          <FormLabel>Status</FormLabel>

          <ToggleButtonGroup
            className="mb-4"
            color="success"
            value={statusAlignment}
            exclusive
            onChange={handleChangeStatus}
            fullWidth={true}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="notstarted">Not started</ToggleButton>
            <ToggleButton value="ongoing">Ongoing</ToggleButton>
            <ToggleButton value="ended">Ended</ToggleButton>
          </ToggleButtonGroup>

          {/*  */}

          <FormLabel>Date</FormLabel>
          <input type="date" className="form-control mb-4"></input>

          <div className="d-flex flex-row align-items-center justify-content-end ">
            <ButtonOutlinedDark className="me-3">Clear</ButtonOutlinedDark>
            <ButtonFilledDark>Apply</ButtonFilledDark>
          </div>
        </MyMeetingsFilterBody>
      </Dialog>
    </>
  );
};

export default SessionsFilter;
