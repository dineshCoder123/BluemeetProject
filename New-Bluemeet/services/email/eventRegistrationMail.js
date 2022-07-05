// (userName, eventName, ticketType, amount)

module.exports = (user, eventName, ticketType, amount) => {
    return `
        <html>
          <body>
          <div style="text-align: center;">
            <div className="mail-container container p-5" style="max-width: 1920px; text-align: center;">
            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 25px">
              <div className="mail-heading" style="text-align: left;
              font: normal normal bold 1.3rem/2.5rem Helvetica Neue;
              letter-spacing: 0.56px;
              color: #538bf7;
              opacity: 1;">Your Event Registration Confirmation</div>
             
            </div>
            <div  style="text-align: left;
            font: normal normal bold 0.9rem/26px Helvetica Neue;
            letter-spacing: 0px;
            color: #535353;
            opacity: 1;  margin-bottom: 10px">
              Hi, ${user.firstName}
            </div>
            <div className="pt-4 email-body-text mb-5" style="padding-top: 10px; margin-bottom: 40px; text-align: left;
            font: normal normal normal 0.8rem/1.25rem Roboto;
            letter-spacing: 0px;
            color: #343434;
            opacity: 1;">
              This is a confirmation mail for your registration in the following event: ${eventName}.
              We have recieved a payment of Rs. ${amount} for ticket type ${ticketType}.

              For More info please visit your evenz user dashboard.
            </div>
    
            <div className="email-body-bottom-msg-text mb-3 pt-3" style="text-align: left;
            margin-bottom: 15px;
            padding-top: 35px;
            font: normal normal normal 13px/20px Roboto;
            letter-spacing: 0px;
            color: #555555;">
            Hope you are having a good time exploring, attending and registering for events on this platform.
            </div>
    
            <div className="email-evenz-team-text mb-3 " style="text-align: left;
            font: normal normal 700 0.95rem/1.53rem Helvetica Neue;
            letter-spacing: 0px;
            color: #535353;">
            The Evenz.in team
            </div>
          </div>
           </div>
          </body>
        </html>
      `;
  };
  