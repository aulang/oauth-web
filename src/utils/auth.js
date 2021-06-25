const TTL_AUTH_ID = 28800;

export function getToken() {
    return null
}

export function getAuthId() {
    return sessionStorage.getItem('authId');
}

export function setAuthId(authId) {
    sessionStorage.setItem('authId', authId);
}

export function removeAuthId() {
    sessionStorage.removeItem('authId');
}

export function getSSO() {
    return ttlLocalStorage.getItem('authId');
}

export function setSSO(authId) {
    ttlLocalStorage.setItem('authId', authId, TTL_AUTH_ID);
}

export function removeSSO() {
    return ttlLocalStorage.removeItem('authId');
}

// 带TTL的localStorage
const ttlLocalStorage = {
    setItem: function (key, value, ttl) {
        let expires = null;
        if (!Number.isNaN(ttl)) {
            expires = new Date().getTime() + ttl * 1000;
        }

        let obj = {
            key: key,
            value: value,
            expires: expires
        }

        localStorage.setItem(key, JSON.stringify(obj));
    },
    getItem: function (key) {
        let item = localStorage.getItem(key);

        if (!item) {
            return null;
        }

        let obj = JSON.parse(item);

        if (obj.expires) {
            let date = new Date().getTime();
            if (date > obj.expires) {
                localStorage.removeItem(key);
                return null;
            }
        }

        return obj.value;
    },
    removeItem: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    }
}