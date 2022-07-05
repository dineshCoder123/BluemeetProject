import React from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Dialog, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { v4 as uuidv4 } from "uuid";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import socket from "./../../service/socket";

const CreatePollContainer = styled.div`
  height: auto; // Make it auto
  width: 480px;
  background-color: #ffffff;
`;

const Header = styled.div`
  background-color: #46525c;
`;

const CreatePollHeading = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.1rem;
  color: #ebebeb;
`;

const Label = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.85rem;
  color: #152d3f;
`;

const AdvancedOptions = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #1f1f1f;
`;

const RadioLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #152d3f;
`;

const StyledInput = styled.input`
  border: 1px solid #212121;
`;

const AddMoreButton = styled.button`
  border: 1px dashed #152d35 !important;
  color: #152d35 !important;
  width: 100%;

  &:hover {
    color: #ffffff !important;
    background-color: #152d35 !important;
  }
`;

const CreateButton = styled.button`
  background-color: #152d35 !important;
  color: #ffffff !important;
  width: 100%;
  border: 1px solid #152d35 !important;
`;

const CreatePoll = ({ open, handleClose }) => {
  const params = useParams();

  const eventId = params.eventId;
  const sessionId = params.sessionId;

  const userId = useSelector((state) => state.eventAccessToken.id);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [showAdvancedOptions, setShowAdvancedOptions] = React.useState(false);

  const [question, setQuestion] = React.useState(null);
  const [option1, setOption1] = React.useState(null);
  const [option2, setOption2] = React.useState(null);

  const [timeLimit, setTimeLimit] = React.useState(null); // By default poll will never expire
  const [whoCanSeeAnswers, setWhoCanSeeAnswers] =
    React.useState("Organiser only"); // By default organiser only
 

  const [options, setOptions] = React.useState([
    { index: uuidv4(), option: "" },
  ]); // {index: uuidV4(), option: String}

  const addNewRow = () => {
    setOptions((prev) => [...prev, { index: uuidv4(), option: "" }]);
  };

  const handleDeleteRow = (index) => {
    setOptions((prev) => prev.filter((element) => element.index !== index));
  };

  const handleChange = (event) => {
    const prev = [...options];

    console.log(event.target.dataset.id);
    prev[event.target.dataset.id][event.target.name] = event.target.value;
    setOptions(prev);
  };

  const handleSubmit = () => {
    // Create a list of options in desired format

    let ModifiedFormValues = {};

    let optionsList = [
      { option: option1, numberOfVotes: 0, votedBy: [] },
      { option: option2, numberOfVotes: 0, votedBy: [] },
    ];

    for (let element of options) {
      optionsList.push({
        option: element.option,
        numberOfVotes: 0,
        votedBy: [],
      });
    }

    console.log(optionsList);

   
    ModifiedFormValues.whoCanSeeAnswers = whoCanSeeAnswers;
    ModifiedFormValues.question = question;
    ModifiedFormValues.options = optionsList;

    if (timeLimit) {
      ModifiedFormValues.expiresAt = Date.now() + timeLimit * 60 * 1000; // Time from now in milliseconds
    }

    ModifiedFormValues.eventId = eventId;
    ModifiedFormValues.sessionId = sessionId;
    ModifiedFormValues.createdBy = userId;
    ModifiedFormValues.createdAt = Date.now();

    console.log(ModifiedFormValues);

    socket.emit(
      "createSessionPoll",
      {
        ...ModifiedFormValues,
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <CreatePollContainer>
          <Header className="d-flex flex-row align-items-center justify-content-between px-4 py-3">
            <CreatePollHeading>Create poll</CreatePollHeading>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <CancelRoundedIcon
                style={{ color: "#EBEBEB" }}
              ></CancelRoundedIcon>
            </IconButton>
          </Header>

          <div className="px-4 py-3">
            <div className="form-group mb-4">
              <Label className="mb-2">Question</Label>

              <StyledInput
                name="question"
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                className="form-control px-3 py-2"
                type="text"
                placeholder="How much do you like this platform?"
              ></StyledInput>
            </div>

            <div className="form-group mb-3">
              <Label className="mb-2">Option 1</Label>

              <StyledInput
                name="option_1"
                onChange={(e) => {
                  setOption1(e.target.value);
                }}
                className="form-control px-3 py-2"
                type="text"
                placeholder="It's awesome"
              ></StyledInput>
            </div>
            <div className="form-group mb-3">
              <Label className="mb-2">Option 2</Label>

              <StyledInput
                name="option_2"
                onChange={(e) => {
                  setOption2(e.target.value);
                }}
                className="form-control px-3 py-2"
                type="text"
                placeholder="I would recommend to all my connections"
              ></StyledInput>
            </div>
            {/* // Here render extra rows */}
            {options.map((option, index) => {
              return (
                <div key={option.index} className="form-group mb-3">
                  <Label className="mb-2">Option {index + 3} </Label>

                  <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                    <StyledInput
                      data-id={index}
                      name="option"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      style={{ width: "86%" }}
                      className="form-control px-3 py-2"
                      type="text"
                      placeholder="Its potential is great"
                    ></StyledInput>
                    <IconButton
                      onClick={() => {
                        handleDeleteRow(option.index);
                      }}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}

            <AddMoreButton
              onClick={() => {
                addNewRow();
              }}
              className="btn btn-outline-text btn-outline-primary mb-4"
            >
              {" "}
              <AddCircleOutlineRoundedIcon className="me-3" />{" "}
              <span> Add option </span>
            </AddMoreButton>

            <div className="d-flex flex-row align-items-center justify-content-between mb-4">
              <AdvancedOptions>Advanced options</AdvancedOptions>

              <IconButton
                onClick={() => {
                  setShowAdvancedOptions(!showAdvancedOptions);
                }}
              >
                {showAdvancedOptions ? (
                  <ArrowDropUpRoundedIcon style={{ fontSize: "30px" }} />
                ) : (
                  <ArrowDropDownRoundedIcon style={{ fontSize: "30px" }} />
                )}
              </IconButton>
            </div>

            {showAdvancedOptions ? (
              <div>
                <div className="form-group mb-4">
                  <Label className="mb-2">Time limit (in min)</Label>

                  <StyledInput
                    onChange={(e) => {
                      setTimeLimit(e.target.value);
                    }}
                    className="form-control px-3 py-2"
                    type="number"
                    min="2"
                    placeholder="5"
                  ></StyledInput>
                </div>

                <FormControl component="fieldset" className="mb-4">
                  <Label className="mb-2">Who can see answers ?</Label>

                  <RadioGroup row aria-label="gender" name="WhoCanSeeAnswers">
                    <div className="d-flex flex-row align-items-center">
                      <Radio
                        onChange={(e) => {
                          setWhoCanSeeAnswers(e.target.value);
                        }}
                        name="WhoCanSeeAnswers"
                        value="Organiser only"
                      />
                      <RadioLabel className="ms-2">Organiser only</RadioLabel>
                    </div>
                    <div className="d-flex flex-row align-items-center mx-4">
                      <Radio
                        onChange={(e) => {
                          setWhoCanSeeAnswers(e.target.value);
                        }}
                        name="WhoCanSeeAnswers"
                        value="Organiser and speakers"
                      />
                      <RadioLabel className="ms-2">
                        Organiser & speaker
                      </RadioLabel>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <Radio
                        onChange={(e) => {
                          setWhoCanSeeAnswers(e.target.value);
                        }}
                        name="WhoCanSeeAnswers"
                        value="Everyone"
                      />
                      <RadioLabel className="ms-2">Everyone</RadioLabel>
                    </div>
                  </RadioGroup>
                </FormControl>

                
              </div>
            ) : (
              <></>
            )}

            <CreateButton
              onClick={handleSubmit}
              style={{ width: "100%" }}
              className="btn btn-outline-text btn-primary"
            >
              Create poll
            </CreateButton>
          </div>
        </CreatePollContainer>
      </Dialog>
    </>
  );
};

export default CreatePoll;
