import axios from 'axios'

const API_URL = 'https://tavolina-production.up.railway.app/api/tables/'

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
// Get table
const getTable = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + id, config)

  return response.data
}

// Delete table
const deleteTable = async (tableId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + tableId, config)

  return response.data
}

// update table
const updateTable = async (tableId, name, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + tableId, name, config)

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
  updateTable,
  deleteTable,
  openTable,
  closeTable,
}

export default tableService
