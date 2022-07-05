const express = require("express");

const authController = require("../controllers/authController");
const boothController = require("../controllers/boothController");
const eventController = require("../controllers/eventController");
const router = express.Router();

router.post(
  "/:boothId/sendBoothInvitation",
  authController.protectCommunity,
  boothController.sendBoothInvitation
);

router.get(
  "/:eventId/getAllbooths",
  authController.protect,
  boothController.getAllBoothOfEvent
);

router.get(
  "/:id/getBoothDetails",
  authController.protect,
  boothController.getOneBoothDetails
);

router.post(
  "/:id/addBooth",
  authController.protectCommunity,
  eventController.createBooth
);

router.patch(
  "/:id/updateBooth",
  authController.protectCommunity,
  boothController.updateBooth
);

router.delete(
  "/:id/deleteBooth",
  authController.protectCommunity,
  boothController.deleteBooth
);

// ****************** BOOTH VIDEO **************** //

router.post(
  "/saveVideo/:boothId/:eventId",
  authController.protect,
  boothController.saveVideo
);

router.get(
  "/getBoothVideos/:boothId/:eventId",
  authController.protect,
  boothController.getBoothVideos
);

router.delete(
  "/deleteBoothVideo/:videoId",
  authController.protect,
  boothController.deleteBoothVideo
);

// ******************* BOOTH PRODUCT **************** //

router.post(
  "/addNewProduct/:boothId/:eventId",
  authController.protect,
  boothController.addNewProduct
);

router.patch(
  "/editProduct/:productId",
  authController.protect,
  boothController.editProduct
);

router.delete(
  "/deleteProduct/:productId",
  authController.protect,
  boothController.deleteProduct
);

router.get(
  "/getProductDetails/:productId",
  authController.protect,
  boothController.getProductDetails
);

router.get(
  "/getBoothProducts/:boothId/:eventId",
  authController.protect,
  boothController.getProducts
);

// ******************* BOOTH FILES *********************** //

router.post(
  "/countFileDownloaded/:fileId",
  authController.protect,
  boothController.countFileDownloaded
);

router.post(
  "/addNewFile/:boothId/:eventId",
  authController.protect,
  boothController.addNewFile
);

router.delete(
  "/deleteFile/:fileId",
  authController.protect,
  boothController.deleteFile
);

router.get(
  "/getFiles/:boothId/:eventId",
  authController.protect,
  boothController.getFiles
);

// ***************** BOOTH LINKS ************************* //

router.post(
  "/countLinkClicked/:linkId",
  authController.protect,
  boothController.countLinkClicked
);

router.post(
  "/addNewLink/:boothId/:eventId",
  authController.protect,
  boothController.addNewLink
);
router.patch(
  "/editLink/:linkId",
  authController.protect,
  boothController.editLink
);
router.delete(
  "/deleteLink/:linkId",
  authController.protect,
  boothController.deleteLink
);

router.get(
  "/getLinkDetails/:linkId",
  authController.protect,
  boothController.getLinkDetails
);

router.get(
  "/getLinks/:boothId/:eventId",
  authController.protect,
  boothController.getLinks
);

// ****************** BOOTH PROMO CODES ********************** //

router.post(
  "/countPromoCodeClicked/:promoCodeId",
  authController.protect,
  boothController.countPromoCodeClicked
);

router.post(
  "/createPromoCode/:boothId/:eventId",
  authController.protect,
  boothController.createPromoCode
);

router.patch(
  "/editPromoCode/:promoCodeId",
  authController.protect,
  boothController.editPromoCode
);

router.delete(
  "/deletePromoCode/:promoCodeId",
  authController.protect,
  boothController.deletePromoCode
);

router.get(
  "/getPromoCodeDetails/:promoCodeId",
  authController.protect,
  boothController.getPromoCodeDetails
);

router.get(
  "/getPromoCodes/:boothId/:eventId",
  authController.protect,
  boothController.getPromoCodes
);

// ****************** BOOTH FORMS **************************** //

router.post(
  "/countFormClicked/:formDocId",
  authController.protect,
  boothController.countFormClicked
);

router.post(
  "/createForm/:boothId/:eventId",
  authController.protect,
  boothController.createForm
);

router.patch(
  "/editForm/:formDocId",
  authController.protect,
  boothController.editForm
);

router.delete(
  "/deleteForm/:formDocId",
  authController.protect,
  boothController.deleteForm
);

router.get(
  "/getFormDetails/:formDocId",
  authController.protect,
  boothController.getFormDetails
);

router.get(
  "/getForms/:boothId/:eventId",
  authController.protect,
  boothController.getForms
);

// ****************** BOOTH BUSINESS CARDS ******************** //

router.post(
  "/shareBusinessCard/:userId/:eventId/:boothId",
  authController.protect,
  boothController.shareBusinessCard
);

router.get(
  "/getBusinessCards/:boothId/:eventId",
  authController.protect,
  boothController.getBusinessCards
);

module.exports = router;
