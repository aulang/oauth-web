import request from '@/utils/request'

export function servers() {
    return request({
        url: '/third/servers',
        method: 'get'
    })
}