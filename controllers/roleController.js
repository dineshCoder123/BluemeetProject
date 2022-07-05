const CommunityRoles = require("../models/CommunityRolesModel");
const catchAsync = require("../utils/catchAsync");

exports.createNewRole = catchAsync(async (req, res, next) => {
  const communityId = req.community.id;
  const userId = req.body.userId;
  const capabilities = req.body.capabilities;
  const roleTitle = req.body.roleTitle;

  const NewRole = await CommunityRoles.create({
    ...capabilities,
    communityId: communityId,
    lastUpdatedBy: userId,
    lastUpdatedAt: Date.now(),
    title: roleTitle,
  });

  res.status(200).json({
    status: "success",
    role: NewRole,
  });
});

exports.editRole = catchAsync(async (req, res, next) => {});

exports.deleteRole = catchAsync(async (req, res, next) => {});

exports.getAllRoles = catchAsync(async (req, res, next) => {
  const communityId = req.community.id;

  const roles = await CommunityRoles.find({
    communityId: communityId,
  })
    .populate("assignedTo", "firstName lastName image")
    .populate("lastUpdatedBy", "firstName lastName image");

  console.log(roles);

  res.status(200).json({
    status: "success",
    roles: roles,
  });
});
