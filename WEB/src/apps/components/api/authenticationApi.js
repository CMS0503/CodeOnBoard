import axiosAPI, { setNewHeaders } from "./axiosApi";

export async function signUp(email, username, password) {
  const response = await axiosAPI.post("users/create/", {
    email,
    username,
    password,
  });
  localStorage.setItem("user", response.data);
  return response;
}

export async function obtainToken(username, password) {
  const response = await axiosAPI.post("rest-auth/login/", {
    username,
    password,
  });
  console.log("===> rest-auth/login/", response)
  setNewHeaders(response);
  return response;
}

export async function refreshToken(refresh) {
  const response = await axiosAPI.post("token/refresh/", {
    refresh,
  });
  setNewHeaders(response);
  return response;
}

// eslint-disable-next-line
export async function logout(accessToken) {
  console.log("Log out")
  localStorage.removeItem("jwt");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userName");
  localStorage.removeItem("pk");
  
  // TODO: invalidate token on backend
}

export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};