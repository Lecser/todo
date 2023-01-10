import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'd02dcb4a-ac73-44ed-96e4-0173cd5c93f1'
  }
})
