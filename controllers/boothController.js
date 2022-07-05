const Event = require("../models/eventModel");
const catchAsync = require("../utils/catchAsync");
const Community = require("./../models/communityModel");
const User = require("./../models/userModel");
const Booth = require("./../models/boothModel");
const Registration = require("./../models/registrationsModel");
const BoothVideo = require("./../models/boothVideoModel");
const BoothProduct = require("./../models/boothProductModel");
const BoothFile = require("./../models/boothFileModel");
const BoothLink = require("./../models/boothLinksModel");
const BoothPromoCode = require("./../models/boothPromoCodes");
const BoothForm = require("./../models/boothFormsModel");
const SharedBusinessCard = require("./../models/sharedBusinessCard");
const BoothTable = require("./../models/boothTableModel");
const mongoose = require("mongoose");
const apiFeatures = require("../utils/apiFeatures");
const validator = require("validator");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.deleteBooth = catchAsync(async (req, res, next) => {
  try {
    const boothId = req.params.id;

    const boothDoc = await Booth.findById(boothId);

    const eventId = boothDoc.eventId;

    const eventDoc = await Event.findById(eventId);

    // Unregister all registrations associated with this booth

    const registrations = await Registration.find({
      $and: [
        { boothId: mongoose.Types.ObjectId(boothId) },
        { type: "Exhibitor" },
      ],
    });

    for (let element of registrations) {
      await Registration.findByIdAndDelete(element);
    }

    // * DONE Remove all booth tags associated with this booth

    // Step 1.) get all booths of this event and collect thier unique tags

    let uniqueTags = [];

    for (element of eventDoc.booths) {
      if (!(element.toString() === boothId)) {
        const booth = await Booth.findById(element);

        if (booth) {
          for (let item of booth.tags) {
            if (!uniqueTags.includes(item)) {
              uniqueTags.push(item);
            }
          }
        }
      }
    }

    // Step 2.) assign that array of unique tags to boothTags field of this event

    eventDoc.boothTags = uniqueTags;
    await eventDoc.save({ new: true, validateModifiedOnly: true });

    await Booth.findByIdAndUpdate(
      boothId,
      { status: "Deleted" },
      { new: true, validateModifiedOnly: true }
    );

    res.status(200).json({
      status: "success",
      data: boothId,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getAllBoothOfEvent = catchAsync(async (req, res, next) => {
  try {
    const query = Booth.find({
      eventId: mongoose.Types.ObjectId(req.params.eventId),
    });

    const features = new apiFeatures(query, req.query).textFilter().tagFilter();
    const booths = await features.query;

    res.status(200).json({
      status: "SUCCESS",
      data: booths,
    });
  } catch (error) {
    
    console.log(error);
  }
});

exports.getOneBoothDetails = catchAsync(async (req, res, next) => {
  const boothId = req.params.id;

  const booth = await Booth.findById(boothId);

  res.status(200).json({
    status: "success",
    data: booth,
  });
});

exports.updateBooth = catchAsync(async (req, res, next) => {
  try {
    const boothId = req.params.id;

    const boothDoc = await Booth.findById(boothId);

    const tablesBeforeUpdate = boothDoc.numberOfTables;

    const eventId = boothDoc.eventId;

    const eventDoc = await Event.findById(eventId);

    const communityId = eventDoc.communityId;

    const communityDoc = await Community.findById(communityId);

    const emailsBeforeUpdate = boothDoc.emails;

    // Emails update

    if (req.body.emails) {
      // Check which emails are removed => delete their registrations for this event

      const removedEmails = emailsBeforeUpdate.filter((el) => !req.body.emails);

      for (let element of removedEmails) {
        await Registration.findOneAndDelete({
          $and: [
            { type: "Exhibitor" },
            { boothId: mongoose.Types.ObjectId(req.params.id) },
            { userEmail: element },
          ],
        });
      }

      // Check which emails are new => Check if user with that email exists on Bluemeet or not => Follow regular way as did during adding booth

      let difference = req.body.emails.filter(
        (x) => !emailsBeforeUpdate.includes(x)
      );

      // This difference is the array of new emails that are added in this update

      for (let element of difference) {
        // For every mail in booth
        // Step 1 => check if there is any user with that email already on platform
        const existingUser = await User.findOne({ email: element });
        if (existingUser) {
          // user already have account on Bluemeet
          // => create exhibitor registration and mark as completed for this email and send magic link to exhibitor mail
          const newRegistration = await Registration.create({
            boothId: boothDoc._id,
            type: "Exhibitor",
            status: "Completed",
            viaCommunity: true,
            cancelled: false,
            eventName: eventDoc.eventName,
            userName: existingUser.firstName + " " + existingUser.lastName,
            userImage: existingUser.image,
            bookedByUser: existingUser._id,
            bookedForEventId: eventDoc._id,
            eventByCommunityId: communityDoc._id,
            createdAt: Date.now(),
            email: element,
            userEmail: element,
            first_name: existingUser.firstName,
            last_name: existingUser.lastName,
            name: existingUser.firstName + " " + existingUser.lastName,
            organisation: existingUser.organisation,
            designation: existingUser.designation,
            city: existingUser.city,
            country: existingUser.country,
            event_name: eventDoc.eventName,
            event_picture: eventDoc.image,
            community_picture: communityDoc.image,
          });

          // Provide magic_link and invitation link
          newRegistration.magic_link = `http://localhost:3001/event/booth/${newRegistration._id}`;
          newRegistration.invitationLink = `http://localhost:3001/event/booth/${newRegistration._id}`;

          // Add this event in users registered events and push this registration in users resgistrations doc.
          existingUser.registeredInEvents.push(eventDoc._id);
          existingUser.registrations.push(newRegistration._id);

          // Save user doc and registration doc
          await existingUser.save({ new: true, validateModifiedOnly: true });
          await newRegistration.save({
            new: true,
            validateModifiedOnly: true,
          });

          // Send mail to exhibitor with magic_link

          const msg = {
            to: element,
            from: "shreyanshshah242@gmail.com",
            subject: `Your are invited as a exhibitor in ${eventDoc.eventName}`,
            text: `use this link to join this event ${
              eventDoc.eventName
            } as a booth exhibitor. ${`http://localhost:3001/event/booth/${newRegistration._id}`}`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(msg)
            .then(async () => {
              console.log("Invitation sent to booth exhibitor.");
            })
            .catch(async (error) => {
              console.log("Failed to send invitation to booth exhibitor");
            });

          // This case is properly handled.
        } else {
          // user does not  have account on Bluemeet
          // => create exhibitor registration and mark as pending for this email and send magic link to exhibitor mail

          const newRegistration = await Registration.create({
            boothId: boothDoc._id,
            type: "Exhibitor",
            status: "Pending",
            viaCommunity: true,
            cancelled: false,
            eventName: eventDoc.eventName,
            bookedForEventId: eventDoc._id,
            eventByCommunityId: communityDoc._id,
            createdAt: Date.now(),
            email: element,
            userEmail: element,
            event_name: eventDoc.eventName,
            event_picture: eventDoc.image,
            community_picture: communityDoc.image,
          });

          // Provide magic_link and invitation link
          newRegistration.magic_link = `http://localhost:3001/event/booth/${newRegistration._id}`;
          newRegistration.invitationLink = `http://localhost:3001/event/booth/${newRegistration._id}`;

          // Save user doc and registration doc
          await newRegistration.save({
            new: true,
            validateModifiedOnly: true,
          });

          // Send mail to exhibitor with magic_link

          const msg = {
            to: element,
            from: "shreyanshshah242@gmail.com",
            subject: `Your are invited as a exhibitor in ${eventDoc.eventName}`,
            text: `use this link to join this event ${
              eventDoc.eventName
            } as a booth exhibitor. ${`http://localhost:3001/event/booth/${newRegistration._id}`}`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(msg)
            .then(async () => {
              console.log("Invitation sent to booth exhibitor.");
            })
            .catch(async (error) => {
              console.log("Failed to send invitation to booth exhibitor");
            });

          // This case is properly handled.
        }
      }
    }

    const filteredBody = filterObj(
      req.body,
      "name",
      "email",
      "tagline",
      "description",
      "tags",
      "socialMediaHandles",
      "numberOfTables",
      "theme",
      "promoImage",
      "boothPoster",
      "contactEmail",
      "contactNumber",
      "googleTag"
    );

    const processedBoothObj = await Booth.findByIdAndUpdate(
      boothId,
      filteredBody,
      {
        new: true,
        validateModifiedOnly: true,
      }
    );

    if (req.body.numberOfTables) {
      console.log(req.body.numberOfTables);
      processedBoothObj.numberOfTables = req.body.numberOfTables;
    }

    if (req.body.image) {
      processedBoothObj.image = req.body.image;
    }

    const doublyUpdatedBooth = await processedBoothObj.save({
      new: true,
      validateModifiedOnly: true,
    });

    const tablesAfterUpdate = doublyUpdatedBooth.numberOfTables;

    // If numberOfTables is updated then please check diff and create required no. of tables for that event

    const diff = tablesAfterUpdate * 1 - tablesBeforeUpdate * 1;

    if (diff > 0) {
      for (let i = 0; i < diff * 1; i++) {
        // Create tables with tableId as `${eventId}_table_${i}`
        await BoothTable.create({
          boothId: boothId,
          eventId: eventId,
          tableId: `${boothId}_table_${i}`,
          lastUpdatedAt: Date.now(),
        });
      }
    }

    let uniqueTags = [];

    // Get all booths of this event => collect unique tags from all of them
    for (element of eventDoc.booths) {
      const boothDoc = await Booth.findById(element);
      if (boothDoc) {
        if (boothDoc.tags) {
          for (item of boothDoc.tags) {
            if (!uniqueTags.includes(item)) {
              uniqueTags.push(item);
            }
          }
        }
      }
    }

    // Assign these tags to boothTags in this event

    eventDoc.boothTags = uniqueTags;

    await eventDoc.save({ new: true, validateModifiedOnly: true });

    res.status(200).json({
      status: "success",
      data: doublyUpdatedBooth,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.sendBoothInvitation = catchAsync(async (req, res, next) => {
  const boothId = req.params.boothId;

  const boothDoc = await Booth.findById(boothId, (err, doc) => {
    if (!err) {
      // Send invitation mail to every one in doc.emails

      for (let element of doc.emails) {
        const msg = {
          to: element, // Change to your recipient
          from: "shreyanshshah242@gmail.com", // Change to your verified sender
          subject: "Your Event Invitation Link",
          text: `Hi, use this link to join this event as a booth exhibitor. ${doc.invitationLink}.`,
          // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
        };

        sgMail
          .send(msg)
          .then(() => {
            console.log("Sent mail to booth participant.");
          })
          .catch(() => {
            console.log("Failed to sent mail to booth participant.");
          });
      }
    }
  });

  res.status(200).json({
    status: "success",
    message: "Invitation sent to all booth exhibitors.",
  });
});

// ************************* BOOTH VIDEOS ************************* //

exports.saveVideo = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const key = req.body.key;

  const boothId = req.params.boothId;
  const eventId = req.params.eventId;

  const newBoothVideo = await BoothVideo.create({
    key: key,
    name: name,
    timestamp: Date.now(),
    eventId: eventId,
    boothId: boothId,
  });

  res.status(200).json({
    status: "success",
    data: newBoothVideo,
  });
});

exports.getBoothVideos = catchAsync(async (req, res, next) => {
  const boothId = req.params.boothId;
  const eventId = req.params.eventId;

  // Find all non-deleted videos with this boothId and eventId

  const videos = await BoothVideo.find({
    $and: [
      { boothId: mongoose.Types.ObjectId(boothId) },
      { eventId: mongoose.Types.ObjectId(eventId) },
      { deleted: false },
    ],
  });

  res.status(200).json({
    status: "success",
    data: videos,
  });
});

exports.deleteBoothVideo = catchAsync(async (req, res, next) => {
  const videoId = req.params.videoId;

  await BoothVideo.findByIdAndDelete(videoId);

  res.status(200).json({
    status: "success",
    message: "This video has been successfully deleted",
  });
});

// *********************** BOOTH PRODUCTS *********************** //

exports.addNewProduct = catchAsync(async (req, res, next) => {
  const boothId = req.params.boothId;
  const eventId = req.params.eventId;

  const newProduct = await BoothProduct.create({
    image: req.body.key,
    name: req.body.name,
    description: req.body.description,
    link: req.body.link,
    timestamp: Date.now(),
    eventId: eventId,
    boothId: boothId,
    deleted: false,
  });

  res.status(200).json({
    status: "success",
    data: newProduct,
  });
});

exports.editProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;

  const filteredBody = filterObj(
    req.body,
    "image",
    "name",
    "description",
    "link"
  );

  const updatedProduct = await BoothProduct.findByIdAndUpdate(
    productId,
    filteredBody,
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;

  await BoothProduct.findByIdAndUpdate(
    productId,
    { deleted: true },
    { new: true, validatedModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    message: "This product has been successfully deleted.",
  });
});

exports.getProductDetails = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;

  const productDoc = await BoothProduct.findById(productId);

  res.status(200).json({
    status: "success",
    data: productDoc,
  });
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const boothId = req.params.boothId;

  const eventId = req.params.eventId;

  const products = await BoothProduct.find({
    $and: [
      { boothId: mongoose.Types.ObjectId(boothId) },
      { eventId: mongoose.Types.ObjectId(eventId) },
      { deleted: false },
    ],
  });

  res.status(200).json({
    status: "success",
    data: products,
  });
});

//  ************************* BOOTH FILES ******************* //

exports.countFileDownloaded = catchAsync(async (req, res, next) => {
  const fileId = req.params.fileId;

  const fileDoc = await BoothFile.findById(fileId);

  fileDoc.downloads = fileDoc.downloads + 1;
  await fileDoc.save({ new: true, validateModifiedOnly: true });

  res.status(200).json({
    status: "success",
    message: "File download counted successfully!",
  });
});

exports.addNewFile = catchAsync(async (req, res, next) => {
  const boothId = req.body.boothId;
  const eventId = req.body.eventId;

  const newFile = await BoothFile.create({
    name: req.body.name,
    downloads: 0,
    key: req.body.key,
    timestamp: Date.now(),
    eventId: eventId,
    boothId: boothId,
    deleted: false,
  });

  console.log(newFile);

  res.status(200).json({
    status: "success",
    data: newFile,
  });
});

exports.deleteFile = catchAsync(async (req, res, next) => {
  const fileId = req.params.fileId;

  await BoothFile.findByIdAndUpdate(
    fileId,
    { deleted: true },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    message: "This file has been successfully deleted!",
  });
});

exports.getFiles = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const boothId = req.params.boothId;

  const files = await BoothFile.find({
    $and: [
      { boothId: mongoose.Types.ObjectId(boothId) },
      { eventId: mongoose.Types.ObjectId(eventId) },
      { deleted: false },
    ],
  });

  res.status(200).json({
    status: "success",
    data: files,
  });
});

// ************************* BOOTH LINKS ********************* //

exports.countLinkClicked = catchAsync(async (req, res, next) => {
  const linkId = req.params.linkId;

  const linkDoc = await BoothLink.findById(linkId);

  linkDoc.clicks = linkDoc.clicks + 1;
  await linkDoc.save({ new: true, validateModifiedOnly: true });

  res.status(200).json({
    status: "success",
    message: "Link click counted successfully!",
  });
});

exports.addNewLink = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const boothId = req.params.boothId;

  const newLink = await BoothLink.create({
    name: req.body.name,
    url: req.body.url,
    clicks: 0,
    timestamp: Date.now(),
    boothId: boothId,
    eventId: eventId,
    deleted: false,
  });

  res.status(200).json({
    status: "success",
    data: newLink,
  });
});

exports.editLink = catchAsync(async (req, res, next) => {
  const linkId = req.params.linkId;

  const filteredBody = filterObj(req.body, "name", "url");

  const updatedLink = await BoothLink.findByIdAndUpdate(linkId, filteredBody, {
    new: true,
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedLink,
  });
});

exports.deleteLink = catchAsync(async (req, res, next) => {
  const linkId = req.params.linkId;

  const deletedLink = await BoothLink.findByIdAndUpdate(
    linkId,
    { deleted: true },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    message: "This Link has been successfully deleted!",
  });
});

exports.getLinkDetails = catchAsync(async (req, res, next) => {
  const linkId = req.params.linkId;

  const linkDoc = await BoothLink.findById(linkId);

  res.status(200).json({
    status: "success",
    data: linkDoc,
  });
});

exports.getLinks = catchAsync(async (req, res, next) => {
  const boothId = req.params.boothId;
  const eventId = req.params.eventId;

  const links = await BoothLink.find({
    $and: [
      { boothId: mongoose.Types.ObjectId(boothId) },
      { eventId: mongoose.Types.ObjectId(eventId) },
      { deleted: false },
    ],
  });

  res.status(200).json({
    status: "success",
    data: links,
  });
});

// ************************* BOOTH PROMO CODES **************** //

exports.countPromoCodeClicked = catchAsync(async (req, res, next) => {
  const promoCodeId = req.params.promoCodeId;

  const promoCodeDoc = await BoothPromoCode.findById(promoCodeId);

  promoCodeDoc.clicks = promoCodeDoc.clicks + 1;
  await promoCodeDoc.save({ new: true, validateModifiedOnly: true });

  res.status(200).json({
    status: "success",
    message: "Promo code click counted successfully!",
  });
});

exports.createPromoCode = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const boothId = req.params.boothId;

  const newPromoCode = await BoothPromoCode.create({
    name: req.body.name,
    discount: req.body.discount,
    clicks: 0,
    code: req.body.code,
    instruction: req.body.instruction,
    timestamp: Date.now(),
    eventId: eventId,
    boothId: boothId,
    deleted: false,
  });

  res.status(200).json({
    status: "success",
    data: newPromoCode,
  });
});

