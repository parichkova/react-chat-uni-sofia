
export default function (state = [], action) {
    switch (action.type) {
        case 'TEXT_MESSAGE':
            return [...state, action.message];
        case 'GET_HISTORY':
            return [...state, ...action.message]
        default:
    }
    return state;
}