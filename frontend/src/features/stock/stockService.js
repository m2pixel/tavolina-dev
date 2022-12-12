import axios from 'axios'

// const API_URL = 'https://tavolina.onrender.com/api/stock/'
const API_URL = '/api/stock/'

// add to stock
const createStock = async (stock, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, stock, config)

  return response.data
}

// get stock by ID
const getStock = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + id, config)

  return response.data
}

// get stocks
const getStocks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// update stock
const updateStock = async (id, stock, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + id, stock, config)

  return response.data
}

// delete stock
const deleteStock = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const stockService = {
  createStock,
  getStock,
  getStocks,
  updateStock,
  deleteStock,
}

export default stockService
