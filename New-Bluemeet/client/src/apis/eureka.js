import axios from "axios";

const { REACT_APP_MY_ENV } = process.env;
console.log(REACT_APP_MY_ENV);
export default axios.create({
  baseURL: REACT_APP_MY_ENV
    ? "http://localhost:3000/api-eureka"
    : "https://api.bluemeet.in/api-eureka",

  // else
  // {
  // baseURL: "https://www.evenz.co.in/api-eureka",
  // }
});
