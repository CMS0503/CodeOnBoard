import axiosAPI from "./axiosApi";


export function register(state){ // TODO: param change to state
    // console.log("regi", username, email, password1)
    return axiosAPI.post("rest-auth/registration/", {
                        username:state.name,
                        password1:state.password,
                        password2:state.password2,
                        email:state.email,
                      })
}

export function postProblem(data, config){
    return axiosAPI.post(`api/v1/problem/`, data, config)
}

export function patchProblem(data, problemId, config){
    return axiosAPI.put(`api/v1/problem/${problemId}/`, data, config)
}

export function deleteProblem(problemId){
    return axiosAPI.delete(`api/v1/problem/${problemId}/`, {})
}

export function getProblem(problemId){
    return axiosAPI.get(`/api/v1/problem/${problemId}/`,{})
}

export function getUserInfo(userId){
    return axiosAPI.get(`/api/v1/userfullInfo/${userId}/`, {})
}

export function getCodeList(userId, problemId){
    const params = {
        problem:problemId
    }

    const config = {
        params:params,
    }
    return axiosAPI.get(`/api/v1/code/my`, config)
}

export function matching(data){
    return axiosAPI.post(`/api/v1/match/`, data, {})
    // ${corsUrl}/
}

export function getGame(gameId){
    return axiosAPI.get(`/api/v1/game/${gameId}/`, {})
}

export function getProblems(my){
    return axiosAPI.get(`/api/v1/problem/`, { params: {my:my}})
}

export function postCode(data){
    return axiosAPI.post(`/api/v1/code/`, data, {})
    // ${corsUrl}/
}

export function getCode(codeId){
    return axiosAPI.get(`/api/v1/code/${codeId}/`, {})
    // ${corsUrl}/
}

export function deleteCode(codeId){
    return axiosAPI.delete(`api/v1/code/${codeId}/`, {})
}

export function getGames(problemId){
    console.log('getGames', problemId)
    const params = {
        problem:problemId
    }

    const config = {
        params:params,
    }
    return axiosAPI.get(`/api/v1/game/my`,  config)
}

export function selfBattle(bodyData){
    return axiosAPI.post(`/api/v1/selfBattle`, bodyData, {})
}

export function getPlacementRuleList(){
    return axiosAPI.get(`/api/v1/placementRule/`, {})
}

export function getActionRuleList(){
    console.log('getActionRuleList')
    return axiosAPI.get(`/api/v1/actionRule/`, {})
}