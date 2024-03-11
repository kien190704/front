import axios from "axios";

 const apiInstances = axios.create({
    baseURL: "https://training.bks.center/"
})
const token = localStorage.getItem("token");
export const apiLoggedInInstances = axios.create({
    baseURL: "https://training.bks.center/",
    headers : {
        "Authorization" :`Bearer ${token}`
    }
})
export default apiInstances;
