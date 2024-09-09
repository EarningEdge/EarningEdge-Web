import axios from "axios"
const SERVER_URL =  import.meta.env.VITE_BASE_URL+"/api/v1"
export const fetchUserData = async (userId:string)=>{
    try {
        const response = await axios.get(`${SERVER_URL}/user/details/${userId}`);
        return response.data?.data
    } catch (error) {
        
    }
}
export const cancelSignUp = async (userId:string)=>{
    try {
        const response = await axios.post(`${SERVER_URL}/user/delete-account/${userId}`);
        return response
    } catch (error) {
        
    }
}