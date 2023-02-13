//Make API requests
import axios from "axios"
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN
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

//register a user 
export const registerUser = async (credentials) => {
    try{
        const {data:{message}, status} = await axios.post(`/api/register`, credentials)

        const {username, email} = credentials;
        //send an email
        if(status === 201){
            await axios.post(`/api/registerMail`, {username, userEmail:email, text:message})
        }
        return {message}

    }catch(error){
        return {error:error}
    }
}

//login function
export const loginUser = async ({username, password}) => {
    try{
        if(username){
            const {data} = await axios.post(`/api/login`, {username, password})
            return {data}
        }
    }catch(error){
        return {error:"Passwords do not Match!"}
    }
}


//update user profile
export const updateUser = async(response) => {
    try{
        const token = await localStorage.getItem("token")
        const data = await axios.put(`/api/updateUser`, response, {headers:{"Authorization": `Bearer ${token}`}})
        return {data}
    }catch(error){
        return {error:"Couldn't update profile!"}
    }
}

//generate OTP
export const generateOTP = async(username) =>{
    try{
        const {data:{code}, status} = await axios.get(`/api/generateOTP`, {params:{username}})
        //send mail with OTP
        if(status === 201){
            const {data: {email}} = await getUser({username})
            const text = `Your Password Recovery OTP is ${code}. Verify and recover your Password.`
            await axios.post('/api/registerMail', {username, userEmail:email, text, subject:"Password Recovery OTP"})
        }
        return {code}
    }catch(error){
        return {error}
    }
}

//Verify OTP
export const verifyOTP = async({username, code}) => {
    try{
        const {data, status} = await axios.get('/api/verifyOTP', {params:{username, code}})
        return {data, status}
    }catch(error){
        return {error}
    }
}

//Reset password
export const resetPassword = async ({username, password}) => {
    try{
        const {data, status} = await axios.put('/api/resetPassword', {username, password})
        return {data, status}

    }catch(error){
        return {error}
    }
}



























