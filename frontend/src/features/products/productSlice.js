import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.createProduct(productData, token)
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

// Get products
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.getProducts(token)
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

// Get product
export const getProduct = createAsyncThunk(
  'products/findOne',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.getProduct(id, token)
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

// update product
export const updateProduct = createAsyncThunk(
  'products/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.updateProduct(data.id, data.product, token)
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

// Delete user product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.deleteProduct(id, token)
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.msg
        state.products.push(action.payload.product)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.msg
        state.products = state.products.map((product) => {
          return product._id === action.payload._id
            ? action.payload.product
            : product
        })
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.msg
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        )
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productSlice.actions
export default productSlice.reducer
