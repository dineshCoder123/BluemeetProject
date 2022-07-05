const catchAsync = require("../../utils/catchAsync");
const btoa = require("btoa");
const uid = require("uid");
const { v4: uuidv4 } = require("uuid");

exports.getPayPalAccessToken = catchAsync(async (req, res, next) => {
  //  process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET;
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

  

    fetch(`https://api-m.sandbox.paypal.com/v2/customer/partner-referrals`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en_US",
        Authorization: `Bearer ${access_token}`,
      },

      body: JSON.stringify({
        email: "dinesh.shah@evenz.in",
        preferred_language_code: "en-US",
        tracking_id: uuidv4(),
        partner_config_override: {
          partner_logo_url:
            "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
          return_url:
            "http://localhost:3001/user/613ba3ea709a3f09cde05b31/community/billing/613ba54e29fd0d0d426bfeab",
          return_url_description:
            "the url to return the merchant after the paypal onboarding process.",
          show_add_credit_card: true,
        },
        operations: [
          {
            operation: "API_INTEGRATION",
            api_integration_preference: {
              rest_api_integration: {
                integration_method: "PAYPAL",
                integration_type: "FIRST_PARTY",
                first_party_details: {
                  features: ["PAYMENT", "REFUND"],
                  seller_nonce:
                    "bL7Zuq2Fa9axAi6VXErYSdm8qYglg984LKUwOojqcs2OKOzd",
                },
              },
            },
          },
        ],
        products: ["EXPRESS_CHECKOUT"],
        legal_consents: [
          {
            type: "SHARE_DATA_CONSENT",
            granted: true,
          },
        ],
      }),
    }).then(async (payPalLinkRes) => {
      payPalLinkRes = await payPalLinkRes.json();

      res.status(200).json({
        status: "success",
        data: payPalLinkRes,
      });
    });
  });
});
