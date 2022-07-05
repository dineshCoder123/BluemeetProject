/* eslint-disable no-lone-blocks */
import React from 'react';
import styled from 'styled-components';
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";


import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from '@mui/icons-material/YouTube';

import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";

const RoyalBlueSwitch = withStyles({
    switchBase: {
      color: "#538BF7",
      "&$checked": {
        color: "#3474F3",
      },
      "&$checked + $track": {
        backgroundColor: "#145DF0",
      },
    },
    checked: {},
    track: {},
  })(Switch);

const SmallHeading = styled.div`
font-weight: 500;
font-family: "Ubuntu";
font-size: 0.75rem;
color: #152d35;
margin-bottom: 24px;
`

const LiveStreamCard = styled.div`
width: 500px;
border-radius: 5px;
border: 1px solid #152d35;
padding: 6px 10px;

display: grid;
grid-template-columns: 1fr 5fr 2fr;
grid-gap: 16px;
align-items: center;
`;

const StreamingServiceName = styled.div`
font-weight: 500;
font-family: "Ubuntu";
font-size: 0.83rem;
color: #152d35;
`

const EnableDisableLiveStreaming = () => {

    const [checked, setChecked] = React.useState(false);

    const handleChangeToggle = () => {
      setChecked(!checked);
    };

    return (
        <>

<SmallHeading>Enable or disable your RTMP live streaming.</SmallHeading>

<LiveStreamCard className="mb-4">
    <div>
        <YouTubeIcon style={{ fontSize: "28px", color: "#FF0000" }}/>
    </div>
    <StreamingServiceName >Facebook</StreamingServiceName>
<div style={{justifySelf: "end"}}>
    <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup></div>
</LiveStreamCard>

<LiveStreamCard className="mb-4">
    <div>
        <FacebookIcon style={{ fontSize: "28px", color: "#4267B2" }}
/>
    </div>
    <StreamingServiceName >Facebook</StreamingServiceName>
<div style={{justifySelf: "end"}}>
    <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup></div>
</LiveStreamCard>
<LiveStreamCard className="mb-4">
    <div>
        <LinkedInIcon style={{ fontSize: "28px", color: "#0077b5" }} />
    </div>
    <StreamingServiceName >LinkedIn</StreamingServiceName>
<div style={{justifySelf: "end"}}>
    <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup></div>
</LiveStreamCard>
<LiveStreamCard className="mb-4">
    <div>
        <TwitterIcon style={{ fontSize: "28px", color: "#1DA1F2" }}/>
    </div>
    <StreamingServiceName >Twitter</StreamingServiceName>
<div style={{justifySelf: "end"}}>
    <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup></div>
</LiveStreamCard>


        </>
    )
}

export default EnableDisableLiveStreaming;

{/* <FacebookIcon
style={{ fontSize: "28px", color: "#4267B2" }}
className="me-4"
/>
<LinkedInIcon
style={{ fontSize: "28px", color: "#0077b5" }}
className="me-4"
/>
<TwitterIcon
style={{ fontSize: "28px", color: "#1DA1F2" }}
className="me-4"
/>
<InstagramIcon
style={{ fontSize: "28px", color: "#DD2A7B" }}
className="me-4"
/> */}

