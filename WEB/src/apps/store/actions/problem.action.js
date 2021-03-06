export const SUBMIT = "SUBMIT"
export const GET_DESCRIPTION = "GET_DESCRIPTION"
export const WRITE_CODE = "WRITE_CODE"
export const WIRTE_CODENAME = "WIRTE_CODENAME"
export const SET_LANGUAGE = "SET_LANGUAGE"
export const SET_TITLE = "SET_TITLE"
export const SET_ID = "SET_ID"
export const SET_CODELIST = "SET_CODELIST"
export const SET_CODE_ID = "SET_CODE_ID"

export function submit(param){
    return {
        type: SUBMIT,
        payload: param
    };
}

export function getDescription(param){
    return {
        type: GET_DESCRIPTION,
        payload: param
    };
}

export function writeCode(param){
    return {
        type: WRITE_CODE,
        payload: param
    };
}
export function writeCodeName(param){
    return {
        type: WIRTE_CODENAME,
        payload: param
    };
}
export function setLanguage(param){
    console.log("set lang ==>", param)
    return {
        type: SET_LANGUAGE,
        payload: param
    };
}

export function setTitle(param){
    return {
        type: SET_TITLE,
        payload: param
    };
}

export function setId(param){
    return {
        type: SET_ID,
        payload: param
    };
}

export function setCodeList(param){
    return{
        type: SET_CODELIST,
        payload: param
    }
}

export function setCodeId(param){
    return{
        type: SET_CODE_ID,
        payload: param
    }
}