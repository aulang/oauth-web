import request from '@/utils/request'
import { sha256 } from 'js-sha256'

export function login(data) {
    data.password = sha256(data.password);

    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function sso(data) {
    return request({
        url: '/login/sso',
        method: 'post',
        data
    })
}

export function captcha(data) {
    return request({
        url: '/login/captcha',
        method: 'post',
        data
    })
}

export function redirect(data) {
    let code = data.code;
    let state = data.state;
    let redirectUri = data.redirectUri;

    let queryString = '';
    if (state) {
        queryString = `code=${code}&state=${state}`;
    } else {
        queryString = `code=${code}`;
    }

    let redirectUrl = redirectUri;
    if (redirectUri.indexOf('?') > 0) {
        redirectUrl = redirectUrl + queryString;
    } else {
        redirectUrl = redirectUrl + '?' + queryString;
    }

    window.location.replace(redirectUrl);
}

export function rejectRedirect(data) {
    let state = data.state;
    let redirectUri = data.redirectUri;

    let queryString = '';
    if (state) {
        queryString = `error=reject&state=${state}`;
    } else {
        queryString = 'error=reject';
    }

    let redirectUrl = redirectUri;
    if (redirectUri.indexOf('?') > 0) {
        redirectUrl = redirectUrl + queryString;
    } else {
        redirectUrl = redirectUrl + '?' + queryString;
    }

    window.location.replace(redirectUrl);
}