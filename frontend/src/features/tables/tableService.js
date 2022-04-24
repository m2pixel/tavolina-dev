import axios from 'axios'

const API_URL = '/api/tables/'

// Create new table
const createTable = async (tableData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, tableData, config)

  return response.data
}

// Get tables
const getTables = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// get table by id
// Get user tables
const getTable = async (tableName, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + tableName, tableName, config)

  return response.data
}

// Delete user table
const deleteTable = async (tableId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + tableId, config)

  return response.data
}

const openTable = async (tableId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(`${API_URL}/open/${tableId}`, config)

  return response.data
}

const closeTable = async (tableId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(`${API_URL}/close/${tableId}`, config)

  return response.data
}

const tableService = {
  createTable,
  getTables,
  getTable,
  deleteTable,
  openTable,
  closeTable,
}

export default tableService
