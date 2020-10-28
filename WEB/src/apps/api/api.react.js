import axios from 'axios'
import axiosAPI from "./axiosApi";

const corsUrl = 'https://cors-anywhere.herokuapp.com'
// const baseUrl = 'http://203.246.112.32:8000/api/v1'
const baseUrl = 'http://127.0.0.1:8000/api/v1'
const authJWT = 'jwt ' + window.localStorage.getItem('access_token')

export function register(username, email, password1, password2){
    console.log("regi", username, email, password1)
    return axios.post("rest-auth/registration/", {
                        username:username,
                        password1:password1,
                        password2:password2,
                        email:email,
                      })
}
export function getProblem(problemId){
    const header = {
        'Authorization': authJWT

    }
    return axios.get(`/api/v1/problem/${problemId}`,{})
    // ${corsUrl}/
}

export function getUserInfo(userId){
    return axios.get(`/api/v1/userfullInfo/${userId}`, {})
    // ${corsUrl}/
}

export function getCodeList(userId, problemId){
    return axios.get(`/api/v1/code/?author=${userId}&problem=${problemId}&available_game=true`)
}

export function matching(data){
    return axios.post(`/api/v1/match/`, data, {})
    // ${corsUrl}/
}

export function getGame(gameId){
    return axios.get(`/api/v1/game/${gameId}/`, {})
}

export function getProblems(){
    return axios.get(`/api/v1/problem/`)
}

export function postCode(data){
    return axios.post(`/api/v1/code/`, data, {})
    // ${corsUrl}/
}

export function getCode(codeId){
    const header = {
        'Authorization': authJWT
    }
    return axios.get(`/api/v1/code/${codeId}`, { headers: header})
    // ${corsUrl}/
}

export function getGames(problemId){
    console.log('getGames', problemId)
    const params = {
        problem:problemId
    }
    const header = {
        'Authorization': authJWT,
    }
    const config = {
        params:params,
        headers:header
    }
    return axios.get(`/api/v1/game/my`,  config)
}

export function selfBattle(bodyData){
    var header = {
        'Authorization' : authJWT
    }
    return axios.post(`/api/v1/selfBattle/`, bodyData, { headers: header})
}