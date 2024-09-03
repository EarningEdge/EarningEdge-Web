import axios from "axios"
const SERVER_URL =  import.meta.env.VITE_BASE_URL+"/api/v1"
export const fetchJournalById = async (id:string)=>{
    try {
        const response = await axios.get(`${SERVER_URL}/journal/${id}`);
        return response.data?.data
    } catch (error) {
        
    }
}