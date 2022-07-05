import React from "react";
import Mailchimp from "../Integrations/Mailchimp";
import Intercom from "../Integrations/Intercomm";
import Hubspot from "../Integrations/Hubspot";
import Salesforce from "../Integrations/Salesforce";
import Slack from "../Integrations/Slack";
import Twitter from "../Integrations/Twitter";
import Marketo from "../Integrations/Marketo";
import Typeform from "../Integrations/Typeform";
import GoogleSheets from "../Integrations/GoogleSheets";
import GooglCalender from "../Integrations/GoogleCalender";
import Drip from "../Integrations/Drip";
import ActiveCampaign from "../Integrations/ActiveCampaign";
import Salesmate from "../Integrations/Salesmate";
import Mailjet from "../Integrations/Mailjet";
import SendinBlue from "../Integrations/SendinBlue";
import GoogleAnalytics from "../Integrations/GoogleAnalytics";
import FacebookPixel from "../Integrations/FacebookPixel";
import Zapier from "../Integrations/Zapier";
import MicrosoftDynamics from "../Integrations/MicrosoftDynamics";
import RequestIntegration from "./../Integrations/RequestIntegration";
import BuildWithBluemeet from "./../Integrations/BuildWithBluemeet";
import Slido from "./../Integrations/Slido.js";

const IntegrationsSub = () => {
  return (
    <>
      <div className="px-4 py-4">
        <Mailchimp />
        <Hubspot />
        <Intercom />
        <Salesforce />
        <Typeform />
        <Slido />
        <GoogleAnalytics />
        <FacebookPixel />
        <Zapier />
        <Marketo />
        <Slack />
        <Twitter />
        <GoogleSheets />
        <GooglCalender />
        <Drip />
        <MicrosoftDynamics />
        <ActiveCampaign />
        <Salesmate />
        <Mailjet />
        <SendinBlue />
        <RequestIntegration />
        <BuildWithBluemeet />
      </div>
    </>
  );
};

export default IntegrationsSub;
