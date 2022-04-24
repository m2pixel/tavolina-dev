import axios from 'axios'

const API_URL = '/api/orders/'

// Create new order
const createOrder = async (order, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, order, config)

  return response.data
}

// Get orders
const getOrders = async (order, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + 'table', order, config)

  return response.data
}

// get table by id
// Get user tables
// const getTable = async (tableName, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.post(API_URL + tableName, tableName, config)

//   return response.data
// }

// // Delete user table
// const deleteTable = async (tableId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.delete(API_URL + tableId, config)

//   return response.data
// }

const orderService = {
  createOrder,
  getOrders,
}

export default orderService
