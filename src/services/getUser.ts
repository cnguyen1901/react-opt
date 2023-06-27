import axios from 'axios'

export const getUser = async (uri: string, id: number) => axios.request({
  baseURL: uri,
  headers: {
    'Accept': 'application/json',
  },
  method: 'GET',
  url: `/users/${id}`
})