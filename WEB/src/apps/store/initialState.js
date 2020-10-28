export default {
    accessToken: localStorage.getItem("userInfo")
        ?JSON.parse(localStorage.getItem("userInfo")).accessToken:null,
    userName: localStorage.getItem("userInfo")
        ?JSON.parse(localStorage.getItem("userInfo")).userName:null,
    pk: localStorage.getItem("userInfo")
        ?JSON.parse(localStorage.getItem("userInfo")).pk:null
  };