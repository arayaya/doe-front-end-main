import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    dates: [],
  },
  reducers: {
    setDates: (state, action) => {
      state.dates = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setDates} = bookingSlice.actions;

export default bookingSlice.reducer;
