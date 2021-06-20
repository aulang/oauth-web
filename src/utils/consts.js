const apiBaseUrl = 'http://localhost:8080';
const msgShowMilliseconds = 3 * 1000;

const errorCodes = {
    passwordExpired: 10101002,
    accountLocked: 10101003,
    needApproval: 10101010
}

export { apiBaseUrl, msgShowMilliseconds, errorCodes }