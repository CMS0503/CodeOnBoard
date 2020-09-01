export const SET_TIER = "SET_TIER"
export const SET_SCORE = "SET_SCORE"
export const SET_LANGUAGE = "SET_LANGUAGE"
export const SET_THUMBNAIL = "SET_THUMBNAIL"
export const GET_CODELIST = "GET_CODELIST"
export const SET_CODE = "SET_CODE"
export const SET_GAMERESULT = "SET_GAMERESULT"

export const SET_ISMATCHING = "SET_ISMATCHING"
export const SET_GAMESTATUS = "SET_GAMESTATUS" 
export const SET_GAMEID = "SET_GAMEID"

export const SET_USER2 = "SET_USER2"
export const SET_TIER2 = "SET_TIER2"
export const SET_SCORE2 = "SET_SCORE2"
export const SET_LANGUAGE2 = "SET_LANGUAGE2"
export const SET_GAMERESULT2 = "SET_GAMERESULT2"

export function setTier(param){
    return {
        type: SET_TIER,
        payload: param
    };
}

export function setScore(param){
    return {
        type: SET_SCORE,
        payload: param
    };
}

export function setLanguage(param){
    return {
        type: SET_LANGUAGE,
        payload: param
    };
}

export function setThumbnail(param){
    return {
        type: SET_THUMBNAIL,
        payload: param
    };
}

export function setCodeList(param){
    return {
        type: GET_CODELIST,
        payload: param
    };
}

export function setCode(param){
    return {
        type: SET_CODE,
        payload: param
    };
}

export function setGameResult(param){
    return {
        type: SET_GAMERESULT,
        payload: param
    };
}

export function setIsMatching(param){
    return {
        type: SET_ISMATCHING,
        payload: param
    };
}

export function setGameStatus(param){
    return {
        type: SET_GAMESTATUS,
        payload: param
    };
}

export function setGameId(param){
    return {
        type: SET_GAMEID,
        payload: param
    };
}

export function setUser2(param){
    return {
        type: SET_USER2,
        payload: param
    };
}

export function setTier2(param){
    return {
        type: SET_TIER2,
        payload: param
    };
}

export function setScore2(param){
    return {
        type: SET_SCORE2,
        payload: param
    };
}

export function setLanguage2(param){
    console.log("action setlang2")
    return {
        type: SET_LANGUAGE2,
        payload: param
    };
}

export function setGameResult2(param){
    return {
        type: SET_GAMERESULT2,
        payload: param
    };
}

