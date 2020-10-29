import { obtainToken, logout } from "../../api/authenticationApi";
import * as React from "react";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGOUT_USER = "LOGOUT_USER";

export function loginUserSuccess(data) {
    return {
        type: LOGIN_USER_SUCCESS,
        accessToken: data.token,
        userName: data.user.first_name,
        pk: data.user.pk
    };
}

export function loginUser(username, password) {
    return async function (dispatch) {
        try {
            const response = await obtainToken(username, password);
            dispatch(loginUserSuccess(response.data));
            window.localStorage.setItem(
                "userInfo",
                JSON.stringify({
                pk: response.data.user.pk,
                userName: response.data.user.username,
                accessToken: response.data.token,
                // refresh_token:
                })
            )
        } catch (error) {
            console.log("Error obtaining token. " + error);
        }
    };
}

export function logoutUser() {
    localStorage.removeItem("userInfo")
    return { type: LOGOUT_USER };
}