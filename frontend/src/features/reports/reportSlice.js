import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reportService from './reportService'

const initialState = {
  reports: [],
  report: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getReports = createAsyncThunk(
  'reports/find',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await reportService.getReports(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getReport = createAsyncThunk(
  'reports/findOne',
  async (reportId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await reportService.getReport(reportId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getReports.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reports = action.payload
      })
      .addCase(getReports.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getReport.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.report = action.payload
      })
      .addCase(getReport.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = reportSlice.actions
export default reportSlice.reducer
