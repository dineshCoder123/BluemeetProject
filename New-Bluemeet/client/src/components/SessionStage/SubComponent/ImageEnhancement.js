import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { styled as MUIStyled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";



const Controls = styled.div`
  width: 300px;
  height: 100%;
  /* border-right: 1px solid #212121; */
`;

const FormLabelUI = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  font-family: "Ubuntu";
  color: #152d35;

  margin-bottom: 6px;
`;

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const PrettoSlider = MUIStyled(Slider)({
  color: "#153d35",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#153d35",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const ImageEnhancement = () => {
  return (
    <>
      <Controls className="pe-3">
          <div className="mb-4">
        <FormLabelUI>Contrast level</FormLabelUI>
        <PrettoSlider
          valueLabelDisplay="on"
          aria-label="pretto slider"
          defaultValue={1}
          step={1}
          marks
          min={0}
          max={2}
        />
        </div>
          <div className="mb-4">
        <FormLabelUI>Lightning level</FormLabelUI>
        <PrettoSlider
           valueLabelDisplay="auto"
           aria-label="pretto slider"
           defaultValue={20}
        />
        </div>
          <div className="mb-4">
        <FormLabelUI>Redness level</FormLabelUI>
        <PrettoSlider
           valueLabelDisplay="auto"
           aria-label="pretto slider"
           defaultValue={20}
        />
        </div>
          <div className="mb-4">
        <FormLabelUI>Smoothness level</FormLabelUI>
        <PrettoSlider
           valueLabelDisplay="auto"
           aria-label="pretto slider"
           defaultValue={20}
        />
        </div>
      </Controls>
    </>
  );
};

export default ImageEnhancement;
