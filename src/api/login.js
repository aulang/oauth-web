import request from '@/utils/request'
import { sha256 } from 'js-sha256'

export function login(data) {
    data.password = sha256(data.password);

    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}