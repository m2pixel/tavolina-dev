import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tableService from './tableService'

const initialState = {
  tables: [],
  table: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new table
export const createTable = createAsyncThunk(
  'tables/create',
  async (tableData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tableService.createTable(tableData, token)
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
export const getTables = createAsyncThunk(
  'tables/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tableService.getTables(token)
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
export const getTable = createAsyncThunk(
  'tables/getOne',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tableService.getTable(id, token)
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

// Delete user table
export const deleteTable = createAsyncThunk(
  'tables/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tableService.deleteTable(id, token)
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

export const openTable = createAsyncThunk(
  'tables/open',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tableService.openTable(id, token)
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

export const closeTable = createAsyncThunk(
  'tables/close',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tableService.closeTable(id, token)
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

export const updateTable = createAsyncThunk(
  'tables/update',
  async (table, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tableService.updateTable(table.id, table.name, token)
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

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.msg
        state.tables.push(action.payload.table)
      })
      .addCase(createTable.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTables.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTables.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tables = action.payload
      })
      .addCase(getTables.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.table = action.payload
      })
      .addCase(getTable.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.msg
        state.tables = state.tables.map((table) => {
          return table._id === action.payload.table._id
            ? action.payload.table
            : table
        })
      })
      .addCase(updateTable.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tables = state.tables.filter(
          (table) => table._id !== action.payload.id
        )
      })
      .addCase(deleteTable.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(openTable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(openTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tables = state.tables.map((table) => {
          return table._id === action.payload._id ? action.payload : table
        })
      })
      .addCase(openTable.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closeTable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(closeTable.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.table = []
      })
      .addCase(closeTable.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = tableSlice.actions
export default tableSlice.reducer
