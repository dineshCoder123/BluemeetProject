import React, { useState } from "react";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

const MultiTagsInput = () => {
  const [state, setState] = useState({ tags: [] });
  const handleChange = (tags) => {
    setState({ tags });
  };

  return <TagsInput onlyUnique="true" className="form-control" value={state.tags} onChange={handleChange} />;
};

export default MultiTagsInput;
