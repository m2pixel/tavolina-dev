import axios from 'axios'

const API_URL = '/api/dashboard/'

// Get orders
const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'orders/', config)

  return response.data
}

// Get records
const getRecords = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'records/', config)

  return response.data
}

const orderService = {
  getOrders,
  getRecords,
}

export default orderService
