import { 
    SET_TIER,
    SET_SCORE,
    SET_LANGUAGE1,
    SET_THUMBNAIL,
    GET_CODELIST,
    SET_CODE,
    SET_ISMATCHING,
    SET_GAMESTATUS,
    SET_TIER2,
    SET_SCORE2,
    SET_LANGUAGE2,
    SET_USER2,
    SET_GAMEID,
    SET_GAMERESULT,
    SET_GAMERESULT2,
} from '../actions/match.action';

const initState = {
    // Challenger
    tier : null,
    score : null,
    language1 : null,
    thumbnail : null,
    codeList : {},
    code: {name:"Select your Code"},
    gameResult: null,
    
    // Game
    isMatching: false,
    gameStatus: "기다리는중",
    gameID: null,

    // Opposite
    user2: null,
    tier2: null,
    score2 : null,
    language2 : null,
    gameResult2: null,
}

const match = (state = initState, action) => {
    switch(action.type){
        case SET_TIER:
            return {...state, tier:action.payload}
        case SET_SCORE:
            return {...state, score:action.payload}
        case SET_LANGUAGE1:
            return {...state, language1:action.payload}
        case SET_THUMBNAIL:
            return {...state, thumbnail:action.payload}
        case GET_CODELIST:
            return {...state, codeList:action.payload}
        case SET_CODE:
            return {...state, code:action.payload}
        case SET_ISMATCHING:
            return {...state, isMatching:action.payload}
        case SET_GAMESTATUS:
            return {...state, gameStatus:action.payload}
        case SET_USER2:
            return {...state, user2:action.payload} 
        case SET_TIER2:
            return {...state, tier2:action.payload}
        case SET_SCORE2:
            return {...state, score2:action.payload}
        case SET_LANGUAGE2:
            console.log("set lang2")
            return {...state, language2:action.payload}
        case SET_GAMEID:
            return {...state, gameId:action.payload}
        case SET_GAMERESULT:
            return {...state, gameResult:action.payload}
        case SET_GAMERESULT2:
            return {...state, gameResult2:action.payload}
         
        default:
            return state;
    }
}

export default match;