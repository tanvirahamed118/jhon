import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchBy: "",
  statusBy: "",
  domain: "",
  pkgType: "",
};

export const onboardSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    searchByOnboard: (state, action) => {
      state.searchBy = action.payload;
    },
    verifyOnboard: (state, action) => {
      state.statusBy = action.payload;
    },
    selectedDomain: (state, action) => {
      state.domain = action.payload;
    },
    selectedPackage: (state, action) => {
      state.pkgType = action.payload;
    },
  },
});

export default onboardSlice.reducer;
export const {
  searchByOnboard,
  verifyOnboard,
  selectedDomain,
  selectedPackage,
} = onboardSlice.actions;
