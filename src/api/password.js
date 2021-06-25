import request from '@/utils/request'
import { sha256 } from 'js-sha256'

export function changePwd(authId, password) {
    password = sha256(password);

    return request({
        url: '/password/change',
        method: 'post',
        data: {
            authId: authId,
            password: password
        }
    })
}