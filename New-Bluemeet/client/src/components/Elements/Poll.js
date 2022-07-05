import React from "react";
import styled from "styled-components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Avatar } from "@material-ui/core";
import Faker from "faker";

const PollBody = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;

  background: #152d3509;
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const PollQues = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  font-family: "Ubuntu";
  color: #152d35;
  letter-spacing: 0.1px;
`;

const PollOption = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 6fr 1fr;
  align-items: center;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #ffffff;

  border: 1px solid #152d35;
  border-radius: 5px;
  padding: 5px 10px;
  position: relative;
`;

const IndividualPollCount = styled.div`
  color: #152d35;
  justify-self: end;
`;

const TotalPollVotes = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #ffffff;
`;

const TimeLeft = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #ffffff;
`;

const PersonName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #212121;
  display: block;
`;

const UserRoleTag = styled.div`
  background-color: #152d35;
  height: max-content;
  border-radius: 5px;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.7rem;
  color: #ffffff;

  padding: 4px 8px;
`;

const PollFill = styled.div`
  height: 100%;
  width: ${(props) => props.width && props.width};
  position: absolute;
  background-color: #152d3528;
  border-radius: 5px;
`;

const BtnOutlined = styled.div`
  padding: 5px 8px;
  background-color: transparent;
  border: 1px solid #345b63;

  color: #ffffff;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Poll = () => {
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <PollBody>
        <div className="d-flex flex-row mb-4 justify-content-between">
          <div className="d-flex flex-row">
            <Avatar
              src={Faker.image.avatar()}
              alt={Faker.name.findName()}
              variant="rounded"
              className="me-3"
            />
            <div>
              <PersonName>{Faker.name.findName()}</PersonName>
              <PersonName>{"Product manager, Bluemeet"}</PersonName>
            </div>
          </div>

          <UserRoleTag>Host</UserRoleTag>
        </div>

        <PollQues className="mb-3">
          Are you satisfied with quality of event?
        </PollQues>

        <PollOption className="mb-3">
          <PollFill width={"12%"} />
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </div>
          Pretty good & interesting conversation
          <IndividualPollCount className="ms-2">124 </IndividualPollCount>
        </PollOption>
        <PollOption className="mb-3">
          <PollFill width={"65%"} />
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="option-2" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </div>
          Having a blast! This is awesome 😍
          <IndividualPollCount className="ms-2">3,245 </IndividualPollCount>
        </PollOption>
        <PollOption className="mb-3">
          <PollFill width={"8%"} />
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="option-3" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </div>
          There is a small room for improvement
          <IndividualPollCount className="ms-2">12 </IndividualPollCount>
        </PollOption>
        <PollOption className="mb-3">
          <PollFill width={"0.1%"} />
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="option-4" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </div>
          Could be a lot better
          <IndividualPollCount className="ms-2">2 </IndividualPollCount>
        </PollOption>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <TotalPollVotes>3562 votes total</TotalPollVotes>
          <TimeLeft>Time left 3:02 min</TimeLeft>
        </div>

        <div className="d-flex flex-row align-items-center justify-content-end">
          <BtnOutlined>Submitted</BtnOutlined>
        </div>
      </PollBody>
    </>
  );
};

export default Poll;
