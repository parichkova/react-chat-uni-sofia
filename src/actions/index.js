export function userJoined(users) {
    return {
        type: 'USER_JOINED',
        users: users
    }
}

export function userJoinedAck(thisUser) {
    return {
        type: 'USER_JOINED_ACK',
        thisUser: thisUser
    }
}

export function userLeft(users) {
    return {
        type: 'USER_LEFT',
        users: users
    }
}

export function messageReceived(message) {
    return {
        type: 'TEXT_MESSAGE',
        message: message
    }
}

export function signIn(name) {
    return {
        type: 'SIGN_IN',
        name,
    }
}

export function signOut() {
    return {
        type: 'SIGN_OUT',
    }
}

export function addUser(name) {
    return {
        type: 'ADD_USER',
        name,
    }
}

export function closeModal() {
    return {
        type: 'CLOSE_MODAL',
    }
}

export function openModal() {
    return {
        type: 'OPEN_MODAL',
    }
}