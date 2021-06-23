import request from '@/utils/request'

export function authorize(data) {
    return request({
        url: '/authorize',
        method: 'post',
        data
    })
}