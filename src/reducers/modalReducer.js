
export default function (state = false, action) {
    switch (action.type) {
        case 'CLOSE_MODAL': 
            return false;
        case 'OPEN_MODAL':
            return true;
        default:
            return false;
    }

    return state;
}