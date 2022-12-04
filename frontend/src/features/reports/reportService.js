import axios from 'axios'

const API_URL = 'https://tavolina-production.up.railway.app/api/records/'

const getReports = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const getReport = async (reportId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + reportId, config)

  return response.data
}

const reportService = {
  getReports,
  getReport,
}

export default reportService
