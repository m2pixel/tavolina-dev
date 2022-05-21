import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shiftService from './ShiftService'

const initialState = {
  shifts: [],
  shift: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createShift = createAsyncThunk(
  'shifts/create',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await shiftService.createShift(userId, token)
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

export const getShift = createAsyncThunk(
  'shifts/findOne',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await shiftService.getShift(userId, token)
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

export const getShifts = createAsyncThunk(
  'shifts/find',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await shiftService.getShifts(token)
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

export const pushOrder = createAsyncThunk(
  'shifts/push',
  async (shift, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await shiftService.pushOrder(shift.id, shift, token)
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

export const closeShift = createAsyncThunk(
  'shifts/close',
  async (shiftId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await shiftService.closeShift(shiftId, token)
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

export const shiftSlice = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShift.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shifts.push(action.payload)
      })
      .addCase(createShift.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getShift.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getShift.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shift = action.payload
      })
      .addCase(getShift.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getShifts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getShifts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shifts = action.payload
      })
      .addCase(getShifts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(pushOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(pushOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shift = action.payload
      })
      .addCase(pushOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closeShift.pending, (state) => {
        state.isLoading = true
      })
      .addCase(closeShift.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shifts = state.shifts.map((shift) => {
          return shift._id === action.payload._id ? action.payload : shift
        })
      })
      .addCase(closeShift.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = shiftSlice.actions
export default shiftSlice.reducer
