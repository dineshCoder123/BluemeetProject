import React from "react";
import { Dialog } from "@material-ui/core";

import styled from "styled-components";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SetPriorityPaper = styled.div`
  background-color: #ffffff;
  height: auto;
  width: 400px;
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

const SmallText = styled.small`
font-weight: 500;
font-family: "Ubuntu";
font-size: 0.8rem;
`

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

const SetPriority = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [alignment, setAlignment] = React.useState("none");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        // maxWidth={"668px"}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <SetPriorityPaper className="px-4 py-3">
          <WidgetHeadlineWithClose className="pb-1 mb-4">
            <div>Set Priority</div>
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

          <SmallText >Note: Priority emails will be sent for high and medium automatically (for low you can explicitly set reminder).</SmallText>

          <ToggleButtonGroup
          className="my-4"
            fullWidth={true}
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            orientation="vertical"
          >
            <ToggleButton value="none">None</ToggleButton>
            <ToggleButton value="high">High</ToggleButton>
            <ToggleButton value="medium">Medium</ToggleButton>
            <ToggleButton value="low">Low</ToggleButton>
          </ToggleButtonGroup>

          <ButtonOutlinedDark>Set priority</ButtonOutlinedDark>

        </SetPriorityPaper>
      </Dialog>
    </>
  );
};

export default SetPriority;
