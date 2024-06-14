import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";

export const getDecrypt = createAsyncThunk(
  "booking:getDecript",
  async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/doe-booking/api/v1/auth/get-decrypt`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getBranch = createAsyncThunk(
  "branch/by-codes",
  async ({ token, body }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/doe-booking/api/v1/branch/by-codes`,
        body,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCalendar = createAsyncThunk(
  "calendar/get-data",
  async ({ token, id }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/doe-booking/api/v1/calendar/get-data/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getDataRounds = createAsyncThunk(
  "round/get-rounds",
  async ({ token, b_id, date_string }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/doe-booking/api/v1/round/get-rounds/`,
        {
          params: { b_id, date_string },
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const makeAppointment = createAsyncThunk(
  "appointment/make-appointment",
  async ({ token, body }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_API
        }/doe-booking/api/v2/appointment/make-appointment`,
        body,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointment/cancel-appointment",
  async ({ token, body }) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_APP_API
        }/doe-booking/api/v1/appointment/cancel-appointment`,
        body,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getDataPostpone = createAsyncThunk(
  "calendar/get-data-postpone",
  async ({ token, body }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_API
        }/doe-booking/api/v1/calendar/get-data-postpone`,
        body,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postponeAppointment = createAsyncThunk(
  "appointment/postpone-appointment-mou",
  async ({ token, body }) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_APP_API
        }/doe-booking/api/v1/appointment/postpone-appointment-mou`,
        body,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postponeAppointmentNormal = createAsyncThunk(
  "appointment/postpone-appointment-normal",
  async ({ token, body }) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_APP_API
        }/doe-booking/api/v1/appointment/postpone-appointment-normal`,
        body,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    gettoken: "",
    selectedDate: [],
    orgSelectedDate: [],
    dates_users: [],
    option_branch: [],
    branch: "",
    getDates_branch: [],
    getusers: [],
    form: [],
    appm_postpone: [],
    getrounds: [],
    selectRound: [],
  },
  reducers: {
    post_selectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setgettoken(state, action) {
      state.gettoken = action.payload;
    },
    postOrgSelectedDate(state, action) {
      state.orgSelectedDate = action.payload;
    },
    setdates_users(state, action) {
      // const { dates, users } = action.payload;
      state.dates_users = action.payload;
    },
    setbranch(state, action) {
      state.branch = action.payload;
    },
    setoption_branch(state, action) {
      state.option_branch = action.payload;
    },
    setgetDates_branch(state, action) {
      state.getDates_branch = action.payload;
    },
    setgetusers(state, action) {
      state.getusers = action.payload;
    },
    setgetId(state, action) {
      state.getId = action.payload;
    },
    setform(state, action) {
      state.form = action.payload;
    },
    setappmPostpone(state, action) {
      state.appm_postpone = action.payload;
    },
    setgetrounds(state, action) {
      state.getrounds = action.payload;
    },
    setselectRound(state, action) {
      state.selectRound = action.payload;
    },
    // delete
    deleteItems(state, action) {
      const filteredDatesUsers = state.dates_users.filter(
        (item) => item.dates !== action.payload
      );

      const filteredOrgSelectedDate = state.orgSelectedDate.filter(
        (date) => date !== action.payload
      );

      return {
        ...state,
        dates_users: filteredDatesUsers,
        orgSelectedDate: filteredOrgSelectedDate,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDecrypt.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(getDecrypt.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(getDecrypt.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
    builder.addCase(getBranch.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(getBranch.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(getBranch.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
    builder.addCase(getCalendar.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(getCalendar.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(getCalendar.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
    builder.addCase(makeAppointment.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(makeAppointment.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(makeAppointment.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
    builder.addCase(cancelAppointment.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(cancelAppointment.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(cancelAppointment.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
    builder.addCase(getDataRounds.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(getDataRounds.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(getDataRounds.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
    builder.addCase(getDataPostpone.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(getDataPostpone.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(getDataPostpone.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
    builder.addCase(postponeAppointment.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(postponeAppointment.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(postponeAppointment.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
    builder.addCase(postponeAppointmentNormal.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(postponeAppointmentNormal.fulfilled, (state, action) => {
      state.error = false;
      state.loading = action.payload;
    });
    builder.addCase(postponeAppointmentNormal.rejected, (state, action) => {
      state.error = true;
      state.loading = action.error;
    });
  },
});

export const {
  post_selectedDate,
  gettoken,
  setgettoken,
  selectedDate,
  postOrgSelectedDate,
  setOrgSelectedDates,
  setdates_users,
  dates_users,
  setgetDates_branch,
  setbranch,
  branch,
  getDates_branch,
  option_branch,
  setoption_branch,
  getusers,
  setgetusers,
  getId,
  setgetId,
  setform,
  form,
  appm_postpone,
  setappmPostpone,
  setgetrounds,
  getrounds,
  setselectRound,
  selectRound,
  deleteItems,
} = postsSlice.actions;

export default postsSlice.reducer;
