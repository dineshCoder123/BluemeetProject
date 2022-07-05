const catchAsync = require("../../utils/catchAsync");
const btoa = require("btoa");

exports.sendPayout = catchAsync(async (req, res, next) => {
  const authCredential = btoa(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET
  );

  fetch(
    `https://api-m.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Language": "en_US",
        Authorization: `Basic ${authCredential}`,
      },
    }
  ).then(async (paypalRes) => {
    paypalRes = await paypalRes.json();
  

    const access_token = paypalRes.access_token;

   
    fetch(`https://api-m.sandbox.paypal.com/v1/payments/payouts`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en_US",
        Authorization: `Bearer ${access_token}`,
      },

      body: JSON.stringify({
        sender_batch_header: {
          sender_batch_id: "2014021801",
          recipient_type: "EMAIL",
          email_subject: "You have money!",
          email_message:
            "You received a payment. Thanks for using our service!",
        },
        items: [
          {
            amount: {
              value: "9.87",
              currency: "USD",
            },
            sender_item_id: "201403140001",
            recipient_wallet: "PAYPAL",
            receiver: "sb-lk1wu7611051@personal.example.com",
          },
        ],
      }),
    }).then(async (payPalPayoutRes) => {
      payPalPayoutRes = await payPalPayoutRes.json();
  
      res.status(200).json({
        status: "success",
        data: payPalPayoutRes,
      });
    });
  });
});
