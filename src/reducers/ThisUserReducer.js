
export default function (state = null, action) {
    switch (action.type) {
        case  'ADD_USER': {
           return action.name;
        }
        case 'USER_JOINED_ACK':
            return action.thisUser;
        default:
    }

    return state;
}