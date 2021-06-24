import request from '@/utils/request'

export function send(data) {
    return request({
        url: '/captcha/send',
        method: 'post',
        data
    })
}