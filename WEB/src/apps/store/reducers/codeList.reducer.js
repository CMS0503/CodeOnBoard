import { SET_CODELIST } from "../actions/codeList.action"

const initStata = {
    userId: null,
    codeList: null,
}

const codeList = (state = initStata, action) => {
    switch(action.type){
        case SET_CODELIST:
            return {...state, codeList:action.payload};
        default:
            return state;
    }
}

export default codeList