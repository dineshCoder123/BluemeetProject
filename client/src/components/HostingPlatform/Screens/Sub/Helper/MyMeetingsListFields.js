import React from 'react';
import styled from 'styled-components';
import { Divider } from "@material-ui/core";

const Grid = styled.div`
  display: grid;
  grid-gap: 24px;
  align-items: center;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr;
`;
const ListFieldLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #696969;
  font-size: 0.8rem;
`;

const MyMeetingsListFields = () => {
    return (
        <>

<Grid className="mb-3"
>
    <ListFieldLabel>
        Title
    </ListFieldLabel>
    <ListFieldLabel>
        Agenda
    </ListFieldLabel>
    <ListFieldLabel>
        Created by
    </ListFieldLabel>
    <ListFieldLabel>
        Starts at
    </ListFieldLabel>
    <ListFieldLabel>
        Action
    </ListFieldLabel>
</Grid>

<div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>

        </>
    )
}

export default MyMeetingsListFields;