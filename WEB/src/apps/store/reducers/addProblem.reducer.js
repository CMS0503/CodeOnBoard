import {
    SET_PROBLEM_NAME,
    SET_LIMIT_TIME,
    SET_LIMIT_MEMORY,
    SET_INIT_BOARD,
    SET_DESC,
    SET_THUMBNAIL,
    SELECT_STONE,
    SELECT_PLACEMENT_RULE,
    SELECT_ACTION_CONDITION,
    SELECT_ACTION_DIR,
    SELECT_ACTION_METHOD,
    SELECT_ENDING_RULE, SET_PLACEMENT_RULE_LIST, SET_ACTION_RULE_LIST, SET_STONE_TYPE, SET_MODE,
} from "../actions/addProblem.action"

const initStata = {
    mode: "post",
    problemName : undefined,
    limitTime : 0,
    limitMemory : 0,
    initBoard : "0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0\n",
    desc:null,
    thumbnail:null,
    selectedStone: 1,
    rules: [
        {
            id: 1,
            type:null,
            placementRule:null,
            actionCondition:null,
            actionDir:null,
            actionMethod:null,
        },
        {
            id: 2,
            type:null,
            placementRule:null,
            actionCondition:null,
            actionDir:null,
            actionMethod:null,
        },
        {
            id: 3,
            type:null,
            placementRule:null,
            actionCondition:null,
            actionDir:null,
            actionMethod:null,
        },
        {
            id: 4,
            type:null,
            placementRule:null,
            actionCondition:null,
            actionDir:null,
            actionMethod:null,
        }
    ],
    endingRule: null,
    placementRuleList: [],
    actionRuleList: []
}

const addProblem
 = (state = initStata, action) => {
    switch(action.type){
        case SET_MODE:
            return {...state, mode:action.payload}
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
        case SET_THUMBNAIL:
            return {...state, thumbnail:action.payload}
        case SELECT_STONE:
            return {...state, selectedStone:action.payload};
        case SET_STONE_TYPE:
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, type:action.payload}: rule)};
        case SELECT_PLACEMENT_RULE:
            console.log(action.id, action.payload)
            return {...state, rules:state.rules.map(rule => rule.id === action.id?
                { ...rule, placementRule:action.payload}: rule)};
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
        case SET_PLACEMENT_RULE_LIST:
            return {...state, placementRuleList: action.payload}
        case SET_ACTION_RULE_LIST:
            return {...state, actionRuleList: action.payload}
        default:
            return state;
    }
}

export default addProblem
