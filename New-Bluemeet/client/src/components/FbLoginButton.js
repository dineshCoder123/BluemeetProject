import React from "react";
import ReactDOM from "react-dom";
import FacebookLogin from "react-facebook-login";

const responseFacebook = (response) => {
  console.log(response);
};

const FBButton = () => {
  return (
    <>
      <FacebookLogin
        appId="1065222404016317"
        autoLoad={true}
        fields="name,email,picture"
        onClick={() => {
          console.log("FB login was pressed!");
        }}
        callback={responseFacebook}
      />
    </>
  );
};

export default FBButton;
