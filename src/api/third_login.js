import request from '@/utils/request'

export function servers() {
    return request({
        url: '/third/servers',
        method: 'get'
    })
}

export function redirectUrl(authId, serverId) {
    return request({
        url: `/third/login/${authId}/${serverId}`,
        method: 'get'
    })
}

export function thirdLogin(code, state) {
    return request({
        url: `/third/login`,
        method: 'post',
        data: {
            code: code,
            state: state
        }
    })
}