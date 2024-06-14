import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./slice/bookingSlice";
import postsSlice from "./slice/postsSlice";

export default configureStore({
  reducer: {
    booking: bookingSlice,
    posts: postsSlice,
  },
});
