import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    maxWidth: props.maxWidth + "px",
    height: 5,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    // margin: 50
  }

  const fillerStyles = {
    height: '100%',
    maxWidth: props.maxWidth + "px",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        
      </div>
    </div>
  );
};

export default ProgressBar;