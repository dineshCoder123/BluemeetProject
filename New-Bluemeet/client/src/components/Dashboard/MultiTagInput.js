import React, { useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const MultiTagInput = (props) => {
  const [tags, setTags] = React.useState([]);

  useEffect(() => {
    setTags(props.value ? props.value : []);
  }, [props.value]);
  const input = props.input;
  return (
    <>
      <div>
        <ReactTagInput
          tags={tags}
          placeholder="Type and press enter"
          maxTags={6}
          editable={true}
          readOnly={false}
          removeOnBackspace={true}
          onChange={(newTags) => {
            setTags(newTags);
            input.onChange(newTags);
          }}
          onBlur={() => {
            input.onBlur();
          }}
        />
      </div>
    </>
  );
};

export default MultiTagInput;
