import request from '@/utils/request'

export function authorize(data) {
    return request({
        url: '/api/authorize',
        method: 'post',
        data
    })
}