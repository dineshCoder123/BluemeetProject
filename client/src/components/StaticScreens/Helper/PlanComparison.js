import React from "react";
import styled from "styled-components";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const HeadingStrip = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #152d35;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  align-items: center;
`;

const PlanName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  text-transform: none;
  text-align: center;
`;

const DetailStrip = styled.div`
  background-color: transparent;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  align-items: center;

  &:hover {
    background-color: #212121;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props && props.available ? "#008822" : "#C7C7C7")};
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  color: #ffffff;
`;

const DetailText = styled.div`
  font-weight: 400;
  font-size: 0.9rem;
  color: #e4e4e4;
  text-align: center;
`;

const PlanComparision = () => {
  return (
    <>
      <HeadingStrip className="px-4 py-4">
        <span> Plan Details </span>

        <PlanName>Starter</PlanName>
        <PlanName>Essential</PlanName>
        <PlanName>Pro</PlanName>
        <PlanName>Enterprise</PlanName>
      </HeadingStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Event length</Text>
        <DetailText>Upto 2 hours</DetailText>
        <DetailText>Upto 72 hours</DetailText>
        <DetailText>Upto 144 hours</DetailText>
        <DetailText>Custom</DetailText>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Organisers (admins) included</Text>
        <DetailText>1</DetailText>
        <DetailText>2 ( $ 79 per additional per month)</DetailText>
        <DetailText>5 ( $ 79 per additional per month)</DetailText>
        <DetailText>Custom</DetailText>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Registrations included</Text>
        <DetailText>100 Per event (Unlimited events)</DetailText>
        <DetailText>
          100 Per month ($ 2 per additional registration per event)
        </DetailText>
        <DetailText>
          300 Per month ($ 2 per additional registration per event)
        </DetailText>
        <DetailText>Custom</DetailText>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Ticketing commision (does not include stripe fees)</Text>
        <DetailText>15%</DetailText>
        <DetailText>7%</DetailText>
        <DetailText>4%</DetailText>
        <DetailText>3%</DetailText>
      </DetailStrip>
      <HeadingStrip className="px-4 py-4">
        <span> Event Registration </span>
      </HeadingStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Free, Paid or Donation based ticket in any currency</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Event referral tracking</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>
          Seamless registration system with SEO-optimized registration page
        </Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Searchable attendee list</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Unlimited promo codes</Text>
        <IconContainer>
          <RemoveRoundedIcon available={true} />
        </IconContainer>
        <IconContainer>
          <RemoveRoundedIcon available={true} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <HeadingStrip className="px-4 py-4">
        <span> Attendee Experience </span>
      </HeadingStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Virtual welcome lobby with dynamic schedule</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Event-wide and private messaging capabilities</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Interactive and targeted networking among attendees</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Unlimited concurrent live video sessions</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Unlimited virtual expo hosting</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Moderator capabilities</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>RTMP Compatible</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Social lounge</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Connections & Scheduled meetings</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <HeadingStrip className="px-4 py-4">
        <span> Customisation </span>
      </HeadingStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Custom emails</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Custom registration form builder</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Custom event text and labels</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Replace Bluemeet logo and add primary event color</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Advance branding</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Bluemeet canvas - Event Website Builder</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <HeadingStrip className="px-4 py-4">
        <span> Integrations </span>
      </HeadingStrip>
      <DetailStrip className="px-4 py-4">
        <Text>In-event integrations (Slido, Typeform and more)</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Native Mailchimp / Hubspot integration</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Native Facebook Pixel / Google analytics integration</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Zapier</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Magic link</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Marketo / Salesforce native integration</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Custom API Integration</Text>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
      </DetailStrip>
      <HeadingStrip className="px-4 py-4">
        <span> Analytics </span>
      </HeadingStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Basic analytics</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Advanced analytics and data reports</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Realtime analytics dashboard</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <HeadingStrip className="px-4 py-4">
        <span> Services </span>
      </HeadingStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Email & Chat support</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Dedicated account manager</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>99.99% Uptime SLA</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Onboarding & Training</Text>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
        <IconContainer>
          <CheckRoundedIcon available={true} style={{ color: "#538BF7" }} />
        </IconContainer>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>SSO</Text>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
      </DetailStrip>
      <DetailStrip className="px-4 py-4">
        <Text>Mobile & Tablet Support</Text>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
        <DetailText>Coming soon</DetailText>
      </DetailStrip>
      <HeadingStrip className="px-4 py-4">
        <span>  </span>

        <button className="btn btn-outline-text btn-outline-primary">Signup Free</button>
        <button className="btn btn-outline-text btn-primary">Get Started</button>
        <button className="btn btn-outline-text btn-light">Rock your events</button>
        <button className="btn btn-outline-text btn-outline-light">Contact us</button>
      </HeadingStrip>
    </>
  );
};

export default PlanComparision;
