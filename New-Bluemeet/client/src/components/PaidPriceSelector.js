import { React, useState } from "react";
import CustomisedSlider from "./CustomisedSlider";
import history from "./../history";

import './../index.css';
import './../assets/css/style.css';
import './../assets/css/UserAccountStyle.css';
import './../assets/css/CardStyle.scss';

const PaidPriceSelector = (props) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const onApplyPriceRange = (e) => {
    props.searchParams.set("max_price", maxPrice);
    props.searchParams.set("min_price", minPrice);
    props.URL.search = props.searchParams.toString();
    let new_url = props.URL.toString();

    const len = new_url.split("?")[0].length;

    const result = new_url.substring(len);
    console.log(typeof result);
    console.log(result);
   
    if (result === "") {
      history.push("/search-events/");
    } else {
      history.push(result);
    }
  };

  const setMinAndMaxPriceHandler = (event, value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const setMinPriceHandler = (e) => {
    setMinPrice(e.target.value);
  };
  const setMaxPriceHandler = (e) => {
    setMaxPrice(e.target.value);
  };
  return (
    <div className="px-3">
      <CustomisedSlider rangeHandler={setMinAndMaxPriceHandler} />
      <div className="row">
        <div className="col-6">
          <div className="mb-3 me-3">
            <label for="exampleInputEmail1" className="form-label">
              Min
            </label>
            <input
              type="number"
              min="0"
              max="1000"
              value={minPrice}
              onChange={setMinPriceHandler}
              className="form-control"
            ></input>
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Max
            </label>
            <input
              type="number"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={setMaxPriceHandler}
              className="form-control"
            ></input>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6 d-flex justify-content-end">
          <button
            className="btn btn-outline-primary"
            onClick={onApplyPriceRange}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaidPriceSelector;
