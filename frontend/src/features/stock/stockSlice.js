import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import stockService from './stockService'

const initialState = {
  stocks: [],
  stock: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createStock = createAsyncThunk(
  'stock/create',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await stockService.createStock(id, token)
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

export const getStock = createAsyncThunk(
  'stock/findOne',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await stockService.getStock(id, token)
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

export const getStocks = createAsyncThunk('stock/find', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await stockService.getStocks(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteStock = createAsyncThunk(
  'stock/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await stockService.deleteStock(id, token)
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

export const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStock.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createStock.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.msg
        state.stocks.push(action.payload.stock)
      })
      .addCase(createStock.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getStock.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStock.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.stock = action.payload === null ? [] : action.payload
      })
      .addCase(getStock.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getStocks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.stocks = action.payload
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteStock.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteStock.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.stocks = state.stocks.filter((stock) => {
          return stock._id !== action.payload.id
        })
      })
      .addCase(deleteStock.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = stockSlice.actions
export default stockSlice.reducer
