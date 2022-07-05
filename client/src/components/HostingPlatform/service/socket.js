import io from "socket.io-client";
const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV
  ? "http://localhost:3000"
  : "https://api.bluemeet.in";

const socket = io(BaseURL);

export default socket;