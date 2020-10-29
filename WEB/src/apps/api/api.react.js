import axiosAPI from "./axiosApi";

const authJWT = 'jwt ' + window.localStorage.getItem('access_token')

export function register(username, email, password1, password2){
    console.log("regi", username, email, password1)
    return axiosAPI.post("rest-auth/registration/", {
                        username:username,
                        password1:password1,
                        password2:password2,
                        email:email,
                      })
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

export function getProblems(){
    console.log("getProblems")
    return axiosAPI.get(`/api/v1/problem/`)
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