exports.editPromoCode = catchAsync(async (req, res, next) => {
  const promoCodeId = req.params.promoCodeId;

  const filteredBody = filterObj(
    req.body,
    "name",
    "discount",
    "code",
    "instruction"
  );

  const updatedPromoCode = await BoothPromoCode.findByIdAndUpdate(
    promoCodeId,
    filteredBody,
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedPromoCode,
  });
});

exports.deletePromoCode = catchAsync(async (req, res, next) => {
  const promoCodeId = req.params.promoCodeId;

  const deletedPromoCode = await BoothPromoCode.findByIdAndUpdate(
    promoCodeId,
    { deleted: true },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    message: "This promo code has been successfully deleted!",
  });
});

exports.getPromoCodeDetails = catchAsync(async (req, res, next) => {
  const promoCodeId = req.params.promoCodeId;

  const promoCodeDoc = await BoothPromoCode.findById(promoCodeId);

  res.status(200).json({
    status: "success",
    data: promoCodeDoc,
  });
});

exports.getPromoCodes = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const boothId = req.params.boothId;

  const promoCodes = await BoothPromoCode.find({
    $and: [
      { boothId: mongoose.Types.ObjectId(boothId) },
      { eventId: mongoose.Types.ObjectId(eventId) },
      { deleted: false },
    ],
  });

  res.status(200).json({
    status: "success",
    data: promoCodes,
  });
});

