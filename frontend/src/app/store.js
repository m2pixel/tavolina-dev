import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import tableReducer from '../features/tables/tableSlice'
import categoryReducer from '../features/categories/categorySlice'
import userReducer from '../features/users/userSlice'
import productReducer from '../features/products/productSlice'
import ordersReducer from '../features/orders/orderSlice'
import shiftReducer from '../features/shifts/shiftSlice'
import reportReducer from '../features/reports/reportSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    tables: tableReducer,
    categories: categoryReducer,
    products: productReducer,
    orders: ordersReducer,
    shifts: shiftReducer,
    reports: reportReducer,
  },
})
