export const SET_NAME = "SET_NAME"
export const SET_EMAIL = "SET_EMAIL"
export const SET_PASSWORD = "SET_PASSWORD"
export const SET_PASSWORD2 = "SET_PASSWORD2"

export function setName(param){
    return{
        type: SET_NAME,
        payload: param
    }
}

export function setEmail(param){
    return{
        type: SET_EMAIL,
        payload: param
    }
}

export function setPassword(param){
    return{
        type: SET_PASSWORD,
        payload: param
    }
}

export function setPassword2(param){
    return{
        type: SET_PASSWORD2,
        payload: param
    }
}