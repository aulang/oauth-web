import request from '@/utils/request'

export function getApproval(authId) {
    return request({
        url: `/approval/${authId}`,
        method: 'get'
    });
}

export function approval(authId, approved) {
    return request({
        url: '/approval',
        method: 'post',
        data: {
            authId: authId,
            approved: approved
        }
    });
}

export function reject(authId) {
    return request({
        url: `/reject/${authId}`,
        method: 'post'
    });
}