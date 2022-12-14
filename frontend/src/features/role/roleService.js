import axios from 'axios'

// const API_URL = 'https://tavolina.onrender.com/api/roles/'
const API_URL = '/api/roles/'

const getRoles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const roleService = {
  getRoles,
}

export default roleService
