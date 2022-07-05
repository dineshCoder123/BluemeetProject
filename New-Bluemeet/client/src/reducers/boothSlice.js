import { createSlice } from "@reduxjs/toolkit";

const boothSlice = createSlice({
  name: "Booth",

  initialState: {
    booths: [],
    chats: [],
    videos: [],
    products: [],
    productDetails: null,
    files: [],
    links: [],
    linkDetails: null,
    offers: [],
    offerDetails: null,
    forms: [],
    formDetails: null,
    businessCards: [],
    uploadBannerPercent: 0,
    uploadPromoImagePercent: 0,
    uploadVideoPercent: 0,
    uploadFilePercent: 0,
    boothDetails: null,
    currentBoothId: null,
    isLoading: true,
    isLoadingDetail: true,
    error: false,
    detailError: false,
  },

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingDetail(state) {
      state.isLoadingDetail = true;
    },

    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    detailHasError(state, action) {
      state.detailError = action.payload;
      state.isLoadingDetail = false;
    },
    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },
    disabledDetailError(state, action) {
      state.detailError = false;
      state.isLoadingDetail = false;
    },
    CreateBooth(state, action) {
      state.booths.push(action.payload.booth);
      state.boothDetails = action.payload.booth;
      state.isLoading = false;
    },

    FetchBooths(state, action) {
      state.booths = action.payload.booths;
      state.isLoading = false;
    },
    FetchBooth(state, action) {
      const newBooth = action.payload.booth;
      const existingBooth = state.booths.find(
        (booth) => booth._id === newBooth._id
      );

      if (!existingBooth) {
        state.booths.push(action.payload.booth);
      }

      state.boothDetails = action.payload.booth;
      state.isLoadingDetail = false;
    },

    EditBooth(state, action) {
      state.booths = state.booths.map((booth) =>
        booth._id === action.payload.booth._id ? action.payload.booth : booth
      );
      state.boothDetails = action.payload.booth;
      state.isLoadingDetail = false;
    },
    DeleteBooth(state, action) {
      state.booths = state.booths.filter(
        (booth) => booth._id !== action.payload.id
      );
      state.isLoading = false;
    },
    SetCurrentBoothId(state, action) {
      state.currentBoothId = action.payload.boothId;
      state.isLoading = false;
    },
    SetPromoImageUploadPercent(state, action) {
      state.uploadPromoImagePercent = action.payload.percent;
    },
    SetBoothPosterUploadPercent(state, action) {
      state.uploadBannerPercent = action.payload.percent;
    },
    SetVideoUploadPercent(state, action) {
      state.uploadVideoPercent = action.payload.percent;
    },
    UploadVideo(state, action) {
      state.videos.push(action.payload.video);
    },
    FetchVideos(state, action) {
      state.videos = action.payload.videos;
    },
    DeleteVideo(state, action) {
      state.videos = state.videos.filter(
        (video) => video._id !== action.payload.videoId
      );
    },
    AddProduct(state, action) {
      state.products.push(action.payload.product);
    },
    FetchProducts(state, action) {
      state.products = action.payload.products;
    },
    FetchProduct(state, action) {
      state.productDetails = action.payload.product;
    },
    UpdateProduct(state, action) {
      state.products = state.products.map((product) =>
        product._id === action.payload.product._id
          ? action.payload.product
          : product
      );
    },
    DeleteProduct(state, action) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.productId
      );
    },
    FetchFiles(state, action) {
      state.files = action.payload.files;
    },
    AddFile(state, action) {
      state.files.push(action.payload.file);
    },
    DeleteFile(state, action) {
      state.files = state.files.filter(
        (file) => file._id !== action.payload.fileId
      );
    },
    AddLink(state, action) {
      state.links.push(action.payload.link);
    },
    UpdateLink(state, action) {
      state.links = state.links.map((link) =>
        link._id === action.payload.link._id ? action.payload.link : link
      );
    },
    DeleteLink(state, action) {
      state.links = state.links.filter(
        (link) => link._id !== action.payload.linkId
      );
    },
    FetchLink(state, action) {
      state.linkDetails = action.payload.link;
    },
    FetchLinks(state, action) {
      state.links = action.payload.links;
    },
    AddOffer(state, action) {
      state.offers.push(action.payload.offer);
    },
    UpdateOffer(state, action) {
      state.offers = state.offers.map((offer) =>
        offer._id === action.payload.offer._id ? action.payload.offer : offer
      );
    },
    DeleteOffer(state, action) {
      state.offers = state.offers.filter(
        (offer) => offer._id !== action.payload.offerId
      );
    },
    FetchOffer(state, action) {
      state.offerDetails = action.payload.offer;
    },
    FetchOffers(state, action) {
      state.offers = action.payload.offers;
    },
    AddForm(state, action) {
      state.forms.push(action.payload.form);
    },
    UpdateForm(state, action) {
      state.forms = state.forms.map((form) =>
        form._id === action.payload.form._id ? action.payload.form : form
      );
    },
    DeleteForm(state, action) {
      state.forms = state.forms.filter(
        (form) => form._id !== action.payload.formId
      );
    },
    FetchForm(state, action) {
      state.formDetails = action.payload.form;
    },
    FetchForms(state, action) {
      state.forms = action.payload.forms;
    },
    FetchBusinessCards(state, action) {
      state.businessCards = action.payload.cards;
    },
    FetchBoothChats(state, action) {
      state.chats = action.payload.chats;
    },
  },
});
export const boothActions = boothSlice.actions;
export default boothSlice;
