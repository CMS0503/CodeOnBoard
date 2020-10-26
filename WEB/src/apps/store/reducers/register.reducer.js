// export const REGISTER_ERROR = "REGISTER_ERROR";
// export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
import {
    SET_NAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_PASSWORD2
} from "../actions/register.action";

const initState = {
    name: null,
    email: null,
    password: null,
    password2: null
}

const submitRegister = (state = initState, action) => {
    switch (action.type){
        case SET_NAME:
            return {...state, name: action.payload}
        case SET_EMAIL:
            return {...state, email: action.payload}
        case SET_PASSWORD:
            return {...state, password: action.payload}
        case SET_PASSWORD2:
            return {...state, password2: action.payload}
        default:
            return state;
    }
}

export default submitRegister;