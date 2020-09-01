import { SET_REPLAYLIST, SET_ISOPEN, SET_GAMEID } from "../actions/replay.action"

const initStata = {
    replayList: [],
    isOpen: false,
    gameId: null,
}

const replayList = (state = initStata, action) => {
    switch(action.type){
        case SET_REPLAYLIST:
            return {...state, replayList:action.payload.reverse()};
        case SET_ISOPEN:
            return {...state, isOpen:action.payload};
        case SET_GAMEID:
            return {...state, gameId:action.payload};
        default:
            return state;
    }
}

export default replayList;