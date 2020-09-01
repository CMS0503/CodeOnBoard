import { 
    SET_PROBLEM_NAME,
    SET_LIMIT_TIME,
    SET_LIMIT_MEMORY,
    SET_INIT_BOARD,
    SET_DESC,
    SET_THUMBNAIL2,
    SELECT_STONE,
    SELECT_PLACEMENT_RULE,
    SELECT_PLACEMENT_DIR,
    SELECT_ACTION_CONDITION,
    SELECT_ACTION_DIR,
    SELECT_ACTION_METHOD,
    SELECT_ENDING_RULE,
    SET_LENGTH1,
    SET_LENGTH2
} from "../actions/addProblem.action"

const initStata = {
    problemName : null,
    limitTime : null,
    limitMemory : null,
    initBoard : null,
    desc:null,
    thumbnail2:null,
    selectedStone: 0,
    rules: [
        {
            id: 0,
            placementRule:null,
            placementDir:null,
            actionCondition:null,
            actionDir:null,
            actionMethod:null,
            length1:null,
            length2:null,
        },
        {
            id: 1,
            placementRule:null,
            placementDir:null,
            actionCondition:null,
            actionDir:null,
            actionMethod:null,
            length1:null,
            length2:null,
        },
        {
            id: 2,
            placementRule:null,
            placementDir:null,
            actionCondition:null,
            actionDir:null,
            actionMethod:null,
            length1:null,
            length2:null,
        },
        {
            id: 3,
            placementRule:null,
            placementDir:null,
            actionCondition:null,
            actionDir:null,
            actionMethod:null,
            length1:null,
            length2:null,
        }
    ],
    endingRule: null,
}

const addProblem
 = (state = initStata, action) => {
    switch(action.type){
        case SET_PROBLEM_NAME:
            return {...state, problemName:action.payload}
        case SET_LIMIT_TIME:
            return {...state, limitTime:action.payload}
        case SET_LIMIT_MEMORY:
            return {...state, limitMemory:action.payload}
        case SET_INIT_BOARD:
            return {...state, initBoard:action.payload}
        case SET_DESC:
            return {...state, desc:action.payload}
        case SET_THUMBNAIL2:
            return {...state, thumbnail2:action.payload}
        case SELECT_STONE:
            return {...state, selectedStone:action.payload};
        case SELECT_PLACEMENT_RULE:
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, placementRule:action.payload}: rule)};
        case SELECT_PLACEMENT_DIR:
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, placementDir:action.payload}: rule)};
        case SELECT_ACTION_CONDITION:
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, actionCondition:action.payload}: rule)};
        case SELECT_ACTION_DIR:
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, actionDir:action.payload}: rule)};
        case SELECT_ACTION_METHOD:
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, actionMethod:action.payload}: rule)};
        case SELECT_ENDING_RULE:
            return {...state, endingRule:action.payload};
        case SET_LENGTH1:
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, length1:action.payload}: rule)};
        case SET_LENGTH2:
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, length2:action.payload}: rule)};
        default:
            return state;
    }
}

export default addProblem
