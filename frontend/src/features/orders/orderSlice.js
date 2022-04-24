import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
  orders: [],
  order: [],
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
  'tables/getAll',
  async (order, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.getOrders(order, token)
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
// export const getTable = createAsyncThunk(
//   'tables/getOne',
//   async (tableName, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await tableService.getTable(tableName, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

// // Delete user table
// export const deleteTable = createAsyncThunk(
//   'tables/delete',
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await tableService.deleteTable(id, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders.push(action.payload)
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
  },
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer
