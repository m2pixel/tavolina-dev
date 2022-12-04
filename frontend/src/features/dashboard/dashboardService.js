import axios from 'axios'

const API_URL = 'https://tavolina-production.up.railway.app/api/dashboard/'

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

// get total of current shift orders
const ordersTotal = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'orders/total', config)

  return response.data
}

const orderService = {
  getOrders,
  getRecords,
  ordersTotal,
}

export default orderService
