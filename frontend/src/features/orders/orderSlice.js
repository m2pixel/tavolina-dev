import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
  orders: [],
  order: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new table
export const createOrder = createAsyncThunk(
  'orders/create',
  async (order, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.createOrder(order, token)
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

// Get tables
export const getOrders = createAsyncThunk(
  'orders/getOne',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.getOrders(orderId, token)
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

// update order
export const updateOrder = createAsyncThunk(
  'orders/update',
  async (order, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.updateOrder(order.id, order, token)
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

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetOrder } = orderSlice.actions
export default orderSlice.reducer
