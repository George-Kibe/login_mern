//Make API requests
import axios from "axios"

//Authenticate function
export const authenticate = async(username) => {
    try{
        return await axios.post("/api/authenticate", {username})
    }catch(error){
        return {error:"Username doesn't exist! "}
    }
}

//Get user details
export const getUser = async(username) =>{
    try{
        const {data} = await axios.get(`/api/user/${username}`)
        return{data};
    }catch(error){
        return {error: "Passwords do not Match!"}
    }
}