
export default function (state = [], action) {
    switch (action.type) {
        case  'ADD_USER': {
            let users = [];
            
            users.push({ id: 1, name: action.name })

            
            return users;
        }
        case 'USER_JOINED':
        case 'USER_LEFT':
            const us = action.users && action.users.length > 0 ? action.users : [];

            return us;
        default:
    }

    return state;
}