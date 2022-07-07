import axios from 'axios'

const API_URL = '/api/shifts/'

const createShift = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, userId, config)

  return response.data
}

const getShift = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + userId, config)

  return response.data
}

const getShifts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const pushOrder = async (id, orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // router.route('/add/:id').put(pushOrder)
  const response = await axios.put(API_URL + 'add/' + id, orderId, config)

  return response.data
}

const closeShift = async (shiftId,shift, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + shiftId,shift, config)

  return response.data
}

const shiftService = {
  createShift,
  getShift,
  getShifts,
  pushOrder,
  closeShift,
}

export default shiftService
