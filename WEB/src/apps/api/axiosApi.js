import axios from "axios";

const baseURL = "http://203.246.112.32:8000" //"https://cors-anywhere.herokuapp.com/http://203.246.112.32:8000";
const accessToken = localStorage.getItem("access_token");

const axiosAPI = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  // headers: {
  //   Authorization: accessToken ? "JWT " + accessToken : null,
  //   "Content-Type": "application/json",
  //   accept: "application/json",
  // },
});

axiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh = localStorage.getItem("refresh_token");

      if (refresh) {
        console.log("==========atob", refresh)
        const tokenParts = JSON.parse(atob(refresh.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          try {
            const response = await axiosAPI.post("/token/refresh/", {
              refresh,
            });
            setNewHeaders(response);
            originalRequest.headers["Authorization"] =
              "JWT " + response.data.access;
            return axiosAPI(originalRequest);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export function setNewHeaders(response) {
  // console.log("response==>",response.data.token)
  axiosAPI.defaults.headers["Authorization"] = "JWT " + response.data.token;
  // localStorage.setItem("jwt", response.data.token);
  // localStorage.setItem("pk", response.data.user.pk);
  // localStorage.setItem("userName", response.data.user.username)
  // localStorage.setItem("refresh_token", response.data.refresh);
  // console.log("token==>",localStorage.getItem("access_token") )
}

export default axiosAPI;