export const SET_CODELIST = "SET_CODELIST"

export function setCodeList(param){
    return{
        type: SET_CODELIST,
        payload: param
    }
}