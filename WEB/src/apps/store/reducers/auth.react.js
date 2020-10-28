import { LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actions/auth.react"
import initialState from "../initialState";

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, accessToken: action.accessToken, pk: action.pk, userName: action.userName};
    case LOGOUT_USER:
      return "";
    default:
      return state;
  }
}