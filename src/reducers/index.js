import { combineReducers } from "redux";
import UsersReducer from './UsersReducer';
import MessagesReducer from './MessagesReducer';
import ThisUserReducer from './ThisUserReducer';
import LoginReducer from './loginReducer';
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
    users: UsersReducer,
    messages: MessagesReducer,
    thisUser: ThisUserReducer,
    auth: LoginReducer,
    modalOpen: modalReducer,
});

export default rootReducer;