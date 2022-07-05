import React from "react";
import Select from "react-select";

const options = [
  { value: "Technology", label: "Technology" },
  { value: "Education", label: "Education" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Professional Development", label: "Professional Development" },
  { value: "Arts and crafts", label: "Arts and crafts" },
  { value: "Business & Enterpreneurship", label: "Business & Enterpreneurship" },
  { value: "Job Search", label: "Job Search" },
  { value: "Entertainment", label: "Entertainment" },{ value: "Health", label: "Health" },
  { value: "Crypto", label: "Crypto" },
  { value: "Web Security", label: "Web Security" },
];

const SelectEventPreferences = () => {
  return <Select isMulti className="basic-multi-select" name="eventPreferenceSelector"
  classNamePrefix="select" options={options} />;
};

export default SelectEventPreferences;
