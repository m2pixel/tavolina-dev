import axios from 'axios'

// const API_URL = 'https://tavolina.onrender.com/api/users/'
const API_URL = '/api/users/'

// create user
const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, userData, config)
  return response.data
}

// get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// get users
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + userId, config)
  return response.data
}

// update user
const updateUser = async (userId, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + userId, userData, config)

  return response.data
}

// delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + userId, config)
  return response.data
}

// user permission
const userPermission = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'hp/' + userId, config)

  return response.data
}

const userService = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  userPermission,
}

export default userService
