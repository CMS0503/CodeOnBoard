export const SET_RANKING = "SET_RANKING"

export function setRanking(param){
    return{
        type: SET_RANKING,
        payload: param
    }
}