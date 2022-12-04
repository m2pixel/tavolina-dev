import axios from 'axios'

const API_URL = 'https://scrubs-lizard.cyclic.app/api/categories/'

// create new category
const createCategory = async (tableData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, tableData, config)

  return response.data
}

// get all categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// update category
const updateCategory = async (id, name, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + id, name, config)
  return response.data
}

// delete category
const deleteCategory = async (categoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + categoryId, config)
  return response.data
}

const categoryService = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
}

export default categoryService
