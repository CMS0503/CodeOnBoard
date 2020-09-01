export const SET_REPLAYLIST = "SET_REPLAYLIST"
export const SET_ISOPEN = "SET_ISOPEN"
export const SET_GAMEID = "SET_GAMEID"

export function setReplayList(param){
    return{
        type: SET_REPLAYLIST,
        payload: param
    }
}

export function setIsOpen(param){
    return{
        type: SET_ISOPEN,
        payload: param
    }
}

export function setGameId(param){
    return{
        type: SET_GAMEID,
        payload: param
    }
}