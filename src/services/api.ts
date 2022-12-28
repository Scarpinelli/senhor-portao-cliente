/* eslint-disable func-names */
import axios from 'axios'

import { apiURL } from '../env'

const api = axios.create({
    baseURL: apiURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export default api
