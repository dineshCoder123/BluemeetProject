const FundTransferRequest = require("../models/FundTransferRequestModel");
const catchAsync = require("../utils/catchAsync");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.createFundTransferRequest = catchAsync(async (req, res, next) => {
  const account = req.body.account;
  const ifsc = req.body.ifsc;
  const beneficiaryName = req.body.beneficiaryName;
  const communityId = req.body.communityId;
  const communityName = req.body.communityName;
  const amount = req.body.amount;
  const phoneNumber = req.body.amount;

  const newFundTransferRequest = await FundTransferRequest.create({
    account: req.body.account,
    ifsc: req.body.ifsc,
    beneficiaryName: req.body.beneficiaryName,
    communityId: req.body.communityId,
    communityName: req.body.communityName,
    amount: req.body.amount,
    phoneNumber: req.body.amount,
  });

  const msg = {
    to: "dineshshah8234@gmail.com", // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: "There is a new fund transfer request.",
    text: `account: ${account}, ifsc: ${ifsc}, beneficiaryName: ${beneficiaryName}, communityId: ${communityId}, communityName: ${communityName}, amount: INR ${amount}, phoneNumber: ${phoneNumber}`,
    // html: ForgotPasswordTemplate(user, resetURL),
  };

  sgMail
    .send(msg)
    .then(() => {
     
      res.status(201).json({
        status: "success",
        message: "Request sent for processing!",
        data: newFundTransferRequest,
      });
    })
    .catch((error) => {
      
    });
});