// ************************ BOOTH FORMS *********************** //

exports.countFormClicked = catchAsync(async (req, res, next) => {
  const formDocId = req.params.formDocId;

  const formDoc = await BoothForm.findById(formDocId);

  formDoc.clicks = formDoc.clicks + 1;
  await formDoc.save({ new: true, validateModifiedOnly: true });

  res.status(200).json({
    status: "success",
    message: "Form Doc click counted successfully!",
  });
});

exports.createForm = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const boothId = req.params.boothId;

  const newForm = await BoothForm.create({
    name: req.body.name,
    clicks: 0,
    formId: req.body.formId,
    timestamp: Date.now(),
    eventId: eventId,
    boothId: boothId,
    deleted: false,
  });

  res.status(200).json({
    status: "success",
    data: newForm,
  });
});

exports.editForm = catchAsync(async (req, res, next) => {
  const formDocId = req.params.formDocId;

  const filteredBody = filterObj(req.body, "name", "formId");

  const updatedForm = await BoothForm.findByIdAndUpdate(
    formDocId,
    filteredBody,
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedForm,
  });
});

exports.deleteForm = catchAsync(async (req, res, next) => {
  const formDocId = req.params.formDocId;

  const deletedForm = await BoothForm.findByIdAndUpdate(
    formDocId,
    { deleted: true },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    message: "This form has been successfully deleted!",
  });
});

