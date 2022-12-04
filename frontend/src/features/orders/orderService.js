import axios from 'axios'

const API_URL = 'https://scrubs-lizard.cyclic.app/api/orders/'

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
const getOrders = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + orderId, config)

  return response.data
}

// update order
const updateOrder = async (orderId, orders, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + orderId, orders, config)

  return response.data
}

// change table
const changeTable = async (orderId, tables, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + 'change/' + orderId,
    tables,
    config
  )

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
  updateOrder,
  changeTable,
}

export default orderService
