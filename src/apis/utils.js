import axios from 'axios'

const { isAxiosError } = axios

const utils = {
  handleError(err) {
    if (isAxiosError(err)) {
      console.log('Request Error', err.response?.data)
    } else {
      console.error('Unexpected', err)
    }
  },
}

export default utils
