import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dashboardService from './dashboardService'

const initialState = {
  count: 0,
  orders: [],
  records: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// get orders
export const getOrders = createAsyncThunk(
  'dashboard/orders',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dashboardService.getOrders(token)
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

// get orders
export const getRecords = createAsyncThunk(
  'dashboard/records',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dashboardService.getRecords(token)
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

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload.map((order) => {
          return order.orders.map((ord) => ({
            ...ord,
            time: order.createdAt,
            table: order.table.name,
          }))
        })
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRecords.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.records = action.payload
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = dashboardSlice.actions
export default dashboardSlice.reducer
