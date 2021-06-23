export function getToken() {
    return null
}

export function getAuthId() {
    return localStorage.getItem('authId');
}

export function setAuthId(authId) {
    localStorage.setItem('authId', authId);
}

export function removeAuthId() {
    localStorage.removeItem('authId');
}