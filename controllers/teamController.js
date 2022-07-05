const catchAsync = require('../utils/catchAsync');

exports.getAllTeamMembers = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'This route is not yet implemented',
  });
});

exports.addNewTeamMember = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'This route is not yet implemented',
  });
});

exports.removeOneTeamMember = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'This route is not yet implemented',
  });
});