exports.getFormDetails = catchAsync(async (req, res, next) => {
  const formDocId = req.params.formDocId;

  const formDoc = await BoothForm.findById(formDocId);

  res.status(200).json({
    status: "success",
    data: formDoc,
  });
});

exports.getForms = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const boothId = req.params.boothId;

  const forms = await BoothForm.find({
    $and: [
      { boothId: mongoose.Types.ObjectId(boothId) },
      { eventId: mongoose.Types.ObjectId(eventId) },
      { deleted: false },
    ],
  });

  res.status(200).json({
    status: "success",
    data: forms,
  });
});

// *********************** BOOTH BUSINESS CARDS ****************** //

exports.shareBusinessCard = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const boothId = req.params.boothId;
  const eventId = req.params.eventId;

  await SharedBusinessCard.create({
    userId: userId,
    boothId: boothId,
    eventId: eventId,
    timestamp: Date.now(),
  });

  res.status(200).json({
    status: "success",
    message: "Business card shared successfully!",
  });
});

exports.getBusinessCards = catchAsync(async (req, res, next) => {
  try {
    const boothId = req.params.boothId;
    const eventId = req.params.eventId;

    const cards = await SharedBusinessCard.find({
      $and: [
        { boothId: mongoose.Types.ObjectId(boothId) },
        { eventId: mongoose.Types.ObjectId(eventId) },
      ],
    }).populate(
      "userId",
      "firstName lastName image email phoneNumber interests"
    );

    res.status(200).json({
      status: "success",
      data: cards,
    });
  } catch (error) {
    console.log(error);
  }
});
