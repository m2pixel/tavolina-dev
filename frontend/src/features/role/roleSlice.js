import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import roleService from './roleService'

const initialState = {
  roles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getRoles = createAsyncThunk('roles/find', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await roleService.getRoles(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.roles = action.payload
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = roleSlice.actions
export default roleSlice.reducer
