import { 
    SUBMIT, 
    GET_DESCRIPTION,
    WRITE_CODE,
    WIRTE_CODENAME,
    SET_LANGUAGE,
    SET_EDITOR,
    SET_TITLE,
    SET_ID,
    SET_CODELIST,
} from '../actions/problem.action';

const initState = {
    isSubmit : false,
    desc : null,
    code : null,
    codeName : null,
    language : "Select Language",
    editor: null,
    title:null,
    id: null,
    codeList: null,
}

const problem = (state = initState, action) => {
    switch(action.type){
        case SUBMIT:
            return {...state, isSubmit:action.payload};
        case GET_DESCRIPTION:
            return {...state, desc:action.payload}
        case WRITE_CODE:
            return {...state, code:action.payload}
        case WIRTE_CODENAME:
            return {...state, codeName:action.payload}
        case SET_LANGUAGE:
            return {...state, language:action.payload}
        case SET_EDITOR:
            return {...state, editor:action.payload}
        case SET_TITLE:
            return {...state, title:action.payload}
        case SET_ID:
            return {...state, id:action.payload}
        case SET_CODELIST:
            return {...state, codeList:action.payload.reverse()};
        default:
            return state;
    }
}

export default problem;