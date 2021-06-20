import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { apiBaseUrl } from '@/utils/consts'

axios.defaults.crossDomain = true

// create an axios instance
const service = axios.create({
    baseURL: apiBaseUrl, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        let token = getToken();
        if (token) {
            // let each request carry token
            // ['Authorization'] is a custom headers key
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * judge the status by HTTP Status Code
     */
    response => {
        return response.data
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)

export default service