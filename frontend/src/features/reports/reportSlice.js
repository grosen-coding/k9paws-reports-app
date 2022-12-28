import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "./reportService";

const initialState = {
  reports: [],
  report: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Report
export const createReport = createAsyncThunk(
  "reports/create",
  async (reportData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.client.token;
      return await reportService.createReport(reportData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Client Reports
export const getReports = createAsyncThunk(
  "reports/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.client.token;
      return await reportService.getReports(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Client Report
export const getReport = createAsyncThunk(
  "reports/get",
  async (reportId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.client.token;
      return await reportService.getReport(reportId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Close Report
export const closeReport = createAsyncThunk(
  "reports/close",
  async (reportId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.client.token;
      return await reportService.closeReport(reportId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReport.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.report = action.payload;
      })
      .addCase(getReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reports.map((report) =>
          report._id === action.payload._id
            ? (report.status = "closed")
            : report
        );
      });
  },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;
