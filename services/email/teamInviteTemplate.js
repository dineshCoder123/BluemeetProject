module.exports = (url, community, invitee) => {
    
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
              opacity: 1;">You have been to Join ${community.name}</div>
             
            </div>
            <div  style="text-align: left;
            font: normal normal bold 0.9rem/26px Helvetica Neue;
            letter-spacing: 0px;
            color: #535353;
            opacity: 1;  margin-bottom: 10px">
              Hi
            </div>
            <div className="pt-4 email-body-text mb-5" style="padding-top: 10px; margin-bottom: 40px; text-align: left;
            font: normal normal normal 0.8rem/1.25rem Roboto;
            letter-spacing: 0px;
            color: #343434;
            opacity: 1;">
              You have been invited to join ${community.name} by ${invitee.firstName} on Bluemeet platform. We welcome you to our Bluemeet family.  
              Here's your link to join this community. 
            </div>
            <div className="email-action-btn-wrapper d-flex flex-row justify-content-center mb-5">
              <a href="${url}" className="btn btn-primary mail-action-btn-main px-4 py-3" style="padding-left: 25px; padding-right: 25px; padding-top: 15px; padding-bottom: 15px;  background: #538bf7 0% 0% no-repeat padding-box;
              box-shadow: inset 0px -11px 8px #00000029, 0px 3px 15px #00000029;
              border-radius: 50px;
              border: none;
            text-decoration: none;
            margin-bottom: 75px;
              text-align: left;
              font: normal normal bold 1.15rem/1.6rem Helvetica Neue;
              letter-spacing: 0.43px;
              color: #ffffff;
              text-shadow: inset 0px -13px 6px #ffffff29;">
                Accept Invitation
              </a>
            </div>
            
    
            <div className="email-body-bottom-msg-text mb-3 pt-3" style="text-align: left;
            margin-bottom: 15px;
            padding-top: 35px;
            font: normal normal normal 13px/20px Roboto;
            letter-spacing: 0px;
            color: #555555;">
            Hope you have a delightful experience on our platform.
            </div>
    
            <div className="email-evenz-team-text mb-3 " style="text-align: left;
            font: normal normal 700 0.95rem/1.53rem Helvetica Neue;
            letter-spacing: 0px;
            color: #535353;">
            Bluemeet Inc.
            </div>
          </div>
           </div>
          </body>
        </html>
      `;
  };
  