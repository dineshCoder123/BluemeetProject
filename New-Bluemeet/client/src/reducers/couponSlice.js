import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "Coupon",

  initialState: {
    coupons: [],
    couponDetails: null,
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
    CreateCoupon(state, action) {
      state.coupons.push(action.payload.coupon);
      state.couponDetails = action.payload.coupon;
      state.isLoading = false;
    },
    FetchCoupons(state, action) {
      state.coupons = action.payload.coupons;
      state.isLoading = false;
    },
    FetchCoupon(state, action) {
      const newCoupon = action.payload.coupon;
      const existingCoupon = state.coupons.find(
        (coupon) => coupon.id === newCoupon._id
      );

      if (!existingCoupon) {
        state.coupons.push(action.payload.coupon);
      }

      state.couponDetails = action.payload.coupon;
      state.isLoadingDetail = false;
    },

    EditCoupon(state, action) {
      state.coupons = state.coupons.map((coupon) =>
        coupon.id === action.payload.coupon._id ? action.payload.coupon : coupon
      );
      state.couponDetails = action.payload.coupon;
      state.isLoadingDetail = false;
    },
    DeleteCoupon(state, action) {
      state.coupons = state.coupons.filter(
        (coupon) => coupon.id !== action.payload.id
      );
      state.isLoading = false;
    },
  },
});
export const couponActions = couponSlice.actions;
export default couponSlice;
