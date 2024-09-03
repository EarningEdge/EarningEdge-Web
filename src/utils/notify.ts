import { toast } from "react-toastify";

export const notify = (message:string,type:"error"|"success"|"info") => {
    switch(type){
        case "success":
            return toast.success(message);  
        case "error":
            return toast.error(message);
        case "info":
            return toast.info(message);
        default:
            return null;

    } 
}
